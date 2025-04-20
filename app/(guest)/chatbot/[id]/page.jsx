'use client'

import axios from 'axios'
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from 'react'
import MessagesContainer from './components/MessagesContainer'


const page = () => {
    const params = useParams()
    const [isOpen, setIsOpen] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [chatbot, setChatbot] = useState('')
    const [sessionId, setSessionId] = useState('')
    const [messages, setMessages] = useState([])

    const createGuest = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(`/api/chatbot?id=${params.id}`, {
                name,
                email
            });
            console.log(res)
            setSessionId(res.data.chatSessionId)
            setIsOpen(false)
        } catch (error) {
            console.error('Error creating guest:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const getChat = async () => {
        const res = await axios.get(`/api/chatbot?id=${params.id}`);
        setChatbot(res.data.chatbot.name)
        console.log(res)
    }

    const getAllSessionMessages = async () => {
        if (!sessionId) return;
        const res = await axios.get(`/api/messages/session-messages?sessionId=${sessionId}`);
        console.log(res)
        setMessages(res.data.messages)
    }

    const sendMessageHandler = async (e) => {
        e.preventDefault()
        try {
            const messageText = e.target.message.value;
            if (!messageText.trim()) return;
            
            e.target.message.value = ''; // Clear input after sending
            
            const res = await axios.post(`/api/messages/send?session_id=${sessionId}&chat_id=${params.id}`, {
                message: messageText,
                sender: 'user',
                name
            });
            console.log(res);
            
            
            if (res.data.success) {
                setMessages(res.data.allMessages);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }


    useEffect(() => {
        getChat()
        getAllSessionMessages()
    }, [params.id, sessionId, messages.length])

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
            {isOpen && (
                <div className='fixed top-0 left-0 w-full min-h-screen bg-gray-50 flex items-center justify-center'>
                    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to Chatbot</h2>
                        <p className="text-gray-600 mb-6 text-center">Please enter your information to start chatting</p>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    name="name"
                                    value={name}
                                    placeholder='Enter your name'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    value={email}
                                    placeholder='Enter your email'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                onClick={createGuest}
                                type="submit"
                                disabled={isLoading || !name || !email}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Processing...' : 'Start Chatting'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {!isOpen && (
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{chatbot}</h2>

                    {/* Messages Container Component */}
                    <MessagesContainer messages={messages} />

                    <div>
                        <form onSubmit={sendMessageHandler} className="flex">
                            <input 
                                type="text" 
                                name='message' 
                                placeholder='Type your message...' 
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button 
                                type='submit'
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-r-md transition duration-200"
                            >
                                Send
                            </button>
                        </form>
                    </div>


                </div>
            )}
        </main>
    )
}

export default page
