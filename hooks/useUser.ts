import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useUser() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()

        if (!mounted) return

        setUser(data.session?.user || null)
      } catch (error) {
        console.error('Session error:', error)

        if (!mounted) return

        setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}