import mongoose from 'mongoose'
const { Schema, model } = mongoose

const articleSchema = new Schema({
    title_am: { type: String, required: true },
    title_de: { type: String, required: true },
    description_am: { type: String, required: true },
    description_de: { type: String, required: true },
    date: { type: Date, required: true },
    pictures: [{ type: String, required: false }],
},
    { timestamps: true }
)

export default model('article', articleSchema)