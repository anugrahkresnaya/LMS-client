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
  const [hidden, setHidden] = useState(true)
  const [userData, setUserData] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthDay, setBirthDay] = useState("")
  const [gender, setGender] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [photoProfile, setPhotoProfile] = useState(null)

  const {
    state: { user },
    dispatch
  } = useContext(Context)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/user/${user.id}`)
      console.log('user data', data.data);
      setHidden(false)
      setUserData(data.data)
    } catch (error) {
      console.log(error)
      setHidden(true)
    }
  }

  const onImageUpload = (e) => {
    let file = e.target.files[0]
    setPhotoProfile(file)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    try {
      const { data } = await axios.put(`http://localhost:3001/user/update/${user.id}`, {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: birthDay,
        gender: gender,
        photoProfile: photoProfile
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
        position: "top-end",
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

  const renderUser = userData.map(data => {
    const dateString = data.dateOfBirth;
    const date = new Date(dateString);

    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    console.log(formattedDate);
    return (
      <div key={data.id} className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
          <div className='flex flex-row'>
            <div className='pl-5 mr-5 bg-base-300 rounded-md mockup-window'>
              <h1 className="my-5">General Information</h1>
              <form action="/profile" encType='multipart/form-data' method='post' className='flex-col' onSubmit={handleUpdate}>
                <div className='flex flex-row mb-5'>
                  <div className='flex flex-col mr-5'>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} placeholder="Your first name" id="firstName" className='input input-bordered input-primary w-96' />
                  </div>
                  <div className='flex flex-col mr-5'>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" value={lastName} onChange={(e) => {setLastName(e.target.value)}} placeholder="Your last name"  id="lastName" className='input input-bordered input-primary w-96' />
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
                      <option disabled selected>Select your gender</option>
                      <option>Male</option>
                      <option>Female</option>
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
                    <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}} placeholder="Your first name" id="phoneNumber" className='input input-bordered input-primary w-96' />
                  </div>
                </div>
                <div className='mb-5'>
                  <input type="file" name="photoProfile" onChange={(e) => onImageUpload(e)} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                </div>
                <button type="submit" className="btn btn-primary mb-5">Save All</button>
              </form>
            </div>
            <div className="card ml-20 w-96 bg-base-300">
              <figure><Image width={600} height={200} src={profileCover} className='object-cover' alt="car!"/></figure>
              <div className="card-body pt-0">
                <div className="avatar justify-center -mt-[50px]">
                  <div className="w-24 rounded-full ring ring-primary-focus ring-offset-base-100 ring-offset-2">
                    <Image src={data.photoProfile || defaultPhoto} width={96} height={96} alt="profile" />
                  </div>
                </div>
                <h2 className="card-title justify-center mt-5">{data.firstName || "Anonim"} {data.lastName || "User"}</h2>
                <p className="text-center">{formattedDate}</p>
                <p>{data.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li><a>Sidebar Item 1</a></li>
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