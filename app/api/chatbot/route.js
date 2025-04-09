import { connectDB } from "@/DB/connect";
import Chatbot from "@/models/chatbot";
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get('id')

        const chatbot = await Chatbot.findById(id)

        return NextResponse.json({
            chatbot,
            success: true
        })

    } catch (error) {
        return NextResponse.json({
            success: false
        })
    }
}