import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Define the chatbot schema
const guestSchema = new Schema({
  name: {
    type: String,
    required: true, // Marking name as required
  },
  email: {
    type: String,
    required: true, // Marking email as required
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Guest = mongoose.models.Guest || mongoose.model("Guest", guestSchema);

export default Guest;
