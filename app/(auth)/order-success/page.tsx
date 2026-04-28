'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Truck, ShoppingBag } from 'lucide-react'

export default function OrderSuccessPage() {
  const orderNumber = `XM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

  const orderDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen px-5 py-8 max-w-md mx-auto flex flex-col justify-center">
      <div className="rounded-[2rem] bg-black text-white p-8 shadow-xl text-center mb-6">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-12 h-12 text-red-500" />
        </div>

        <p className="text-sm text-red-500 font-semibold">Commande confirmée</p>
        <h1 className="text-3xl font-bold mt-2">
          Merci pour ta commande !
        </h1>
        <p className="text-white/70 text-sm mt-3">
          Ta commande a bien été enregistrée. Notre équipe va la préparer.
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm text-muted-foreground">Numéro de commande</p>
            <p className="text-2xl font-bold text-primary font-mono">
              {orderNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Date</p>
            <p className="font-medium">{orderDate}</p>
          </div>

          <div className="border-t pt-4 flex items-start gap-3">
            <Truck className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-semibold">Livraison à domicile</p>
              <p className="text-sm text-muted-foreground">
                Paiement en cash à la livraison.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-primary/10 border-primary/30 mb-6">
        <p className="font-semibold">Prochaine étape</p>
        <p className="text-sm text-muted-foreground mt-2">
          Nous te contacterons pour confirmer les détails de livraison.
        </p>
      </Card>

      <div className="flex flex-col gap-3">
        <Link href="/">
          <Button className="w-full h-12">
            Retour à l’accueil
          </Button>
        </Link>

        <Link href="/store">
          <Button variant="outline" className="w-full h-12">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continuer mes achats
          </Button>
        </Link>
      </div>
    </div>
  )
}