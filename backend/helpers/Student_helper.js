import express from "express";
import { connection_to_db } from "./database/connect.js.js";
import { matchingDb_collection } from "./database/Schemas/MathingSchema.js.js";
import { MentorsDb_collection } from "./database/Schemas/mentorSchama.js.js";
import { studentDb_collection } from "./database/Schemas/studentSchema.js.js";



async function findFromDb() {
  try {
    const student_results = await studentDb_collection.find();
    const mentors_results = await MentorsDb_collection.find();
    return { student_results, mentors_results };
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ! function to match students with their mentors
async function matchStudents_withMentors(students, mentor) {
  const students_id = [];
  for (const student of students) {
    const common_path = student.preference.filter((single) =>
      mentor.experties.includes(single)
    );

    if (common_path.length > 0) {
      students_id.push(student._id);
      // console.log(students_id);
    }
  }
  console.log(`Mentor id ${mentor._id}`);
  console.log(`matched students ${students_id.join(",")}`);
}

// ! find the membors from the db collections

const { mentors_results, student_results } = await findFromDb();
// console.log(student_results);
// console.log(mentors_results);
// ! empty object to store matches
const matches = [];

//   !filter the array of mentors depending on course and prefernce

for (const mentor of mentors_results) {
  //   ! filter the arrasy
  const matchingCareers = student_results.filter((student) =>
    student.preference.some((career) => mentor.experties.includes(career))
  );

  //   console.log(matchingCareers);
  const matchedStudents = matchingCareers.splice(0, 5);
  const singleMatch = {
    mentor_id: mentor._id,
    student_id: matchedStudents?.map((student) => student._id),
  };

  matches.push(singleMatch);
  //   matches[mentor._id]=matchedStudents?.map((student)=>student._id)
  //   console.log(matches)
}
// ! add mathes to database

// await addMatches(matches)
// console.log(matches)
// ! function to push the mathes to db
async function addMatches(matches) {
  await matchingDb_collection.insertMany(matches);
}

