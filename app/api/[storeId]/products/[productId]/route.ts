import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

import prismadb from "@/lib/prismadb";

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string, productId: string } }
) {
  try {
    const { storeId, productId } = await params

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 })
    }

    // Get the product from the database
    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
        storeId
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true
      },
    })

    if (!product) {
      return new NextResponse("Product not found", { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_GET]', error)
    return NextResponse.json({ error: "Failed to get product" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, productId: string } }
) {
  try {
    const { userId } = await auth()
    const { storeId, productId } = await params
    const body = await req.json()
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived
    } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 })
    }

    if (!colorId) {
      return new NextResponse("Color ID is required", { status: 400 })
    }

    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 400 })
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 })
    }

    if (!productId) {
      return new NextResponse("Missing productId", { status: 400 })
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

    // Update the product in the database
    // and delete existing images and add new ones
    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: { productId },
          createMany: {
            data: images.map((image: { url: string }) => ({
              url: image.url
            }))
          }
        }
       },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string, productId: string } }
) {
  try {
    const { userId } = await auth()
    const { storeId, productId } = await params

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

    // Delete the product from the database
    const product = await prismadb.product.delete({
      where: {
        id: productId,
        storeId,
        images: {
          every: {
            productId
          }
        }
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}