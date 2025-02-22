import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Loading from "../../../../Shared/Loading/Loading";
import UseAuth from "../../../../Hooks/UseAuth/UseAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
      const {user,setUser,googleLogin,}=UseAuth()
      const[loader,setLoader]=useState(false)
      // console.log(user)
      const navigate=useNavigate()

  // Google login handler
  const handleGoogleSignIn = () => {
      setLoader(true)
   
    googleLogin().then(res=>{
      const userInfo = {
            email: res.user.email,
            name: res.user.displayName
      }
      // console.log(userInfo)
      setUser(res.user)
     toast.success(`Welcome,${userInfo.name}`)
     setLoader(false)
     navigate('/');
    }).catch(err=>{
      // console.log(err.message)
          toast.error('err.message')
          setLoader(false)
    }
    )

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#3674B5] to-[#D1F8EF]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">Welcome to TaskFlow</h2>
        <p className="text-gray-600 mb-6">Simplify your task management with seamless sign-in.</p>
        <button
          onClick={handleGoogleSignIn}
          className={`w-full flex gap-2 cursor-pointer justify-center items-center border-2 border-gray-300 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 &{loader && "disabled"}`}
          disabled={loader}
        > {loader ?<Loading/>:<>
            <FcGoogle className="text-2xl" />
            <span className="text-gray-700 cursor-pointer font-semibold">Sign Up with Google</span>
          </>}
        </button>
      </div>
    </div>
  );
};

export default Register;
