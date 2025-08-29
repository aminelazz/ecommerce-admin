import React from "react"
import { format } from "date-fns"

import BillboardClient from "./components/billboard-client"
import { PrismaClient } from "@/lib/generated/prisma"
import { BillboardColumn } from "./components/columns"

// Initialize Prisma Client
const prismadb = new PrismaClient()

async function BillboardsPage(
  { params }: { params: { storeId: string } }
) {
  const { storeId } = await params

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedBillboards: BillboardColumn[] = billboards.map(billboard => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}

export default BillboardsPage