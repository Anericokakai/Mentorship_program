import React from "react";
import { toast } from "react-toastify";
import { SubmitPrefence } from "./FunctionAdmin";

function Form({ hideform }) {

    const form =document.querySelector('form')
    // !handle submit
    const handleSubmit=(e)=>{
        e.preventDefault()

      

        SubmitPrefence(form).then(data=>{
            console.log(data)
            if(data.data.error){
                toast.error(data.data.message)

            }else{
                toast.success(data.data.message)

            }
            hideform(false)
        }).catch(error=>{
            console.log(error)
            toast.error(error)
        })
    }
  return (
    <div className="FormContainerAdmin">
      <div className="center">
    
        <i class="fa-solid fa-circle-xmark" onClick={() => hideform(false)}></i>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="inputsAdmin">
          <label htmlFor="">preference</label>
          <input type="text" placeholder="title"name= "preference" />
        </div>
        <div className="inputsAdmin">
          <label htmlFor=""> course</label>
          <input type="text"  name="course"/>
        </div>
        <div className="inputsAdmin">
          <label htmlFor=""> Description</label>
          <textarea name="description" id="" cols="30" rows="10"></textarea>
        </div>
        <div className="inputsAdmin">
          <label htmlFor=""> Description</label>
          <button type="submit" className="btn btnsign green " > Add prefences</button>

        </div>

      </form>
    </div>
  );
}

export default Form;
