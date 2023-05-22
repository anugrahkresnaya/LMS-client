'use client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import courseImage from '../public/course.jpg'

export default function Home() {
  const [token, setToken] = useState(null)
  const [idUser, setIdUser] = useState(null)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    setToken(sessionStorage.getItem('Access Token'))
    setIdUser(sessionStorage.getItem('idUser'))
    axios.get(`http://localhost:3001/user/${idUser}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
      console.log('ini', res)
      setUserData(res.data.data)
    })
    .catch(err => console.log(err.message))
  }, [idUser, token])

  console.log('user data', userData)

  const renderUser = userData.map(res => {
    console.log('res', res)
    return (
      <>
        <h1 className='ml-5'>Hi, {res.email}</h1>
        <h2 className='ml-5'>What do you want to learn?</h2>
      </>
    )
  })

  const isLoggedIn = token
  console.log(isLoggedIn)
  const router = useRouter()
  return (
    <div>
      <div className="hero min-h-screen" style={{ backgroundImage: `url(/test.jpg)` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      {isLoggedIn && renderUser}
      <button onClick={() => router.push('/dashboard')}>dashboard</button>
      <div>
        <h1 className='ml-5 mt-5'>Courses</h1>
        <div className='flex justify-center m-5'>
          <div className="card w-96 bg-base-100 m-5 shadow-xl">
            <figure><Image src={courseImage} alt="Course" /></figure>
            <div className="card-body bg-base-300">
              <h2 className="card-title">Course Name</h2>
              <p>User Name</p>
              <h3>Rp 99.000</h3>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 m-5 shadow-xl">
          <figure><Image src={courseImage} alt="Course" /></figure>
            <div className="card-body bg-base-300">
              <h2 className="card-title">Course Name</h2>
              <p>User Name</p>
              <h3>Rp 99.000</h3>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 m-5 shadow-xl">
            <figure><Image src={courseImage} alt="Course" /></figure>
            <div className="card-body bg-base-300">
              <h2 className="card-title">Course Name</h2>
              <p>User Name</p>
              <h3>Rp 99.000</h3>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 m-5 shadow-xl">
            <figure><Image src={courseImage} alt="Course" /></figure>
            <div className="card-body bg-base-300">
              <h2 className="card-title">Course Name</h2>
              <p>User Name</p>
              <h3>Rp 99.000</h3>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
