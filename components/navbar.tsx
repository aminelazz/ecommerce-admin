import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import MainNav from '@/components/main-nav'
import StoreSwitcher from '@/components/store-switcher'
import { PrismaClient } from '@/lib/generated/prisma'

// Initialize Prisma Client
const prismadb = new PrismaClient()

async function Navbar() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  });

  return (
    <div className='border-b'>
      <div className='flex items-center h-16 px-4'>
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton />
        </div>
      </div>
    </div>
  )
}

export default Navbar