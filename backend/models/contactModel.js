import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
})

const Use = mongoose.model('Contact', contactSchema)

export default Use