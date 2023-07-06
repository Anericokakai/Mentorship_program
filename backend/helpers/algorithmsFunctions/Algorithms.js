import { matchingDb_collection } from "../../database/Schemas/MathingSchema.js";
import { MentorsDb_collection } from "../../database/Schemas/mentorSchama.js";
import {
  fetchMentors,
  studentHasMentor,
  updateMentorStudents,
} from "./AlgorithmsFunctions.js";

// ! map student to a mentor algorithm
export const map_Student_to_mentor = async (student) => {
  // ! fetch the mentors collection based on the cousrse

  // !function to match the student
  async function matchStudentToMentor(student) {
    try {
      //   ! fetch mentors
      const mentors = await fetchMentors(student);
      console.log(mentors)
      if (mentors.length > 0) {
        const matching = mentors.map((mentor) => {
          const highestmatch = mentor.preference.filter((single_preference) =>
            student.preference.includes(single_preference)
          );
          return {
            mentor,
            numbers: highestmatch.length,
          };
        });
        //   ! sort in decending order depending on the number of matching elemennts

        matching.sort((a, b) => b.numbers - a.numbers);

  
        // ! check if there is a match if not dont contibue
if(matching[0].numbers<1) return "there is no mentor who macthes any of your preferences ,you will be assigned a mentor soon"

        let bestmatch_index = 0;
        const bestMentorMatch = matching[bestmatch_index].mentor;
        // console.log(matching)
        //   ! check if the first  mentor has matches
        const id_ofthefirst = bestMentorMatch._id;
        const student_number = bestMentorMatch.student;
        const mentor_exist_in_match = await matchingDb_collection.findOne({
          mentor_id: id_ofthefirst,
        });

        // ! if the mentor is not in the matching  collection add the mentor to one
        if (!mentor_exist_in_match) {
          // ! add a new document for that mentor
          try {
            await matchingDb_collection.create({
              mentor_id: id_ofthefirst,
              student_id: [student._id],
            });

            // ! update the number of students a mentor has

            await updateMentorStudents(id_ofthefirst);
            // ! update the student mentorship to true
            await  studentHasMentor(student)

            // 
            // !return a message
            return "congratulation you have been asigned a mentor";
          } catch (error) {
            console.log(error);
          }
        } else {
          // ! what if the mentor alresy exist

          await matchingDb_collection.updateOne(
            { mentor_id: id_ofthefirst },
            { $push: { student_id: student._id } }
          );
          // !update the number of student a mentor has
          await updateMentorStudents(id_ofthefirst);

          // ! update the students status
           await studentHasMentor(student)
          return "congratulation you have been assigned a mentor";
        }
      } else {
        return "no mentors are available, you will be assigned one soon";
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addedSuccess = matchStudentToMentor(student);
  return addedSuccess;
};



