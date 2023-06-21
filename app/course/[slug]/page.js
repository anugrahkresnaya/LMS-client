'use client'
import Image from 'next/image'
import courseCover from "../../../public/course-cover.jpg"
import photo from '../../../public/png_dc_kaze-12.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Course = ({params}) => {
  const [courseData, setCourseData] = useState([])
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
  }, [params.slug])
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
          {/* <div className="tabs">
            <a className="tab tab-bordered focus:tab-active">Overview</a> 
            <a className="tab tab-bordered focus:tab-active">Instructor</a> 
            <a className="tab tab-bordered focus:tab-active">Ratings</a>
          </div> */}
          <div className='mb-5'>
            <h1 className='font-bold text-xl mb-2'>Description</h1>
            <p>{courseData.description}</p>
          </div>
          <div>
            <h1 className='font-bold text-xl mb-2'>Instructor</h1>
            <div className='flex'>
              <Image src={photo} width={100} height={100} alt='profile avatar' />
              <h1>{courseData.instructor || 'anonymous'}</h1>
            </div>
          </div>
        </div>
        <div className='flex-col ml-20 bg-base-300 p-5 mb-5 rounded-xl'>
          <h1 className='mb-5'>Price: Rp {courseData.price}</h1>
          <h1 className='mb-5'>Instructor: {courseData.instructor || 'anonymous'}</h1>
          <div className='flex flex-col'>
            <button className="btn btn-active btn-primary mb-5">Buy this course</button>
            <button className="btn btn-outline btn-secondary">Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course