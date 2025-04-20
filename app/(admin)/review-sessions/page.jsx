'use client'

import SessionCard from '@/components/SessionCard'
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
		try {
			const { data } = await axios.get('/api/chatbot/all');
			setAllChatbots(data.chatbots)

		} catch (error) {
			console.error('Error fetching chatbots:', error)
		} finally {
			setLoading(false)
		}
	}

	console.log(allChatbots);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">Active Chatbot Sessions</h1>
					<p className="text-gray-600">View all conversations between your chatbots and users</p>
				</div>

				{/* Content */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
					{/* List header */}
					<div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
						<h2 className="font-semibold text-gray-700">Your Chatbots</h2>
					</div>

					{/* Loading state */}
					{loading && (
						<div className="flex flex-col items-center justify-center py-12 gap-3">
							<FaSpinner className="animate-spin text-blue-500 text-2xl" />
							<span className="text-gray-600">Loading your chatbots...</span>
						</div>
					)}

					{/* Empty state */}
					{!loading && allChatbots.length === 0 && (
						<div className="text-center py-12">
							<div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
								<FaRobot className="text-blue-500 text-xl" />
							</div>
							<h3 className="text-lg font-medium text-gray-900 mb-1">No chatbots found</h3>
							<p className="text-gray-500 max-w-md mx-auto">You haven't created any chatbots yet. Get started by creating your first one.</p>
							<Link href="/create-chatbot" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
								Create Chatbot
							</Link>
						</div>
					)}

					{/* Chatbots list */}
					{!loading && allChatbots.length > 0 && (
						<div className="">
							{allChatbots.map((chatbot) => <SessionCard key={chatbot._id} chatbot={chatbot} />)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default page