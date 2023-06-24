'use client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useContext } from 'react'
import { Context } from "@/context"
import CourseList from '@/components/courseList'

export default function Home() {
  const { state: { user }, dispatch } = useContext(Context)
  const [userData, setUserData] = useState([])
  const [listData, setListData] = useState([])

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/user/${user.id}`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`
        }
      })
      .then(res => {
        console.log('ini', res)
        setUserData(res.data.data[0])
      })
      .catch(err => console.log(err.message))
    }
    getCourseList()
  }, [user])

  const getCourseList = () => {
    axios.get('http://localhost:3001/courses')
    .then(res => {
      setListData(res.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  console.log('user data', userData)

  const isLoggedIn = user?.accessToken
  console.log(isLoggedIn)
  const router = useRouter()

  const limitListData = listData.slice(0, 4)

  const renderListCourse = limitListData.map(list => {
      return(
        <CourseList 
          key={list.id}
          title={list.title}
          image={list.image}
          price={list.price}
          params={list.slug}
          isLoggedIn={isLoggedIn}
        />
      )
    })
  return (
    <div>
      <div className="hero min-h-screen" style={{ backgroundImage: `url(/test.jpg)` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{isLoggedIn ? `Hello, ${userData.firstName} ${userData.lastName}` : 'Hello there!'}</h1>
            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      {/* <button onClick={() => router.push('/dashboard')}>dashboard</button> */}
      <div>
        <h1 className='text-center mt-5 font-bold text-5xl'>Courses</h1>
        <div className='flex justify-center m-5'>
          {renderListCourse}
        </div>
      </div>
    </div>
  )
}
