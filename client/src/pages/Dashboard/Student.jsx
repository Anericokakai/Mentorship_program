import React from "react";

import Naviagtion from "../../components/Naviagtion";
import Studentcard from "./components/Studentcard";
import Footer from "../Footer";
import {
  FetchRelations,
  fetchstudentInfo,
} from "../helpers/homeFetchFunctions";
import { useSelector, UseSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import { toast } from "react-toastify";
import RelatedComponet from "../../components/RelatedComponet";
import { useEffect } from "react";

function Student() {
  // !user infos
  const [student, setstudent] = useState({});
  const [time, settime] = useState("");
  const { id, role } = useSelector((store) => store.userInfo);

  const [relations, setrelations] = useState({});
  const vals={
    id:id,
    role:role
  }
  useEffect(() => {

    fetchstudentInfo(vals)
      .then((data) => {
       
        setstudent(data.data.studentInfo);
      })
      .catch((error) => {
        toast.error("failed to the server");
      });
  }, [id]);
  

  // ! const id

  useEffect(() => {
    // !greeting hours
    const date = new Date();
    const current_time = date.getHours();
 
    if (current_time > 5 && current_time <= 12) {
      settime("Morning");
    } else if (current_time > 12 && current_time <= 18) {
      settime("Afternoon");
    } else if (current_time > 18 && current_time <= 22) {
      settime("Evening");
    } else if (current_time > 22 && current_time <= 5) {
      settime("Night");
    }

    const values = {
      id: id,
      role: role,
    };

    // FetchRelations(values)
    //   .then((data) => {
    //     console.log(data);
    //     setstudent(data.data);
    //   })
    //   .catch((error) => toast.error("failed to connect"));
  }, []);

  return (
    <div className="students-dash">
      <div className="container-dash">
        <div className="navbar">
          <Naviagtion></Naviagtion>
        </div>
        <div className="welcome">
          <div className="welcome-text">
            <h1>
              Good {time}, <span>{student?.name}</span>
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
            { 
              <div>
                <h4>Your mentor and other students with the same mentor</h4>
                <RelatedComponet
                  hasMentor={student?.hasMentor}
                ></RelatedComponet>
              </div>
            }
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
