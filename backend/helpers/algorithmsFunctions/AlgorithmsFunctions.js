import { MentorsDb_collection } from "../../database/Schemas/mentorSchama.js";
import { studentDb_collection } from "../../database/Schemas/studentSchema.js";

// ! function to fetch data  of mentors
export async function fetchMentors(student) {
  try {
    const mentors = await MentorsDb_collection.aggregate([
      {
        $match: {
          student: { $lt: 5 },
          course: student.course,
        },
      },
    ]);
    return mentors;
  } catch (error) {
    console.log(error);
  }
}

// !function to update the  the mentors number of students
export async function updateMentorStudents(id) {
  try {
    await MentorsDb_collection.findByIdAndUpdate(
      id,
      {
        $inc: { student: 1 },
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
}

//   ! function to update student after he/she has been assigned a mentor

export async function studentHasMentor(student) {
  await studentDb_collection.findOneAndUpdate(student._id, {
    $set: { hasMentor: true },
  });
}


  // ! fetch all students without mentors
  export  async function fetchStudentswithoutMentors(){
    try {

    const Students_with_noMentor=   await studentDb_collection.find({hasMentor:false})
      return Students_with_noMentor
        
    } catch (error) {
        console.log(error)
        return 'failed to fetch students with no mentors'
        
    }
  }

