import Image from 'next/image'
import courseCover from "../../public/course-cover.jpg"
import photo from '../../public/png_dc_kaze-12.png'

export default function Course(){
  return(
    <div>
      <div>
        <Image src={courseCover} width="100%" alt="course cover" />
      </div>
      <div className='flex flex-row justify-center mt-10'>
        <div className='flex-col w-[750px] bg-base-300 rounded-xl p-5 mb-5'>
          <div className='mb-5'>
            <h1 className='font-bold text-4xl'>Course Name</h1>
          </div>
          {/* <div className="tabs">
            <a className="tab tab-bordered focus:tab-active">Overview</a> 
            <a className="tab tab-bordered focus:tab-active">Instructor</a> 
            <a className="tab tab-bordered focus:tab-active">Ratings</a>
          </div> */}
          <div className='mb-5'>
            <h1 className='font-bold text-xl mb-2'>Description</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div>
            <h1 className='font-bold text-xl mb-2'>Instructor</h1>
            <div className='flex'>
              <Image src={photo} width={100} height={100} alt='profile avatar' />
              <h1>Helen Page</h1>
            </div>
          </div>
        </div>
        <div className='flex-col ml-20 bg-base-300 p-5 mb-5 rounded-xl'>
          <h1 className='mb-5'>Price Rp 99.000</h1>
          <h1 className='mb-5'>Instructor Helen Page</h1>
          <div className='flex flex-col'>
            <button className="btn btn-active btn-primary mb-5">Buy this course</button>
            <button className="btn btn-outline btn-secondary">Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}