import React from "react"
import { format } from "date-fns"

import ColorClient from "./components/color-client"
import { PrismaClient } from "@/lib/generated/prisma"
import { ColorColumn } from "./components/columns"

// Initialize Prisma Client
const prismadb = new PrismaClient()

async function ColorsPage(
  { params }: { params: { storeId: string } }
) {
  const { storeId } = await params

  const colors = await prismadb.color.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedColors: ColorColumn[] = colors.map(color => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  )
}

export default ColorsPage