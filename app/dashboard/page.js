'use client'
import axios from "axios"
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
import Link from "next/link"
import { useEffect, useState, useContext } from "react"
import { Context } from "@/context"
import photo from "../../public/default.jpg"
import Image from "next/image"
import '../globals.css'
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { state: { user }, dispatch } = useContext(Context)

  const router = useRouter()
  
  const [userRole, setUserRole] = useState([])
  const [activateTab, setActivateTab] = useState(0)
  const [userList, setUserlist] = useState([])
  const [filtered, setFiltered] = useState([])
  const [courseList, setCourseList] = useState([])

  useEffect(() => {
    getUserList()
    getCourseList()
    getUserData()
  }, [])

  const handleActiveTab = (index) => {
    setActivateTab(index)
  }
  const getUserData = () => {
    axios.get(`http://localhost:3001/user/${user?.id}`)
    .then(res => {
      console.log('result', res.data.data[0])
      setUserRole(res.data.data[0].roleId)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getUserList = () => {
    axios.get('http://localhost:3001/user/list')
    .then(res => {
      setUserlist(res.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getCourseList = () => {
    axios.get('http://localhost:3001/courses')
    .then(res => {
      setCourseList(res.data.data)
    })
  }

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      })
      setFiltered(userList.filter(user => user.id !== userId))
      Swal.fire({
        position: "center",
        title: "Successfull!",
        icon: "success",
        text: "Delete User Successfull",
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

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:3001/course/delete/${courseId}`, {
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

  const renderUserList = userList.map(list => {
    return (
      <tr key={list.id}>
        <td>{list.id}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <Image src={list.photoProfile || photo.src} alt="Avatar Tailwind CSS Component" width={48} height={48} />
              </div>
            </div>
            <div>
              <div className="font-bold">{`${list.firstName} ${list.lastName}`}</div>
              <div className="text-sm opacity-50">{list.roleId === 1 ? 'user' : 'admin'}</div>
            </div>
          </div>
        </td>
        <td>{list.email}</td>
        <td>{list.gender}</td>
        <td>{list.phoneNumber}</td>
        <td>{list.createdAt}</td>
        <td>{list.updatedAt}</td>
        <th>
          <button className="btn btn-ghost btn-xs" onClick={() => handleDeleteUser(list.id)}>delete</button>
        </th>
      </tr>
    )
  })

  const renderCourseList = courseList.map(list => {
    return (
      <tr key={list.id}>
        <td>{list.id}</td>
        <td>
          <div className="font-bold">{list.title}</div>
        </td>
        <td>{list.price}</td>
        <td>{list.image}</td>
        <td>{list.video}</td>
        <td>{list.pdf}</td>
        <td>{list.instructorId}</td>
        <td>{list.createdAt}</td>
        <td>{list.updatedAt}</td>
        <th>
          <button className="btn btn-ghost btn-xs" onClick={() => handleDeleteCourse(list.id)}>delete</button>
        </th>
      </tr>
    )
  })

  return (
    <div>
      {userRole === 2 ? (
        <div className="drawer lg:drawer-open bg-base-200">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Page content here */}
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            {activateTab === 0 ? (
              <div className="mt-5 mr-5">
                <h1 className="font-bold text-xl">User List</h1>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Mobile Number</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderUserList}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="mt-5 mr-5">
                <h1 className="font-bold text-xl">User List</h1>
                <div className="w-96">
                  <table className="">
                    <thead>
                      <tr className="rounded">
                        <th>Course ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Video</th>
                        <th>Pdf</th>
                        <th>InstructorId</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-base-100">
                      {renderCourseList}
                    </tbody>
                   </table>
                </div>
              </div>
            )}
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li><button onClick={() => handleActiveTab(0)}>User</button></li>
              <li><button onClick={() => handleActiveTab(1)}>Course</button></li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="min-h-screen">
          <h1>no admin login</h1>
        </div>
      )}
    </div>
  )
}