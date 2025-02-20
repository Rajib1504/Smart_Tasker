

const Navbar = () => {
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
                              <li>+ Create Task</li>    
                              <li>Log out</li>
                        </ul>
                  
                  </div>
                  
                  </div>
            </div>
      );
};

export default Navbar;