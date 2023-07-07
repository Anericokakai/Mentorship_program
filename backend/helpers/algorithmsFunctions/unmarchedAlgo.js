import { matchingDb_collection } from "../../database/Schemas/MathingSchema.js";
import { studentDb_collection } from "../../database/Schemas/studentSchema.js";
import { fetchMentors, fetchStudentswithoutMentors, studentHasMentor, updateMentorStudents } from "./AlgorithmsFunctions.js";



// ! fetch all students with no mentors



export   async function map_unmathedStudents(req,res){
   const students_With__NoMwntors= await fetchStudentswithoutMentors()
   console.log(students_With__NoMwntors)

   if(students_With__NoMwntors.length>0){

    let message;
    for(const student of students_With__NoMwntors){
      const matches= await matchStudent_tomentor(student)
      message=matches
    }
    res.json( {message:message})
   }else{
    res.json({message:"there are no students without mentors"})
   }
  
 
  // const fetchstudents=await studentDb_collection.find()




}


 async function matchStudent_tomentor (student){
  // !fetch mentors whose course matches the student
  const fetchedmentors= await fetchMentors(student)

  // ! check first if the mentors are there
  if(fetchedmentors.length>0){
    console.log('mentors are above zero' +fetchedmentors)

 

  console.log(fetchedmentors)
  // !an array to store the best match
  const bestMatch=[]
  // !loop through the mentors
  for( const mentor of fetchedmentors){
    // !calulate the number of matching prefernces 
    // !filter the mentors only return the mentors whose prefences are included in students
    const commonprefernces=mentor.preference.filter(prefer=>student.preference.includes(prefer))

    const matches=commonprefernces.length

    // ! return all the related students
  const matches_between= {
    mentorId:mentor._id,
    scores:matches


    }
  // ! push the matches between to the array
  bestMatch.push(matches_between)

  }

  // !for loop ends

  //! sort the bestmatcharray basesd on the best scores in descending order
  bestMatch.sort((a,b)=>b.scores-a.scores)

  console.log(bestMatch)
  // ! if the score is zero dont continue as no mentor mathes the students
  if(bestMatch[0].scores<1) return 'your selected prefernces does not match any of the available students,you will be assigned soon !'
  // ! check if the first mentor mentor is in the match collection
  const bestFitMentor_id=bestMatch[0].mentorId
  const mentor_is_inMatch_collection=await matchingDb_collection.findOne({mentor_id:bestFitMentor_id})
  // !if he does not exist add him to the mathes
  if(!mentor_is_inMatch_collection){
    // ! create one
    try {
      await  matchingDb_collection.create({
        mentor_id:bestFitMentor_id,
        student_id:[student]
      })
      
      // ! update the student to have true status and the number of students a mentor has
      await  updateMentorStudents(bestFitMentor_id)
      await studentHasMentor(student)

 return 'congratulations ! you have been assigned students to mentor '
      
    } catch (error) {
      
      console.log(error)
    }
   

  } else{
    // !if the mentor exist in match
    // ! update his or her students

 await matchingDb_collection.findOneAndUpdate({mentor_id:bestFitMentor_id},{
  $push:{student_id:student._id}
 })

//  ! update the number of student the mentor has and the studdent
await  updateMentorStudents(bestFitMentor_id)
await studentHasMentor(student)

 return 'congratulations ! you have been assigned students to mentor '
  }
 

} else{
  return 
}

}
