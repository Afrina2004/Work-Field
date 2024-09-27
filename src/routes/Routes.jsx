import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import BusinessPage from "../pages/BusinessPage/BusinessPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";




const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>, 
        errorElement: <ErrorPage> </ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>, 
               
            }, 
            {
              path:'/business/:id',
              element:<BusinessPage></BusinessPage>,
              loader: async () =>{
               const response = await fetch(`https://work-field-server.vercel.app/business`);
               return response.json();
             }
             },
            
            {
                path: '/login',
                element: <Login></Login>
            }, 
            {
                path: 'signup',
                element: <SignUp></SignUp>
              }
        ]
    } ,
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
          {
            path: 'cart',
            element: <Cart></Cart>
          },
  
          // admin routes
          {
            path: 'users',
            element: <AllUsers></AllUsers>
          }
  
        ]
      }   
]);

export default router;