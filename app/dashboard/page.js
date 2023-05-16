'use client'
import { useRouter } from 'next/navigation'
// import { useState } from 'react'

export default function Dashboard() {
  const router = useRouter()
  // const [token, setToken] = useState(null)
  // setToken(sessionStorage.getItem('Access Token'))
  const isLoggedIn = true
  if (!isLoggedIn) {
    return (
      <div>
        <h1>dashboard page</h1>
      </div>
    )
  } else {
    return router.push('/signin')
  }
}