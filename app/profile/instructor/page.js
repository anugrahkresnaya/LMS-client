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
    <div className='min-h-screen bg-base-200 pt-20'>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image src={instructorPhoto} alt='instructor' className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Become an Instructor!</h1>
            <p className="sm:w-[900px] py-6">
              We believe that everyone has something valuable to teach, and we&apos;re thrilled to offer you a unique opportunity 
              to contribute to our growing comminity of instructors/educators. Whether you&apos;re an expert in a specific field 
              or simply passionate about sharing your skills, you can now effortlessly upload your courses – either free or 
              paid – and make an impact on learners!
            </p>
            <Link
              href={`/profile/instructor/course/create/${user?.id}`}
              className='btn btn-primary'
            >Get Started</Link>
          </div>
        </div>
      </div>
      <h1 className='font-bold text-5xl text-center mt-20'>FAQ</h1>
      <div className='sm:w-[720px] mt-10 mx-auto'>
        <div className='mb-5'>
          <h1 className='font-bold text-xl'>How to get paid after user buy my course?</h1>
          <p>For now, we will directly contact to your email or mobile number to get your bank and account information and we will transfer it directly to your bank.</p>
        </div>
        <div className='mb-5'>
          <h1 className='font-bold text-xl'>What bank can be used to get payment from the paid course?</h1>
          <p>Currently we only have banks in Indonesia. So we dont have international bank yet.</p>
        </div>
        <div>
          <h1 className='font-bold text-xl'>How to contact support?</h1>
          <p>You can contact us through oceanzplatform@gmail.com or anugrahkresnaya.ak@gmail.com</p>
        </div>
      </div>
    </div>
  )
}