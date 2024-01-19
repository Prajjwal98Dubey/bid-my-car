import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Seller from "./pages/Seller";
import CarDetails from "./pages/CarDetails";
function App() {
  return (
   <>
   <RouterProvider router={appRouter}/>
   </>
  );
}

const appRouter =  createBrowserRouter([
  {
    path:'/',
    element:<Main/>
  },
  {
    path:'/seller',
    element:<Seller/>
  },
  {
    path:'/car',
    element:<CarDetails/>
  }
])

export default App;
