import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

import prismadb from "@/lib/prismadb";

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string, colorId: string } }
) {
  try {
    const { storeId, colorId } = await params

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 })
    }

    // Get the color from the database
    const color = await prismadb.color.findUnique({
      where: {
        id: colorId,
        storeId
      },
    })

    if (!color) {
      return new NextResponse("Color not found", { status: 404 })
    }

    return NextResponse.json(color)
  } catch (error) {
    console.log('[COLOR_GET]', error)
    return NextResponse.json({ error: "Failed to get color" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, colorId: string } }
) {
  try {
    const body = await req.json()
    const { name, value } = body
    const { userId } = await auth()
    const { storeId, colorId } = await params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
  
    if (!name) {
      return new NextResponse("Missing name", { status: 400 })
    }

    if (!value) {
      return new NextResponse("Missing value", { status: 400 })
    }

    if (!colorId) {
      return new NextResponse("Missing colorId", { status: 400 })
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

    // Update the color in the database
    const color = await prismadb.color.update({
      where: {
        id: colorId,
        storeId
      },
      data: { name, value },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log('[COLOR_PATCH]', error)
    return NextResponse.json({ error: "Failed to update color" }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string, colorId: string } }
) {
  try {
    const { userId } = await auth()
    const { storeId, colorId } = await params

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

    // Delete the color from the database
    const color = await prismadb.color.delete({
      where: {
        id: colorId,
        storeId
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log('[COLOR_DELETE]', error)
    return NextResponse.json({ error: "Failed to delete color" }, { status: 500 })
  }
}