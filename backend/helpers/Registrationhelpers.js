import { matchingDb_collection } from "../database/Schemas/MathingSchema.js";
import { MentorsDb_collection } from "../database/Schemas/mentorSchama.js";
import { studentDb_collection } from "../database/Schemas/studentSchema.js";
import { map_Student_to_mentor } from "./algorithmsFunctions/Algorithms.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();
import jwt from "jsonwebtoken";

// ! add user preferences
export const add_user_preferenceHelper = async (req, res, collection_name) => {
  const { preference, course, description } = req.body;

  const values = {
    preference: req.body.preference,
    course: req.body.course,
    description: req.body.description,
  };

  const add_preference = await collection_name.create(values);

  if (!add_preference)
    return res.json({ error: true, message: "failed to add preferences" });

  return res.json({ message: "preferences added successfuly" });
};

// ! send preferences, course and description
export const update_preference = async (req, res, collection) => {
  const fetch_current_preference = await collection.find();

  if (!fetch_current_preference)
    return res.json({ error: true, message: "failed to fetch preferences" });
  return res.json(fetch_current_preference);
};

export const addUser_helper = async (req, res, collection) => {
  const { email, password, name } = req.body;
  try {
    // ! check if the student exist
    const userExist = await collection.findOne({ email });
    if (userExist) {
      return res.json({ error: true, message: "user already exists" });
    } else {
      const hashed_password = await bcrypt.hash(password, 13);
      const data_to_add = {
        name,
        email,
        password: hashed_password,
      };

      const add_student = await collection.create(data_to_add);

      if (!add_student)
        return res.json({ error: true, message: "failed to add the user" });

      res.json({ message: "user created succsessfully!" });

      console.log(add_student)

  
    
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: "failed to fetch student details",
    });
  }
};




// ! add new mentor
export const add_mentor = async (req, res, collection) => {
  const { email, password, preference, course,name } = req.body;
  try {

    // ! check if the student exist
    const userExist = await collection.findOne({ email });
    if (userExist) {
      return res.json({ error: "user already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      // const data_to_add = {
      //   email,
      //   password,
      //   course,
      //   preference,
      // };
      const data_to_add = {
        email: email,
        password: hashedPassword,
        
      }
      // console.log(data_to_add);


      const add_mentor = await collection.create(data_to_add);

      if (!add_mentor) return res.json({ error: "failed to add the user" });

      res.json({ status: 200, succsess: "user created succsessfully" });


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



// ! login mentor
export const login_mentor = async (req,res) =>{
  const { email, password } = req.body
  // console.log(req.body);
  const mentor_exists = await MentorsDb_collection.findOne({email:email})

  if(!mentor_exists) return res.json({error: true, message: "Invalid login details"})

  const valid_password =  await bcrypt.compare(password, mentor_exists.password);
  if (!valid_password)  return res.json({ error: true, message: "invalid user credentials" });

  return res.json({ status: 200,  message: "user logged in successfully"})


}

// ! login routes
export const handleStudentLogin = async (req, res) => {
  const { email, password } = req.body;
  // ! check if the user exist

  const userExist = await studentDb_collection.findOne({ email: email });
  if (!userExist)
    return res.json({ error: true, message: "invalid user credentials" });

  // ! validate password
  const valid_password = await bcrypt.compare(password, userExist.password);
  if (!valid_password)
    return res.json({ error: true, message: "invalid user credentials" });
  // !create token
  const token = await jwt.sign({ email: email }, process.env.SECRET, {
    expiresIn: "60s",
  });
  const refreshToken = await jwt.sign({ email: email }, process.env.REFRESH, {
    expiresIn: "1y",
  });

  res.json({
    status: 200,
    token,
    refreshToken,
    message: "User loged in succsessfuly",
    role: userExist.role,
    id: userExist._id,
  });
};

// !updates students after selecting the
export const Add_preference_route_helper = async (req, res) => {
  const { preference, id } = req.body;

  // !add to db
  const added = await studentDb_collection.findByIdAndUpdate(
    id,
    {
      $push: { preference: preference },
    },
    { new: true }
  );
  console.log(added);
  if (!added)
    return res.json({
      error: true,
      message: "failed to update your career paths",
    });

  return res.json({
    message:
      "your career path has been updated ! ,you will be assigned a mentor soon!",
  });
};

// ! find the student a mentor helper function
export const FindStudentAmentor_helper_function = async (req, res) => {
  const { id } = req.body;

  // !find the student with that id
  const student = await studentDb_collection.findById(id);
  // ! if the student doess not exist
  if (!student) return res.json({ message: "student not found" });

  // ! function to mao student to a mentor
  // ! call this function after inserting prefences


  console.log(student);
  const maping = await map_Student_to_mentor(student, res);
  res.json({ message: maping });
};

}


// !relationsRoutes
export const HansdleRelationLogic=async(req,res)=>{

  // ! fetch the related data
const {id}=req.body
console.log(req.body)
        const results = await matchingDb_collection
          .find({student_id:id})
          .populate("student_id")
          .populate("mentor_id")
          .exec();
          if(!results)return res.json({error:true,message:'failed to retrieve collection'})
          res.json(results)
        
    
    }


