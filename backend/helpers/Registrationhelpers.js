import { matchingDb_collection } from "../database/Schemas/MathingSchema.js";
import { MentorsDb_collection } from "../database/Schemas/mentorSchama.js";
import { studentDb_collection } from "../database/Schemas/studentSchema.js";
import { map_Student_to_mentor } from "./algorithmsFunctions/Algorithms.js";
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
dotenv.config()
import jwt from "jsonwebtoken";



// ! add user preferences
export const add_user_preferenceHelper = async (req,res, collection_name) =>{
  const {preference, course, description} = req.body;

  const values ={
    preference: req.body.preference,
    course : req.body.course,
    description : req.body.description,

  }
  console.log(values);
  const add_preference = await collection_name.create(values);
  
  if(!add_preference)  return res.json ({  error: true, message: "failed to add preferences"})
 
  return res.json({mesage: "preferences added successfult"})
}


// ! send preferences, course and description
export const update_preference  = async (req,res,collection) =>{
      const fetch_current_preference = await collection.find()

      if(!fetch_current_preference) return res.json({error: true , message: "failed to fetch preferences"})
      return res.json(fetch_current_preference)

    }


export const addUser_helper = async (req, res, collection) => {
  const { email, password, name } = req.body;
  try {
    // ! check if the student exist
    const userExist = await collection.findOne({ email });
    if (userExist) {
      return res.json({error:true, message: "user already exists" });
    } else {
   const   hashed_password= await bcrypt.hash(password,13)
      const data_to_add = {
        name,
        email,
        password:hashed_password,
      };

      const add_student = await collection.create(data_to_add);

      if (!add_student) return res.json({error:true, message: "failed to add the user" });

      res.json({message:'user created succsessfully!'})

      console.log(add_student);
      // ! function to mao student to a mentor
      // ! call this function after inserting prefences

      // const maping = await map_Student_to_mentor(add_student, res);
      // res.json({ message: maping });
    }
  } catch (error) {
    console.log(error);
    return res.json({error:true, message: "failed to fetch student details" });
  }
};

// ! add new mentor
export const add_mentor = async (req, res, collection) => {
  const { email, password, preference, course } = req.body;
  try {
    // ! check if the student exist
    const userExist = await collection.findOne({ email });
    if (userExist) {
      return res.json({ error: "user already exists" });
    } else {
      const data_to_add = {
        email,
        password,
        course,
        preference,
      };

      const add_mentor = await collection.create(data_to_add);

      if (!add_mentor) return res.json({ error: "failed to add the user" });

      res.json({ status: 200, succsess: "user created succsessfully" });

      console.log(add_mentor);
      // !give the mentor students that match his prefernce that have no mentors
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "failed to fetch student details" });
  }
};

// ! update the students prefences

export async function update_prefence_forStudent(req, res) {
  const { id, preference } = req.body;

  const update = await studentDb_collection.findByIdAndUpdate(
    id,
    {
      $set: { preference: preference, hasMentor: false },
    },
    { new: true }
  );
  if (!update)
    return res.json({ message: "failed to update your career preference" });
  // ! delete  the student from match  collection
  const delete_from_match = await matchingDb_collection.findOneAndUpdate(
    { student_id: id },
    {
      $pull: { student_id: id },
    },
    { new: true }
  );
  if (!delete_from_match)
    return res.json({
      message: "failed to unmatch you with the previous mentor",
    });

  // ! decrease the number of students the mentor has
  const mentor_id = delete_from_match.mentor_id;
  const decrement = await MentorsDb_collection.findByIdAndUpdate(
    mentor_id,
    {
      $inc: { student: -1 },
    },
    { new: true }
  );
  if (!decrement)
    return res.json({
      message: "failed to unmatch you with the previous mentor",
    });
  const maping = await map_Student_to_mentor(update, res);
  res.json({ message: maping });
  // console.log(update);
}


// ! login routes 
export const handleStudentLogin=async(req,res)=>{
  const {email,password}=req.body
  // ! check if the user exist

  const userExist=await studentDb_collection.findOne({email:email})
  if(!userExist) return res.json({error:true,message:'invalid user credentials'})
  

  // ! validate password
  const valid_password=await bcrypt.compare(password,userExist.password)
  if(!valid_password) return res.json({error:true,message:'invalid user credentials'})
  // !create token
  const token= await jwt.sign({email:email},process.env.SECRET,{
    expiresIn:'60s'
  })
  const refreshToken=await jwt.sign({email:email},process.env.REFRESH,{
    expiresIn:'1y'
  })

  res.json({
    status:200,
    token,
    refreshToken,
    message:'User loged in succsessfuly',
    role:userExist.role,
    id:userExist._id,
  })

  




}


