import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  if ((session.user as { role?: string }).role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}
