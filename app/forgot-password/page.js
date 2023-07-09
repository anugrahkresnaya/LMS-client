'use client'
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

const ForgotPassword = () => {
  const api = process.env.NEXT_PUBLIC_ORIGIN_API

  const router = useRouter()

  const [email, setEmail] = useState('')

  const handleSendEmail = async (e) => {
    e.preventDefault()
    axios.post(`${api}/forgot-password`, {
      email
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Email has been sent',
        showConfirmButton: false,
        timer: 1000
      })
      router.push('/signin')
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <div className="min-h-screen">
      <h1>Forgot your password?</h1>
      <p>input your email address, so we can send the link to your email for reset password</p>
      <form method="post" onSubmit={handleSendEmail}>
        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword