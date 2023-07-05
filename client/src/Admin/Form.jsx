import React from "react";
import { toast } from "react-toastify";
import { SubmitPrefence } from "./FunctionAdmin";
import preloader from '../images/preload.gif'
import { useState } from "react";
function Form({ hideform }) {
    // ! handle show 
    const [loading,setloading]=useState()

  // !handle submit
  const handleSubmit = (e) => {
    setloading(true)
    e.preventDefault();
    const form = document.querySelector("form");


    SubmitPrefence(form)
      .then((data) => {
        setloading(false)
        console.log(data);
        if (data.data.error) {
          toast.error(data.data.message);

        } else {
          toast.success(data.data.message);
        }
        hideform(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
        setloading(false)
      });
  };
  return (
    <div className="FormContainerAdmin">
        {
            loading && <div className="preloader adminLoader">
            <img src={preloader} alt="" />
        </div>
        }
      <div className="center">
        <i class="fa-solid fa-circle-xmark" onClick={() => hideform(false)}></i>
      </div>
      <form onSubmit={handleSubmit}>

        <div className="inputsAdmin">
          <label htmlFor="">preference</label>
          <input type="text" placeholder="title" name="preference" />
        </div>
        <div className="inputsAdmin">
          <label htmlFor=""> course</label>
          <input type="text" name="course" />
        </div>
        <div className="inputsAdmin">
          <label htmlFor=""> Description</label>
          <textarea name="description" id="" cols="30" rows="10"></textarea>
        </div>
        <div className="inputsAdmin">
          <label htmlFor=""> Description</label>
          <button type="submit" className="btn btnsign green ">
            {" "}
            Add prefences
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
