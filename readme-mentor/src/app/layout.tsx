import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Navbar } from "@/components/layout/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Readme Mentor - AI-Powered README Generator",
  description: "Auto-generate professional, personalized README.md files for your GitHub repositories using AI. Perfect for students, developers, and open-source contributors.",
  keywords: ["README", "generator", "AI", "GitHub", "documentation", "markdown", "developer tools"],
  authors: [{ name: "Readme Mentor Team" }],
  openGraph: {
    title: "Readme Mentor - AI-Powered README Generator",
    description: "Auto-generate professional README.md files for your GitHub repositories using AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Readme Mentor - AI-Powered README Generator",
    description: "Auto-generate professional README.md files for your GitHub repositories using AI",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
