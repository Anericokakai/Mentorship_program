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

  // !handle change of form
  const handleForm = async (e) => {
    setloading(true);

    e.preventDefault();
    if (!login) {
      await handleformSubmitForSignUp(formsInputs)
        .then((response) => {
          // !dismiss loafind
   setloading(false)
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
          setloading(false)
        });
    } else if (login) {
      await handleLoginForStudents(formsInputs)
        .then((response) => {
          setloading(false)
          console.log(response.data);
          if (response.data.error === true) {
            toast.error(response.data.message);
          }
          if (response.data.status == 200) {
            toast.success(response.data.message);
            const userToken = response.data.token;
            const refresh = response.data.refreshToken;
            const givenRole = response.data.role;
            const id=response.data.id
            dispatch(Settoken(userToken));
            dispatch(Setrefreshtoken(refresh));
            dispatch(Setroles(givenRole));
            dispatch(setId(id))

            formsInputs.reset();
          }
        })
        .catch((error) => {
          toast.error(error);
          setloading(false)
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
    showPassword(inputType_password);
  };
  const showOrHideCon = () => {
    if (show2 === false) {
      setshow2(true);
    } else {
      setshow2(false);
    }

    showPassword(inputCon);
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
          {loading && (
            <div className="preloader">
              <img src={preloder} alt="" />
            </div>
          )}
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
              />
              {show ? (
                <i class="fa-regular fa-eye-slash" onClick={showOrHide}></i>
              ) : (
                <i class="fa-regular fa-eye" onClick={showOrHide}></i>
              )}
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
              <button  type="submit" className="btn btnsign">
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
