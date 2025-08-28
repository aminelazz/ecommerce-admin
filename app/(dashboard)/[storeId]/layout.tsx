import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { PrismaClient } from "@/lib/generated/prisma"
import Navbar from "@/components/navbar";

// Initialize Prisma Client
const prismadb = new PrismaClient()

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = await auth();
  const { storeId } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="h-full">
        {children}
      </div>
    </>
  );
}