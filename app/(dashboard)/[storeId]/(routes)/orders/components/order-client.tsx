"use client"

import React from "react"

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface OrderClientProps {
  data: OrderColumn[]
}

function OrderClient({ data }: OrderClientProps) {
  return (
    <>
      <Heading title={`Orders (${data.length})`} description="Manage orders of your store" />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  )
}

export default OrderClient