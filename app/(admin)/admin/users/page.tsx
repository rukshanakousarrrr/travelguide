import { prisma } from "@/lib/prisma";
import { UsersClient } from "./UsersClient";

async function getUsers() {
  try {
    return await prisma.user.findMany({
      where: { role: "ADMIN" },
      orderBy: { createdAt: "desc" },
      select: {
        id:        true,
        name:      true,
        email:     true,
        role:      true,
        createdAt: true,
        _count: { select: { bookings: true } },
      },
    });
  } catch {
    return [];
  }
}

export default async function UsersPage() {
  const users = await getUsers();
  return <UsersClient users={users} />;
}
