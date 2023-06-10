'use client'
const { Context } = require("@/context")
const { useContext } = require("react")
import Image from 'next/image'
import instructorPhoto from '../../../public/instructor-photo.jpg'
import axios from 'axios'

export default function Instructor() {
  const { 
    state: { user } 
  } = useContext(Context)

  const becomeInstructor = () => {
    // axios
    // .get('http://localhost:3001/onboarding')
    // .then((res) => {
    //   console.log(res)
       // window.location.href = res.data
    // })
    // .catch((err) => {
    //   console.log(err.response.status);
    //   alert("Midtrans onboarding failed. Try again.");
    // });
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image src={instructorPhoto} alt='instructor' className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Become an Instructor!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button onClick={becomeInstructor} className="btn btn-primary" >Get Started</button>
        </div>
      </div>
    </div>
  )
}