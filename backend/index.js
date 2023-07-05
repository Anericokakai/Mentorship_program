import express from "express";
// ! configure
import bodyParser from "body-parser";
import cors from 'cors'
import { mentors_register_route, studentLogin, student_registering_route, preference_route, send_prefetences } from "./Routes/userRegister.js";
import { connection_to_db } from "./database/connect.js";
import { matchingDb_collection } from "./database/Schemas/MathingSchema.js";
import { Add_Prefernces_Routes, FetchStudentInfo, find_studentAmentor, update_Students_prefernce, update_student_with_no_mentors } from "./Routes/UpdatesLogic.js";

// ! application 
const app=express()
// ! configure the files
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

// ! connect to the database rhen listen at port 

connection_to_db()
  .then(() => {
    console.log("connected");
    app.listen(8001,()=>{
        console.log('app listening at port 8001')
    })

  })
  .catch((error) => {
    console.log(error);
  });

//   ! use student_registerigRoute
app.use(student_registering_route)
app.use(mentors_register_route)

// ! fetch students information
app.use(FetchStudentInfo)
// ! studentlogin
app.use(studentLogin)


// ! add preferences
app.use(preference_route)
// !add prefences for students
app.use(Add_Prefernces_Routes)
// !assign student a mento
app.use(find_studentAmentor)



// !update students with no mentors
app.use(update_student_with_no_mentors)
// ! update students prefernce
app.use(update_Students_prefernce)

// ! send preferences
app.use(send_prefetences)

app.get('/',async(req,res)=>{
const results= await fetchMathes()
    res.json(results)
})


// ! fetch the related data
async function fetchMathes() {
    try {
      const results = await matchingDb_collection
        .find()
        .populate("student_id")
        .populate("mentor_id")
        .exec();
        return results
    } catch (error) {

      console.log(error)
    }
  }
  
