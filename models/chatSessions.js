import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Define the chatbot schema
const chatSessionSchema = new Schema({
  chatbot_id: {
    type: Schema.Types.ObjectId,
    ref: "Chatbot",
    required: true,
  },
  guest_id: {
    type: Schema.Types.ObjectId,
    ref: "Guest",
    required: false, // Explicitly marking it as optional
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const ChatSession =
  mongoose.models.ChatSession ||
  mongoose.model("ChatSession", chatSessionSchema);

export default ChatSession;
