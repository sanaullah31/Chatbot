'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { format } from 'timeago.js'

const Page = () => {
    const params = useParams()
    const [session, setSession] = useState(null)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSessionDetails()
        getSessionMessages()
    }, [params.id])

    const getSessionDetails = async () => {
        try {
            const res = await axios.get(`/api/chatbot/sessions?session_id=${params.id}`)
            setSession(res.data.session)
        } catch (error) {
            console.error('Error fetching session:', error)
        }
    }

    const getSessionMessages = async () => {
        try {
            const res = await axios.get(`/api/messages/session-messages?sessionId=${params.id}`)
            setMessages(res.data.messages)
        } catch (error) {
            console.error('Error fetching messages:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FaSpinner className="animate-spin text-blue-500 text-2xl" />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 min-h-screen bg-gray-50">
            {/* Session Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Session Review</h1>
                <div className="space-y-2 text-gray-600">
                    <p className="flex items-center gap-2">
                        <span className="font-medium">Session Started:</span>
                        {new Date(session?.created_at).toLocaleString()}
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="font-medium">User:</span>
                        {session?.guest_id?.name || 'Anonymous'} 
                        ({session?.guest_id?.email || 'No email'})
                    </p>
                </div>
            </div>

            {/* Messages Container */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Conversation History</h2>
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
                        >
                            <div 
                                className={`max-w-[80%] p-3 rounded-lg ${
                                    message.sender === 'ai' 
                                        ? 'bg-blue-100 text-blue-900' 
                                        : 'bg-green-100 text-green-900'
                                }`}
                            >
                                <div className="break-words">{message.content}</div>
                                <div className="text-xs mt-1 opacity-50">
                                      {new Date(message.created_at).toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    ))}

                    {messages.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No messages in this session
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page
