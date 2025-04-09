'use client'

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
		<div>

			{
				loading && <p>Loading....</p>
			}
			{
				allChatbots && allChatbots.map((chatbot) => (
					<Link href={`/edit-chatbot/${chatbot._id}`} key={chatbot._id}>
						<p>{chatbot.name}</p>
						<p>Created at : {new Date(chatbot.created_at).toString().slice(0, 10)}</p>
					</Link>
				))
			}
		</div>
	)
}

export default page
