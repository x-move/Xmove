import { AuthGuard } from '@/components/auth/auth-guard'
import { BottomNav } from '@/components/navigation/bottom-nav'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X-Move - Fitness & Nutrition',
  description: 'Move better. Eat smarter. Your personal fitness and nutrition companion.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${geist.className} ${geistMono.className} antialiased bg-background text-foreground`}>
        <AuthGuard>
          <div className="pb-24">
            {children}
          </div>

          <BottomNav />
        </AuthGuard>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}