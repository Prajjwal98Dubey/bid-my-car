import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Seller from "./pages/Seller";
import CarDetails from "./pages/CarDetails";
import Register from "./components/Register";
import Login from "./components/Login";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
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
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/my-profile',
    element:<MyProfile/>,
  },
  {
    path:'/edit-profile',
    element:<EditProfile/>
  },
  {
    path:"*",
    element:<div>Error Page hai ye !!!</div>
  }
])

export default App;
