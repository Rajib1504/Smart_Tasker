
import { createBrowserRouter } from 'react-router-dom';
import Home from './../Pages/Home/Home';
import Main from '../Layout/Main';


     export const  Router = createBrowserRouter([
            {
              path: "/",
              element: <Main/>,
              children:[
                  {
                        path:'/',
                        element:<Home/>
                  }
              ]
            },
          ]);

export default Router;