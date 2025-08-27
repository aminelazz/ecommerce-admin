import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

import { PrismaClient } from '@/lib/generated/prisma'

// Initialize Prisma Client
const prismadb = new PrismaClient()

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  })

  if (store) {
    redirect(`/${store.id}`)
  }
  return (
    <>
      {children}
    </>
  )
}