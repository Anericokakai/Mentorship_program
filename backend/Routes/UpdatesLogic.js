import { Router } from "express";
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
