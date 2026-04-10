"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function adminLoginAction(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  try {
    await signIn("credentials", {
      email:      formData.get("email"),
      password:   formData.get("password"),
      redirectTo: "/admin",
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";
        default:
          return "Something went wrong. Please try again.";
      }
    }
    // Next.js redirect throws — must be re-thrown
    throw error;
  }
}
