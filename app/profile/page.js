'use client'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import profileCover from "../../public/profile-cover.jpg"
import photo from '../../public/png_dc_kaze-12.png'

export default function Profile() {
  const [token, setToken] = useState(null)
  const [idUser, setIdUser] = useState(null)

  useEffect(() => {
    setToken(sessionStorage.getItem('Access Token'))
    setIdUser(sessionStorage.getItem('idUser'))
  }, [])

  const getUser = async () => {
    try {
      await axios.get(`http://localhost:3001/user/${idUser}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => console.log(res))
    } catch (error) {
      console.log(error)
    }
  }

  console.log(getUser())

  const isLoggedIn = token
  console.log(isLoggedIn)
  return(
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        <div className='flex flex-row'>
          <div className='pl-5 mr-5 bg-base-300 rounded-md mockup-window'>
            <h1 className="my-5">General Information</h1>
            <form action="" className='flex-col'>
              <div className='flex flex-row mb-5'>
                <div className='flex flex-col mr-5'>
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" name="firstName" id="" className='input input-bordered input-primary w-96' />
                </div>
                <div className='flex flex-col mr-5'>
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" name="lastName" id="" className='input input-bordered input-primary w-96' />
                </div>
              </div>
              <div className='flex flex-row mb-5'>
                <div className='flex flex-col  mr-5'>
                  <label htmlFor="birthday">Birthday</label>
                  <input type="date" name="birthday" id="" className='input input-bordered input-primary w-96' />
                </div>
                <div className='flex flex-col mr-5'>
                  <label htmlFor="gender">Gender</label>
                  <select className="select select-primary w-96">
                    <option disabled selected>Select your gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div className='flex flex-row mb-5'>
                <div className='flex flex-col  mr-5'>
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="" className='input input-bordered input-primary w-96' />
                </div>
                <div className='flex flex-col  mr-5'>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" name="phone" id="" className='input input-bordered input-primary w-96' />
                </div>
              </div>
              <button className="btn btn-primary mb-5">Save All</button>
            </form>
          </div>
          <div className="card ml-20 w-96 bg-base-300">
            <figure><Image width={600} height={200} src={profileCover} className='object-cover' alt="car!"/></figure>
            <div className="card-body pt-0">
              <div className="avatar justify-center -mt-[50px]">
                <div className="w-24 rounded-full ring ring-primary-focus ring-offset-base-100 ring-offset-2">
                  <Image src={photo} width={96} height={96} alt="profile" />
                </div>
              </div>
              <h2 className="card-title justify-center mt-5">Anugrah Kresnaya</h2>
            </div>
          </div>
        </div>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </div>
    </div>
  )
}