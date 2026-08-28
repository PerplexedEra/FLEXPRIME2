import type { Metadata } from "next"
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "PrimeFlex — Short-Term Loans, Approved in Minutes",
  description:
    "Apply online for a short-term loan from R500 to R10,000. NCR registered credit provider. Fast approval, no hidden fees. FSP 46378.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
