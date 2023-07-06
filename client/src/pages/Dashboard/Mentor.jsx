import React from "react";
import "./mentor.scss";
import Naviagtion from "../../components/Naviagtion";
import Studentcard from "./components/Studentcard";
import Footer from "../Footer";

function Mentor() {
  return (
    <div className="mentor-main">
     <div className="container-mentor">
     <div className="navbar">
        <Naviagtion></Naviagtion>
      </div>

      <div className="welcome">
        <div className="welcome-text">
        <h1>
          Good Evening, <span>John</span>
        </h1>
        <h3>Chat with your mentees</h3>
        </div>
        <div className="students">
            <Studentcard></Studentcard>
            <Studentcard></Studentcard>
            <Studentcard></Studentcard>
            <Studentcard></Studentcard>
            <Studentcard></Studentcard>
        </div>
      </div>
     </div>
     <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Mentor;
