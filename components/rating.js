import Image from "next/image"
import { FaStar } from "react-icons/fa"
import defaultPhoto from '@/public/default.jpg'

const Rating = ({ photo, firstName, lastName, rating, review }) => {
  const totalStars = 5
  const filledStars = Math.round(rating * 5) /5

  return (
    <div className="flex flex-wrap bg-base-300 pl-5 sm:pl-0 mb-5">
      <figure>
        <Image 
          src={photo || defaultPhoto}
          alt="profile"
          width={100}
          height={100}
          className="mr-5 rounded shrink-0"
        />
      </figure>
      <div className="">
        <h1>{firstName || 'Anonymous'} {lastName || ''}</h1>
        <div className="flex flex-row">
          {[...Array(totalStars)].map((_, index) => {
            const starValue = index + 1
            return (
              <span key={index}>
                <FaStar 
                  color={starValue <= filledStars ? 'gold' : 'gray'}
                  size={20}
                />
              </span>
            )
          })}
        </div>
        <p className="w-96">{review}</p>
      </div>
    </div>
  )
}

export default Rating