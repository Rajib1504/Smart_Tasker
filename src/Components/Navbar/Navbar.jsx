import { toast } from "react-toastify";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
      const {user,logOut,Loading:loader,setLoading}=UseAuth()
      
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
          const submitTask = (e) => {
            e.preventDefault(); 
            console.log("Form Submitted");
          
            const form = e.target;
            const title = form.title.value;
            const description = form.description.value;
            const category = form.category.value;
            const date = new Date().toLocaleString(); 
          const formData = { title, description, category, date }
            // console.log({ title, description, category, date });
          
          
            toast.success("Task created successfully!");
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
          <label className="block text-sm font-medium text-white mt-2">
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
          <label className="block text-sm font-medium text-white mt-2">Description</label>
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
          <label className="block text-sm font-medium text-white mt-2">Category</label>
          <select name="category" className="select select-bordered w-full mt-2">
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          {/* Modal Actions */}
          <div className="modal-action mt-4">
            
              <button  onClick={() => document.getElementById('my_modal_1').close()} className="btn btn-ghost hover:bg-[#3674B5] hover:border-white">Close</button>
            
            <button type="submit" className="btn bg-[#3674B5]">Add Task</button> 
          </div>
        </form>
      </div>
    </dialog>
            </div>
      );
};

export default Navbar;