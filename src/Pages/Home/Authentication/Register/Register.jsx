import { FcGoogle } from "react-icons/fc";

const Register = () => {
 const handleRegister=(e)=>{
e.preventDefault()
const form = e.target;
const email=form.email.value;
const password = form.password.value;
console.log(email,password)
 }
      // google login 
      const handleGoogleSignIn =()=>{

      }
      return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
       
        <form onSubmit={handleRegister}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#3674B5] text-white py-2 rounded hover:border-[#578FCA]"
          >
            Register
          </button>
        </form>
        <div className="text-center ">
          <p className="text-sm">or</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex gap-2 justify-center items-center border-[#578FCA] border-2  py-2 rounded mt-2 "
          >
            <FcGoogle  className="text-2xl"/>
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
      );
};

export default Register;