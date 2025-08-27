import React from 'react'

import { PrismaClient } from "@/lib/generated/prisma"

// Initialize Prisma Client
const prismadb = new PrismaClient()

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const { storeId } = await params
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return (
    <>
      Active store: {store?.name}
    </>
  )
}

export default DashboardPage