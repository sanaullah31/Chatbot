"use client"


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from "next/navigation";

const page = () => {
    const params = useParams()
    const [loading, setLoading] = useState(false);
    const [chatbotName, setChatbotName] = useState('');
    const [url, setUrl] = useState('');

    const router = useRouter()
    const base_url = 'http://localhost:3000'
    // const base_url = 'https://chat-bot-pbc.vercel.app'

    useEffect(() => {
        setUrl(`${base_url}/chatbot/${params.id}`)
        getChat()
    }, [params.id])

    const getChat = async () => {
        setLoading(true)
        const res = await axios.get(`/api/chatbot?id=${params.id}`);
        console.log(res)
        setChatbotName(res.data.chatbot.name)
        setLoading(true)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(()=>{
            alert('copied')
        })
    }
    return (
        <div>
            {/* copy url section */}
            <div>
                <h2>Copy and share chatbot url </h2>
                <p>Share this link with your customers to start conversations with your chatbot.</p>
                <div>
                    <input type="text" readOnly value={url} />
                    <br />
                    <button onClick={copyToClipboard}>Copy</button>
                </div>
            </div>

            <div>
                <p>Chatbot Name : {chatbotName}</p>
            </div>
        </div>
    )
}

export default page
