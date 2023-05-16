'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main>
      <h1>Home Page</h1>
      <button onClick={() => router.push('/dashboard')}>dashboard</button>
    </main>
  )
}
