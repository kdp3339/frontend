import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Rocket } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1C1C1C] text-white min-h-screen`}>
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <header className="mb-8 flex justify-center">
            <div className="flex items-center gap-2">
              <Rocket className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Todo App
              </h1>
            </div>
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}

