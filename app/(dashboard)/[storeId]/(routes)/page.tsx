import React from 'react'
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const { userId } = await auth();
  const { storeId } = await params

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId
    },
  });

  return (
    <>
      Active store: {store?.name}
    </>
  )
}

export default DashboardPage