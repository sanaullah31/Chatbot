'use client'

import { FaRobot, FaChevronRight, FaSpinner, FaRegComment } from 'react-icons/fa';
import { connectDB } from '@/DB/connect'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {

	const [allChatbots, setAllChatbots] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		getAllChatbots()
	}, [])

	const getAllChatbots = async () => {
		setLoading(true)
		const { data } = await axios.get('/api/chatbot/all');
		console.log(data)
		setLoading(false)
		setAllChatbots(data.chatbots)
	}



	return (

	<div className="space-y-4 max-w-3xl mx-auto py-8">
		{/* Loading state */}
		{loading && (
			<div className="flex justify-center items-center py-12 gap-3">
				<FaSpinner className="animate-spin text-blue-500 text-xl" />
				<span className="text-gray-600">Loading chatbots...</span>
			</div>
		)}

		{/* Chatbots list */}
		{allChatbots && allChatbots.map((chatbot) => (
			<Link
				href={`/edit-chatbot/${chatbot._id}`}
				key={chatbot._id}
				className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 group"
			>
				<div className="bg-blue-100 p-3 rounded-full mr-4">
					<FaRobot className="text-blue-600 text-xl" />
				</div>
				<div className="flex-1">
					<h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
						{chatbot.name}
					</h3>
					<p className="text-sm text-gray-500">
						Created: {new Date(chatbot.created_at).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}
					</p>
				</div>
				<FaChevronRight className="text-gray-400 group-hover:text-blue-600 ml-2" />
			</Link>
		))}

		{/* Empty state */}
		{!loading && allChatbots && allChatbots.length === 0 && (
			<div className="text-center py-12 bg-white rounded-lg border border-gray-200">
				<div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
					<FaRegComment className="text-blue-600 text-2xl" />
				</div>
				<h3 className="text-lg font-medium text-gray-900">No chatbots yet</h3>
				<p className="mt-1 text-gray-500 mb-4">Get started by creating your first chatbot</p>
				<Link
					href="/create-chatbot"
					className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
				>
					Create Chatbot
				</Link>
			</div>
		)}
	</div>
	)
}

export default page
