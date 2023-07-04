
import { useRoutes } from "react-router-dom";
import { routes } from "./routes/pagesRoutes";
import 'react-toastify/dist/ReactToastify.css'
function App() {

  const routesProvider=useRoutes(routes) 
  return routesProvider
}

export default App;
