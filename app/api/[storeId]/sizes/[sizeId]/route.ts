import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

import { PrismaClient } from "@/lib/generated/prisma"

// Initialize Prisma Client
const prismadb = new PrismaClient()

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string, sizeId: string } }
) {
  try {
    const { storeId, sizeId } = await params

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 })
    }

    // Get the size from the database
    const size = await prismadb.size.findUnique({
      where: {
        id: sizeId,
        storeId
      },
    })

    if (!size) {
      return new NextResponse("Size not found", { status: 404 })
    }

    return NextResponse.json(size)
  } catch (error) {
    console.log('[SIZE_GET]', error)
    return NextResponse.json({ error: "Failed to get size" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, sizeId: string } }
) {
  try {
    const body = await req.json()
    const { name, value } = body
    const { userId } = await auth()
    const { storeId, sizeId } = await params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
  
    if (!name) {
      return new NextResponse("Missing name", { status: 400 })
    }

    if (!value) {
      return new NextResponse("Missing value", { status: 400 })
    }

    if (!sizeId) {
      return new NextResponse("Missing sizeId", { status: 400 })
    }

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    // Update the size in the database
    const size = await prismadb.size.update({
      where: {
        id: sizeId,
        storeId
      },
      data: { name, value },
    })

    return NextResponse.json(size)
  } catch (error) {
    console.log('[SIZE_PATCH]', error)
    return NextResponse.json({ error: "Failed to update size" }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string, sizeId: string } }
) {
  try {
    const { userId } = await auth()
    const { storeId, sizeId } = await params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    // Delete the size from the database
    const size = await prismadb.size.delete({
      where: {
        id: sizeId,
        storeId
      },
    })

    return NextResponse.json(size)
  } catch (error) {
    console.log('[SIZE_DELETE]', error)
    return NextResponse.json({ error: "Failed to delete size" }, { status: 500 })
  }
}