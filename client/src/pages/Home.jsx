import React from "react";
import MoreInfo from "../components/MoreInfo";
import Naviagtion from "../components/Naviagtion";
import gif1 from "../images/gif1.png";
import "./pages.css";
import { useSelector, UseSelector } from "react-redux/es/hooks/useSelector";
import { fetchstudentInfo } from "./helpers/homeFetchFunctions";
import { useEffect } from "react";
import { useState } from "react";
function Home() {
  const [student, setstudent] = useState({});
  // ! acces redux
  const { id } = useSelector((store) => store.userInfo);
  useEffect(() => {
    fetchstudentInfo(id)
      .then((data) => {
        setstudent(data.data.studentInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(student);
  console.log(student.preference)
  return (
    <div className="landing_conatiner">
      <Naviagtion></Naviagtion>
      <div className="landingPage">
        <div className="content">
          <h1>
            Welcome to Mentor .io <span className="name">{student.name}</span>,
            your ultimate platform for mentorship{" "}
          </h1>
          <h2>Mentor.io connects you with perfect macth </h2>
        </div>
        <div className="illustrator">
          <img src={gif1} alt="" />
        </div>
      </div>
      {/* Available prefences */}
      {student?.preference?.length<1? (
        <div>
          <h2>What are you intrested in ?</h2>

          <div className="prefences">
            <div className="single">
              <h3>Cyber Security</h3>
              <p>follow your cyber sec path</p>
            </div>
            <div className="single">
              <h3>Cyber Security</h3>
              <p>follow your cyber sec path</p>
            </div>
            <div className="single">
              <h3>Cyber Security</h3>
              <p>follow your cyber sec path</p>
            </div>
            <div className="single">
              <h3>Cyber Security</h3>
              <p>follow your cyber sec path</p>
            </div>
            <div className="single">
              <h3>Cyber Security</h3>
              <p>follow your cyber sec path</p>
            </div>
            <div className="single">
              <h3>Cyber Security</h3>
              <p>follow your cyber sec path</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
        <h2>your career path ?</h2>

        <div className="prefences">

  {
    student?.preference?.map(single=>
      <div className="single">
      <h3>{single}</h3>
      <p>follow your cyber sec path</p>
    </div>
    )
  }
        
         
        </div>
      </div>
      )}

      <MoreInfo></MoreInfo>
    </div>
  );
}

export default Home;
