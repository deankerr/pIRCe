import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'choral',
  description: 'a voice for the people',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
