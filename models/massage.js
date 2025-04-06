import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chat_session_id: {
        type: Schema.Types.ObjectId,
        ref: 'ChatSession',
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
    },
    sender: {
        type: String,
        enum: ['user', 'ai'],
        required: true
    }
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;