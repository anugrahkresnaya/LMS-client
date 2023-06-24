'use client'
import CourseList from "@/components/courseList"
import { useEffect, useState, useContext } from "react"
import { Context } from "@/context"
import axios from "axios"

const Course = () => {
  const { state: { user }, dispatch } = useContext(Context)
  const [listData, setListData] = useState([])

  useEffect(() => {
    getCourseList()
  }, [])
  const getCourseList = () => {
    axios.get('http://localhost:3001/courses')
    .then(res => {
      setListData(res.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const isLoggedIn = user?.accessToken
  // console.log(isLoggedIn)

  const renderList = listData.map(list => {
    return (
      <CourseList
        key={list.id}
        title={list.title}
        image={list.image}
        price={list.price}
        params={list.slug}
        isLoggedIn={isLoggedIn}
      />
    )
  })

  return (
    <div className="min-h-screen">
      <h1 className='text-center mt-5 font-bold text-5xl'>Courses</h1>
      <div className='flex justify-center flex-wrap m-5'>
        {renderList}
      </div>
    </div>
  )
}

export default Course