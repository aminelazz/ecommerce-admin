import React from "react"
import { format } from "date-fns"

import OrderClient from "./components/order-client"
import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/columns"
import { totalmem } from "os"
import { formatter } from "@/lib/utils"

async function OrdersPage(
  { params }: { params: { storeId: string } }
) {
  const { storeId } = await params

  const orders = await prismadb.order.findMany({
    where: {
      storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedOrders: OrderColumn[] = orders.map(order => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems.map(item => item.product.name).join(", "),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price)
      }, 0)
    ),
    createdAt: format(order.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}

export default OrdersPage