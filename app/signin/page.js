'use client'
import Image from "next/image"
import axios from "axios"
import { useState, useContext, useEffect } from "react"
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation"
import { Context } from "@/context"
import Link from "next/link"
import logo from '@/public/logo-white.png'

export default function Login() {
  const api = process.env.NEXT_PUBLIC_ORIGIN_API
  const router = useRouter()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // state
  const {state: { user }, dispatch} = useContext(Context)

  useEffect(() => {
    if(user !== null) router.push("/")
  }, [router, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${api}/login`, {
        email: values.email,
        password: values.password
      }, {
        withCredentials: true,
        credentials: 'include'
      })

      dispatch({
        type: "LOGIN",
        payload: data,
      })

      // save in local storage
      window.localStorage.setItem('user', JSON.stringify(data))

      Swal.fire({
        position: "center",
        title: "Successfull!",
        icon: "success",
        text: "Sign in Successfull",
        showConfirmButton: false,
        timer: 2000,
      })
      router.push("/")
    } catch (error) {
      const errMsg = error.response?.data.error?.message
      if(errMsg !== undefined) {
        Swal.fire('error', errMsg, 'error')
      }
    }
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image src={logo} width={200} height={200} alt="oceanz" className="flex items-center mb-6 " />
        <div className="w-full bg-base-300 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="/signin" method="post" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                <input 
                  type="email"
                  name="email"
                  id="email" 
                  onChange={(e)=>setValues({...values,email:e.target.value})}
                  className="bg-gray-50 input input-bordered input-primary sm:text-sm rounded-lg block w-full p-2.5" 
                  placeholder="name@email.com" 
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password" 
                  placeholder="••••••"
                  onChange={(e)=>setValues({...values,password:e.target.value})}
                  className="bg-gray-50 input input-bordered input-primary sm:text-sm rounded-lg block w-full p-2.5" 
                  required 
                />
                <label className="label">
                  <span className="label-text">Show password</span> 
                  <input type="checkbox" onClick={toggleShowPassword} className="checkbox checkbox-primary" />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
              </div>
              <button type="submit" className="btn btn-primary w-full">Sign in</button>
              <p className="text-sm font-light">
                Don’t have an account yet? <a href="/signup" className="font-medium text-primary">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}