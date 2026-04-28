'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Target, Ruler, Weight, Flame, Droplets, RefreshCcw, LogOut } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase.auth.getUser()
      const currentUser = data.user

      if (!currentUser) {
        setLoading(false)
        return
      }

      setUser(currentUser)

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })
        .limit(1)

      const { data: resultData, error: resultError } = await supabase
        .from('results')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (profileError) console.error('Profile error:', profileError)
      if (resultError) console.error('Result error:', resultError)

      if (profileData && profileData.length > 0) {
        setProfile(profileData[0])
      } else {
        const savedProfile = localStorage.getItem('xmove_profile')
        if (savedProfile) setProfile(JSON.parse(savedProfile))
      }

      if (resultData && resultData.length > 0) {
        setResult(resultData[0])
      } else {
        const savedResult = localStorage.getItem('xmove_result')
        if (savedResult) setResult(JSON.parse(savedResult))
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const goalLabel =
    profile?.goal === 'lose'
      ? 'Perte de poids'
      : profile?.goal === 'gain'
      ? 'Prise de muscle'
      : 'Maintien'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    )
  }

  return (
    <div className="px-5 py-8 max-w-md mx-auto min-h-screen">
      <div className="rounded-[2rem] bg-black text-white p-6 shadow-xl mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
            <User className="w-8 h-8 text-red-500" />
          </div>

          <div>
            <p className="text-sm text-red-500 font-semibold">Profil X-Move</p>
            <h1 className="text-2xl font-bold">
              {user?.user_metadata?.name || profile?.name || 'Utilisateur'}
            </h1>
            <p className="text-sm text-white/60">{user?.email}</p>
          </div>
        </div>
      </div>

      {!profile || !result ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-5">
            Aucun profil trouvé. Remplis ton questionnaire.
          </p>

          <Link href="/questionnaire">
            <Button>Calculer mon plan</Button>
          </Link>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="p-4">
              <Target className="w-5 h-5 text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Objectif</p>
              <p className="font-bold">{goalLabel}</p>
            </Card>

            <Card className="p-4">
              <Flame className="w-5 h-5 text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Calories</p>
              <p className="font-bold">{result.calories} kcal</p>
            </Card>

            <Card className="p-4">
              <Ruler className="w-5 h-5 text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Taille</p>
              <p className="font-bold">{profile.height} cm</p>
            </Card>

            <Card className="p-4">
              <Weight className="w-5 h-5 text-primary mb-2" />
              <p className="text-xs text-muted-foreground">Poids</p>
              <p className="font-bold">{profile.weight} kg</p>
            </Card>
          </div>

          <Card className="p-5 mb-6">
            <h2 className="font-bold text-lg mb-4">Objectifs journaliers</h2>

            <div className="flex justify-between mb-3">
              <span className="text-muted-foreground">Protéines</span>
              <strong>{result.protein}g</strong>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-muted-foreground">Glucides</span>
              <strong>{result.carbs}g</strong>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-muted-foreground">Lipides</span>
              <strong>{result.fat}g</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Droplets className="w-4 h-4" /> Eau
              </span>
              <strong>{result.water} ml</strong>
            </div>
          </Card>

          <Link href="/questionnaire">
            <Button className="w-full h-12 mb-3">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Recalculer mon plan
            </Button>
          </Link>
        </>
      )}

      <Button
        variant="outline"
        className="w-full h-12 mt-4 text-destructive"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Se déconnecter
      </Button>
    </div>
  )
}