import React from "react";
import {useSelector,useDispatch} from 'react-redux'
import { setprefs } from "../toolkit/slices";
import {toast,ToastContainer} from 'react-toastify'
function PopUp({hide,pref}) {

  const {message}=useSelector(store=>store.userInfo)
  const dispatch=useDispatch()
  const AddToCart=()=>{
    dispatch(setprefs(pref))
    toast.success(message)
    hide(false)

  }
    console.log(pref)
  return (
    <div className="pop">
      <p className="center">
  
        <i class="fa-solid fa-circle-xmark" onClick={()=>hide(false)}></i>
      </p>
      <h1>Do You Want To Add to your career ?</h1>
      <div className="buttons">
        <button className=" buttns cancel" onClick={()=>hide(false)}>  cancel</button>
        <button className="buttns accept" onClick={AddToCart}>Add</button>
      </div>
    </div>
  );
}

export default PopUp;
