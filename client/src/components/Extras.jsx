import React from "react";
import "./components.css";
import one from "../images/3.jpg";
import two from "../images/1.svg";
import three from "../images/4.svg";
function Extras() {
  return (
    <div className="extras_container snap">
      
      <div className="descriptions">
        <h1 className="textrev"> "Unlock Your Potential with Expert Guidance"</h1>
        <p>
        Experience personal and professional growth through the guidance of our seasoned mentors, tailored to your unique needs and aspirations
        </p>
      </div>
      <div className="extrasImage">
        <img src={one} alt="" />
      </div>
    </div>
  );
}

export default Extras;
