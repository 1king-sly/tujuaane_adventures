import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientProviders from './ClientProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tujuane Adventures',
  description: 'Discover the beauty of Kenya and East Africa with Tujuane Adventures',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}
