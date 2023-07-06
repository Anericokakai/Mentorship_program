import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { newPrefrences } from "../pages/helpers/homeFetchFunctions";
import { clearCat, removeFromCat } from "../toolkit/slices";

function Cart({ carthide }) {
  const { prefs ,id} = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  
const reload=()=>{
   return window.location.reload()

}
  //   ! submit the prefernces
  const sendToBackEnd = () => {
    const values={
      id:id,
      preference:prefs
      
    }
    carthide(false)
    newPrefrences(values).then(data=>{
      dispatch(clearCat())
      console.log(data)
      if(data.data.error){
        toast.error(data.data.message)
      }else{
        toast.success(data.data.message)
    setTimeout(reload,5000)
      }
    }).catch(error=>{
      toast.error('failed to acces the database')
    })

    
  };
  const handleDelete = (single) => {
    dispatch(removeFromCat(single));
  };
  return (
    <div className="cart">
      <i class="fa-solid fa-circle-xmark" onClick={() => carthide(false)}></i>
      {prefs.length > 0 && <h3 className="center">Your selected career</h3>}

      {prefs.length > 0 ? (
        prefs.map((single) => (
          <div className="singlePref">
            <p>{single}</p>
            <i
              class="fa-solid fa-trash"
              onClick={() => handleDelete(single)}
            ></i>
          </div>
        ))
      ) : (
        <div className="emptycart">
          <h3> Your cart is empty </h3>
          <p>you have not selected any of the available career paths</p>
        </div>
      )}
      {prefs.length > 0 && (
        <div className="btncontainer">
          <button className="buttns accept" onClick={sendToBackEnd}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
