import { connectDB } from "@/DB/connect";
import Chatbot from "@/models/chatbot";
import ChatSession from "@/models/chatSessions";
import Guest from "@/models/guest";
import Message from "@/models/massage";
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const chatbot_id = req.nextUrl.searchParams.get('chatbot_id');
        const session_id = req.nextUrl.searchParams.get('session_id');

        if (session_id) {
            // Get single session with guest details
            const session = await ChatSession.findById(session_id).populate('guest_id');
            
            return NextResponse.json({
                session,
                success: true
            });
        }

        // Get all sessions for a chatbot
        const sessions = await ChatSession.find({ chatbot_id }).sort({ created_at: -1 }).populate('guest_id');

        return NextResponse.json({
            sessions,
            success: true
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
