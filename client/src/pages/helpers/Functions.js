import { toast } from "react-toastify";
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

    if(password!==conpass)
    return toast.error(`user's passwords dont match`)
};
