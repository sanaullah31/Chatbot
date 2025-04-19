
import Link from 'next/link'
import React from 'react'

const page = () => {


    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-md p-8">
                <p className="text-gray-800 text-lg mb-6">
                    Welcome to IntraChat AI<br />
                    Create your first AI Chatbot for free.
                </p>
                <Link
                    href={'/create-chatbot'}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                    Create Chatbot
                </Link>
            </div>
        </main>
    )
}

export default page
