import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

import prismadb from "@/lib/prismadb";

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const { storeId, categoryId } = await params

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 })
    }

    // Get the category from the database
    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
        storeId
      },
      include: {
        billboard: true
      }
    })

    if (!category) {
      return new NextResponse("Category not found", { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_GET]', error)
    return NextResponse.json({ error: "Failed to get category" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const body = await req.json()
    const { name, billboardId } = body
    const { userId } = await auth()
    const { storeId, categoryId } = await params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
  
    if (!name) {
      return new NextResponse("Missing name", { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse("Missing categoryId", { status: 400 })
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

    // Update the category in the database
    const category = await prismadb.category.update({
      where: {
        id: categoryId,
        storeId
      },
      data: { name, billboardId },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const { userId } = await auth()
    const { storeId, categoryId } = await params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!categoryId) {
      return new NextResponse("Missing categoryId", { status: 400 })
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

    // Delete the category from the database
    const category = await prismadb.category.delete({
      where: {
        id: categoryId,
        storeId
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}