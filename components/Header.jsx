import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='bg-blue-600 text-white h-[60px]'>
      <nav>
        <div>
            <Link href={'/'}>Logo</Link>
           
        </div>
        <div className='flex gap-4 '>
            <Link href={'/create-chatbot'}>Create Chatbot</Link>
            <Link href={'/edit-chatbot'}>edit Chatbot</Link>
            <Link href={'/review-sessions'}>review-sessions</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
