import { connectDB } from "@/DB/connect";
import ChatbotChar from "@/models/chatbotCharacteristics";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		await connectDB()
		const id = req.nextUrl.searchParams.get('id');
	
		const chars = await ChatbotChar.find({
			chatbot_id: id
		})

		return NextResponse.json({
			chars,
			success: true
		});

	} catch (error) {
		return NextResponse.json({
			success: false
		});
	}
}
export async function DELETE(req) {
	try {
		connectDB()
		const id = req.nextUrl.searchParams.get('char_id');

		await ChatbotChar.findByIdAndDelete(id)

		return NextResponse.json({
			success: true
		});

	} catch (error) {
		return NextResponse.json({
			success: false
		});
	}
}
