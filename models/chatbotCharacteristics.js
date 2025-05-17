import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the chatbot characteristics schema
const chatbotCharacteristicsSchema = new Schema({
    chatbot_id: {
        type: Schema.Types.ObjectId,
        ref: 'Chatbot',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const ChatbotChar = mongoose.models.ChatbotChar || mongoose.model('ChatbotChar', chatbotCharacteristicsSchema);

export default ChatbotChar;
