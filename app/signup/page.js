'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Context } from "@/context"
import Link from "next/link"


export default function SignUp() {
  const api = process.env.NEXT_PUBLIC_ORIGIN_API
  const router = useRouter()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const { state: { user } } = useContext(Context)

  useEffect(() => {
    if(user !== null) router.push("/")
  }, [router, user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(`${api}/register`, {
        email: values.email,
        password: values.password
      })
      Swal.fire({
        position: "top-end",
        title: "Successfull!",
        icon: "success",
        text: "Sign up Successfull",
        showConfirmButton: false,
        timer: 1500,
      })
      router.push("/signin")
    } catch (error) {
      const errMsg = error.response?.data.error.message
      console.log(errMsg)
      if(errMsg !== undefined) {
        Swal.fire('error', errMsg, 'error')
      }
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Oceanz    
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="/register" method="post" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" onChange={(e)=>setValues({...values,email:e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" onChange={(e)=>setValues({...values,password:e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link href="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}