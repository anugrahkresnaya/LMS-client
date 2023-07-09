'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"

const ResetPassword = ({params}) => {
  const api = process.env.NEXT_PUBLIC_ORIGIN_API

  const router = useRouter()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleReset = async (e) => {
    e.preventDefault()
    axios.post(`${api}/reset-password/${params.token}`, {
      password
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Reset Password success',
        showConfirmButton: false,
        timer: 1000
      })
      router.push('/signin')
    })
  }

  return (
    <div className="min-h-screen">
      <h1>Reset Password</h1>
      <form method="post" onSubmit={handleReset}>
        <div className="flex flex-row">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit">Reset</button>
        </div>
        <input type="checkbox" onClick={toggleShowPassword} />show password
      </form>
    </div>
  )
}

export default ResetPassword