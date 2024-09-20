'use client'

import { useState, useEffect } from 'react'

export default function Blink({ children, interval = 500 }: { children: React.ReactNode, interval?: number }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return (
    <span style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {children}
    </span>
  )
}