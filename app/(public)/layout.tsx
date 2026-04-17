import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { AuthModal } from "@/components/public/AuthModal";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const destinations = await prisma.destination.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    include: {
      places: {
        where: { isActive: true },
        orderBy: { order: "asc" },
        select: { id: true, name: true, subtitle: true, imageUrl: true, linkQuery: true },
      },
    },
  }).catch(() => []);

  return (
    <>
      <Navbar isLoggedIn={!!session?.user} destinations={destinations} />
      <main className="flex-1">{children}</main>
      <Footer />
      <AuthModal />
    </>
  );
}
