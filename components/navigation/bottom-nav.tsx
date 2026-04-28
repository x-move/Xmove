'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Apple, Dumbbell, ShoppingBag, User } from 'lucide-react'

const navItems = [
  { href: '/', icon: Home, label: 'Accueil' },
  { href: '/food', icon: Apple, label: 'Nutrition' },
  { href: '/sport', icon: Dumbbell, label: 'Sport' },
  { href: '/store', icon: ShoppingBag, label: 'Boutique' },
  { href: '/profile', icon: User, label: 'Profil' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-5 left-0 right-0 z-50 flex justify-center">
      <div className="flex w-[95%] max-w-md items-center justify-between rounded-3xl bg-white px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-200">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')

          return (
            <Link key={href} href={href} className="flex flex-1 justify-center">
              <div
                className={`relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ease-out active:scale-90 ${
                  isActive
                    ? 'bg-[#b0000c] text-white scale-105 shadow-lg'
                    : 'text-gray-500 hover:text-[#b0000c] hover:bg-gray-100'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? 'scale-110' : ''
                  }`}
                />

                <span className="text-[11px] font-medium">
                  {label}
                </span>

                {isActive && (
                  <span className="absolute -bottom-1 h-1 w-8 rounded-full bg-[#b0000c]" />
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}