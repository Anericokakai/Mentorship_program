import express from "express";
// ! configure
import bodyParser from "body-parser";
import cors from 'cors'
import { mentors_register_route, studentLogin, student_registering_route, preference_route, send_prefetences, mentor_login_route } from "./Routes/userRegister.js";
import { connection_to_db } from "./database/connect.js";
import { matchingDb_collection } from "./database/Schemas/MathingSchema.js";
import { Add_Prefernces_Routes, FetchStudentInfo, find_studentAmentor, RelationsRoute, update_Students_prefernce, update_student_with_no_mentors } from "./Routes/UpdatesLogic.js";
import dotenv from 'dotenv'
import { add_new_message, create_new_chat, get_all_chats, get_chat_messages } from "./Routes/chatRoute.js";
// ! application 
const app=express()
// ! configure the files
dotenv.config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

// ! connect to the database rhen listen at port 

connection_to_db()
  .then(() => {
    console.log("connected");
    app.listen(process.env.PORT,()=>{
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
// !related routes
app.use(RelationsRoute)


// !mentor login
app.use(mentor_login_route)


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


// todo Chat App
// !get all chats
app.use(get_all_chats)
// ! create new chat
app.use(create_new_chat)
// ! get specific chat
app.use(get_chat_messages)
// ! add new message to chat
app.use(add_new_message)



  
