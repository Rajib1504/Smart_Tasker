import { createContext, useEffect, useState } from "react";
import AxiosPublic from "../Hooks/UseAxios/AxiosPublic";
import UseAuth from "../Hooks/UseAuth/UseAuth";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] }); // ✅ Task কে আলাদা ক্যাটাগরিতে বিভক্ত করা
  const [loading, setLoading] = useState(true);
  const { user } = UseAuth(); 
  const axiosPublic = AxiosPublic();

  // ✅ Task Fetch Function (Auto-Update & Proper Filtering)
  const fetchTasks = async () => {
      if (!user?.email) return; 
  
      setLoading(true);
      try {
        const res = await axiosPublic.get(`/tasks/${user.email}`);
        console.log(res.data); // Debugging জন্য console.log
        
        if (res.data) {
          const sortedTasks = {
            todo: res.data.todo || [],  
            inprogress: res.data.inprogress || [],  
            done: res.data.done || []  
          };
          setTasks(sortedTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      } finally {
        setLoading(false);
      }
    };
  

  // ✅ Component Load হলে Task আনবে এবং User Email পরিবর্তন হলে পুনরায় আনবে।
  useEffect(() => {
    fetchTasks();
  }, [user?.email]); 

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, loading }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
