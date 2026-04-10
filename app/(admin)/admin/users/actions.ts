"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export type CreateUserState = {
  error?:   string;
  success?: string;
};

export async function createAdminUserAction(
  _prev: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return { error: "Unauthorized." };
  }

  const name     = (formData.get("name")     as string | null)?.trim();
  const email    = (formData.get("email")    as string | null)?.trim().toLowerCase();
  const password = (formData.get("password") as string | null);
  const role = "ADMIN"; // Dashboard accounts are always admin

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "A user with that email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma.user.create as any)({
    data: {
      name:          name ?? null,
      email,
      hashedPassword,
      role:          role as "ADMIN" | "CUSTOMER",
      emailVerified: new Date(),
    },
  });

  revalidatePath("/admin/users");
  return { success: `Account created for ${email}.` };
}
