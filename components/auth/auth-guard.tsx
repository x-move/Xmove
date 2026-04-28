'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUser } from '@/hooks/useUser'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const publicPages = ['/login', '/signup']

  useEffect(() => {
    if (!loading) {
      if (!user && !publicPages.includes(pathname)) {
        router.replace('/login')
      }
    }
  }, [user, loading, pathname, router])

  // 🔥 IMPORTANT → ne bloque jamais le render
  return <>{children}</>
}