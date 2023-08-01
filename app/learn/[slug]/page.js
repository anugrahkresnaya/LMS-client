'use client'
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Image from "next/image";
import profile from '../../../public/default.jpg'
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa"
import { Context } from "@/context";
import packageJson from '@/package.json'
import noData from '@/public/no-data.png'
import { useRouter } from "next/navigation";

const Learn = ({params}) => {
  const [courseData, setCourseData] = useState([])
  const [activateTab, setActivateTab] = useState(0)
  const [activateSection, setActivateSection] = useState(0)
  const [instructorData, setInstructorData] = useState([])
  const [userData, setUserData] = useState([])
  const [commentInput, setCommentInput] = useState('')
  const [commentData, setCommentData] = useState([])
  const {
    state: { user }
  } = useContext(Context)

  const router = useRouter()

  if (!user) {
    router.push('/signin')
  }

  const api = process.env.NEXT_PUBLIC_ORIGIN_API

  const pdfjsVersion = packageJson.dependencies['pdfjs-dist']

  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  useEffect(() => {
    const getCourseData = () => {
      axios.get(`${api}/course/${params.slug}`, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true,
      })
      .then(res => {
        setCourseData(res.data.data)
      })
      .catch(error => console.log(error))
    }
    getCourseData()

    const getInstructorData = () => {
      axios.get(`${api}/user/${courseData.instructorId}`)
      .then(res => {
        setInstructorData(res.data.data[0])
      })
      .catch(error => console.log(error))
    }

    getInstructorData()

    const getUserData = () => {
      axios.get(`${api}/user/${user?.id}`)
      .then(res => {
        console.log('result', res.data.data)
        setUserData(res.data.data[0])
      })
      .catch(error => {
        console.log(error)
      })
    }

    getUserData()

    const getCommentData = () => {
      axios.get(`${api}/comments/${params?.slug}`)
      .then(res => {
        console.log('comment', res.data.data)
        setCommentData(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
    }

    getCommentData()
  }, [api, courseData.instructorId, params.slug, user?.id])

  const handleActiveTab = (index) => {
    setActivateTab(index)
  }

  const handleActiveSection = (index) => {
    setActivateSection(index)
  }

  const handleCommentContentChange = (e) => {
    setCommentInput(e.target.value)
  }

  const handleSubmitComment = async () => {
    await axios.post(`${api}/comment/${params?.slug}`, {
      userId: user?.id,
      comment_content: commentInput,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      image: userData?.photoProfile,
    }, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`
      }
    })
    .then(() => {
      Swal.fire({
        position: "center",
        title: "Successfull!",
        icon: "success",
        text: "Comment submitted successfully",
        showConfirmButton: false,
        timer: 1000,
      })
      router.push(`/course/${params.slug}`)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const renderComment = commentData.map(item => {
    const handleDelete = async () => {
      await axios.delete(`${api}/comment/delete/${item?.id}`)
      .then(res => {
        console.log(res)
        Swal.fire({
          position: "center",
          title: "Successfull!",
          icon: "success",
          text: "Comment deleted successfully",
          showConfirmButton: false,
          timer: 1000,
        })
        router.push(`/course/${params.slug}`)
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          position: "center",
          title: "Error!",
          icon: "error",
          text: "Comment failed to delete",
          showConfirmButton: false,
          timer: 1000,
        })
      })
    }

    return(
      <div key={item?.id} className="relative grid grid-cols-1 gap-4 p-4 mb-8 rounded-lg bg-base-200 shadow-lg">
        <div className="relative flex gap-4">
          <Image src={item?.image || profile} 
            className="relative rounded-lg -top-8 -mb-4 bg-base-200"
            alt="profile"
            width={80}
            height={80}
          />
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
              <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">{item?.firstName} {item?.lastName}</p>
              {item.userId === user?.id && (
                <button onClick={handleDelete} className="text-gray-500 text-xl" href="#"><FaTrash /></button>
              )}
            </div>
              <p className="text-gray-400 text-sm">20 April 2022, at 14:88 PM</p>
            </div>
          </div>
        <p className="-mt-4 text-gray-500">{item.comment}</p>
      </div>
    )
  })

  return(
    <div className="ml-5 mr-5">
      <div className="tabs tabs-boxed mb-5">
        <div className={`tab ${activateTab == 0 ? 'tab-active' : ''}`} onClick={() => handleActiveTab(0)}>Video</div>
        <div className={`tab ${activateTab == 1 ? 'tab-active' : ''}`} onClick={() => handleActiveTab(1)}>PDF</div> 
      </div>
      {activateTab === 0 && (
        <div>
          {courseData.video === null ? (
            <div className="flex flex-col justify-center items-center">
              <Image src={noData} alt="no data" width={400} height={400} />
              <h1>This course doesn&apos;t provide video course</h1>
            </div>
          ) : (
            <div className="bg-base-300 rounded-lg">
              <video src={courseData.video} width={1280} height={720} controls alt="course video" className="mx-auto"></video>
            </div>
          )}
        </div>
      )}
      {activateTab === 1 && (
        <div>
          {courseData.pdf === null ? (
            <div className="flex flex-col justify-center items-center">
              <Image src={noData} alt="no data" width={400} height={400} />
              <h1>This course doesn&apos;t provide pdf</h1>
            </div>
          ) : (
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
              <div className="mx-auto w-[800px] h-[1000]">
                <Viewer fileUrl={courseData.pdf} plugins={[defaultLayoutPluginInstance]} />
              </div>
            </Worker>
          )}
        </div>
      )}
      <div className="bg-base-300 mt-20 mb-10 p-5 rounded-lg">
        <div className="tabs">
          <div className={`tab tab-bordered ${activateSection == 1 ? 'tab-active' : ''}`} onClick={() => handleActiveSection(1)}>Overview</div>
          <div className={`tab tab-bordered ${activateSection == 2 ? 'tab-active' : ''}`} onClick={() => handleActiveSection(2)}>Comment</div>
        </div>
        {activateSection === 1 && (
          <div>
            <h1 className="font-bold text-4xl mb-10 mt-10">{courseData.title}</h1>
            <h1 className="font-bold text-xl">description</h1>
            <p>{courseData.description}</p>
            <div className="mt-10">
              <h1 className="font-bold text-xl">instructor</h1>
              <Image src={instructorData?.photoProfile || photo} width={100} height={100} alt='profile avatar' />
              <p>{`${instructorData.firstName} ${instructorData.lastName}` || 'anonymous'}</p>
            </div>
          </div>
        )}
        {activateSection === 2 && (
          <div className="mt-10">
            <div className="mb-10">
              <form method="post" onSubmit={handleSubmitComment}>
                <textarea
                  name="comment_content"
                  id="comment_content"
                  placeholder="Type your comment here..."
                  cols="30"
                  rows="10"
                  value={commentInput}
                  onChange={handleCommentContentChange}
                  className="w-full rounded-lg p-5"
                ></textarea>
                <button className="btn btn-primary" disabled={!commentInput}>Submit</button>
              </form>
            </div>
            {renderComment}
          </div>
        )}
      </div>
    </div>
  )
}

export default Learn