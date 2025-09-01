import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json()
    const { storeId } = await params
    const { name, value } = body
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    if (!value) {
      return new NextResponse('Value is required', { status: 400 })
    }

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 })
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

    // Add color to the database
    const color = await prismadb.color.create({
      data: {
        name: name,
        value: value,
        storeId
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log('[COLORS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = await params

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 })
    }

    // Fetch colors from the database
    const colors = await prismadb.color.findMany({
      where: {
        storeId
      }
    })

    return NextResponse.json(colors)
  } catch (error) {
    console.log('[COLORS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}