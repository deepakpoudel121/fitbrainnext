import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  variable: '--font-inter',
  subsets: ['latin'],
})

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'FitBrain - AI Workout Tracking',
  description: 'AI-Powered Workout & Fitness Tracking Platform with advanced analytics and personalized insights',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'FitBrain',
    description: 'AI-Powered Fitness Tracking Platform',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0a141e' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background dark" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            color-scheme: dark;
          }
        `}</style>
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
