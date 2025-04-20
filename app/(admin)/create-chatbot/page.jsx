'use client'

import { FaPlus, FaRobot, FaSpinner } from 'react-icons/fa';
import { createChatbot } from '@/actions/chatbot'
import React, { useState } from 'react'

const page = () => {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (formData) => {
		setLoading(true);
		try {
			// Call the server action
			await createChatbot(formData);
		} catch (error) {
			console.error('Error creating chatbot:', error);
		} finally {
			// In production this might not be reached if there's a redirect
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 py-8 mt-8">
			<div className="text-center mb-6">
				<div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
					<FaRobot className="text-blue-600 text-2xl" />
				</div>
				<h2 className="text-2xl font-bold text-gray-800">
					Create Your Chatbot
				</h2>
				<p className="text-gray-600 mt-2">
					Give your AI assistant a name and start building in minutes.
				</p>
			</div>

			<form action={handleSubmit} className="space-y-6">
				<div>
					<label htmlFor="chatbot_name" className="block text-sm font-medium text-gray-700 mb-2">
						Chatbot Name
					</label>
					<div className="relative">
						<input
							type="text"
							id="chatbot_name"
							name="chatbot_name"
							placeholder="e.g. Customer Support Bot"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pl-11"
							required
							disabled={loading}
						/>
						<FaRobot className="absolute left-3 top-3.5 text-gray-400" />
					</div>
					<p className="mt-1 text-xs text-gray-500">
						This will be displayed to your users
					</p>
				</div>

				{loading && (
					<div className="flex justify-center items-center py-3 px-4 bg-blue-600 rounded-lg text-white gap-3">
						<FaSpinner className="animate-spin text-white text-xl" />
						<span>Creating chatbot...</span>
					</div>
				)}

				{!loading && (
					<button
						type="submit"
						className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
					>
						<FaPlus />
						<span>Create Chatbot</span>
					</button>
				)}
			</form>
		</div>
	)
}

export default page
