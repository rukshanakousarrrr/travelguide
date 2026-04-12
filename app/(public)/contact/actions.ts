"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name    = (formData.get("name")    as string | null)?.trim() ?? "";
  const email   = (formData.get("email")   as string | null)?.trim() ?? "";
  const subject = (formData.get("subject") as string | null)?.trim() ?? "";
  const body    = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !body) {
    return { status: "error", message: "Please fill in all required fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // TODO: wire up email delivery (Resend / Nodemailer / etc.)
  // For now we just simulate a successful submission.
  console.log("[contact]", { name, email, subject, body });

  return {
    status: "success",
    message: "Thank you! We have received your message and will be in touch within 24 hours.",
  };
}
