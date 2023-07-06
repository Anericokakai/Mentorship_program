import { toast } from "react-toastify";
import axios from "axios";
//  ! function to change the state of the of the inputs

export const handleformSubmitForSignUp = async (form) => {
  const formdata = new FormData(form);
  // ! check if the inputs are empty
  const name = formdata.get("name");
  const email = formdata.get("email");
  const password = formdata.get("password");
  const conpass = formdata.get("conpassword");
  if (!name || !email || !password || !conpass)
    return toast.error("all inputs are required");

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return toast.error("valid email adress is required");
  }

  if (password !== conpass) return toast.error(`user's passwords dont match`);

  const obj = {
    name: name,
    email: email,
    password: password,
  };
  console.log(obj);
  const response = await axios.post(
    "https://mentorship-program.onrender.com/api/students/register",
    obj
  );
  return response;
};

export async function handleLoginForStudents(form) {
  const formdata = new FormData(form);

  const email = formdata.get("email");
  const password = formdata.get("password");
  if (!email || !password) return toast.error("all fileds are required");
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    return toast.error("valid email adress is required");
  const obj = {
    email: email,
    password: password,
  };
  console.log(obj);
  const response = await axios.post(
    "https://mentorship-program.onrender.com/api/students/login",
    obj
  );
  return response;
}

// !tshow or hide passwords
export const showPassword = (input) => {
  if (input.type === "password") {
    return (input.type = "text");
  } else {
    input.type = "password";
  }
};
