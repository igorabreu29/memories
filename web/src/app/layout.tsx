import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as Jamjureee } from 'next/font/google'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const jamjuree = Jamjureee({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree'
 })

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = cookies().has('token')
  
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} ${jamjuree.variable} font-sans bg-gray-900 text-gray-100`}>
        <main className="grid min-h-screen grid-cols-2">
          {/*Left*/}
          <div className="relative flex flex-col item-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
            {/*blur*/}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            {/*Stripes*/}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>

            {/*Sign in*/}
            {isAuthenticated ? <Profile /> : <SignIn />}

            {/* Hero */}
            <Hero />
            
            {/* Footer */}
            <Footer />
          </div>

          {/* Right */}
          <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
