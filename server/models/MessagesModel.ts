import mongoose from "mongoose"

interface MessageSchemaProps {
    sender: mongoose.Schema.Types.ObjectId,
    recipient?: mongoose.Schema.Types.ObjectId,
    messageType: string,
    content?: string,
    fileUrl?: string,
    timestamp: Date
}

const messagesSchema = new mongoose.Schema<MessageSchemaProps>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false
    },
    messageType: {
        type: String,
        enum: ["text", "file"],
        required: true
    },
    content: {
        type: String,
        required: function () {
            return this.messageType === "text"
        } // se for text é required, se for file não é
    },
    fileUrl: {
        type: String,
        required: function () {
            return this.messageType === "file"
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

const Message = mongoose.model<MessageSchemaProps>("Messages", messagesSchema);

export default Message