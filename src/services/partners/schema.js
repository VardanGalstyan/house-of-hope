import mongoose from 'mongoose'
const { Schema, model } = mongoose

const partnersSchema = new Schema({
    name_am: { type: String, required: true },
    name_de: { type: String, required: true },
    name_en: { type: String, required: true },
    avatar: { type: String, required: false },
},
    { timestamps: true }
)

export default model('Partner', partnersSchema)