import React from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "./Admin.css";
import Form from "./Form";

function Admin() {
  // !state to toggle the form
  const [showform, setshowform] = useState(false);
  const addPrefrence = () => {
    setshowform(true);
  };
  console.log(showform);
  return (
    <div className="AdminContainer">
      <ToastContainer
        position={"top-center"}
        closeOnClick={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        autoClose={3000}
      />
      {showform && (
        <div className="popUp">
          <Form hideform={setshowform}></Form>
        </div>
      )}

      <nav className="adminNav">
        <div className="names">
          <h2>welcome Back Rico</h2>
        </div>
      </nav>
      <div className="statistics">
        <div className="first">
          <h2>Mentors</h2>
          <p>500</p>
        </div>
        <div className="first">
          <h2>Mentors</h2>
          <p>500</p>
        </div>
        <div className="first">
          <h2>Mentors</h2>
          <p>500</p>
        </div>
        <div className="first">
          <h2>Mentors</h2>
          <p>500</p>
        </div>
        <div className="first">
          <h2>Mentors</h2>
          <p>500</p>
        </div>
      </div>
      <div className="actions">
        <h1>Actions</h1>
        <div className="actionsContainer">
          <div className="singleAction" onClick={addPrefrence}>
            <strong>Add Preferences</strong>
          </div>
          <div className="singleAction">
            <strong>Add Preferences</strong>
          </div>
          <div className="singleAction">
            <strong>Add Preferences</strong>
          </div>
          <div className="singleAction">
            <strong>Add Preferences</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
