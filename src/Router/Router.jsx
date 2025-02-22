
import { createBrowserRouter } from 'react-router-dom';
import Home from './../Pages/Home/Home';
import Main from '../Layout/Main';
import Register from '../Pages/Home/Authentication/Register/Register';
import PrivateRoute from '../Private/PrivateRoute';
import Error from '../error/ErrorPage/Error';


     export const  Router = createBrowserRouter([
            {
              path: "/",
              element: <Main/>,
              errorElement:<Error/>,
              children:[
                  {
                        path:'/',
                        element:<PrivateRoute>
                              <Home/>
                              </PrivateRoute>
                  },
                  {
                        path:"/register",
                        element:<Register/>
                  }
              ]
            },
          ]);

export default Router;