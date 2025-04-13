'use server'

import { connectDB } from "@/DB/connect";
import Chatbot from "@/models/chatbot";
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';


export async function createChatbot(formData) {
    const { userId } = await auth()
    connectDB()
    const chatbot = await Chatbot.create({
        clerk_user_id: userId,
        name: formData.get('chatbot_name')
    });
    redirect(`/edit-chatbot/${chatbot._id}`)
}