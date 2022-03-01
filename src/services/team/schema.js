import mongoose from 'mongoose'
const { Schema, model } = mongoose

const employeeSchema = new Schema({
    name_am: { type: String, required: true },
    name_de: { type: String, required: true },
    position_am: { type: String, required: true },
    position_de: { type: String, required: true },
    avatar: { type: String, required: false },
},
    { timestamps: true }
)

export default model('Employee', employeeSchema)