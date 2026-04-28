'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const cities = ['Casablanca', 'Rabat', 'Fès', 'Tanger', 'Marrakech', 'Agadir', 'Meknès']

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState<any[]>([])

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const savedCart = localStorage.getItem('xmove_cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  const subtotal = cart.reduce((total, item) => total + Number(item.price), 0)
  const deliveryFee = 0
  const orderTotal = subtotal

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Nom requis'
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis'
    if (!formData.city) newErrors.city = 'Ville requise'
    if (!formData.address.trim()) newErrors.address = 'Adresse requise'
    if (cart.length === 0) newErrors.cart = 'Votre panier est vide'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)

    const { data } = await supabase.auth.getUser()
    const user = data.user

    if (!user) {
      alert('Utilisateur non connecté')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('orders').insert({
      user_id: user.id,
      full_name: formData.fullName,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      notes: formData.notes,
      products: cart,
      subtotal,
      delivery_fee: deliveryFee,
      total: orderTotal,
      status: 'pending',
    })

    if (error) {
      alert('Erreur commande : ' + error.message)
      setLoading(false)
      return
    }

    const phoneNumber = '212717973700'
    const productsList = cart.map((p) => `- ${p.name} : ${p.price} DH`).join('%0A')

    const message = `🔥 Nouvelle commande X-Move%0A%0A👤 Nom : ${formData.fullName}%0A📞 Téléphone : ${formData.phone}%0A📍 Ville : ${formData.city}%0A🏠 Adresse : ${formData.address}%0A%0A🛒 Produits :%0A${productsList}%0A%0A🚚 Livraison : Gratuite%0A💰 Total : ${orderTotal} DH`

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')

    localStorage.removeItem('xmove_cart')
    setLoading(false)
    router.push('/order-success')
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-black px-5 pt-8 pb-32 max-w-md mx-auto font-mono">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/cart">
          <Button className="bg-white border border-gray-200 text-black rounded-xl shadow-sm" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>

        <div>
          <p className="text-sm text-black/60 font-semibold">X-Move Checkout</p>
          <h1 className="text-4xl font-black">Finaliser</h1>
        </div>
      </div>

      <div className="bg-[#faf9f6] border-2 border-[#c6a44c] rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] mb-6">
        <h2 className="text-2xl font-black mb-5">Résumé de commande</h2>

        <div className="flex justify-between text-sm mb-3">
          <span className="text-black/60">Sous-total</span>
          <span className="font-semibold">{subtotal} DH</span>
        </div>

        <div className="flex justify-between text-sm mb-4">
          <span className="text-black/60">Livraison</span>
          <span className="font-black text-[#9b000b]">Gratuite</span>
        </div>

        <div className="flex justify-between border-t border-black/10 pt-4">
          <span className="font-black">Total</span>
          <span className="text-3xl font-black text-[#9b000b]">{orderTotal} DH</span>
        </div>
      </div>

      {errors.cart && (
        <Card className="bg-[#faf9f6] text-[#9b000b] border border-[#9b000b] rounded-2xl p-4 mb-4">
          {errors.cart}
        </Card>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Card className="bg-[#faf9f6] text-black border border-gray-200 rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <h2 className="text-2xl font-black mb-5">Informations client</h2>

          <div className="flex flex-col gap-4">
            <div>
              <Label className="text-black">Nom complet</Label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-[#faf9f6] text-black border-gray-300 rounded-2xl"
              />
              {errors.fullName && <p className="text-xs text-[#9b000b] mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <Label className="text-black">Téléphone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-[#faf9f6] text-black border-gray-300 rounded-2xl"
              />
              {errors.phone && <p className="text-xs text-[#9b000b] mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label className="text-black">Ville</Label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="bg-[#faf9f6] text-black border border-gray-300 rounded-2xl px-3 py-3 w-full"
              >
                <option value="">Choisir</option>
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {errors.city && <p className="text-xs text-[#9b000b] mt-1">{errors.city}</p>}
            </div>

            <div>
              <Label className="text-black">Adresse</Label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-[#faf9f6] text-black border border-gray-300 rounded-2xl px-3 py-3 w-full"
              />
              {errors.address && <p className="text-xs text-[#9b000b] mt-1">{errors.address}</p>}
            </div>
          </div>
        </Card>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-16 rounded-2xl bg-[#b0000c] hover:bg-[#9b000b] text-white text-lg font-black shadow-lg"
        >
          {loading ? 'Traitement...' : 'Confirmer la commande'}
        </Button>
      </form>
    </div>
  )
}