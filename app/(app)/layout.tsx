import { BottomNav } from '@/components/navigation/bottom-nav'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="min-h-screen pb-24">
        {children}
      </main>
      <BottomNav />
    </>
  )
}
