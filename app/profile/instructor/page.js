'use client'
const { Context } = require("@/context")
const { useContext } = require("react")
import Image from 'next/image'
import instructorPhoto from '../../../public/instructor-photo.jpg'
import Link from 'next/link'

export default function Instructor() {
  const { 
    state: { user } 
  } = useContext(Context)

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image src={instructorPhoto} alt='instructor' className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Become an Instructor!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <Link
            href={`/profile/instructor/course/create/${user?.id}`}
            className='btn btn-primary'
          >Get Started</Link>
        </div>
      </div>
    </div>
  )
}