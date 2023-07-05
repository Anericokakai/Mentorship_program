import { Router } from "express";
import { addUser_helper, add_mentor, handleStudentLogin, add_user_preferenceHelper } from "../helpers/Registrationhelpers.js";
import { studentDb_collection } from "../database/Schemas/studentSchema.js";
import { MentorsDb_collection } from "../database/Schemas/mentorSchama.js";
import { preference_DB } from "../database/Schemas/PreferenceSchema.js"
// ! middle ware to check credentials

// ! export the student route
export const student_registering_route = Router();

student_registering_route.post("/api/students/register", async (req, res) => {
  // !helper function to handle registering of stdents
  addUser_helper(req, res, studentDb_collection)
});

// !login routes 
export const studentLogin=Router()
studentLogin.post('/api/students/login',(req,res)=>{

handleStudentLogin(req,res)  

})


//! handle  mentors registrations

export const mentors_register_route = Router();
mentors_register_route.post("/api/mentors/register", async (req, res) => {
  add_mentor(req, res, MentorsDb_collection);
});

// ! add preferences
export const preference_route = Router();
preference_route.post("/api/students/preferences", async(req,res)=>{

  add_user_preferenceHelper(req,res, preference_DB);
  
})