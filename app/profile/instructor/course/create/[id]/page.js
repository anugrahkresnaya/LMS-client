'use client'
import Resizer from "react-image-file-resizer"
import axios from "axios"
import Swal from "sweetalert2"
import Image from "next/image";
import { useState } from "react";
import { Router, useRouter } from "next/navigation";

const CourseCreate = ({params}) => {
  console.log('params', params)
  const router = useRouter()
  const [values, setValues] = useState({
    title: '',
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
    console.log('image file', imageFile)
    setImagePreview(imageFile)
  }

  console.log('image preview'. imagePreview)

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
      const { data } = await axios.post(`http://localhost:3001/course/${params.id}/create-course`, {
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
        title: "Error!",
        icon: "error",
        text: "Course upload failed",
        showConfirmButton: true,
      })
      setLoading(false)
    }
  }

  // const handleImage = (e) => {
  //   let file = e.target.files[0]
  //   console.log('file: ', file)
  //   setPreview(window.URL.createObjectURL(file))
  //   setValues({ ...values, loading: true })
    
  //   // resize
  //   Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
  //     try {
  //       let {data} = await axios.post('http://localhost:3001/course/upload', {
  //         image: uri,
  //       })
  //       console.log('image uploaded', data)
  //       //set image in the state
  //       setImage(data)
  //       setValues({ ...values, loading: false })
  //     } catch (error) {
  //       console.log('resizer error: ', error)
  //       console.log(error.message)
  //       setValues({ ...values, loading: false })
  //       Swal.fire(
  //         'Error',
  //         'Image preview upload failed. Please try again later',
  //         'error'
  //       )
  //     }
  //   })
  // }

  // const handleRemoveImage = async () => {
  //   console.log("Remove Image")
  //   try {
  //     setImagePreview(null)
  //     // console.log('values: ', values)
  //     // setValues({ ...values, loading: true })
  //     // const res = await axios.post('http://localhost:3001/course/remove-image', { image })
  //     // setImage({})
  //     // setPreview('')
  //     // setValues({ ...values, loading: false })
  //   } catch (error) {
  //     console.log(error)
  //     // setValues({ ...values, loading: false })
  //     Swal.fire(
  //       'Error',
  //       'Image preview upload failed. Please try again later',
  //       'error'
  //     )
  //   }
  // }

  return (
    <div>
      <h1>Create Course</h1>
      <div className="mx-auto max-w-xl">
        <form onSubmit={handleSubmit} className="flex justify-center flex-col bg-base-300 rounded px-5">
          <input 
            type="text"
            name="title"
            placeholder="Course Name"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            className="input input-bordered input-primary w-full mt-5"
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
            {/* {imagePreview && (
              <div>
                <div className="avatar mt-5 flex justify-center">
                  <div className="w-24 rounded">
                    <Image 
                      src={imagePreview} 
                      width={40} 
                      height={40} 
                      alt="course preview"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <button 
                    className="btn btn-xs btn-primary"
                    onClick={handleRemoveImage}
                  >
                    delete
                  </button>
                </div>
              </div> 
            )} */}
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
            ><span className="loading loading-spinner"></span>Save</button>
          )}
        </form>
      </div>
    </div>
  )
}

export default CourseCreate