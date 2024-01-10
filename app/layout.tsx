import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "../components/client/Providers/Providers.client"
import ProviderAuth from "../app/auth/Provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlixClone.net',
  description: "Clone d'une plateforme de streaming de séries et de films en ligne",
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
          <ProviderAuth>
            <Providers>
              {children}
            </Providers>
          </ProviderAuth>
        </div>
      </body>
    </html>
  )
}
