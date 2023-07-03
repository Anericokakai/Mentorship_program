import { matchingDb_collection } from "../database/Schemas/MathingSchema.js";
import { MentorsDb_collection } from "../database/Schemas/mentorSchama.js";

// ! map student to a mentor algorithm
export const map_Student_to_mentor = async (student) => {
  // ! fetch the mentors collection based on the cousrse
  // ! function to fetch data  of mentors
  async function fetchMentors() {
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

  // !function to match the student
  async function matchStudentToMentor(student) {
    try {

    //   ! fetch mentors
      const mentors = await fetchMentors();
     
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

      let bestmatch_index = 0;
      const bestMentorMatch = matching[bestmatch_index].mentor;
      // console.log(matching)
      //   ! check if the first  mentor has matches
      const id_ofthefirst = bestMentorMatch._id;
      const student_number = bestMentorMatch.student;
      const mentor_exist_in_match = await matchingDb_collection.findOne({
        mentor_id: id_ofthefirst,
      });

      if (!mentor_exist_in_match) {
        // ! add a new document for that mentor
        try {
          await matchingDb_collection.create({
            mentor_id: id_ofthefirst,
            student_id: [student._id],
          });
          await MentorsDb_collection.findByIdAndUpdate(id_ofthefirst, {
            $inc: { student: 1 },
          },{new:true});
        } catch (error) {
          console.log(error);
        }
      } else {
        // ! what if the mentor alresy exist
        // ! update the match untill he has five students

        const totalStudentAssigned = await matchingDb_collection.aggregate([
          {
            $match: {
              mentor_id: bestMentorMatch._id,
            },
          },
          {
            $project: {
              lenghtOfArray: { $size: "$student_id" },
            },
          },
        ]);
        console.log(totalStudentAssigned);
        if (totalStudentAssigned[0].lenghtOfArray < 5) {
          await matchingDb_collection.updateOne(
            { mentor_id: id_ofthefirst },
            { $push: { student_id: student._id } }
          );
          await MentorsDb_collection.findByIdAndUpdate(id_ofthefirst, {
            $inc: { student: 1 },
          },{new:true});
          console.log("updated student");
        }
      }

      //   else{
      //         try {
      //            const mentor_id=totalStudentAssigned[0]._id

      //         } catch (error) {
      //             console.log(error)

      //         }

      //   }
    } catch (error) {
      console.log(error);
    }
  }

  matchStudentToMentor(student);
};

