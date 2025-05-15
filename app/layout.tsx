import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Application of Mars',
  description: 'Form to Mars',
  icons: {
    icon: "/mars.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
