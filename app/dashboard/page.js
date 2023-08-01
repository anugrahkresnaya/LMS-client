'use client'
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { Context } from "@/context"
import photo from "../../public/default.jpg"
import Image from "next/image"
import '../globals.css'
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { state: { user } } = useContext(Context)

  const router = useRouter()

  const api = process.env.NEXT_PUBLIC_ORIGIN_API

  const [userRole, setUserRole] = useState([])
  const [activateTab, setActivateTab] = useState(0)
  const [userList, setUserlist] = useState([])
  const [filtered, setFiltered] = useState([])
  const [courseList, setCourseList] = useState([])
  const [ratingList, setRatingList] = useState([])
  const [commentList, setCommentList] = useState([])
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    getUserList()
    getCourseList()
    getUserData()
    getRatingList()
    getCommentList()
    getOrderList()
  }, [])

  const handleActiveTab = (index) => {
    setActivateTab(index)
  }
  const getUserData = () => {
    axios.get(`${api}/user/${user?.id}`)
    .then(res => {
      console.log('result', res.data.data[0])
      setUserRole(res.data.data[0].roleId)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getUserList = () => {
    axios.get(`${api}/user/list`)
    .then(res => {
      setUserlist(res.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getCourseList = () => {
    axios.get(`${api}/courses`)
    .then(res => {
      setCourseList(res.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getRatingList = () => {
    axios.get(`${api}/ratings`)
    .then(res => {
      setRatingList(res.data.data)
    })
  }

  const getCommentList = () => {
    axios.get(`${api}/commentList`)
    .then(res => {
      setCommentList(res.data.data)
    })
  }

  const getOrderList = () => {
    axios.get(`${api}/orders`)
    .then(res => {
      console.log('comment list', res.data.data)
      setOrderList(res.data.data)
    })
  }

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${api}/user/delete/${userId}`, {
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
      router.push('/')
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
      router.push('/')
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

  const handleDeleteRating = async (id) => {
    try {
      await axios.delete(`${api}/rating/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      })
      Swal.fire({
        position: "center",
        title: "Successfull!",
        icon: "success",
        text: "Delete Rating Successfull",
        showConfirmButton: false,
        timer: 2000,
      })
      router.push('/')
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

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`${api}/comment/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      })
      Swal.fire({
        position: "center",
        title: "Successfull!",
        icon: "success",
        text: "Delete Comment Successfull",
        showConfirmButton: false,
        timer: 2000,
      })
      router.push('/')
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

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`${api}/order/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      })
      Swal.fire({
        position: "center",
        title: "Successfull!",
        icon: "success",
        text: "Delete Order Successfull",
        showConfirmButton: false,
        timer: 2000,
      })
      router.push('/')
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
                <Image src={list.photoProfile || photo.src} alt="Avatar" width={48} height={48} />
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
          {list.title}
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

  const renderRatingList = ratingList.map(list => {
    return (
      <tr key={list.id}>
        <td>{list.id}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <Image src={list.photoProfile || photo.src} alt="Avatar" width={48} height={48} />
              </div>
            </div>
            <div>
              <div className="font-bold">{`${list.firstName} ${list.lastName}`}</div>
              <div className="text-sm opacity-50">{`user id: ${list.userId}`}</div>
            </div>
          </div>
        </td>
        <td>{list.value}</td>
        <td>{list.review}</td>
        <td>{list.courseSlug}</td>
        <td>{list.createdAt}</td>
        <td>{list.updatedAt}</td>
        <th>
          <button className="btn btn-ghost btn-xs" onClick={() => handleDeleteRating(list.id)}>delete</button>
        </th>
      </tr>
    )
  })

  const renderCommentList = commentList.map(list => {
    return (
      <tr key={list.id}>
        <td>{list.id}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <Image src={list.image || photo.src} alt="Avatar" width={48} height={48} />
              </div>
            </div>
            <div>
              <div className="font-bold">{`${list.firstName} ${list.lastName}`}</div>
              <div className="text-sm opacity-50">{`user id: ${list.userId}`}</div>
            </div>
          </div>
        </td>
        <td>{list.comment}</td>
        <td>{list.courseSlug}</td>
        <td>{list.createdAt}</td>
        <td>{list.updatedAt}</td>
        <th>
          <button className="btn btn-ghost btn-xs" onClick={() => handleDeleteComment(list.id)}>delete</button>
        </th>
      </tr>
    )
  })

  const renderOrderList = orderList.map(list => {
    return (
      <tr key={list.id}>
        <td>{list.id}</td>
        <td>{list.courseId}</td>
        <td>{list.userId}</td>
        <td>{list.instructorId}</td>
        <td>{list.slug}</td>
        <td>{list.amount}</td>
        <td>{list.transactionId}</td>
        <td>{list.status}</td>
        <td>{list.token}</td>
        <td>{list.redirectUrl}</td>
        <td>{list.createdAt}</td>
        <td>{list.updatedAt}</td>
        <th>
          <button className="btn btn-ghost btn-xs" onClick={() => handleDeleteOrder(list.id)}>delete</button>
        </th>
      </tr>
    )
  })

  return (
    <div>
      {userRole === 2 ? (
        <div className="drawer lg:drawer-open bg-base-200 overflow-x-hidden">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Page content here */}
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            {activateTab === 0 && (
              <div className="mt-5 mr-5">
                <h1 className="font-bold text-xl">User List</h1>
                <div className="max-[1023px]:w-[100vw] min-[1024px]:w-[70vw] overflow-x-auto">
                  <table className="table">
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
                    <tbody className="bg-base-100">
                      {renderUserList}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activateTab === 1 && (
              <div className="mt-5 mr-5">
                <h1 className="font-bold text-xl">Course List</h1>
                <div className="max-[1023px]:w-[100vw] min-[1024px]:w-[70vw] overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
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
            {activateTab === 2 && (
              <div className="mt-5 mr-5">
                <h1 className="font-bold text-xl">Rating List</h1>
                <div className="max-[1023px]:w-[100vw] min-[1024px]:w-[70vw] overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Value</th>
                        <th>Review</th>
                        <th>CourseSlug</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-base-100">
                      {renderRatingList}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activateTab === 3 && (
              <div className="mt-5 mr-5">
                <h1 className="font-bold text-xl">Comment List</h1>
                <div className="max-[1023px]:w-[100vw] min-[1024px]:w-[70vw] overflow-x-auto">
                  <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Comment</th>
                        <th>CourseSlug</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-base-100">
                      {renderCommentList}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activateTab === 4 && (
              <div className="mt-5 mr-5">
                <h1 className="font-bold text-xl">Order List</h1>
                <div className="max-[1023px]:w-[100vw] min-[1024px]:w-[70vw] overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Course ID</th>
                        <th>User Id</th>
                        <th>InstructorId</th>
                        <th>Slug</th>
                        <th>Amount</th>
                        <th>Transaction Id</th>
                        <th>Status</th>
                        <th>Token</th>
                        <th>Redirect Url</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-base-100">
                      {renderOrderList}
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
              <li><button onClick={() => handleActiveTab(2)}>Rating</button></li>
              <li><button onClick={() => handleActiveTab(3)}>Comment</button></li>
              <li><button onClick={() => handleActiveTab(4)}>Order</button></li>
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