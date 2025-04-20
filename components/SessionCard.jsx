'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'
import { FaRobot, FaUser, FaEnvelope, FaClock } from 'react-icons/fa'
import { IoIosArrowDropdownCircle } from "react-icons/io"

const SessionCard = ({ chatbot }) => {
    const [sessionLoading, setSessionLoading] = useState(false)
    const [allSessions, setAllSessions] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)

    const getSessions = useCallback(async () => {
        setSessionLoading(true)
        try {
            const { data } = await axios.get(`/api/chatbot/sessions?chatbot_id=${chatbot._id}`)
            setAllSessions(data.sessions)
        } catch (error) {
            console.error('Error fetching sessions:', error)
        } finally {
            setSessionLoading(false)
        }
    }, [chatbot._id])

    useEffect(() => {
        getSessions()
    }, [getSessions])

    const formatTimeAgo = (dateString) => {
        const now = new Date()
        const date = new Date(dateString)
        const diffInSeconds = Math.floor((now - date) / 1000)

        if (diffInSeconds < 60) return `${diffInSeconds} sec ago`
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hrs ago`
        return `${Math.floor(diffInSeconds / 86400)} days ago`
    }

    const toggleDropdown = () => {
        if (allSessions.length > 0) {
            setShowDropdown(!showDropdown)
        }
    }

    return (
        <div className="block border-2 border-blue-400 rounded-lg m-4 hover:bg-gray-50 transition-colors duration-150 overflow-hidden">
            <div className="flex items-center p-6 ">
                <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                    <FaRobot className="text-blue-600 text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 truncate text-lg">
                        {chatbot.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Created: {new Date(chatbot.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            <div className="sessions">
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div 
                        onClick={toggleDropdown}
                        className={`py-2 px-3 rounded flex items-center justify-between cursor-pointer transition-colors ${allSessions.length > 0 ? 'hover:bg-gray-300 bg-gray-200' : 'bg-gray-100'}`}
                    >
                        <h4 className="font-semibold text-gray-700">
                            Active Sessions ({allSessions.length})
                        </h4>
                        {allSessions.length > 0 && (
                            <IoIosArrowDropdownCircle 
                                className={`text-blue-500 transition-transform ${showDropdown ? 'transform rotate-180' : ''}`}
                                size={20}
                            />
                        )}
                    </div>
                    
                    {showDropdown && (
                        <div className="mt-3 space-y-2">
                            {sessionLoading ? (
                                <div className="text-center py-4 text-gray-500">Loading sessions...</div>
                            ) : allSessions.length === 0 ? (
                                <div className="text-center py-4 text-gray-500">No active sessions</div>
                            ) : (
                                allSessions.map(session => (
                                    <Link 
                                        href={`/review-sessions/${session._id}`} 
                                        key={session._id} 
                                        className="block px-4 py-3 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaUser className="text-blue-500 flex-shrink-0" />
                                            <span className="font-medium text-gray-800 truncate">
                                                {session.guest_id?.name || 'Anonymous'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaEnvelope className="text-blue-500 flex-shrink-0" />
                                            <span className="text-gray-600 text-sm truncate">
                                                {session.guest_id?.email || 'No email'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaClock className="text-blue-500 flex-shrink-0" />
                                            <span className="text-gray-500 text-xs">
                                                Started {formatTimeAgo(session.created_at)}
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default React.memo(SessionCard)