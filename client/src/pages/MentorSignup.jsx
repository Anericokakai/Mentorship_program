import React, { useState } from "react";
import "./pages.css";
import { ToastContainer, toast } from "react-toastify";
import { handleFormSubmitMentors, handleMentorLogin} from "./helpers/Functions";

function MentorSignup() {
  // ! query selectors
  const formsInputs = document.querySelector("form");

  //   ! hooks
  const [loading, setloading] = useState();
  const [login, setlogin] = useState(false);

  // !change between sign up and login forms
  function handleChangeForm() {
    if (login === false) {
      setlogin(!login);
    } else {
      setlogin(false);
    }
  }

  //   ! handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login) {
      await handleFormSubmitMentors(formsInputs)
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
      await handleMentorLogin(formsInputs)
        .then((response) => {
          setloading(false);
          console.log(response.data);
          if (response.data.error === true) {
            toast.error(response.data.message);
          }
          if (response.data.status == 200) {
            toast.success(response.data.message);
            // const redirect = (window.location.href = "/dash")
            // redirect();
            const userToken = response.data.token;
            const refresh = response.data.refreshToken;
            const givenRole = response.data.role;
            const id = response.data.id;
            //   dispatch(Settoken(userToken));
            //   dispatch(Setrefreshtoken(refresh));
            //   dispatch(Setroles(givenRole));
            //   dispatch(setId(id))

            formsInputs.reset();
          }
        })
        .catch((error) => {
          toast.error(error);
          setloading(false);
        });
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
          <h1>{login ? "Mentor sign in " : "Mentor sign up"}</h1>
          <form action="" className="Form1" onSubmit={handleSubmit}>
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
            </div>
            {login === false && (
              <div className="inputs">
                <input
                  type="password"
                  name="conpassword"
                  className="conpass"
                  placeholder=" confirm password"
                />
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
              To get connected with us please enter your name, email and a
              password
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

export default MentorSignup;
