'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Users, TrendingUp, ShoppingCart } from 'lucide-react'

const ADMIN_EMAIL = 'benzianemed2005@gmail' // ⚠️ remplace par ton email

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'
    case 'confirmed':
      return 'bg-blue-500/20 text-blue-700 border-blue-500/30'
    case 'delivered':
      return 'bg-green-500/20 text-green-700 border-green-500/30'
    case 'cancelled':
      return 'bg-red-500/20 text-red-700 border-red-500/30'
    default:
      return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
  }
}

export default function AdminPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser()
      const user = data.user

      if (!user || user.email !== ADMIN_EMAIL) {
        router.push('/') // ❌ pas admin → redirect
        return
      }

      setAuthorized(true)

      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) {
        setOrders(ordersData || [])
      }

      setLoading(false)
    }

    checkAdmin()
  }, [])

  if (!authorized) return null

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0)
  const pendingOrders = orders.filter((order) => order.status === 'pending').length
  const totalClients = new Set(orders.map((order) => order.user_id)).size

  const stats = [
    { label: 'Commandes', value: orders.length, icon: ShoppingCart },
    { label: 'Nouvelles', value: pendingOrders, icon: TrendingUp },
    { label: 'Revenus', value: `${totalRevenue} DH`, icon: Package },
    { label: 'Clients', value: totalClients, icon: Users },
  ]

  return (
    <div className="px-5 py-8 max-w-4xl mx-auto min-h-screen">
      <div className="rounded-[2rem] bg-black text-white p-6 mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon className="w-6 h-6" />
              </div>
            </Card>
          )
        })}
      </div>

      {loading ? (
        <Card className="p-6 text-center">Chargement...</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between mb-2">
                <span>{order.full_name}</span>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>

              <p className="text-sm">{order.phone}</p>
              <p className="text-sm">{order.city}</p>

              <div className="mt-2">
                {(order.products || []).map((p: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{p.name}</span>
                    <span>{p.price} DH</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 font-bold text-primary">
                {order.total} DH
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}