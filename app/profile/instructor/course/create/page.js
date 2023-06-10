'use client'
import { useEffect, useState } from "react"
import CourseCreateForm from "@/components/forms/CourseCreateForm"
import Resizer from "react-image-file-resizer"
import axios from "axios"
import Swal from "sweetalert2"

const CourseCreate = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '10000',
    paid: true,
    loading: false,
  })
  const [image, setImage] = useState({})
  const [preview, setPreview] = useState('')

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    let file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
    setValues({ ...values, loading: true })
    
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let {data} = await axios.post('http://localhost:3001/course/upload-image', {
          image: uri,
        })
        console.log('image uploaded', data)
        //set image in the state
        setImage(data)
        setValues({ ...values, loading: false })
      } catch (error) {
        console.log('resizer error: ', error)
        setValues({ ...values, loading: false })
        Swal.fire(
          'Error',
          'Image preview upload failed. Please try again later',
          'error'
        )
      }
    })
  }

  const handleRemoveImage = async () => {
    console.log("Remove Image")
    try {
      // console.log('values: ', values)
      setValues({ ...values, loading: true })
      const res = await axios.post('http://localhost:3001/course/remove-image', { image })
      setImage({})
      setPreview('')
      setValues({ ...values, loading: false })
    } catch (error) {
      console.log(error)
      setValues({ ...values, loading: false })
      Swal.fire(
        'Error',
        'Image preview upload failed. Please try again later',
        'error'
      )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("values", values)
  }

  return (
    <div>
      <h1>Create Course</h1>
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          handleRemoveImage={handleRemoveImage}
        />
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre>
    </div>
  )
}

export default CourseCreate