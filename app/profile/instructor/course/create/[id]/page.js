'use client'
import axios from "axios"
import Swal from "sweetalert2"
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/context"

const CourseCreate = ({params}) => {
  const api = process.env.NEXT_PUBLIC_ORIGIN_API

  const { state: { user } } = useContext(Context)

  const router = useRouter()

  const [values, setValues] = useState({
    title: null,
    description: '',
    paid: true,
    price: 0,
  })
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [pdf, setPdf] = useState(null)
  const [video, setVideo] = useState(null)

  const handleImage = (e) => {
    let imageFile = e.target.files[0]
    setImagePreview(imageFile)
  }

  const handleVideo = (e) => {
    let videoFile = e.target.files[0]
    setVideo(videoFile)
  }

  const handlePdf = (e) => {
    let pdfFile = e.target.files[0]
    setPdf(pdfFile)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await axios.post(`${api}/course/${params.id}/create-course`, {
        title: values.title,
        description: values.description,
        paid: values.paid,
        price: values.price,
        image: imagePreview,
        video: video,
        pdf: pdf,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      Swal.fire({
        position: "center",
        title: "Successfull!",
        icon: "success",
        text: "Course successfuly uploaded",
        showConfirmButton: true,
      })
      setLoading(false)
      router.push('/course')
    } catch (error) {
      console.log(error)
      Swal.fire({
        position: "center",
        title: "Failed!",
        icon: "error",
        text: error?.response?.data?.message || "Course upload failed",
        showConfirmButton: true,
      })
      setLoading(false)
    }
  }

  return (
    <div className="mb-5">
      <h1 className="text-center font-bold text-5xl mb-5">Create Course</h1>
      <div className="mx-auto max-w-xl">
        <form onSubmit={handleSubmit} className="flex justify-center flex-col bg-base-300 rounded px-5">
          <input 
            type="text"
            name="title"
            placeholder="Course Name"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            className="input input-bordered input-primary w-full mt-5"
            required
          />
          <textarea 
            name="description" 
            id="description" 
            cols="7"
            rows="7"
            placeholder="Course Description"
            value={values.description}
            onChange={(e) => setValues({ ...values, description: e.target.value })}
            className="mt-5 p-4 bg-base-100"
          ></textarea>
          <div>
            <select 
              className="select select-primary w-full mt-5"
              value={values.paid}
              onChange={(v) => setValues({ ...values, paid: !values.paid })}
            >
              <option disabled selected>Is it paid or free?</option>
              <option value={true}>Paid</option>
              <option value={false}>Free</option>
            </select>
            {values.paid && (
              <div>
                <label htmlFor="price" className="mt-5">Input your price</label>
                <input 
                  type="number"
                  name="price"
                  placeholder="Rp."
                  onChange={(e) => setValues({ ...values, price: e.target.value })}
                  className="input input-bordered input-primary w-full mt-1"
                />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="image" className="mt-5">Input file for image preview course</label>
            <input 
              type="file" 
              name="image"
              onChange={handleImage}
              accept="image/*"
              className="file-input file-input-bordered file-input-primary w-full mt-1"
            />
          </div>
          <div>
            <label htmlFor="video" className="mt-5">Input file for video course</label>
            <input 
              type="file" 
              name="video"
              onChange={handleVideo}
              accept="video/*"
              className="file-input file-input-bordered file-input-primary w-full mt-1"
            />
          </div>
          <div>
            <label htmlFor="pdf" className="mt-5">Input file for pdf course</label>
            <input 
              type="file" 
              name="pdf"
              onChange={handlePdf}
              accept=".pdf"
              className="file-input file-input-bordered file-input-primary w-full mt-1"
            />
          </div>
          {loading ? (
            <button
              className="btn btn-outline btn-primary w-40 mx-auto my-5" 
            >
              <span className="loading loading-spinner"></span>
              uploading
            </button>
          ) : (
            <button
              className="btn btn-outline btn-primary w-40 mx-auto my-5" 
              onClick={handleSubmit}
            ><span></span>Save</button>
          )}
        </form>
      </div>
    </div>
  )
}

export default CourseCreate