"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import { ImagePlus, Trash } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"

import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

function ImageUpload({ disabled, onChange, onRemove, value }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const onUpload = (result: any) => {
    onChange(result?.info?.secure_url)
  }
  
  if (!isMounted) {
    return null
  }
  
  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {
          value.map((url) => (
            <div key={url} className="relative h-[200px] w-[200px] rounded-md overflow-hidden">
              <div className="absolute z-10 top-2 right-2">
                <Button type="button" variant={"destructive"} size={"icon"} onClick={() => onRemove(url)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                fill
                src={url}
                alt="Image"
                layout="fill"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          ))
        }
        </div>
        <CldUploadWidget
          onSuccess={onUpload}
          uploadPreset="ntbwfuhh"
        >
          {({ open }) => {
            const onClick = () => {
              open()
            }

            return (
              <Button disabled={disabled} variant={"secondary"} type="button" onClick={onClick}>
                <ImagePlus className="mr-2 w-4 h-4" />
                Upload Image
              </Button>
            )
          }}
        </CldUploadWidget>
    </>
  )
}

export default ImageUpload