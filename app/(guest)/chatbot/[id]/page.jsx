'use client'

import axios from 'axios'
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from 'react'
import MessagesContainer from './components/MessagesContainer'
import { FaRobot, FaPaperPlane } from 'react-icons/fa'


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
            
            // Clear input field immediately
            e.target.message.value = '';
            
            // Create a temporary message object for immediate display
            const tempUserMessage = {
                _id: Date.now().toString(),
                content: messageText,
                sender: 'user',
                chat_session_id: sessionId,
                created_at: new Date().toISOString()
            };
            
            // Add the message to the state immediately for better UX
            setMessages(prevMessages => [...prevMessages, tempUserMessage]);
            
            // Send the message to the API
            const res = await axios.post(`/api/messages/send?session_id=${sessionId}&chat_id=${params.id}`, {
                message: messageText,
                sender: 'user',
                name
            });
            console.log(res);
            
            if (res.data.success) {
                // Update with the complete message list from the server
                setMessages(res.data.allMessages);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }


    useEffect(() => {
        getChat()
        getAllSessionMessages()
    }, [params.id, sessionId])

    return (
        <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 min-h-screen bg-gray-50">
            {isOpen && (
                <div className='fixed top-0 left-0 w-full min-h-screen bg-gray-50 flex items-center justify-center p-4'>
                    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">Welcome to Chatbot</h2>
                        <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">Please enter your information to start chatting</p>

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
                                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                onClick={createGuest}
                                type="submit"
                                disabled={isLoading || !name || !email}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                {isLoading ? 'Processing...' : 'Start Chatting'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {!isOpen && (
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md flex flex-col h-[calc(100vh-2rem)]">
                    {/* Sticky header */}
                    <div className="sticky top-0 z-10 bg-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 rounded-t-lg">
                        <div className="flex items-center">
                            <div className="bg-blue-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                                <FaRobot className="text-blue-600 text-lg sm:text-xl" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{chatbot}</h2>
                        </div>
                    </div>
                    
                    {/* Chat content area - takes remaining height */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                        <MessagesContainer messages={messages} />
                    </div>
                    
                    {/* Sticky footer with message input */}
                    <div className="sticky bottom-0 z-10 bg-white px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 rounded-b-lg">
                        <form onSubmit={sendMessageHandler} className="flex w-full">
                            <input 
                                type="text" 
                                name='message' 
                                placeholder='Type your message...' 
                                className="flex-1 min-w-0 px-3 sm:px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                autoComplete="off"
                            />
                            <button 
                                type='submit'
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 sm:px-6 rounded-r-md transition duration-200 flex items-center justify-center"
                                aria-label="Send message"
                            >
                                <FaPaperPlane className="text-sm" />
                                <span className="hidden sm:inline ml-2">Send</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}

export default page
