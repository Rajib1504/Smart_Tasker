
import { Navigate, useLocation } from 'react-router-dom';
import Loading from './../Shared/Loading/Loading';
import UseAuth from '../Hooks/UseAuth/UseAuth';

const PrivateRoute = ({children}) => {
    const {user, Loading} = UseAuth();
    const location = useLocation();

    if(Loading){
        return   <div className='min-h-screen flex justify-center items-center'><span className="loading loading-spinner loading-xl text-[#3674B5]"></span></div>
    }

    if(user && user?.email){
      console.log('user is there')
        return children;
    }

    return <Navigate state={location.pathname} to={'/register'}></Navigate>
   
};

export default PrivateRoute;