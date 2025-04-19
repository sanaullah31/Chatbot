'use client'

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaChevronRight, FaRobot, FaSpinner } from 'react-icons/fa'

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
		<div>
			<div>
				<h1>Active Chatbots Sessions</h1>
				<p>See all conversation between your Chatbot and User.</p>
			</div>

			<div>
				{loading && (
					<div className="flex justify-center items-center py-12 gap-3">
						<FaSpinner className="animate-spin text-blue-500 text-xl" />
						<span className="text-gray-600">Loading chatbots...</span>
					</div>
				)}
				{/* Chatbots list */}
				{allChatbots && allChatbots.map((chatbot) => (
					<div
						
						key={chatbot._id}
						className="flex mx-4 items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 group"
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
					</div>
				))}
			</div>
		</div>
	)
}

export default page
