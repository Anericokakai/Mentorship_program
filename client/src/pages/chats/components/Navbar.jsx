import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import back from "../images/back.webp";
import { toast } from "react-toastify";
import { FetchRelations, fetchstudentInfo } from "../../helpers/homeFetchFunctions";

function Navbar( {hasMentor}) {

  const [relations, setrelations] = useState({});
  const [student, setstudent] = useState({});

  const { id, token, refreshToken, role } = useSelector(
    (store) => store.userInfo
  ); 
    const values = {
      id: id,
      role:role
    };
    
    useEffect(()=>{
      fetchstudentInfo(values)
        .then((data) => {
          console.log(data.data);
        setstudent(data.data.studentInfo);
        })
        .catch((error) => toast.error("failed to connect"));

    },[id])

    



  return (
    <div className="navbar">
      <img id="back" src={back} alt="" />
      <span className="logo">Your Chats</span>
      <div className="user">
        <img id="user-profile"
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <span> {student && student.name}  </span>
      </div>
    </div>
  );
}

export default Navbar;
