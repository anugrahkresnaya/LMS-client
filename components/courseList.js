import Image from "next/image"
import Link from "next/link"

const CourseList = ({ title, price, image, params, isLoggedIn }) => {
  return (
    <div className="card w-96 bg-base-100 m-5 shadow-xl">
      <figure>
        <Image 
          src={image} 
          alt="Course"
          width={400}
          height={400}
        />
      </figure>
      <div className="card-body bg-base-300">
        <Link href={`/course/${params}`}>
          <h2 className="card-title">{title}</h2>
        </Link>
        <p></p>
        <h3>{price || 'Free'}</h3>
        {isLoggedIn && (
          <div className="card-actions justify-end">
            <Link className="btn btn-primary" href={`/course/${params}`}>Details</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseList