import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawToken = searchParams.get("token");
  const email    = searchParams.get("email");

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  if (!rawToken || !email) {
    return NextResponse.redirect(new URL("/auth/login?error=invalid_link", base));
  }

  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  const record = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      token:      hashedToken,
      expires:    { gt: new Date() },
    },
  });

  if (!record) {
    // Expired or invalid
    return NextResponse.redirect(new URL("/auth/login?error=link_expired", base));
  }

  // Mark user as verified
  await prisma.user.update({
    where: { email },
    data:  { emailVerified: new Date() },
  });

  // Clean up the token
  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: email, token: hashedToken } },
  });

  return NextResponse.redirect(new URL("/auth/login?verified=1", base));
}
