'use client'
import Image from "next/image"
import photo from '../public/png_dc_kaze-12.png'
import Link from "next/link"
import { useEffect, useState, useContext } from "react"
import { Context } from "@/context"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Navbar() {
  const [token, setToken] = useState(null)

  const { state, dispatch } = useContext(Context)
  const { user } = state

  const router = useRouter()

  useEffect(() => {
    setToken(sessionStorage.getItem('Access Token'))
  }, [])

  const logout = async () => {
    dispatch({ type: "LOGOUT" })
    window.localStorage.removeItem("user")
    // const {data} = await axios.get('http://localhost:3001/logout')
    Router.push("/signin")
  }

  console.log('token: ', token)
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">Oceanz</Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-content">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="#">Courses</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>
        {user ? (
          <div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </label>
              <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image src={photo} height={40} width={40} alt="photo profile" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link className="justify-between" href="/profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link href="#">Settings</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Link href="/signin">Sign In</Link>
          </div>
        )}
      </div>
    </div>
  )
}