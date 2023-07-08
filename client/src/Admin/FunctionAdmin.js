import axios from "axios";
import { toast } from "react-toastify";

export const SubmitPrefence = async (form) => {
  const fromdata = new FormData(form);
  // !validate form
  const preference = fromdata.get("preference");
  const course = fromdata.get("course");
  const description = fromdata.get("description");

  console.log(fromdata);
  if (!preference || !course || !description)
    return toast.error("all fields are required");

  const obj = {
    preference,
    course,
    description,
  };
  console.log(obj);

  const send = await axios.post(
    "https://mentorship-program.onrender.com/api/students/preferences",
    obj
  );

  return send;
};
