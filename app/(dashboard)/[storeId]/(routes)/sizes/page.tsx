import React from "react"
import { format } from "date-fns"

import SizeClient from "./components/size-client"
import { PrismaClient } from "@/lib/generated/prisma"
import { SizeColumn } from "./components/columns"

// Initialize Prisma Client
const prismadb = new PrismaClient()

async function SizesPage(
  { params }: { params: { storeId: string } }
) {
  const { storeId } = await params

  const sizes = await prismadb.size.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedSizes: SizeColumn[] = sizes.map(size => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  )
}

export default SizesPage