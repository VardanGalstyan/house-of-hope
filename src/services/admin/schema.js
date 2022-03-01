import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const { Schema, model } = mongoose
const adminSchema = new Schema({
    user_name: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true })


adminSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    done();
})

adminSchema.methods.toJSON = function () {

    const adminDocument = this
    const adminObject = adminDocument.toObject()
    delete adminObject.password
    delete adminObject.__v

    return adminObject
}

adminSchema.statics.checkCredentials = async function (user_name, password) {
    const admin = await this.findOne({ user_name })
    if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password)
        if (isMatch) return admin
        else return null
    } else {
        return null
    }
}

export default model('Admin', adminSchema)