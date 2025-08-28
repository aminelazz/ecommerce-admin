import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

import { PrismaClient } from "@/lib/generated/prisma"

// Initialize Prisma Client
const prismadb = new PrismaClient()

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string, billboardId: string } }
) {
  try {
    const { storeId, billboardId } = await params

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 })
    }

    // Get the billboard from the database
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
        storeId
      },
    })

    if (!billboard) {
      return new NextResponse("Billboard not found", { status: 404 })
    }

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARD_GET]', error)
    return NextResponse.json({ error: "Failed to get billboard" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, billboardId: string } }
) {
  try {
    const body = await req.json()
    const { label, imageUrl } = body
    const { userId } = await auth()
    const { storeId, billboardId } = await params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
  
    if (!label) {
      return new NextResponse("Missing label", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Missing imageUrl", { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 })
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

    // Update the billboard in the database
    const billboard = await prismadb.billboard.update({
      where: {
        id: billboardId,
        storeId
      },
      data: { label, imageUrl },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error)
    return NextResponse.json({ error: "Failed to update billboard" }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string, billboardId: string } }
) {
  try {
    const { userId } = await auth()
    const { storeId, billboardId } = await params

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

    // Delete the billboard from the database
    const billboard = await prismadb.billboard.delete({
      where: {
        id: billboardId,
        storeId
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error)
    return NextResponse.json({ error: "Failed to delete billboard" }, { status: 500 })
  }
}