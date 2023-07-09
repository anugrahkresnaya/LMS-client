'use client'
import Image from "next/image"
import photo from '../public/default.jpg'
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { Context } from "@/context"
import { useRouter } from "next/navigation"
import axios from "axios"
import Swal from "sweetalert2"
import { themeChange } from 'theme-change'

export default function Navbar() {
  const api = process.env.NEXT_PUBLIC_ORIGIN_API
  const { state: { user }, dispatch } = useContext(Context)
  const [userRole, setUserRole] = useState([])

  useEffect(() => {
    themeChange(false)
    getUser()
  }, [])

  const getUser = () => {
    if (user) {
      axios.get(`${api}/user/${user.id}`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`
        }
      })
      .then(res => {
        console.log('ini role', res.data.data[0].roleId)
        setUserRole(res.data.data[0].roleId)
      })
      .catch(err => console.log(err.message))
    }
  }

  console.log('user role', userRole)

  const router = useRouter()

  const logout = async () => {
    dispatch({ type: "LOGOUT" })
    window.localStorage.removeItem("user")
    await axios.get(`${api}/logout`, {
      withCredentials: true,
      credentials: 'same-origin'
    })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Sign Out success',
      showConfirmButton: false,
      timer: 1500
    })
    router.push("/signin")
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">Oceanz</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-center align-middle">
          <li><Link href="/course">Courses</Link></li>
          {user === null && <li><Link href="/signin">Sign In</Link></li>}
          {user !== null && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <Image src={user?.photoProfile || photo} height={40} width={40} alt="photo profile" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <Link href="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                {user.role === 2 && (<li><Link href='/dashboard'>Dashboard</Link></li>)}
                <li><button onClick={logout}>Sign Out</button></li>
              </ul>
            </div>      
          )}
        </ul>
      </div>
      <select data-choose-theme className="select select-bordered select-xs max-w-xs">
        <option value="dark">Default</option>
        <option value="light">Light</option>
        <option value="black">Black</option>
        <option value="cupcake">Cupcake</option>
        <option value="forest">Forest</option>
        <option value="night">Night</option>
        <option value="valentine">Valentine</option>
        <option value="dracula">Dracula</option>
        <option value="lofi">Lofi</option>
        <option value="synthwave">Synthwave</option>
      </select>
    </div>
  )
}