import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { PrismaClient } from "@/lib/generated/prisma"

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

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div>This will be a Navbar</div>
      <div className="h-full bg-[#F4F4F4]">
        {children}
      </div>
    </>
  );
}