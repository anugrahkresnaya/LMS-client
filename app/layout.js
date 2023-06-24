import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar'
import { Provider } from '@/context'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Oceanz',
  description: 'Oceanz Learning Management System Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
