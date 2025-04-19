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

export async function DELETE(req) {
	try {
		connectDB()
		const id = req.nextUrl.searchParams.get('id');
		const chatbot = await Chatbot.findByIdAndDelete(id);

		return NextResponse.json({
			success: true
		});

	} catch (error) {
		return NextResponse.json({
			success: false
		});
	}
}
export async function POST(req) {
	try {
		connectDB()
		const id = req.nextUrl.searchParams.get('id');

		const body = await req.json()
		const { name, email } = body

		const guest = await Guest.create({
			name,
			email
		})

		console.log(guest);

		

		// create chat session
		const chatSession = await ChatSession.create({
			guest_id: guest._id,
			chatbot_id: id
		})

		// create message
		const message = await Message.create({
			chat_session_id: chatSession._id,
			content: `Hello ${name}, how can I help you today?`,
			sender: "ai"
		})

		
		
		
		return NextResponse.json({
			success: true,
			guest,
			chatSessionId: chatSession._id,
			message
		});

	} catch (error) {
		return NextResponse.json({
			success: false
		});
	}
}