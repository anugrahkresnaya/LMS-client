'use client'
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import Image from "next/image"
import logo from "@/public/logo-white.png"

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
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image src={logo} width={200} height={200} alt="oceanz" className="flex items-center mb-6 " />
        <div className="w-full bg-base-300 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Forgot password?
            </h1>
            <p>No worries, we will send you reset link to you email</p>
            <form className="space-y-4 md:space-y-6 flex flex-col" method="post" onSubmit={handleSendEmail}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered input-primary"
              />
              <button type="submit" className="btn btn-primary">Reset password</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword