import { connectDB } from "@/DB/connect";
import Message from "@/models/massage";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const sessionId = req.nextUrl.searchParams.get('sessionId');
    
    if (!sessionId) {
      return NextResponse.json({
        success: false,
        error: "Session ID is required"
      }, { status: 400 });
    }

    // Fetch messages for the specific chat session
    const messages = await Message.find({ 
      chat_session_id: sessionId 
    }) // Sort by creation time ascending
    
    return NextResponse.json({
      success: true,
      messages
    });
    
  } catch (error) {
    console.error("Error fetching session messages:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch messages"
    }, { status: 500 });
  }
} 