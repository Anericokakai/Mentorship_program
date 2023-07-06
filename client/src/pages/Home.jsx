import React from "react";
import MoreInfo from "../components/MoreInfo";
import Naviagtion from "../components/Naviagtion";
import gif1 from "../images/gif1.png";
import "./pages.css";
import { useSelector, UseSelector } from "react-redux/es/hooks/useSelector";
import {
  assignMentor_helper,
  Fechprefernces,
  fetchstudentInfo,
} from "./helpers/homeFetchFunctions";
import { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import PopUp from "../components/PopUp";
import Cart from "../components/Cart";
import RelatedComponet from "../components/RelatedComponet";
function Home() {
  const [student, setstudent] = useState({});
  const [prerence, setpreferences] = useState([{}]);
  const [showpop, setshowpop] = useState(false);
  const [selectedPref, setSelectedPref] = useState("");
  const [showcart, setshowcat] = useState(false);
  // ! acces redux
  const { id, token, refreshToken } = useSelector((store) => store.userInfo);
  if (!token || !refreshToken || !id) {
    window.location.href = "/signup";
  }
  useEffect(() => {
    fetchstudentInfo(id)
      .then((data) => {
        setstudent(data.data.studentInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    Fechprefernces()
      .then((data) => {
        setpreferences(data.data);
      })
      .catch((error) => {
        toast.error("failed to connect!!");
      });
  }, []);

  // !find a mentor for the studdent
  const AssignMentor = () => {
    assignMentor_helper(id)
      .then((data) => {
        toast.success(data.data.message);
      })
      .catch((error) => {
        toast.error("failed to connect to the server");
      });
  };

  // !add to cart the selected prefrence
  const addtocart = (pref) => {
    setshowpop(true);
    setSelectedPref(pref);
  };
  return (
    <div className="landing_conatiner">
      <ToastContainer
        position={"top-center"}
        closeOnClick={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        autoClose={3000}
      />
      <Naviagtion></Naviagtion>
      <div className="landingPage">
        <div className="content">
          <h1>
            Welcome to Mentor .io{" "}
            <span className="name">{student && student.name}</span>, your
            ultimate platform for mentorship{" "}
          </h1>
          <h2>Mentor.io connects you with perfect macth </h2>
        </div>
        <div className="illustrator">
          <img src={gif1} alt="" />
        </div>
      </div>
      {/* Available prefences */}
      {student && student?.preference?.length < 1 ? (
        <div>
          <h2>What are you intrested in ?</h2>

          <div className="prefences">
            {showpop && (
              <div className="popUpContainer">
                <PopUp hide={setshowpop} pref={selectedPref}></PopUp>
              </div>
            )}
            {prerence &&
              prerence.map((single) => (
                <div className="single">
                  <h3>{single?.preference}</h3>
                  <p>{single?.description}</p>
                  <p>
                    {" "}
                    <strong> course: </strong>
                    {single?.course}
                  </p>
                  <i
                    class="fa-sharp fa-solid fa-plus"
                    onClick={() => addtocart(single?.preference)}
                  ></i>
                </div>
              ))}

            <div className="cartIcon">
              <div className={`cartContainer ${showcart && "showcart"}`}>
                <Cart carthide={setshowcat}></Cart>
              </div>
              <i
                class="fa-solid fa-cart-shopping"
                onClick={() => setshowcat(true)}
              ></i>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>your career path ?</h2>

          <div className="prefences">
            {student &&
              student?.preference?.map((single) => (
                <div className="single">
                  <h3>{single}</h3>
                  <p>follow your cyber sec path</p>
                </div>
              ))}
          </div>
        </div>
      )}
      {student && !student.hasMentor && student?.preference?.length > 0 && (
        <div className="requstMentor">
          <h4>It Seems that you dont have a mentor yet </h4>
          <p>
            click here to check if there are mentors with the same preferences
            as yours
          </p>
          <button onClick={AssignMentor} className="btn click">
            Find Mentor
          </button>
        </div>
      )}

      <div>
        {student && student.hasMentor && (
          <div>
            <h4>Your mentor and other students with the same same mentor</h4>
            <RelatedComponet hasMentor={student.hasMentor}></RelatedComponet>
          </div>
        )}
      </div>

      <MoreInfo></MoreInfo>
    </div>
  );
}

export default Home;
