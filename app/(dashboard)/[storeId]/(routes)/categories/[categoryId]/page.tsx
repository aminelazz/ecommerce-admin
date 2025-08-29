import React from 'react'

import { PrismaClient } from "@/lib/generated/prisma"
import CategoryForm from './components/category-form';

// Initialize Prisma Client
const prismadb = new PrismaClient()

async function CategoryPage(
  { params }: { params: { categoryId: string; storeId: string }}
) {
  const { categoryId, storeId } = await params

  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId
    }
  })

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  )
}

export default CategoryPage