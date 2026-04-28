'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart, Search, Star, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

const products = [
  {
    id: 1,
    name: 'Whey Protein X-Move',
    category: 'Compléments',
    price: 299,
    oldPrice: 349,
    rating: 4.8,
    description: 'Récupération musculaire',
    emoji: '💪',
    tag: 'Best seller',
  },
  {
    id: 2,
    name: 'Pre-Workout Energy',
    category: 'Énergie',
    price: 199,
    oldPrice: 249,
    rating: 4.7,
    description: 'Boost avant l’entraînement',
    emoji: '⚡',
    tag: 'Nouveau',
  },
  {
    id: 3,
    name: 'Shaker X-Move',
    category: 'Accessoires',
    price: 79,
    oldPrice: 99,
    rating: 4.6,
    description: 'Anti-fuite et pratique',
    emoji: '🥤',
    tag: 'Populaire',
  },
  {
    id: 4,
    name: 'Barre protéinée',
    category: 'Snacks',
    price: 25,
    oldPrice: 35,
    rating: 4.5,
    description: 'Snack riche en protéines',
    emoji: '🍫',
    tag: 'Promo',
  },
]

export default function StorePage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('xmove_cart') || '[]')
    setCartCount(cart.length)
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('xmove_cart') || '[]')
    const newCart = [...cart, product]

    localStorage.setItem('xmove_cart', JSON.stringify(newCart))
    setCartCount(newCart.length)

    alert(`${product.name} ajouté au panier`)
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-black px-5 pt-8 pb-32 max-w-md mx-auto font-mono">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-black/70 font-semibold">Boutique X-Move</p>
          <h1 className="text-4xl font-black">Produits fitness</h1>
        </div>

        <Button
          size="icon"
          onClick={() => router.push('/cart')}
          className="relative bg-white border border-gray-200 shadow-sm rounded-xl"
        >
          <ShoppingCart className="w-5 h-5 text-black" />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#c6a44c] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </div>

      {/* HERO CARD */}
      <div className="bg-[#faf9f6] border-2 border-[#c6a44c] rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <p className="text-sm text-black/70">Offre spéciale</p>

        <h2 className="text-3xl font-black mt-2">
          Construis ton pack X-Move
        </h2>

        <p className="text-lg text-black/70 mt-3">
          Compléments, snacks et accessoires livrés chez toi.
        </p>

        <Button
          onClick={() => router.push('/cart')}
          className="w-full h-14 mt-5 rounded-2xl bg-[#b0000c] hover:bg-[#9b000b] text-white font-black"
        >
          Voir mon panier
        </Button>
      </div>

      {/* SEARCH */}
      <div className="relative mt-4">
        <Search className="absolute left-4 top-4 w-4 h-4 text-black/50" />
        <Input
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-14 bg-[#faf9f6] border-2 border-[#c6a44c] rounded-2xl text-black placeholder:text-black/50"
        />
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="bg-[#faf9f6] text-black border border-gray-200 rounded-[2rem] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] relative"
          >
            {/* TAG */}
            <span className="absolute top-3 right-3 bg-[#c6a44c] text-white text-[10px] px-2 py-1 rounded-full">
              {product.tag}
            </span>

            {/* IMAGE */}
            <div className="h-28 rounded-3xl bg-black/5 flex items-center justify-center text-5xl">
              {product.emoji}
            </div>

            {/* INFO */}
            <div>
              <p className="text-xs text-[#9b000b] font-semibold mt-2">
                {product.category}
              </p>

              <h3 className="font-black leading-tight mt-1">
                {product.name}
              </h3>

              <p className="text-xs text-black/60 mt-1">
                {product.description}
              </p>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-1 text-xs text-black/60">
              <Star className="w-3 h-3 fill-current text-[#c6a44c]" />
              {product.rating}
            </div>

            {/* PRICE */}
            <div className="flex items-end justify-between mt-auto">
              <div>
                <p className="font-black text-lg">{product.price} DH</p>
                <p className="text-xs text-black/40 line-through">
                  {product.oldPrice} DH
                </p>
              </div>

              <Button
                size="icon"
                onClick={() => addToCart(product)}
                className="bg-[#b0000c] hover:bg-[#9b000b] text-white rounded-xl"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  )
}