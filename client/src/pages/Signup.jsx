import React from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleformSubmitForSignUp } from "./helpers/Functions";
import "./pages.css";
function Signup() {
  const [login, setlogin] = useState(false);
  function handleChangeForm() {
    if (login === false) setlogin(!login);
    else {
      setlogin(false);
    }
  }
  // !handle change of form
  const handleForm=(e)=>{
    const formsInputs =document.querySelector('form')
    e.preventDefault();
    if(!login){

      handleformSubmitForSignUp(formsInputs)
    }

  }

  console.log(login);

  return (
    <div>
      <ToastContainer
        position={"top-center"}
        closeOnClick={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        autoClose={2000}
      />
      <div className="signupcontainer">
        <div className="singupForm">
          <h1>{login ? "sign in to Mentors.io" : "sign up  to mentors.io"}</h1>
          <form action="" className="Form1" onSubmit={handleForm}>
            {login === false && (
              <div className="inputs">
                <input
                  type="text"
                  name="name"
                  id="username"
                  placeholder="name "
                />
              </div>
            )}
            <div className="inputs">
              <input type="text" name="email" placeholder="email" />
            </div>
            <div className="inputs">
              <input type="password" placeholder="password" name="password" />
            </div>
            {login === false && (
              <div className="inputs">
                <input
                  type="password"
                  name="conpassword"
                  placeholder=" confirm password"
                />
              </div>
            )}

            <div className="inputs">
              <button className="btn btnsign">
                {login ? "sign in" : " sign up"}
              </button>
            </div>
          </form>
        </div>

        {login ? (
          <div className="signdetails">
            <h2> Welcome Back to Mentor.io </h2>
            <p>Enter your email and password to continue</p>{" "}
            <button className="btn signupsbtn" onClick={handleChangeForm}>
              sign in
            </button>
          </div>
        ) : (
          <div className="signdetails">
            <h2> Welcome to mentor.io </h2>
            <p>
              To get connected with us please enter your name, school email and
              a password
            </p>
            <button className="btn signupsbtn" onClick={handleChangeForm}>
              {" "}
              sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
