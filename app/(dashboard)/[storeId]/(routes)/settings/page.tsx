import React from 'react'
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

import { PrismaClient } from "@/lib/generated/prisma"
import SettingsForm from './components/settings-form';

// Initialize Prisma Client
const prismadb = new PrismaClient()

interface SettingsPageProps {
  params: {
    storeId: string
  }
}

async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = await auth();
  const { storeId } = await params
  
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId
    },
  });

  if (!store) {
    redirect("/");
  }
  
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingsPage