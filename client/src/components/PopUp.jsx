import React from "react";
import {useSelector,useDispatch} from 'react-redux'
import { setprefs } from "../toolkit/slices";
import {toast,ToastContainer} from 'react-toastify'
function PopUp({hide,pref,showcat}) {

  const {message}=useSelector(store=>store.userInfo)
  const dispatch=useDispatch()
  const AddToCart=()=>{
    dispatch(setprefs(pref))
    toast.success(message)
    
    hide(false)
    showcat(true)

  }
    console.log(pref)
  return (
    <div className="pop">
      <p className="center">
  
        <i class="fa-solid fa-circle-xmark" onClick={()=>hide(false)}></i>
      </p>
      <h3>Do You Want To Add {pref} to your career ?</h3>
      <div className="buttons">
        <button className=" buttns cancel" onClick={()=>hide(false)}>  cancel</button>
        <button className="buttns accept" onClick={AddToCart}>Add</button>
      </div>
    </div>
  );
}

export default PopUp;
