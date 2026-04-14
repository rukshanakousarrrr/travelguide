"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendEmail, passwordResetHtml } from "@/lib/email";

const RESET_PREFIX = "pwreset:";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

// ─── Request reset ────────────────────────────────────────────────────────────

export async function requestPasswordResetAction(formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  if (!email) return { error: "Please enter your email address." };

  // Always return success to avoid email enumeration
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.email) return { success: true };

  // Only credentials accounts have a password to reset
  // Google-only accounts don't have hashedPassword
  const hasPassword = !!(user as { hashedPassword?: string | null }).hashedPassword;
  if (!user || !hasPassword) return { success: true };

  // Delete any existing reset token for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: RESET_PREFIX + email },
  });

  // Create new token (expires in 1 hour)
  const rawToken   = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expires    = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.verificationToken.create({
    data: { identifier: RESET_PREFIX + email, token: hashedToken, expires },
  });

  const resetUrl = `${BASE_URL}/auth/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

  await sendEmail({
    to:      email,
    subject: "Reset your password",
    html:    passwordResetHtml({ name: user.name ?? "there", resetUrl }),
    text:    `Reset your password: ${resetUrl}`,
  });

  return { success: true };
}

// ─── Reset password ───────────────────────────────────────────────────────────

export async function resetPasswordAction(formData: FormData) {
  const email     = (formData.get("email") as string)?.toLowerCase().trim();
  const rawToken  = formData.get("token") as string;
  const password  = formData.get("password") as string;
  const confirm   = formData.get("confirm") as string;

  if (!email || !rawToken || !password || !confirm)
    return { error: "Missing required fields." };

  if (password.length < 8)
    return { error: "Password must be at least 8 characters." };

  if (password !== confirm)
    return { error: "Passwords do not match." };

  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  const record = await prisma.verificationToken.findFirst({
    where: {
      identifier: RESET_PREFIX + email,
      token:      hashedToken,
      expires:    { gt: new Date() },
    },
  });

  if (!record) return { error: "This reset link is invalid or has expired. Please request a new one." };

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { email },
    data:  { hashedPassword },
  });

  // Clean up token
  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: RESET_PREFIX + email, token: hashedToken } },
  });

  return { success: true };
}
