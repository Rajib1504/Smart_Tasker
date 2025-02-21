import { toast } from "react-toastify";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import { Link, useNavigate } from "react-router-dom";
import AxiosPublic from "../../Hooks/UseAxios/AxiosPublic";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/TaskProvider";



const Navbar = () => {
      const {user,logOut,Loading:loader,setLoading}=UseAuth()
    // console.log(user)
    const { fetchTasks } = useContext(TaskContext);
      const [spiner,setSpiner]=useState(false)
      const axiospublic =AxiosPublic()
      // console.log(axiospublic)
      
      const navigate = useNavigate()
      const logout = () => {
            setLoading(true)
            console.log("Logout button clicked");
            logOut()
              .then(() => {
                toast.success("Logout Success");
                setLoading(false)
                navigate('/register')
              })
              .catch((err) => {
                toast.error(err.message);
                setLoading(false)
              });
          };
          // post data 
          const submitTask =async (e) => {
            setSpiner(true)
            e.preventDefault(); 
            // console.log("Form Submitted");
            const form = e.target;
            const title = form.title.value;
            const description = form.description.value;
            const category = form.category.value;
            const date = new Date().toLocaleString(); 
            const email = user?.email
            const name = user?.displayName
            const userId = user?.uid
          const formData = { title, description, category, date, email,name,userId }
            // console.log({ title, description, category, date,email,name,userId });
          const taskData =await axiospublic.post('/tasks',formData)
          // console.log(taskData)
          if(taskData.data.insertedId){
            setSpiner(false)
            document.getElementById('my_modal_1').close()
            form.reset();
            fetchTasks()
            toast.success("Task created successfully!");
          }else{
            setSpiner(false)
            document.getElementById('my_modal_1').close()
            form.reset();
            return toast.error('something went wrong')
          }
          
          };
          
          
      
      return (
            <div className=" bg-[#3674B5] py-3 container">
                  <div className='lg:w-11/12 text-white mx-auto w-full flex justify-between  items-center'>
                  {/* logo  */}
                 <div>
                  <h1 className="lg:text-3xl text-xl md:text-3xl font-bold ml-2 lg:ml-0 ">Smart_Tasker
                  </h1>
                  </div> 
                  {/* links  */}
                  <div>
                        <ul className="flex  items-center justify-end gap-2 ">
                              {user && <li className="btn btn-ghost btn-xs md:btn-md lg:btn-ghost md:btn-ghost hover:bg-[#3674B5] hover:border-white"  onClick={()=>document.getElementById('my_modal_1').showModal()}>+ Create Task</li>  }  
                              {
                                user?   <li onClick={logout} className="btn btn-ghost btn-xs md:btn-md lg:btn-ghost md:btn-ghost hover:bg-[#3674B5] hover:border-white">{loader ? <span className="loading loading-spinner loading-sm"></span>:"Log out "}</li>:<Link to={'/register'} className="btn btn-ghost btn-xs md:btn-md lg:btn-ghost md:btn-ghost hover:bg-[#3674B5] hover:border-white">Sign in</Link>   
                              }
                              
                            
                        </ul>
                  
                  </div>
                  
                  </div>

                  {/* diolg section   */}
 <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Create Task</h3>
        <form onSubmit={submitTask}> {/* Wrap inputs inside form */}
          {/* Title Input */}
          <label className="block text-sm font-medium text-gray-700 mt-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            maxLength="50"
            name="title"
            placeholder="Enter task title (max 50 characters)"
            className="input input-bordered w-full mt-2"
            required
          />

          {/* Description Input */}
          <label className="block text-sm font-medium text-gray-700 mt-2">Description</label>
          <textarea
            maxLength="200"
            name="description"
            placeholder="Enter task description (max 200 characters)"
            className="textarea textarea-bordered w-full mt-2"
          ></textarea>

          {/* Timestamp (Auto-Generated) */}
          <div className="text-sm text-gray-500 mt-2">
            Created at: {new Date().toLocaleString()}
          </div>

          {/* Category Selection */}
          <label className="block text-sm font-medium text-gray-700 mt-2">Category</label>
          <select name="category" className="select select-bordered w-full mt-2">
            <option value="todo">Todo</option>
          </select>

          {/* Modal Actions */}
          <div className="modal-action mt-4">
            
              <button type="button"  onClick={() => document.getElementById('my_modal_1').close()} className="btn btn-ghost hover:bg-[#3674B5] hover:border-white">Close</button>
            
            <button type="submit" className="btn bg-[#3674B5]">{spiner ?<span className="loading loading-spinner loading-sm"></span>: "Add Task"}</button> 
          </div>
        </form>
      </div>
    </dialog>
            </div>
      );
};

export default Navbar;