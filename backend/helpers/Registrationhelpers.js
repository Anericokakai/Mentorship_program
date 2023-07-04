import { matchingDb_collection } from "../database/Schemas/MathingSchema.js";
import { MentorsDb_collection } from "../database/Schemas/mentorSchama.js";
import { studentDb_collection } from "../database/Schemas/studentSchema.js";
import { map_Student_to_mentor } from "./algorithmsFunctions/Algorithms.js";

export const addUser_helper = async (req, res, collection) => {
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

      const add_student = await collection.create(data_to_add);

      if (!add_student) return res.json({ error: "failed to add the user" });

      // res.json({status:200,succsess:'user created succsessfully,you will be asigned a mentor soon!'})

      console.log(add_student);
      // ! function to mao student to a mentor

      const maping = await map_Student_to_mentor(add_student, res);
      res.json({ message: maping });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "failed to fetch student details" });
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
    return res.json({ message: "failed to unmatch you with the previous mentor" });
  
  // ! decrease the number of students the mentor has
  const mentor_id = delete_from_match.mentor_id;
  const decrement = await MentorsDb_collection.findByIdAndUpdate(mentor_id, {
    $inc: { student: -1 },
  },{new:true});
  if (!decrement)
    return res.json({ message: "failed to unmatch you with the previous mentor" });
  const maping = await map_Student_to_mentor(update, res);
  res.json({ message: maping });
  // console.log(update);
}
