"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from "next/navigation"
import { FaCopy, FaRobot, FaLink, FaSpinner, FaTrash } from 'react-icons/fa'
import Characterestics from "@/components/Characterestics"
import { IoIosAddCircle } from "react-icons/io";
import { addCharacteristics } from "@/actions/chatbot";




const Page = () => {
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [chatbotName, setChatbotName] = useState('')
    const [url, setUrl] = useState('')
    const [copied, setCopied] = useState(false)
    const [characteristics, setCharacteristics] = useState("")
    const [chars, setChars] = useState([])

    const router = useRouter()
    // const base_url = 'http://localhost:3000'
    const base_url = 'https://chat-bot-pbc.vercel.app'

    useEffect(() => {
        setUrl(`${base_url}/chatbot/${params.id}`)
        getChat()
        getChatChars()
    }, [params.id])

    const getChat = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/api/chatbot?id=${params.id}`)
            setChatbotName(res.data.chatbot.name)
        } catch (error) {
            console.error("Error fetching chatbot:", error)
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    const handleDeleteChat = async () => {
        setLoading(true)
        const res = await axios.delete(`/api/chatbot?id=${params.id}`)
        if (res.status == 200) {
            router.push('/edit-chatbot')
        }
        setLoading(false)
    }
    const addCharacteristicsHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.set("characteristics", characteristics)
        formData.set("chatbotId", params.id)
        await addCharacteristics(formData)
        setLoading(false)
        setCharacteristics("")
        await getChatChars()
    }
    const getChatChars = async () => {
        const res = await axios.get(`/api/chatbot/characteristics?id=${params.id}`)
        setChars(res.data.chars)
    }
    const deleteChar = async (id) => {
        setLoading(true)
        await axios.delete(`/api/chatbot/characteristics?char_id=${id}`)
        setLoading(false)
        await getChatChars()
    }

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Header Section */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="p-3 bg-blue-100 rounded-full">
                    <FaRobot className="text-blue-600 text-2xl" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Chatbot Settings</h1>
                    <p className="text-gray-500 text-sm">Manage and customize your AI assistant</p>
                </div>
            </div>

            {/* URL Sharing Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <FaLink className="text-blue-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Share Your Chatbot</h2>
                </div>

                <p className="text-gray-600 mb-4">
                    Share this link to let others interact with your AI assistant:
                </p>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Chatbot URL</label>
                    <div className="flex gap-2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                readOnly
                                value={url}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 pr-12"
                            />
                           
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 min-w-[100px] justify-center"
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    {copied && (
                        <p className="text-green-600 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Link copied to clipboard
                        </p>
                    )}
                </div>
            </div>

            {/* Chatbot Details Card */}
            <div className="bg-white rounded-xl shadow-sm py-6 px-2">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <FaSpinner className="animate-spin text-2xl text-blue-500" />
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Chatbot Details</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 block mb-1">Name</label>
                                <p className="text-gray-800 p-2 bg-gray-50 rounded-lg">{chatbotName || 'Not available'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500 block mb-1">Chatbot ID</label>
                                <p className="font-mono text-gray-700 p-2 bg-gray-50 rounded-lg break-all">{params.id}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={handleDeleteChat}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                            >
                                <FaTrash />
                                Delete Chatbot
                            </button>
                        </div>
                        {/* Knowledge Base Card */}
                        <div className="bg-white rounded-xl  py-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Knowledge Base</h2>
                            </div>

                            <p className="text-gray-600 mb-4">
                                Add information to train your chatbot's responses:
                            </p>

                            <form onSubmit={addCharacteristicsHandler} className="mb-6">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        onChange={(e) => setCharacteristics(e.target.value)}
                                        value={characteristics}
                                        className="flex-grow px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                                        type="text"
                                        placeholder="Example: 'We offer free shipping on all orders'"
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 justify-center min-w-[100px]"
                                    >
                                        <IoIosAddCircle />
                                        Add
                                    </button>
                                </div>
                            </form>

                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="font-medium text-gray-700 mb-3">Current Knowledge</h3>
                                {chars.length > 0 ? (
                                    <ul className="space-y-3">
                                        {chars.map((char, index) => (
                                            <Characterestics key={index} char={char} deleteChar={deleteChar} loading={loading} />
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                                        No knowledge added yet
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>




        </div>
    )
}

export default Page