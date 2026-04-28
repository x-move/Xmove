'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'

interface AuthFormProps {
  type: 'login' | 'signup'
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const isSignup = type === 'signup'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (isSignup && !formData.name.trim()) {
      newErrors.name = 'Le nom est obligatoire'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email obligatoire'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    if (!formData.password) {
      newErrors.password = 'Mot de passe obligatoire'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères'
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    if (isSignup) {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
          },
        },
      })

      setLoading(false)

      if (error) {
        alert(error.message)
        return
      }

      alert('Compte créé avec succès. Vérifie ton email si Supabase demande une confirmation.')
      router.push('/questionnaire')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    router.push('/')
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-[2rem] bg-black text-white p-6 mb-6 shadow-xl text-center">
        <p className="text-sm text-red-500 font-semibold">X-Move</p>
        <h1 className="text-3xl font-bold mt-1">
          {isSignup ? 'Créer un compte' : 'Connexion'}
        </h1>
        <p className="text-white/60 text-sm mt-2">
          {isSignup
            ? 'Commence ton parcours fitness avec X-Move'
            : 'Connecte-toi à ton compte X-Move'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignup && (
          <div>
            <Label>Nom complet</Label>
            <Input
              name="name"
              placeholder="Ex : Mohamed Benziane"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>
        )}

        <div>
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>

        {isSignup && (
          <div>
            <Label>Téléphone</Label>
            <Input
              name="phone"
              placeholder="06XXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <Label>Mot de passe</Label>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
        </div>

        {isSignup && (
          <div>
            <Label>Confirmer le mot de passe</Label>
            <Input
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full h-12 mt-4">
          {loading
            ? isSignup
              ? 'Création...'
              : 'Connexion...'
            : isSignup
            ? 'Créer mon compte'
            : 'Se connecter'}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          {isSignup ? 'Tu as déjà un compte ?' : "Tu n'as pas encore de compte ?"}{' '}
          <Link
            href={isSignup ? '/login' : '/signup'}
            className="text-primary font-semibold"
          >
            {isSignup ? 'Se connecter' : 'Créer un compte'}
          </Link>
        </p>
      </div>
    </div>
  )
}