
import { Navigate, useLocation } from 'react-router-dom';
import Loading from './../Shared/Loading/Loading';
import UseAuth from '../Hooks/UseAuth/UseAuth';

const PrivateRoute = ({children}) => {
    const {user, loading} = UseAuth();
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }

    if(user && user?.email){
        return children;
    }

    return <Navigate state={location.pathname} to={'/register'}></Navigate>
   
};

export default PrivateRoute;