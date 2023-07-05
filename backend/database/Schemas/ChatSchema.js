import mongoose,{ Schema} from "mongoose"  

 const chatSchema = new Schema({
    mentor:{
        type : Schema.Types.ObjectId,
        ref : 'mentors',
    },
    student: {
        type : Schema.Types.ObjectId,
        ref : 'students',
    },
    messages: [{
        sender : {
            type : String,
            required : true,
        },
        content : {
            type : String,
            required : true,

        },
        time : {
            type : Date,
            default: Date.now(),

        },

    }]
 },
 {
    collection : "chats"
 })

 export const chatDB_Collection = mongoose.model("chats", chatSchema)