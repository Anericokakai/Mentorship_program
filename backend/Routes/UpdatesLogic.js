import { Router } from "express";
import { studentDb_collection } from "../database/Schemas/studentSchema.js";
import { map_unmathedStudents } from "../helpers/algorithmsFunctions/unmarchedAlgo.js";
import { update_prefence_forStudent } from "../helpers/Registrationhelpers.js";
export const update_student_with_no_mentors=Router()

update_student_with_no_mentors.post('/api/updatestudentwithnomentors',(req,res)=>{
    map_unmathedStudents(req,res)

})

 export const update_Students_prefernce=Router()

 update_Students_prefernce.post('/api/students/updatepreference',async(req,res)=>{

    update_prefence_forStudent(req,res)

 })

 export const FetchStudentInfo=Router()
 FetchStudentInfo.post('/api/fetchinfo',async(req,res)=>{
    

    const {id}=req.body
    if(!id)return res.json({error:true,message:'failed to feth data'})

   const student= await studentDb_collection.findById(id)
   if(!student)return res.json({error:true,message:'failed to feth data'})
    res.json({studentInfo:student})
 })
