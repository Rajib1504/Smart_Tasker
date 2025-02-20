import { toast } from "react-toastify";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import { Link } from "react-router-dom";
import Loading from './../../Shared/Loading/Loading';

const Navbar = () => {
      const {user,logOut,Loading :loader,setLoading}=UseAuth()
      const logout = () => {
            console.log("Logout button clicked");
            logOut()
              .then(() => {
                toast.success("Logout Success");
              })
              .catch((err) => {
                toast.error(err.message);
              });
          };
      
      return (
            <div className=" bg-[#3674B5] py-3 container">
                  {/* logo  */}
                  <div className='lg:w-11/12 text-white mx-auto w-full flex justify-between items-center'>
                 <div>
                  <h1 className="text-3xl font-bold ">Smart_Tasker
                  </h1>
                  </div> 
                  {/* links  */}
                  <div>
                        <ul className="flex gap-2 ">
                              <li className="btn btn-ghost hover:bg-[#3674B5] hover:border-white">+ Create Task</li>    
                              {
                                user?   <li onClick={logout} className="btn btn-ghost hover:bg-[#3674B5] hover:border-white">{loader ? <span className="loading loading-spinner loading-sm"></span>:"Log out "}</li>:<Link to={'/register'} className="btn btn-ghost hover:bg-[#3674B5] hover:border-white">Sign in</Link>   
                              }
                              
                            
                        </ul>
                  
                  </div>
                  
                  </div>
            </div>
      );
};

export default Navbar;