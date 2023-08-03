'use client'
import { useEffect } from "react"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import purchaseSuccess from '@/public/purchase-success.svg'
import purchasePending from '@/public/purchase-pending.svg'

export default function Payment() {
  const api = process.env.NEXT_PUBLIC_ORIGIN_API

  const searchParams = useSearchParams()

  const order_id = searchParams.get('order_id')
  const transaction_status = searchParams.get('transaction_status')

  useEffect(() => {
    handleUpdateOrderStatus()
  }, [])

  const handleUpdateOrderStatus = () => {
    axios.post(`${api}/payment/updateStatus`, {
      order_id: order_id,
      transaction_status: transaction_status
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }
  
  return(
    <div className="min-h-screen">
      {transaction_status === 'settlement' && (
        <div className="pb-10">
          <Image 
            src={purchaseSuccess}
            alt="purchase success"
            width={800}
            height={800}
            className="flex justify-center mx-auto"
          />
          <h1 className="font-bold text-5xl text-center">You can check your course now</h1>
        </div>
      )}
      {transaction_status !== 'settlement' && (
        <div className="pb-10">
          <Image 
            src={purchasePending}
            alt="purchase pending"
            width={800}
            height={800}
            className="flex justify-center mx-auto"
          />
          <h1 className="font-bold text-5xl text-center mb-5">Your purchased pending! You should retry to buy the course again</h1>
          <p className="text-xl text-center">Or if you already purchased the course and didnt get the course access. try contact the admin.</p>
        </div>
      )}
    </div>
  )
}