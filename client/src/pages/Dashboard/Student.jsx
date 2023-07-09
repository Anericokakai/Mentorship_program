import React from "react";

import Naviagtion from "../../components/Naviagtion";
import Studentcard from "./components/Studentcard";
import Footer from "../Footer";
import {
  assignMentor_helper,
  FetchRelations,
  fetchstudentInfo,
  giveStudentsMentors,
} from "../helpers/homeFetchFunctions";
import { useSelector, UseSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import RelatedComponet from "../../components/RelatedComponet";
import { useEffect } from "react";
import loadingimg from "../../images/preload.gif";
import { Link } from "react-router-dom";
function Student() {
  // !user infos
  const [student, setstudent] = useState({});
  const [time, settime] = useState("");
  const [loading, setloading] = useState(false);
  const { id, role } = useSelector((store) => store.userInfo);

  const [relations, setrelations] = useState({});
  const vals = {
    id: id,
    role: role,
  };
  useEffect(() => {
    fetchstudentInfo(vals)
      .then((data) => {
        setloading(true);

        setstudent(data.data.studentInfo);
      })
      .catch((error) => {
        toast.error("failed to the server");
      });
  }, [id]);

  // ! const id
  const refresh = () => window.location.reload();
  const AssignMentor = () => {
    assignMentor_helper(id)
      .then((data) => {
        toast.success(data.data.message);
        setTimeout(refresh, 4000);
      })
      .catch((error) => {
        toast.error("failed to connect to the server");
      });
  };

  useEffect(() => {
    // !greeting hours
    const date = new Date();
    const current_time = date.getHours();

    if (current_time > 5 && current_time <= 14) {
      settime("Morning");
    } else if (current_time > 14 && current_time <= 18) {
      settime("Afternoon");
    } else if (current_time > 18 && current_time <= 22) {
      settime("Evening");
    } else if (current_time > 22 && current_time <= 5) {
      settime("Night");
    }

    console.log(current_time);
  }, []);
  console.log(student);

    // !assign mentors students
    const Assignstudents = () => {
      // !call the api to trigger matches
  
      giveStudentsMentors()
        .then((data) => {
          toast.success(data.data.message);
          console.log(data);
          setTimeout(refresh, 5000);
        })
        .catch((error) => {
          console.log(error);
          toast.error("failed to connect");
        });
    };

  return (
    <main>
      <ToastContainer
        position={"top-center"}
        closeOnClick={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        autoClose={3000}
      />
      {!loading ? (
        <div className="loading">
          {" "}
          <img src={loadingimg} alt="" />{" "}
        </div>
      ) : (
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
              <h2>Your career path : </h2>
              {/* prefences */}
              <div className="prefences preference1">
                {student?.preference.length > 0 ? (
                  student?.preference?.map((single) => (
                    <div className="single">
                      <h3>{single}</h3>
                      <button>See {single} courses </button>
                    </div>
                  ))
                ) : (
                  <div className="warning">
                    <h3>
                      you have not selected any of the vailable career paths{" "}
                    </h3>
                    <p>
                      click{" "}
                      <Link className="linkto" to={"/"}>
                        here
                      </Link>{" "}
                      to select a career path and add them to cart , remeber to
                      submit the cart
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mentor-profile">
              <div className="profile-cards">
                {student && student.role === "student" && student.hasMentor ? (
                  <div>
                    <h4>Your mentor and other students with the same mentor</h4>
                    <RelatedComponet
                      hasMentor={student?.hasMentor}
                    ></RelatedComponet>
                  </div>
                ) : (
                  student &&
                  student.role === "student" && (
                    <div>
                      <h3 className="center2">
                        Looks like you have not been asigned a mentor ,{" "}
                      </h3>
                      <p className="center2">
                        {" "}
                        <button className="btn click" onClick={AssignMentor}>
                          Find a mentor
                        </button>
                      </p>
                    </div>
                  )
                )}

{student && student.role === "mentor" && student.hasMentor ? (
                  <div>
                    <h4>students that you will be mentoring</h4>
                    <RelatedComponet
                      hasMentor={student?.hasMentor}
                    ></RelatedComponet>
                  </div>
                ) : (
                  student &&
                  student.role === "mentor" && (
                    <div>
                      <h3 className="center2">
                        Looks like you have not been asigned any students ,
                      </h3>
                      <p className="center2">
                        {" "}
                        <button className="btn click" onClick={Assignstudents}>
                          Find students 
                        </button>
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="footer">
            <Footer></Footer>
          </div>
        </div>
      )}
    </main>
  );
}

export default Student;

// !display mentor with the students

{
}
