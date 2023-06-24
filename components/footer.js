import Image from "next/image";
import logoWhite from '../public/logo-white.png'
import { MdOutlineEmail } from 'react-icons/md'
import { AiOutlineInstagram } from 'react-icons/ai'

export default function Footer() {
  return(
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <Image src={logoWhite} width={100} height={100} alt="oceanz logo" />
        <p>Oceanz Platform<br/>Providing online courses since 2023.</p>
      </div> 
      <div>
        <span className="footer-title" id="#contact">Contact</span> 
        <div className="grid grid-flow-row gap-4">
          <span className="flex items-center align-middle"><MdOutlineEmail className="mr-2" />oceanzplatform@gmail.com</span>
          <span className="flex items-center align-middle"><AiOutlineInstagram className="mr-2" />oceanzplatform</span>
        </div>
      </div>
    </footer>
  )
}