import mongoose ,{Schema}from "mongoose";


const matchSchema= new Schema({
    mentor_id:{
        type:Schema.Types.ObjectId,
        ref:'mentors'
    },
    student_id:[
        {
            type:Schema.Types.ObjectId,
            ref:'students'
        }
    ],
    
}
,{
    collection:'matching_students'
})


export const matchingDb_collection=mongoose.model('matching_students',matchSchema)