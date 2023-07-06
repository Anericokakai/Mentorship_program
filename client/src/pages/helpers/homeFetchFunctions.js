import axios from "axios";

export const fetchstudentInfo = async (id) => {
  const result = await axios.post(
    "https://mentorship-program.onrender.com/api/fetchinfo",
    {
      id: id,
    }
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
export const FetchRelations = async (id) => {
  const result = await axios.post(
    "https://mentorship-program.onrender.com/api/students/relations",
    id
  );
  return result;
};
