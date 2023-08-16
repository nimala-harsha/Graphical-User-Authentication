import mongoose from 'mongoose'
const schema = mongoose.Schema;

const authSchema = new schema({
    
    fullName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    hashPass: {
        type:String,
        required:true
    },
    colorPass: {
        type:String,
        required:true
    },
    imagePass: {
        type: String,
        required:true
    }
})

export default mongoose.model("auth", authSchema);