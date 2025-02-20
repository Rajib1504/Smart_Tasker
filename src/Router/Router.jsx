
import { createBrowserRouter } from 'react-router-dom';
import Home from './../Pages/Home/Home';
import Main from '../Layout/Main';
import Register from '../Pages/Home/Authentication/Register/Register';


     export const  Router = createBrowserRouter([
            {
              path: "/",
              element: <Main/>,
              children:[
                  {
                        path:'/',
                        element:<Home/>
                  },
                  {
                        path:"/register",
                        element:<Register/>
                  }
              ]
            },
          ]);

export default Router;