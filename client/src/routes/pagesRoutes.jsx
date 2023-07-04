import Home from "../pages/Home";
import Signup from "../pages/Signup";

export const routes = [
  { element: <Signup></Signup>, path: "/signup" },
  {
    element: <Home></Home>,
    path: "/",
  },
  
];
