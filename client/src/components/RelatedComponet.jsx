import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FetchRelations,
  startNewChat,
} from "../pages/helpers/homeFetchFunctions";
import axios from "axios";

function RelatedComponet({ hasMentor }) {
  // !store student info
  const [relations, setrelations] = useState({});
  // ! const id
  const { id, role } = useSelector((store) => store.userInfo);

  const values = {
    id: id,
    role: role,
  };

  useEffect(() => {
    FetchRelations(values)
      .then((data) => {
        console.log(data?.data?.info);
        setrelations(data?.data.info[0]);
      })
      .catch((error) => toast.error("failed to connect"));
  }, [id]);

  // ! start new chat
  const startNewChat = async (student_id) => {
    try {
      const response = await axios.post(
        "https://mentorship-program.onrender.com/api/chats/create",
        { mentor_id: relations?.mentor_id?._id, student_id: student_id }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(relations?.mentor_id?.role);
  return (
    <div className="menteesInformation">
      <div className="mentor">
        <strong className="underline"> Mentors details</strong>
        <div className="detailsOfMentor">
          <p>
            <strong className="strongs">Name:</strong>
            {relations && relations?.mentor_id?.name}
          </p>
          <p>
            <strong className="strongs">career Path:</strong>

            {relations && relations?.mentor_id?.preference.join(", ")}
          </p>
          <p>
            <strong className="strongs">Mentees :</strong>
            {relations && relations?.mentor_id?.student}
          </p>

          <button>Chat with your mentor</button>
        </div>
      </div>

      <div className="studentsCpntainer">
        <p className="center2">
          {" "}
          <strong className="underline"> Students with the same mentor</strong>
        </p>
        <div className="students">
          {relations &&
            relations?.student_id?.map((single) => (
              <div className="singleStudent">
                <p>
                  <strong className="strongs">Name:</strong>
                  {single?.name}
                </p>
                <p>
                  <strong className="strongs"> Career path:</strong>
                  {single.preference?.join(", ")}
                </p>
                <button onClick={() => startNewChat(single?._id)}>
                  Chat with {single?.name}{" "}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedComponet;
