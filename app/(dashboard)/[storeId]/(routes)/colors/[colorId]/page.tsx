import React from 'react'

import { PrismaClient } from "@/lib/generated/prisma"
import ColorForm from './components/color-form';

// Initialize Prisma Client
const prismadb = new PrismaClient()

async function ColorPage(
  { params }: { params: { colorId: string; storeId: string }}
) {
  const { colorId, storeId } = await params
  const color = await prismadb.color.findUnique({
    where: {
      id: colorId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default ColorPage