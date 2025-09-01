"use client"

import * as z from "zod"
import toast from "react-hot-toast"
import axios from "axios"
import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Heading from "@/components/ui/heading"
import AlertModal from "@/components/modals/alert-modal"
import { Size } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface SizeFormProps {
  initialData: Size | null
}

const formSchemas = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

type SizeFormValues = z.infer<typeof formSchemas>

function SizeForm({ initialData }: SizeFormProps) {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit Size" : "Create Size"
  const description = initialData ? "Edit a Size" : "Add a new Size"
  const toastMessage = initialData ? "Size updated." : "Size created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchemas),
    defaultValues: initialData || {
      name: "",
      value: ""
    },
  })

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true)

      if (initialData) {
        const response =  await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
      } else {
        const response =  await axios.post(`/api/${params.storeId}/sizes`, data)
      }
      router.refresh()
      toast.success(toastMessage)
      router.push(`/${params.storeId}/sizes`)
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)

      const response =  await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
      toast.success("Size deleted.")
      router.refresh()
      router.push(`/${params.storeId}/sizes`)
    } catch (error) {
      toast.error("Make sure you removed all products using this size first.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        { initialData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"sm"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SizeForm