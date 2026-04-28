'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('xmove_cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  const removeItem = (indexToRemove: number) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove)
    setCart(updatedCart)
    localStorage.setItem('xmove_cart', JSON.stringify(updatedCart))
  }

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0)
  const deliveryFee = subtotal > 0 ? 30 : 0
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-[#faf9f6] text-black px-5 pt-8 pb-32 max-w-md mx-auto font-mono">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/store">
          <Button className="bg-white border border-gray-200 text-black rounded-xl shadow-sm" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>

        <div>
          <p className="text-sm text-black/60 font-semibold">X-Move</p>
          <h1 className="text-4xl font-black">Ton panier</h1>
        </div>
      </div>

      {cart.length === 0 ? (
        <Card className="bg-[#faf9f6] text-black border border-gray-200 rounded-[2rem] p-8 text-center shadow-[0_12px_35px_rgba(0,0,0,0.08)]">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-black/5 flex items-center justify-center mb-5">
            <ShoppingBag className="w-9 h-9 text-[#9b000b]" />
          </div>

          <h2 className="text-2xl font-black">Panier vide</h2>
          <p className="text-black/60 mt-3 mb-6">
            Ajoute des produits depuis la boutique pour commencer.
          </p>

          <Link href="/store">
            <Button className="h-12 rounded-2xl bg-[#b0000c] hover:bg-[#9b000b] text-white font-black">
              Voir la boutique
            </Button>
          </Link>
        </Card>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-6">
            {cart.map((item, index) => (
              <Card
                key={index}
                className="bg-[#faf9f6] text-black border border-gray-200 rounded-[2rem] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-black/5 rounded-3xl flex items-center justify-center text-4xl">
                    {item.emoji || '🛍️'}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-[#9b000b] font-bold">
                      Produit X-Move
                    </p>
                    <h3 className="font-black leading-tight text-black">{item.name}</h3>
                    <p className="text-[#9b000b] font-black mt-1">{item.price} DH</p>
                  </div>

                  <Button
                    size="icon"
                    className="bg-white border border-gray-200 text-[#9b000b] rounded-xl"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-[#faf9f6] border-2 border-[#c6a44c] rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] mb-6">
            <h3 className="text-2xl font-black mb-5">Résumé</h3>

            <div className="flex justify-between text-sm mb-3">
              <span className="text-black/60">Sous-total</span>
              <span className="font-semibold">{subtotal} DH</span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span className="text-black/60">Livraison</span>
              <span className="font-semibold">{deliveryFee} DH</span>
            </div>

            <div className="flex justify-between border-t border-black/10 pt-4">
              <span className="font-black">Total</span>
              <span className="text-3xl font-black text-[#9b000b]">{total} DH</span>
            </div>

            <p className="text-xs text-black/60 mt-4">
              💰 Paiement à la livraison disponible
            </p>
          </div>

          <Link href="/checkout">
            <Button className="w-full h-16 rounded-2xl bg-[#b0000c] hover:bg-[#9b000b] text-white text-lg font-black shadow-lg">
              Passer la commande
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}