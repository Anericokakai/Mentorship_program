import React from "react";
import "./student.scss";
import Naviagtion from "../../components/Naviagtion";
import Studentcard from "./components/Studentcard";
import Footer from "../Footer";

function Student() {
  return (
    <div className="students-dash">
      <div className="container-dash">
        <div className="navbar">
          <Naviagtion></Naviagtion>
        </div>
        <div className="welcome">
          <div className="welcome-text">
            <h1>
              Good Evening, <span>John</span>
            </h1>
            <h3>Chat with your mentor</h3>
          </div>
        </div>

        <div className="mentor-profile">
          <Studentcard></Studentcard>
        </div>
      </div>
      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Student;
