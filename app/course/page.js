'use client'
import CourseList from "@/components/courseList"
import { useEffect, useState, useContext } from "react"
import { Context } from "@/context"
import axios from "axios"
import Swal from "sweetalert2"
import imageCourse from '@/public/course-default.jpg'

const Course = () => {
  const { state: { user }, dispatch } = useContext(Context)
  const [listData, setListData] = useState([])
  const [keyword, setKeyword] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([])

  const api = process.env.NEXT_PUBLIC_ORIGIN_API

  useEffect(() => {
    const getCourseList = () => {
      axios.get(`${api}/courses`)
      .then(res => {
        setListData(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
    
    getCourseList()
  }, [api])


  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      axios.get(`${api}/searchCourses?keyword=${keyword}`)
      .then(res => {
        setSearchData(res.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          position: "center",
          title: "Error!",
          icon: "error",
          text: "Course not found",
          showConfirmButton: true,
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  const isLoggedIn = user?.accessToken

  const renderList = listData.map(list => {
    return (
      <CourseList
        key={list.id}
        title={list.title}
        image={list?.image || imageCourse}
        price={list.price}
        params={list.slug}
        isLoggedIn={isLoggedIn}
      />
    )
  })

  const renderSearchList = searchData.map(item => {
    return (
      <CourseList
        key={item.id}
        title={item.title}
        image={item?.image || imageCourse}
        price={item.price}
        params={item.slug}
        isLoggedIn={isLoggedIn}
      />
    )
  })

  return (
    <div className="min-h-screen">
      <h1 className='text-center mt-5 font-bold text-5xl'>Courses</h1>
      <div className="join flex justify-end mx-5">
        <form method="get" onSubmit={handleSearch} className="mt-10">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search courses..."
            className="input input-primary input-bordered join-item"
          />
          <button type="submit" className="btn join-item">search</button>
        </form>
      </div>
      {searchData.length === 0 ? (
        <div className='flex justify-center flex-wrap m-5'>
          {renderList}
        </div>
      ) : (
        <>
          {loading ? (
            <div className="text-center mt-5">
              <span className="loading loading-ring loading-lg"></span>
              <h1>Searching...</h1>
            </div>
          ) : (
            <div className='flex justify-center flex-wrap m-5'>
              {renderSearchList}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Course