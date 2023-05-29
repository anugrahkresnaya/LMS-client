'use client'
// import Image from "next/image"
import axios from "axios"
import { useState, useContext, useEffect } from "react"
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation"
import { Context } from "@/context"

export default function Login() {
  const router = useRouter()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  // state
  const {state: { user }, dispatch} = useContext(Context)
  // const { user } = state

  useEffect(() => {
    if(user !== null) router.push("/")
  }, [router, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const form = e.currentTarget;
    try {
      const { data } = await axios.post('http://localhost:3001/login', {
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
        position: "top-end",
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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
          Oceanz 
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="/signin" method="post" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" onChange={(e)=>setValues({...values,email:e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••" onChange={(e)=>setValues({...values,password:e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="flex items-center justify-between">
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div> */}
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}