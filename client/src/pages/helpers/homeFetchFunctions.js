import axios from "axios";

// render address: htttps://mentorship-program.onrender.com

export const fetchstudentInfo = async (values) => {
  const result = await axios.post(
    "https://mentorship-program.onrender.com/api/fetchinfo",
    values
  );
  return result;
};

export const Fechprefernces = async () => {
  const result = await axios.get(
    "https://mentorship-program.onrender.com/api/students/send-pref"
  );
  return result;
};

// !submit new prefernces
export const newPrefrences = async (values) => {
  const results = await axios.post(
    "https://mentorship-program.onrender.com/api/students/addprefernces",
    values
  );
  return results;
};

// !assign student a mentor
export const assignMentor_helper = async (id) => {
  const results = await axios.post(
    "https://mentorship-program.onrender.com/api/students/findamentor",
    {
      id: id,
    }
  );
  return results;
};

// ! fetch relations
export const FetchRelations = async (values) => {
  const result = await axios.post(
    "https://mentorship-program.onrender.com/api/students/relations",
    values
  );
  return result;
};

// !give mentors students with the same prefences

export const giveStudentsMentors = async () => {
  const result = await axios.post(
    "https://mentorship-program.onrender.com/api/updatestudentwithnomentors"
  );
  return result;
};
