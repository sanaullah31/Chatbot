'use server'

import { connectDB } from "@/DB/connect";
import Chatbot from "@/models/chatbot";
import ChatbotChar from "@/models/chatbotCharacteristics";
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from "next/cache";
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


export async function addCharacteristics(formData) {
    console.log(formData)
    connectDB()
    const chatChar = await ChatbotChar.create({
        chatbot_id: formData.get('chatbotId'),
        content: formData.get('characteristics'),

    })
    console.log(chatChar);
    revalidatePath(`/edit-chatbot/${chatChar.chatbot_id}`)

}
