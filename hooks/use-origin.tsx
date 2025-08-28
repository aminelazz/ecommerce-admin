import React, { useState, useEffect } from 'react'

export default function useOrigin() {
  const [mounted, isMounted] = useState(false)
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

  useEffect(() => {
    isMounted(true)
  }, [])

  if (!mounted) {
    return ""
  }

  return origin
}
