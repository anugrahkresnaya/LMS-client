'use client'
import { useEffect, useState, useContext } from "react"
import axios from "axios"
// import Image from "next/image"
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Image from "next/image";
import profile from '../../../public/png_dc_kaze-12.png'
const { Context } = require("@/context")

const Learn = ({params}) => {
  const [courseData, setCourseData] = useState([])
  const [activateTab, setActivateTab] = useState(0)
  const [activateSection, setActivateSection] = useState(0)
  const [instructorData, setInstructorData] = useState([])
  const {
    state: { user }
  } = useContext(Context)

  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  useEffect(() => {
    const getCourseData = () => {
      axios.get(`http://localhost:3001/course/${params.slug}`, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.data)
        setCourseData(res.data.data)
      })
      .catch(error => console.log(error))
    }
    getCourseData()

    const getInstructorData = () => {
      axios.get(`http://localhost:3001/user/${courseData.instructorId}`)
      .then(res => {
        console.log('instructor', res.data.data[0])
        setInstructorData(res.data.data[0])
      })
      .catch(error => console.log(error))
    }

    getInstructorData()
  }, [courseData.instructorId, params.slug])

  const handleActiveTab = (index) => {
    setActivateTab(index)
  }

  const handleActiveSection = (index) => {
    setActivateSection(index)
  }

  return(
    <div className="ml-5 mr-5">
      <div className="tabs tabs-boxed mb-5">
        <div className={`tab ${activateTab == 0 ? 'tab-active' : ''}`} onClick={() => handleActiveTab(0)}>Video</div>
        <div className={`tab ${activateTab == 1 ? 'tab-active' : ''}`} onClick={() => handleActiveTab(1)}>PDF</div> 
      </div>
      {activateTab === 0 && (
        <div className="bg-base-300 rounded-lg">
          <video src={courseData.video} width={1280} height={720} controls alt="course video" className="mx-auto"></video>
        </div>
      )}
      {activateTab === 1 && (
        <div>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className="mx-auto w-[800px] h-[1000]">
              <Viewer fileUrl={courseData.pdf} plugins={[defaultLayoutPluginInstance]} />
            </div>
          </Worker>
          {/* <iframe src="https://storage.googleapis.com/oceanz-bucket/1687319600887_Invoice20211101991754CBN00335301121.pdf" frameborder="0"></iframe>
          {/* <Viewer fileUrl={courseData.pdf} /> */}
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
              <form method="post">
                <textarea 
                  name="comment_content"
                  id="comment_content"
                  placeholder="Type your comment here..."
                  cols="30"
                  rows="10"
                  className="w-full rounded-lg p-5"
                ></textarea>
                <button className="btn btn-primary">Submit</button>
              </form>
            </div>
            <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 rounded-lg bg-base-200 shadow-lg">
              <div class="relative flex gap-4">
                <Image src={profile} 
                  class="relative rounded-lg -top-8 -mb-4 bg-base-200"
                  alt="profile"
                  width={80}
                  height={80}
                />
                <div class="flex flex-col w-full">
                  <div class="flex flex-row justify-between">
                    <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">COMMENTOR</p>
                    <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                  </div>
                    <p class="text-gray-400 text-sm">20 April 2022, at 14:88 PM</p>
                  </div>
                </div>
              <p class="-mt-4 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quisquam vero adipisci beatae voluptas dolor ame.</p>
            </div>
            <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 rounded-lg bg-base-200 shadow-lg">
              <div class="relative flex gap-4">
                <Image src={profile} 
                  class="relative rounded-lg -top-8 -mb-4 bg-base-200"
                  alt="profile"
                  width={80}
                  height={80}
                />
                <div class="flex flex-col w-full">
                  <div class="flex flex-row justify-between">
                    <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">COMMENTOR</p>
                    <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                  </div>
                    <p class="text-gray-400 text-sm">20 April 2022, at 14:88 PM</p>
                  </div>
                </div>
              <p class="-mt-4 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quisquam vero adipisci beatae voluptas dolor ame.</p>
            </div>
            <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 rounded-lg bg-base-200 shadow-lg">
              <div class="relative flex gap-4">
                <Image src={profile} 
                  class="relative rounded-lg -top-8 -mb-4 bg-base-200"
                  alt="profile"
                  width={80}
                  height={80}
                />
                <div class="flex flex-col w-full">
                  <div class="flex flex-row justify-between">
                    <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">COMMENTOR</p>
                    <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                  </div>
                    <p class="text-gray-400 text-sm">20 April 2022, at 14:88 PM</p>
                  </div>
                </div>
              <p class="-mt-4 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />Maxime quisquam vero adipisci beatae voluptas dolor ame.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Learn