import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    originalURL: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamp: {
                type: Number,
            }
        }
    ],
}, {
    timestamps: true,
});

const URL = mongoose.model("url", urlSchema);

export default URL;