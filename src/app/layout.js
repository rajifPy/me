// src/app/layout.js
import { Fira_Code } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  variable: '--font-fira-code',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  title: 'Muhammad Rajif Al Farikhi - Data Enthusiast',
  description: 'Portfolio of Data Analyst and Data Science enthusiast',
  keywords: 'Data Analyst, Data Science, Portfolio, Machine Learning',
  other: {
    'google-adsense-account': 'ca-pub-2761993796654651',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-2761993796654651" />
      </head>
      <body className={firaCode.className}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
