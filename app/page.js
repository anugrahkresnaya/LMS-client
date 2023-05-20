'use client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [token, setToken] = useState(null)
  const [idUser, setIdUser] = useState(null)

  useEffect(() => {
    setToken(sessionStorage.getItem('Access Token'))
    setIdUser(sessionStorage.getItem('idUser'))
    axios.get(`http://localhost:3001/user/${idUser}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err.message))
  }, [idUser, token])

  const isLoggedIn = token
  console.log(isLoggedIn)
  const router = useRouter()
  return (
    <div>
      <h1>Home Page</h1>
      {isLoggedIn && <h1>hi im logged in</h1>}
      <button onClick={() => router.push('/dashboard')}>dashboard</button>
    </div>
  )
}
