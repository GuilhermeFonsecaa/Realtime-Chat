import mongoose from "mongoose"

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{ type: mongoose.Schema.ObjectId, ref: "Users", required: true }],
    admin: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
    messages: [{ type: mongoose.Schema.ObjectId, ref: "Messages", required: false }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
});

channelSchema.pre("save", function (next) {
    this.updateAt = new Date();
    next();
});

channelSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updateAt: new Date() });
    next();
});

const Channel = mongoose.model("Channels", channelSchema);
export default Channel;