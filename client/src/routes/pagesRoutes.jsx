import Home from "../pages/Home";
import Signup from "../pages/Signup";

import Admin from "../Admin/Admin";
import PageNotFound from "../pages/PageNotFound";

export const routes = [
  { element: <Signup></Signup>, path: "/signup" },
  {
    element: <Home></Home>,
    path: "/",
  },
  
  {
    path:'/admin',
    element:<Admin></Admin>
  },{
    path:'*',
    element:<PageNotFound></PageNotFound>
  }
  
];
