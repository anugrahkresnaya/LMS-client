'use client'
import axios from "axios"
import { useState, useContext } from "react"
import { Context } from "@/context"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

export default function RatingForm({params}) {
  const {
    state: { user }
  } = useContext(Context)
  const [selected, setSelected] = useState(5)
  const [review, setReview] = useState('')

  const router = useRouter()

  const api = process.env.NEXT_PUBLIC_ORIGIN_API

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios.post(`${api}/rating/${params.slug}`, {
      userId: user?.id,
      value: selected,
      review: review,
      courseSlug: params.slug
    }, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    })
    .then(res => {
      Swal.fire({
        position: "center",
        title: "Successfull!",
        icon: "success",
        text: "Review submitted successfully",
        showConfirmButton: true,
      })
      router.push('/')
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-center font-bold text-5xl mb-5">Rating</h1>
      <div className="mx-auto max-w-xl mb-5">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex justify-center flex-col bg-base-300 rounded px-5"
        >
          <p className="mt-5 mb-2">How was the course?</p>
          <div className="rating mb-5">
            <input 
              type="radio" 
              name="rating-2"
              value={1}
              onChange={(e) => setSelected(e.target.value)}
              className="mask mask-star-2 bg-orange-400" 
            />
            <input 
              type="radio" 
              name="rating-2"
              value={2}
              onChange={(e) => setSelected(e.target.value)}
              className="mask mask-star-2 bg-orange-400" 
            />
            <input 
              type="radio" 
              name="rating-2"
              value={3}
              onChange={(e) => setSelected(e.target.value)}
              className="mask mask-star-2 bg-orange-400" 
            />
            <input
              type="radio" 
              name="rating-2"
              value={4}
              onChange={(e) => setSelected(e.target.value)}
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              value={5}
              onChange={(e) => setSelected(e.target.value)}
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
          <textarea 
            name="review"
            id=""
            cols="30"
            rows="10"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mb-5 p-5"
          ></textarea>
          <button className="btn btn-primary mb-5">Submit</button>
        </form>
      </div>
    </div>
  )
}