import React from 'react'

import { PrismaClient } from "@/lib/generated/prisma"

// Initialize Prisma Client
const prismadb = new PrismaClient()

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage = async (props: Promise<DashboardPageProps>) => {
  const { params } = await props;
  
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <>
      Active store: {store?.name}
    </>
  )
}

export default DashboardPage