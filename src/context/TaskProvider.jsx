import { createContext, useEffect, useState } from "react";
import AxiosPublic from "../Hooks/UseAxios/AxiosPublic";
import UseAuth from "../Hooks/UseAuth/UseAuth";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({ todo: [], inprogress: [], done: [] }); 
  const [loading, setLoading] = useState(true);
  const { user } = UseAuth(); 
  const axiosPublic = AxiosPublic();

  const fetchTasks = async () => {
      if (!user?.email) return; 
  
      setLoading(true);
      try {
        const res = await axiosPublic.get(`/tasks/${user.email}`);
        console.log(res.data);
        
        if (res.data) {
          const sortedTasks = {
            todo: res.data.todo || [],  
            inprogress: res.data.inprogress || [],  
            done: res.data.done || []  
          };
          setTasks(sortedTasks);
          console.log(sortedTasks)
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      } finally {
        setLoading(false);
      }
    };
  
  // useEffect(() => {
  //   fetchTasks();
  // }, [user?.email]); 

  return (
    <TaskContext.Provider value={{ tasks, setTasks,fetchTasks, loading }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
