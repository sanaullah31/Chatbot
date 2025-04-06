import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatbotSchema = new Schema({
  clerk_user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Chatbot =
  mongoose.models.Chatbot || mongoose.model("Chatbot", chatbotSchema);

export default Chatbot;
