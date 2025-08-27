"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { useEffect } from "react"

export default function SetupPage() {
  const { isOpen, onOpen, onClose } = useStoreModal()

  useEffect(() => {
    if (!isOpen) {
      // Perform any actions when the modal is closed
      onOpen()
    }
  }, [isOpen, onOpen])

  return null
}
