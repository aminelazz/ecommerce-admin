import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json()
    const { name } = body
    const { userId } = await auth()
    const { storeId } = await params

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
  
    if (!name) {
      return new NextResponse("Missing name", { status: 400 })
    }

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 })
    }
  
    // Update the store in the database
    const store = await prismadb.store.update({
      where: {
        id: storeId,
        userId,
      },
      data: { name },
    })
  
    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_PATCH]', error)
    return NextResponse.json({ error: "Failed to update store" }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = await auth()
    const { storeId } = await params

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 })
    }

    // Delete the store from the database
    const store = await prismadb.store.delete({
      where: {
        id: storeId,
        userId,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_DELETE]', error)
    return NextResponse.json({ error: "Failed to delete store" }, { status: 500 })
  }
}