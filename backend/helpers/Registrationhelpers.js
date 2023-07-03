import { map_Student_to_mentor } from "./Algorithms.js";


export const addUser_helper = async (req, res,collection) => {
  const { email, password, preference, course } = req.body;
  try {
    // ! check if the student exist
    const userExist = await collection.findOne({ email });
    if (userExist) {
      return res.json({ error: "user already exists" });
    } else {
     const  data_to_add = {
        email,
        password,
        course,
        preference,
      };

      const add_student = await collection.create(data_to_add);

      if(!add_student) return res.json({error:'failed to add the user'})
      
      res.json({status:200,succsess:'user created succsessfully,you will be asigned a mentor soon!'})
      
console.log(add_student)
      // ! function to mao student to a mentor

      map_Student_to_mentor(add_student)
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "failed to fetch student details" });
  }
};


// ! add new mentor
export const add_mentor = async (req, res,collection) => {
  const { email, password, preference, course } = req.body;
  try {
    // ! check if the student exist
    const userExist = await collection.findOne({ email });
    if (userExist) {
      return res.json({ error: "user already exists" });
    } else {
     const  data_to_add = {
        email,
        password,
        course,
        preference,
      };

      const add_mentor = await collection.create(data_to_add);

      if(!add_mentor) return res.json({error:'failed to add the user'})
      
      res.json({status:200,succsess:'user created succsessfully'})
      
console.log(add_mentor)
// !give the mentor students that match his prefernce that have no mentors

    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "failed to fetch student details" });
  }
};

