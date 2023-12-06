import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "../components/client/Providers/Providers.client"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlixClone.net',
  description: 'Clone d&rsquo;une plateforme de streaming de séries et de films en ligne',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div>
          <Providers>
          {children}
          </Providers>
          </div>
        </body>
    </html>
  )
}
