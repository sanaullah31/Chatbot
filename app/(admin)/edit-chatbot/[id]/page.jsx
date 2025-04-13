"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from "next/navigation";
import { FaCopy, FaRobot, FaLink, FaSpinner, FaTrash } from 'react-icons/fa';

const Page = () => {
    const params = useParams()
    const [loading, setLoading] = useState(false);
    const [chatbotName, setChatbotName] = useState('');
    const [url, setUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const router = useRouter()
    const base_url = 'http://localhost:3000'
    // const base_url = 'https://chat-bot-pbc.vercel.app'

    useEffect(() => {
        setUrl(`${base_url}/chatbot/${params.id}`)
        getChat()
    }, [params.id])

    const getChat = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/api/chatbot?id=${params.id}`);
            setChatbotName(res.data.chatbot.name)
        } catch (error) {
            console.error("Error fetching chatbot:", error);
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    //  delete a chatbot
    const handleDeleteChat = async () => {
        setLoading(true)
        const res = await axios.delete(`/api/chatbot?id=${params.id}`)
        if (res.status == 200) {
            router.push('/create-chatbot')
        }
        setLoading(false)
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-8">
                <FaRobot className="text-blue-600 text-3xl" />
                <h1 className="text-2xl font-bold text-gray-800">Edit Chatbot</h1>
            </div>

            {/* URL Sharing Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FaLink className="text-blue-500" />
                    Share Your Chatbot
                </h2>
                <p className="text-gray-600 mb-4">
                    Share this link with your customers to start conversations with your AI assistant.
                    Anyone with this link can interact with your chatbot.
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            readOnly
                            value={url}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 pr-12"
                        />
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 min-w-[120px] transition-colors"
                    >
                        {copied ? 'Copied!' : (
                            <>
                                <FaCopy />
                                Copy
                            </>
                        )}
                    </button>
                </div>
                {copied && <p className="text-green-600 text-sm mt-2">Link copied to clipboard!</p>}
            </div>

            {/* Chatbot Info Section */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                {loading ? (
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <FaSpinner className="animate-spin" />
                        Loading chatbot details...
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Chatbot Details</h2>

                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Chatbot Name</p>
                                <p className="text-lg font-medium text-gray-800">{chatbotName || 'Not available'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Chatbot ID</p>
                                <p className="text-gray-800 font-mono">{params.id}</p>
                            </div>
                            <div>
                                <button
                                    className="text-red-600 hover:text-red-800 flex items-center gap-2 px-4 py-2 border  rounded-md hover:bg-red-50 transition-colors"
                                    onClick={handleDeleteChat}
                                >
                                    <FaTrash />
                                    Delete Chatbot
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Additional Help Section */}
            <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Need help with sharing?</h3>
                <p className="text-blue-700 text-sm">
                    You can embed this chatbot on your website or share the link directly with users.
                    The chatbot will respond based on the training data you've provided.
                </p>
            </div>
        </div>
    )
}

export default Page