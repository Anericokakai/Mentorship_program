import {Router} from 'express'
import { map_unmathedStudents } from '../helpers/algorithmsFunctions/unmarchedAlgo'

 export const AssignStudents_without_mentors=Router()

 AssignStudents_without_mentors.post('/api/students/updates',async(req,res)=>{

    map_unmathedStudents(req,res)
 })