import mongoose from 'mongoose'
const { Schema, model } = mongoose

const projectSchema = new Schema({
    title_am: { type: String, required: true },
    title_de: { type: String, required: true },
    title_en: { type: String, required: true },
    description_am: { type: String, required: true },
    description_de: { type: String, required: true },
    description_en: { type: String, required: true },
    cover: {},
},
    { timestamps: true }
)

export default model('Project', projectSchema)