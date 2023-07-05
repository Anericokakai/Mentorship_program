import mongoose,{ Schema} from "mongoose"  

const preference_schema = new Schema({
    preference : String,
    descripton: String,
    course: String,

},
{
    collection: "preferences"
})

export const preference_DB = mongoose.model("preference", preference_schema)

