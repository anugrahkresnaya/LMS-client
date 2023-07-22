'use client'
import Image from 'next/image'
import courseCover from "../../../public/course-cover.jpg"
import photo from '../../../public/png_dc_kaze-12.png'
import { Context } from '@/context'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import Rating from '@/components/rating'

const Course = ({params}) => {
  const { 
    state: { user } 
  } = useContext(Context)
  const [courseData, setCourseData] = useState([])
  const [instructorData, setInstructorData] = useState([])
  const [orderData, setOrderData] = useState([])
  const [ratingData, setRatingData] = useState([])

  const router = useRouter()

  const api = process.env.NEXT_PUBLIC_ORIGIN_API

  console.log('api', api)

  useEffect(() => {
    const getCourseData = () => {
      axios.get(`${api}/course/${params.slug}`)
      .then(res => {
        setCourseData(res.data.data)
      })
      .catch(error => console.log(error))
    }
    getCourseData()

    const getInstructorData = () => {
      axios.get(`${api}/user/${courseData?.instructorId}`)
      .then(res => {
        setInstructorData(res.data.data[0])
      })
      .catch(error => console.log(error))
    }

    getInstructorData()

    const getPurchasedAccess = () => {
      axios.post(`${api}/access`, {
        courseId: courseData?.id,
        userId: user?.id,
        status: 'settlement'
      })
      .then(res => {
        setOrderData(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
    }

    getPurchasedAccess()

    const getRatingData = () => {
      axios.get(`${api}/ratingsBySlug/${params.slug}`)
      .then(res => {
        console.log('rating data', res.data)
        setRatingData(res.data.data)
      })
      .catch(error => console.log('rating API: ', error))
    }

    getRatingData()
  }, [api, courseData?.id, courseData.instructor, courseData.instructorId, orderData.id, params.slug, user?.id])

  const handleCheckout = async () => {
    Swal.fire({
      title: 'Buy this course?',
      text: "You will be redirect to payment page",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Buy'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${api}/course/${courseData.id}/order`, {
          userId: user?.id,
          instructorId: instructorData?.id,
          slug: params?.slug
        }, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`
          }
        })
        .then(res => {
          if (res.data.data.redirectUrl === null) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Success enroll the course',
              showConfirmButton: false,
              timer: 1000
            })
            router.push(`/`)
          } else {
            router.push(res.data.data.redirectUrl)
          }
        })
        .catch(error => {
          console.log('error when buying: ', error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            showConfirmButton: true
          })
        })
      }
    })
  }

  const renderRating = ratingData.map(item => {
    return(
        <Rating
          key={item.id}
          rating={item.value}
          firstName={item.firstName}
          lastName={item.lastName}
          review={item.review}
          photo={item.photoProfile}
        />
    )
  })

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
          {user?.id === instructorData.id ? (
            <div className='flex flex-col'>
              <Link className="btn btn-active btn-primary mb-5" href={`/learn/${params.slug}`}>Go to course</Link>
              <Link className="btn btn-active btn-primary mb-5" href={`/course/update-course/${params.slug}`}>Edit your course</Link>
            </div>
          ) : (
            <div className='flex flex-col'>
              {(user?.id === orderData.userId && orderData.status === 'settlement') ? (
                <div className="flex flex-col">
                  <Link className="btn btn-active btn-primary mb-5" href={`/learn/${params.slug}`}>Go to course</Link>
                  <Link className="btn btn-active btn-primary" href={`/course/rating/${params.slug}`}>Give rating</Link>
                </div>
              ) : (
                <button className="btn btn-active btn-primary mb-5" onClick={handleCheckout}>Buy this course</button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col mx-auto items-center bg-base-300 pt-5'>
        <h1 className='text-center mb-5 font-bold text-4xl'>Review</h1>
        {renderRating}
      </div>
    </div>
  )
}

export default Course