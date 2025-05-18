import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/DB/connect";
import Chatbot from "@/models/chatbot";
import ChatbotChar from "@/models/chatbotCharacteristics";
import Message from "@/models/massage";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);


async function generateAIResponse(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    const response = await result.response;
    return await response.text();
}

export async function POST(req) {
    try {
        await connectDB();
        const session_id = req.nextUrl.searchParams.get('session_id');
        const chat_id = req.nextUrl.searchParams.get('chat_id');
        const body = await req.json();

        const chatBot = await Chatbot.findById(chat_id);
        if (!chatBot) {
            return NextResponse.json({
                success: false,
                message: "chatbot not found",
            }, { status: 404 });
        }

        const characteristics = await ChatbotChar.find({
            chatbot_id: chat_id,
        });

        const previousMessages = await Message.find({
            chat_session_id: session_id,
        });

        const formattedPreviousMessages = previousMessages.map((message) => (
            `${message.sender}: ${message.content}`
        )).join(" + ");

        // Combine characteristics to a system prompt
        const systemPrompt = characteristics.map((char) => char.content).join(" + ");

           const messages = `You are a helpful assistant talking to ${body.name} do not repeat user name again and again take it for first greeting only. If a generic question is asked which is not relevant in the same scope or domain as the specific content, use emojis where possible. Here is some key information that you need to be aware of: ${systemPrompt} and previous conversations are ${formattedPreviousMessages}  now response as in markdown for ${body.message}`

        // Generate AI response
        let aiResponse = await generateAIResponse(messages);
        if (!aiResponse) {
            aiResponse = "Unable to generate AI response. Please try again"
        }

        // Save the user message to db
        const userMessage = await Message.create({
            chat_session_id: session_id,
            content: body.message,
            sender: body.sender,
        });

        // Save the AI message to db
        await Message.create({
            chat_session_id: session_id,
            content: aiResponse,
            sender: "ai",
        });

        const allMessages = await Message.find({
            chat_session_id: session_id,
        });

        return NextResponse.json({
            allMessages,
            success: true,
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success: false,
        });
    }
}














// export async function POST(req) {

//     try {
//         connectDB()
//         const session_id = req.nextUrl.searchParams.get('session_id');
//         const chat_id = req.nextUrl.searchParams.get('chat_id');
//         const body = await req.json()

//         const chatBot = await Chatbot.findById(chat_id)
//         if (!chatBot) {
//             return NextResponse.json({
//                 success: false,
//                 message: "chatbot not found"
//             }, { status: 404 });
//         }

//         const characterestics = await ChatbotChar.find({
//             chatbot_id: chat_id
//         })

//         const previousMessages = await Message.find({
//             chat_session_id: session_id
//         })

//         const formattedPreviosMessages = previousMessages.map(message => (
//             {
//                 role: message.sender === 'ai' ? 'system' : 'user',
//                 name: message.sender === 'ai' ? 'system' : body.name,
//                 content: message.content

//             }
//         ))

//         // combine characterestics to a system promt
//         const systemPrompt = characterestics.map(char => char.prompt).join(' + ')

//         const messages = [
//             {
//                 role: 'system',
//                 name: 'System',
//                 content: `You are a helpful assistent talking to ${body.name}. If a generic question is asked which is not relevant in the same scope or domain a the specific content. Use Emoji's where possible. Here is some key information that you need to be aware of , there are elements you may be asked about : ${systemPrompt}`
//             },
//             ...formattedPreviosMessages,
//             {
//                 role: 'user',
//                 name: body.name,
//                 content: body.message
//             }
//         ]

//         // send the message to OpenAI's chat completions API
//         const openaiResponse = await openAi.chat.completions.create({
//             messages: messages,
//             model: 'gpt-3.5-turbo',

//         })

//         console.log("GPT",openaiResponse);

//         const aiResponse = openaiResponse?.choices?.[0]?.message?.content?.trim()

//         if (!aiResponse) {
//             return NextResponse.json({
//                 success: false,
//                 message: "Error in processing the request"
//             }, { status: 500 });
//         }
//         // save the user message to db
//         const userMessage = await Message.create({
//             chat_session_id: session_id,
//             content: body.message,
//             sender: body.sender,

//         })

//         // save the ai message to db
//         await Message.create({
//             chat_session_id: session_id,
//             content: aiResponse,
//             sender: "ai",

//         })
//         const allMessages = await Message.find({
//             chat_session_id: session_id
//         })


//         return NextResponse.json({
//             allMessages,
//             success: true
//         }, { status: 200 });
//     } catch (error) {
//         console.log(error.message);
//         return NextResponse.json({
//             success: false
//         });
//     }
// }