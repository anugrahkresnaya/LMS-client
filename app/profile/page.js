'use client'
import axios from 'axios'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import profileCover from "../../public/profile-cover.jpg"
import { Context } from '@/context'
import defaultPhoto from '../../public/default.jpg'
import Swal from 'sweetalert2'
import Link from 'next/link'

export default function Profile() {
  const api = process.env.NEXT_PUBLIC_ORIGIN_API

  const [hidden, setHidden] = useState(true)
  const [userData, setUserData] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthDay, setBirthDay] = useState(null)
  const [gender, setGender] = useState("male")
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [photoProfile, setPhotoProfile] = useState(null)
  const [activateTab, setActivateTab] = useState(0)
  const [createdCourse, setCreatedCourse] = useState([])
  const [enrolledData, setEnrolledData] = useState([])

  console.log('no', phoneNumber)

  const {
    state: { user },
    dispatch
  } = useContext(Context)

  useEffect(() => {
    getUser()
    getCreatedCourse()
    getCourseBySettlement()
  }, [])

  const getUser = async () => {
    try {
      if(user) {
        const { data } = await axios.get(`${api}/user/${user.id}`)
        console.log('user data', data.data);
        setHidden(false)
        setUserData(data.data)
      }
    } catch (error) {
      console.log(error)
      setHidden(true)
    }
  }

  const getCreatedCourse = () => {
    axios.get(`${api}/courses/${user?.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`
      }
    })
    .then(res =>{
      setCreatedCourse(res.data.data)
    })
    .catch(error => console.log(error))
  }

  const getCourseBySettlement = () => {
    axios.post('${api}/getCourseBySettlement', {
      userId: user?.id
    })
    .then(res => {
      setEnrolledData(res.data?.data)
    })
  }

  const renderEnroll = enrolledData?.map(item => {
    const words = item?.slug.split("-");
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    const capitalizedTitle = capitalizedWords.join(" ")

    return(
      <div key={item?.id} className="card w-96 bg-base-300 shadow-xl mt-5 mr-5">
        <div className="card-body">
          <Link href={`/course/${item?.slug}`}>
            <h1 className='font-bold text-xl text-center'>{capitalizedTitle}</h1>
          </Link>
        </div>
      </div>
    )
  })

  const onImageUpload = (e) => {
    let file = e.target.files[0]
    setPhotoProfile(file)
  }

  const handleActiveTab = (index) => {
    setActivateTab(index)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    try {
      const { data } = await axios.put(`${api}/user/update/${user.id}`, {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: birthDay,
        gender: gender,
        photoProfile: photoProfile,
        phoneNumber: phoneNumber
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      },
      {
        withCredentials: true,
        credentials: 'include'
      })

      dispatch({
        type: "LOGIN",
        payload: data,
      })
      window.localStorage.setItem("user", JSON.stringify(data))

      Swal.fire({
        position: "center",
        title: "Successfull!",
        icon: "success",
        text: "Update Successfull",
        showConfirmButton: false,
        timer: 2000,
      })
      // router.push("/")
    } catch (error) {
      const errMsg = error.response?.data.error?.message
      if(errMsg !== undefined) {
        Swal.fire('error', errMsg, 'error')
      }
      console.log("api error: ", error)
    }
  }

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`${api}/course/delete/${courseId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      })
      Swal.fire({
        position: "center",
        title: "Successfull!",
        icon: "success",
        text: "Delete Course Successfull",
        showConfirmButton: false,
        timer: 2000,
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        position: "center",
        title: "Failed!",
        icon: "error",
        text: "Delete Failed",
        showConfirmButton: false,
        timer: 2000,
      })
    }
  }

  const renderCreatedCourse = createdCourse.map(course => {
    return(
      <div key={course.id} className="card w-96 bg-base-100 m-5 shadow-xl">
        <figure>
          <Link href={`/course/${course.slug}`}>
            <Image src={course.image} alt="Course" width={400} height={400} />
          </Link>
        </figure>
        <div className="card-body bg-base-300">
          <Link href={`/course/${course.slug}`}>
            <h2 className="card-title">{course.title}</h2>
          </Link>
          <p></p>
          <h3>{course.price !== null ? `Rp ${course.price}` : 'Free'}</h3>
          <div className='flex justify-center'>
            <Link href={`/course/update-course/${course.slug}`}>
              <button className='btn btn-primary mr-5'>Edit</button>
            </Link>
            <button className='btn btn-secondary' onClick={() => handleDeleteCourse(course.id)}>Delete</button>
          </div>
        </div>
      </div>
    )
  })

  const renderUser = userData.map(data => {
    const dateString = data.dateOfBirth;
    const date = new Date(dateString);

    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return (
      <div key={data.id} className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
          <div className='flex flex-row'>
            {activateTab === 0 ? (
              <>
                <div className='pl-5 mr-5 bg-base-300 rounded-md mockup-window'>
                  <h1 className="my-5">General Information</h1>
                  <form action="/profile" encType='multipart/form-data' method='post' className='flex-col' onSubmit={handleUpdate}>
                    <div className='flex flex-row mb-5'>
                      <div className='flex flex-col mr-5'>
                        <label htmlFor="firstName">First Name</label>
                        <input 
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => {setFirstName(e.target.value)}}
                          placeholder="Your first name"
                          id="firstName"
                          className='input input-bordered input-primary w-96'
                          required
                        />
                      </div>
                      <div className='flex flex-col mr-5'>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={lastName}
                          onChange={(e) => {setLastName(e.target.value)}}
                          placeholder="Your last name"
                          id="lastName"
                          className='input input-bordered input-primary w-96'
                        />
                      </div>
                    </div>
                    <div className='flex flex-row mb-5'>
                      <div className='flex flex-col  mr-5'>
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" name="birthday" value={birthDay}  id="" onChange={(e) => {setBirthDay(e.target.value)}} className='input input-bordered input-primary w-96' />
                      </div>
                      <div className='flex flex-col mr-5'>
                        <label htmlFor="gender">Gender</label>
                        <select className="select select-primary w-96" value={gender} onChange={(e) => {setGender(e.target.value)}}>
                          <option disabled selected value={null}>Select your gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className='flex flex-row mb-5'>
                      <div className='flex flex-col  mr-5'>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="" value={data.email} className='input input-bordered input-primary w-96' disabled />
                      </div>
                      <div className='flex flex-col  mr-5'>
                        <label htmlFor="phoneNumber">Mobile Number</label>
                        <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}} placeholder="Your mobile number" id="phoneNumber" className='input input-bordered input-primary w-96' />
                      </div>
                    </div>
                    <div className='flex flex-col mb-5'>
                      <label htmlFor="photoProfile">Photo Profile</label>
                      <input type="file" name="photoProfile" onChange={(e) => onImageUpload(e)} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                    </div>
                    <button type="submit" className="btn btn-primary mb-5">Save All</button>
                  </form>
                </div>
                <div className="card ml-20 w-96 bg-base-300">
                  <figure><Image width={600} height={200} src={profileCover} className='object-cover' alt="profile cover"/></figure>
                  <div className="card-body pt-0">
                    <div className="avatar justify-center -mt-[50px]">
                      <div className="w-24 rounded-full ring ring-primary-focus ring-offset-base-100 ring-offset-2">
                        <Image src={data.photoProfile || defaultPhoto} width={96} height={96} alt="profile" />
                      </div>
                    </div>
                    <h2 className="card-title justify-center mt-5">{data.firstName || "Anonim"} {data?.lastName}</h2>
                    <p className="text-center">{formattedDate}</p>
                    <p className="text-center">{data.phoneNumber}</p>
                    <p className="text-center">{data.gender}</p>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <h1 className='font-bold text-xl'>Course Created by You</h1>
                <div className='flex flex-row flex-wrap'>
                  {renderCreatedCourse}
                </div>
                <div className=''>
                  <h1 className='font-bold text-xl'>Enrolled Course</h1>
                  <div className='flex flex-row flex-wrap'>
                    {renderEnroll}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li><button onClick={() => handleActiveTab(0)}>Profile</button></li>
            <li><button onClick={() => handleActiveTab(1)}>Course</button></li>
            <li><Link href="/profile/instructor">Instructor</Link></li>
          </ul>
        </div>
      </div>
    )
  })

  return(
    <>
      {!hidden ? (
        <div>
          {renderUser}
        </div>
      ) : (
        <div>
          <h1>no user has login</h1>
        </div>
      )}
    </>
  )
}