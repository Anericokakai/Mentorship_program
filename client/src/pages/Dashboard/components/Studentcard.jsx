import React from "react";

function Studentcard() {

    const handleClick = () =>{
        
    }
  return (
    <div>
      <div className="student">
        <div className="student-image">
        <img
          src="data:image/jpeg;base64,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"
          alt=""
        />
        </div>
        <p>name</p>
        <button onClick={handleClick} >chat</button>
      </div>
    </div>
  );
}

export default Studentcard;
