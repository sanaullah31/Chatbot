
import { connectDB } from '@/DB/connect'
import Chatbot from '@/models/chatbot'
import React from 'react'

const page = async () => {
  await connectDB()
  const chatbots = await Chatbot.find()
  console.log(chatbots);
  

  return (
    <main className="container">
hello
    </main>
  )
}

export default page
