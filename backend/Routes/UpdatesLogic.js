import { Router } from "express";
import { matchingDb_collection } from "../database/Schemas/MathingSchema.js";
import { MentorsDb_collection } from "../database/Schemas/mentorSchama.js";
import { studentDb_collection } from "../database/Schemas/studentSchema.js";
import { map_unmathedStudents } from "../helpers/algorithmsFunctions/unmarchedAlgo.js";
import { Add_preference_route_helper, FindStudentAmentor_helper_function, HansdleRelationLogic, update_prefence_forStudent } from "../helpers/Registrationhelpers.js";
export const update_student_with_no_mentors=Router()

update_student_with_no_mentors.post('/api/updatestudentwithnomentors',async(req,res)=>{
    map_unmathedStudents(req,res)

})

 export const update_Students_prefernce=Router()

 update_Students_prefernce.post('/api/students/updatepreference',async(req,res)=>{

    update_prefence_forStudent(req,res)

 })

 export const FetchStudentInfo=Router()
 FetchStudentInfo.post('/api/fetchinfo',async(req,res)=>{
    

    const {id,role}=req.body
    if(!id)return res.json({error:true,message:'failed to feth data'})

   if(role=='mentor'){
      const results = await matchingDb_collection
      .find({mentor_id:id})
      .populate("student_id")
      .populate("mentor_id")
      .exec();
     

const student= await MentorsDb_collection.findById(id)
if(!student)return res.json({error:true,message:'failed to feth data'})
res.json({studentInfo:student})

   }else if(role=='student'){
      const results = await matchingDb_collection
      .find({student_id:id})
      .populate("student_id")
      .populate("mentor_id")
      .exec();
     

const student= await studentDb_collection.findById(id)
if(!student)return res.json({error:true,message:'failed to feth data'})
res.json({studentInfo:student})

   }
      
 })



 // !Add user prefrences that he or she wants
export const Add_Prefernces_Routes=Router()

Add_Prefernces_Routes.post('/api/students/addprefernces',(req,res)=>{

  // ! update function
  Add_preference_route_helper(req,res)
  

})

// ! find student a mentor if he does not have
export const find_studentAmentor=Router()
find_studentAmentor.post('/api/students/findamentor',(req,res)=>{

FindStudentAmentor_helper_function(req,res)
})


// ! relations routes
export const RelationsRoute=Router()
RelationsRoute.post('/api/students/relations',async(req,res)=>{

   HansdleRelationLogic(req,res)
})