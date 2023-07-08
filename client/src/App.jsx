
import { useRoutes } from "react-router-dom";
import { routes } from "./routes/pagesRoutes";
import 'react-toastify/dist/ReactToastify.css'
import ScrollReveal from "scrollreveal";
function App() {

//   ScrollReveal({ reset: true,
//   distance:'60px' ,
// duration:2500,
// delay:400});

  const routesProvider=useRoutes(routes) 
  return routesProvider
}

export default App;
