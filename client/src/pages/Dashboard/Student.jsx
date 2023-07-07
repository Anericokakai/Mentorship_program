import React from "react";
import "./student.css";
import Naviagtion from "../../components/Naviagtion";
import Studentcard from "./components/Studentcard";
import Footer from "../Footer";
import { fetchstudentInfo } from "../helpers/homeFetchFunctions";
import { useSelector, UseSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import { toast } from "react-toastify";
import RelatedComponet from "../../components/RelatedComponet";
function Student() {
  // !user infos
  const [student, setstudent] = useState({});
  const { id } = useSelector((store) => store.userInfo);

  useState(() => {
    fetchstudentInfo(id)
      .then((data) => {
        setstudent(data.data.studentInfo);
      })
      .catch((error) => {
        toast.error("failed to the server");
      });
  }, [id]);
  console.log(student);
  console.log(student.hasMentor);
  return (
    <div className="students-dash">
      <div className="container-dash">
        <div className="navbar">
          <Naviagtion></Naviagtion>
        </div>
        <div className="welcome">
          <div className="welcome-text">
            <h1>
              Good Evening, <span>{student.name}</span>
            </h1>
          </div>
        </div>
        {/*         // ! your preferences
         */}
        <div>
          <h2>Your preferences : </h2>
          {/* prefences */}
          <div className="prefences">
            {student &&
              student?.preference?.map((single) => (
                <div className="single">
                 
                  
                    <h3>{single}</h3>
                    <button>See {single} courses </button>
                
                </div>
              ))}
          </div>
        </div>
        <div className="mentor-profile">
          <div className="profile-cards">
            {student && student.hasMentor && (
              <div>
                <h4>
                  Your mentor and other students with the same mentor
                </h4>
                <RelatedComponet
                  hasMentor={student.hasMentor}
                ></RelatedComponet>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Student;

// !display mentor with the students

{
}
