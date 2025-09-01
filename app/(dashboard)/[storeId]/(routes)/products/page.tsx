import React from "react"
import { format } from "date-fns"

import ProductClient from "./components/product-client"
import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns"
import { formatter } from "@/lib/utils"

async function ProductsPage(
  { params }: { params: { storeId: string } }
) {
  const { storeId } = await params

  const products = await prismadb.product.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      category: true,
      size: true,
      color: true
    }
  })

  const formattedProducts: ProductColumn[] = products.map(product => ({
    id: product.id,
    name: product.name,
    price: formatter.format(product.price.toNumber()),
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}

export default ProductsPage