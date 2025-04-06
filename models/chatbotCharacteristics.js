import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatbotCharacteristicsSchema = new Schema({
  chatbot_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chatbot",
    required: true,
  },
  characteristic: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const ChatbotCharacteristics =
  mongoose.models.ChatbotCharacteristics ||
  mongoose.model("ChatbotCharacteristics", chatbotCharacteristicsSchema);

export default ChatbotCharacteristics;
