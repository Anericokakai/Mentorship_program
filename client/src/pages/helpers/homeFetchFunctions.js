import axios from "axios"

export const fetchstudentInfo=async(id)=>{
    const result=await axios.post('http://localhost:8001/api/fetchinfo',{id:id})
    return result
}