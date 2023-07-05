import axios from "axios"

export const fetchstudentInfo=async(id)=>{
    const result=await axios.post('http://localhost:8001/api/fetchinfo',{id:id})
    return result
}

export const Fechprefernces=async()=>{
const result=await axios.get('http://localhost:8001/api/students/send-pref')
return result
}


// !submit new prefernces
export const newPrefrences=async(values)=>{
    const results= await axios.post('http://localhost:8001/api/students/addprefernces',values)
    return results
}

// !assign student a mentor
export const assignMentor_helper=async(id)=>{
    const results=await axios.post('http://localhost:8001/api/students/findamentor',{
        id:id
    })
    return results

}