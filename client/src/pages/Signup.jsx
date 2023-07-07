import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  handleformSubmitForSignUp,
  handleLoginForStudents,
  showPassword,
} from "./helpers/Functions";
import { useDispatch } from "react-redux";
import "./pages.css";
import { setId, Setrefreshtoken, Setroles, Settoken } from "../toolkit/slices";
import preloder from "../images/preload.gif";
import Preloader from "../components/Preloader";
function Signup() {
  // const { token, refreshToken, role } = useSelector((store) => store.userInfo);

  // !query electors
  const inputType_password = document.querySelector(".password");
  const inputCon = document.querySelector(".conpass");

  const formsInputs = document.querySelector("form");

  // !react hooks
  const dispatch = useDispatch();

  const [login, setlogin] = useState(false);
  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(false);
  const [loading, setloading] = useState();
  const [strong, setstrong] = useState();
  const [weak, setweak] = useState();
  const [focused, setfocused] = useState();
  const [medium, setmedium] = useState();
  // !strength of the password
  const [checkpass, setcheckpass] = useState("");
  // !change between sign up and login forms
  function handleChangeForm() {
    if (login === false) {
      setlogin(!login);
    } else {
      setlogin(false);
    }
  }
  // ! redirect function
  // todo REUSABLES
  const redirect = () => {
    return (window.location.href = "/");
  };

  // !handle change of form
  const handleForm = async (e) => {
    setloading(true);

    e.preventDefault();
    if (!login) {
      await handleformSubmitForSignUp(formsInputs)
        .then((response) => {
          // !dismiss loafind
          setloading(false);
          if (response.data.error) {
            toast.error(response.data.message);
          } else {
            toast.success(response.data.message);
            formsInputs.reset();
            setlogin(true);
          }
        })
        .catch((error) => {
          toast.error(error);
          setloading(false);
        });
    } else if (login) {
      await handleLoginForStudents(formsInputs)
        .then((response) => {
          setloading(false);
          console.log(response.data);
          if (response.data.error === true) {
            toast.error(response.data.message);
          }
          if (response.data.status == 200) {
            toast.success(response.data.message);
            const userToken = response.data.token;
            const refresh = response.data.refreshToken;
            const givenRole = response.data.role;
            const id = response.data.id;
            dispatch(Settoken(userToken));
            dispatch(Setrefreshtoken(refresh));
            dispatch(Setroles(givenRole));
            dispatch(setId(id));

            formsInputs.reset();

            setTimeout(redirect, 4000);
          }
        })
        .catch((error) => {
          toast.error(error);
          setloading(false);
        });
    }
  };
  //! showPassword or hide password

  const showOrHide = () => {
    if (show === false) {
      setshow(true);
    } else {
      setshow(false);
    }
    console.log(inputType_password);
    inputType_password && showPassword(inputType_password);
  };
  const showOrHideCon = () => {
    if (show2 === false) {
      setshow2(true);
    } else {
      setshow2(false);
    }

    showPassword(inputCon);
  };

  // !handle change in passowrd

  const handleChange = (e) => {
    const val = e.target.value;
    setcheckpass(val);

   if( val!='') {
    setweak(true);
   } else{
    setweak(false)
   }
    // !reg expresion to check password
    const strongpassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    const mediumPass = new RegExp(
      "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
    );
    if (strongpassword.test(val)) {
      setstrong(true);
      setweak(false);
      setmedium(false)
    } else if (mediumPass.test(val)) {
     
      setmedium(true)
      setweak(false);
      setstrong(false)
    }else{
      setmedium(false)
      setstrong(false)
    }
  };
 
  return (
    <div>
      <ToastContainer
        position={"top-center"}
        closeOnClick={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        autoClose={3000}
      />
      <div className="signupcontainer">
        <div className="singupForm">
          {loading && <Preloader></Preloader>}
          <h1>{login ? "sign in to Mentors.io" : "sign up  to mentors.io"}</h1>
          <form action="" className="Form1" onSubmit={handleForm}>
            {login === false && (
              <div className="inputs">
                <input
                  type="text"
                  name="name"
                  id="username"
                  placeholder="name "
                  autoComplete="off"
                />
              </div>
            )}
            <div className="inputs">
              <input
                type="text"
                name="email"
                autoComplete="off"
                placeholder="email"
              />
            </div>
            <div className="inputs">
              <input
                type="password"
                placeholder="password"
                name="password"
                className="password"
                value={checkpass}
                onFocus={() => setfocused(true)}
                onBlur={() => setfocused(false)}
                onChange={(e) => handleChange(e)}
              />
              {show ? (
                <i class="fa-regular fa-eye-slash" onClick={showOrHide}></i>
              ) : (
                <i class="fa-regular fa-eye" onClick={showOrHide}></i>
              )}
              {!login && focused && strong && (
                <p className='strong message'>strong password <i class="fa-solid fa-check-double"></i> </p>
              )}
              {!login && focused && weak && (
                <p className='red message'>weak password <i class="fa-solid fa-x"></i> </p>
              )}
              {
               !login && focused && medium &&  <p className= "medium message">medium password  <i class="fa-solid fa-check"></i> </p>
              }
            </div>
            {login === false && (
              <div className="inputs">
                <input
                  type="password"
                  name="conpassword"
                  className="conpass"
                  placeholder=" confirm password"
                />
                {show2 ? (
                  <i
                    class="fa-regular fa-eye-slash"
                    onClick={showOrHideCon}
                  ></i>
                ) : (
                  <i class="fa-regular fa-eye" onClick={showOrHideCon}></i>
                )}
              </div>
            )}

            <div className="inputs">
              <button type="submit" className="btn btnsign">
                {login ? "sign in" : " sign up"}
              </button>
            </div>
          </form>
        </div>

        {login ? (
          <div className="signdetails">
            <h2> Welcome Back to Mentor.io </h2>
            <p>Enter your email and password to continue</p>
            <p>dont have an account ?</p>
            <button className="btn signupsbtn" onClick={handleChangeForm}>
              sign up
            </button>
          </div>
        ) : (
          <div className="signdetails">
            <h2> Welcome to mentor.io </h2>
            <p>
              To get connected with us please enter your name, school email and
              a password
            </p>
            <p>Have an account ?</p>
            <button className="btn signupsbtn" onClick={handleChangeForm}>
              {" "}
              sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
