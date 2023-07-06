import mongoose,{ Schema} from "mongoose"  

const Mentors_collection=new Schema({

    name:String,
    course:String,
    email:{
       type: String,
        unique:true,
        required:true,
    },
    password: String,
    student:{type:Number,
    default:0},
    preference:[String],
    role:{
        type:String,
        default:'mentor'
    },
    


},
{
    collection:'mentors'
})

export const MentorsDb_collection=mongoose.model('mentors',Mentors_collection)


