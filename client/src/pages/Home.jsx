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
  giveStudentsMentors,
} from "./helpers/homeFetchFunctions";
import { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import PopUp from "../components/PopUp";
import Cart from "../components/Cart";
import RelatedComponet from "../components/RelatedComponet";
import Footer from "./Footer";
import Extras from "../components/Extras";
import ScrollReveal from "scrollreveal";
import loading from "../images/preload.gif";
import Blogs from "../components/Blogs";
function Home() {
  const [student, setstudent] = useState({});
  const [mentor, setmentor] = useState({});
  const [prerence, setpreferences] = useState([{}]);
  const [showpop, setshowpop] = useState(false);
  const [selectedPref, setSelectedPref] = useState("");
  const [showcart, setshowcat] = useState(false);
  const [load, setload] = useState(false);
  // ! acces redux
  const { id, token, refreshToken, role } = useSelector(
    (store) => store.userInfo
  );
  // if (!token || !refreshToken || !id) {
  //   window.location.href = "/signup";
  // }

  ScrollReveal({ reset: true });
  // !refresh function
  const refresh = () => window.location.reload();
  useEffect(() => {
    const values = {
      id: id,
      role: role,
    };
    fetchstudentInfo(values)
      .then((data) => {
        console.log(data.data);
        setstudent(data.data.studentInfo);
        setload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
        setTimeout(refresh, 5000);
      })
      .catch((error) => {
        toast.error("failed to connect to the server");
      });
  };

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

  // !add to cart the selected prefrence
  const addtocart = (pref) => {
    setshowpop(true);
    setSelectedPref(pref);
  };

  // !check if the window has loaded
  //   window.onload=()=>{
  // setload(true)
  //   }

  return (
    <main>
      {!load ? (
        <div className="loading">
          {" "}
          <img src={loading} alt="" />{" "}
        </div>
      ) : (
        <div className="landing_conatiner">
          <section className="snap">
            <ToastContainer
              position={"top-center"}
              closeOnClick={false}
              pauseOnHover={false}
              pauseOnFocusLoss={false}
              draggable={false}
              autoClose={3000}
            />
            <Naviagtion></Naviagtion>
            <div className="landingPage snap">
              <div className="content">
                <h1 className="textrev">
                  Welcome to Mentor .io{" "}
                  <span className="name">{student && student.name}</span>, your
                  ultimate platform for mentorship{" "}
                </h1>
                <h2>Mentor.io connects you with perfect mentor </h2>
              </div>
              <div className="illustrator">
                <img src={gif1} alt="" />
              </div>
            </div>
          </section>

          {/* Available prefences */}
          {(student && student?.preference?.length < 1) || !student ? (
            <section className="snap">
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
                        <strong className="strongsColor"> course: </strong>
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
            </section>
          ) : (
            <></>
          )}
          {student &&
            student.role === "student" &&
            !student.hasMentor &&
            student?.preference?.length > 0 && (
              <div className="requstMentor">
                <h4>It Seems that you dont have a mentor yet </h4>
                <p>
                  click here to check if there are mentors with the same
                  preferences as yours
                </p>
                <button onClick={AssignMentor} className="btn click">
                  Find Mentor
                </button>
              </div>
            )}
          {student &&
            student?.preference?.length > 0 &&
            student.student < 1 && (
              <div className="requstMentor">
                <h4>It Seems that you dont have any students yet </h4>
                <p>
                  click here to check if there are students with the same
                  preferences as yours
                </p>
                <button onClick={Assignstudents} className="btn click">
                  Find Students
                </button>
              </div>
            )}

          <section className="snap">
            <MoreInfo></MoreInfo>
          </section>

          <section className="snap">
            <Extras></Extras>
          </section>
      
          <Blogs></Blogs>
        
        </div>
      )}
      

      <Footer></Footer>
    </main>
  );
}

export default Home;
