'use client'
import Image from 'next/image'
import courseCover from "../../../public/course-cover.jpg"
import photo from '../../../public/png_dc_kaze-12.png'
import { Context } from '@/context'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Link from 'next/link'

const Course = ({params}) => {
  const { 
    state: { user } 
  } = useContext(Context)
  const [courseData, setCourseData] = useState([])
  const [instructorData, setInstructorData] = useState([])
  console.log('slug', params)
  useEffect(() => {
    const getCourseData = () => {
      axios.get(`http://localhost:3001/course/${params.slug}`)
      .then(res => {
        console.log(res.data.data)
        setCourseData(res.data.data)
      })
      .catch(error => console.log(error))
    }
    getCourseData()

    const getInstructorData = () => {
      axios.get(`http://localhost:3001/user/${courseData.instructorId}`)
      .then(res => {
        console.log('instructor', res.data.data[0])
        setInstructorData(res.data.data[0])
      })
      .catch(error => console.log(error))
    }

    getInstructorData()
  }, [courseData.instructor, courseData.instructorId, params.slug])
  return(
    <div>
      <div>
        <Image src={courseCover} width="100%" alt="course cover" />
      </div>
      <div className='flex flex-row justify-center mt-10'>
        <div className='flex-col w-[750px] bg-base-300 rounded-xl p-5 mb-5'>
          <div className='mb-5'>
            <h1 className='font-bold text-4xl'>{courseData.title}</h1>
          </div>
          <div className='mb-5'>
            <h1 className='font-bold text-xl mb-2'>Description</h1>
            <p>{courseData.description}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl mb-2'>Instructor</h1>
            <div className='flex'>
              <Image src={instructorData?.photoProfile || photo} width={100} height={100} alt='profile avatar' />
              <h1 className='ml-5'>{`${instructorData.firstName} ${instructorData.lastName}` || 'anonymous'}</h1>
            </div>
          </div>
        </div>
        <div className='flex-col ml-20 bg-base-300 p-5 mb-5 rounded-xl'>
          <h1 className='mb-5'>Price: {courseData.price === 0 ? 'FREE' : `Rp ${courseData.price}`}</h1>
          <h1 className='mb-5'>Instructor: {`${instructorData.firstName} ${instructorData.lastName}` || 'anonymous'}</h1>
          {user?.id === instructorData?.id ? (
            <div className='flex flex-col'>
              <Link className="btn btn-active btn-primary mb-5" href={`/learn/${params.slug}`}>Go to course</Link>
            </div>
          ) : (
          <div className='flex flex-col'>
            <button className="btn btn-active btn-primary mb-5">Buy this course</button>
            <button className="btn btn-outline btn-secondary">Wishlist</button>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Course