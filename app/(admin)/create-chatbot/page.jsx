import { createChatbot } from '@/actions/chatbot'
import React from 'react'

const page = () => {
  return (
    <div>
      Create Chat bot


      <form action={createChatbot} className=''>
        <input type="text"
          name='chatbot_name'
          placeholder='Enter chatbot name'
        />
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'>Crate Chatbot</button>
      </form>
    </div>
  )
}

export default page
