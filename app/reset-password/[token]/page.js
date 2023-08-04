'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"
import Image from "next/image"
import logo from "@/public/logo-white.png"

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
    .catch(error => {
      const errMsg = error.response?.data.errors[0].msg
      Swal.fire('error', errMsg, 'error')
      console.log('reset', error)
    })
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image src={logo} width={200} height={200} alt="oceanz" className="flex items-center mb-6 " />
        <div className="w-full bg-base-300 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Reset Password
            </h1>
            <p>Enter your new password</p>
            <form className="space-y-4 md:space-y-6 flex flex-col" method="post" onSubmit={handleReset}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={password}
                placeholder="••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered input-primary"
              />
              <div className="flex flex-row">
                <input type="checkbox" onClick={toggleShowPassword} className="mr-2" />show password
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword