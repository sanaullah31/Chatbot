import { connectDB } from '@/DB/connect'
import React from 'react'

const page = () => {
  connectDB()
  return (
    <div>
      Edit chat bot
    </div>
  )
}

export default page
