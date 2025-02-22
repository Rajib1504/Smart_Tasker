import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Clock, Edit, Trash2 } from 'lucide-react';
import { useContext, useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import AxiosPublic from "../../Hooks/UseAxios/AxiosPublic";
import { toast } from "react-toastify";
import { TaskContext } from "../../context/TaskProvider";
import Swal from "sweetalert2";

const Home =() => {
  const {tasks, setTasks, fetchTasks } = useContext(TaskContext);
  const {user}=UseAuth()
  // const [tasks, setTasks] = useState({
  //   todo: [
   
  //   ],
  //   inprogress: [
     
  //   ],
  //   done: []
  // });
  const axiosPublic = AxiosPublic()
    
    useEffect(() => {
      if (user?.email) {
        fetchTasks();
      }
    }, [user]); 

  //   if (!user?.email) return;
    
  //   axiosPublic.get(`/tasks/${user.email}`)
  //     .then(res => {
  //       // console.log("Response Data:", res.data);
  
  //       // ✅ API response theke task format set kore dibo
  //       const formattedTasks = {
  //         todo: res.data.todo || [], 
  //         inprogress: res.data.inprogress || [], 
  //         done: res.data.done || []
  //       };
  
  //       setTasks((prev) => ({
  //         ...prev,
  //         ...formattedTasks
  //       }));
        
  //     })
  //     .catch(err => console.error("Error fetching tasks:", err));
  // }, [user?.email]);  // ✅ Dependency array e `tasks` add korsi
  
  

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    // Same column-এর ভিতরে Move হলে শুধু Reorder করবো
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tasks[source.droppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
  
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: items
      }));
    } else {
      // আলাদা Column-এ Move হলে Database Update করতে হবে!
      const sourceItems = Array.from(tasks[source.droppableId]);
      const destinationItems = Array.from(tasks[destination.droppableId]);
  
      const [movedItem] = sourceItems.splice(source.index, 1);
      movedItem.category = destination.droppableId; // ✅ নতুন Category Update
  
      destinationItems.splice(destination.index, 0, movedItem);
  
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems
      }));
  
      // ✅ **Backend API Call করে Database-এ Update করবো**
      try {
        await axiosPublic.put(`/tasks/${movedItem._id}`, { category: destination.droppableId });
        fetchTasks(); // ✅ **Auto Refresh হবে**
        toast.success("Task updated successfully ");
      } catch (error) {
        toast.error("Failed to update task", error);
      }
    }
  };
  
  const deleteTask = async (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/tasks/${taskId}`);
          fetchTasks(); // ✅ **Auto Refresh হবে**
          
          toast.success( "Your task has been deleted")
        } catch (error) {
          toast.error("Error deleting task:", error);
        }
      }
    });
  };
  
  const UpdateTask =()=>{
    console.log("")
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="w-full mx-auto">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Task Dashboard
          </h1>
        </header>

        {/* Task Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {["todo", "inprogress", "done"].map((column) => (
              <Droppable key={column} droppableId={column}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
                  >
                    {/* Column Header */}
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                      <h2 className="text-gray-700 font-semibold">
                        {column === "todo" ? "To-Do" : column === "inprogress" ? "In Progress" : "Done"}
                      </h2>
                    </div>

                    {/* Draggable Tasks */}
                    <div className="p-4 space-y-3">
                      {tasks[column].map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-white rounded border border-gray-200 flex flex-col gap-2 hover:border-blue-300 hover:shadow-md transition-all"
                            >
                              <h3 className="font-medium text-gray-800">{task.title}</h3>
                              <p className="text-sm text-gray-600">{task.description}</p>

                              {/* Task Footer */}
                              <div className="flex justify-between items-center text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" /> Created at: 2/21/2025
                                </span>
                                <div className="flex gap-2">
                                  <button onClick={()=>document.getElementById('my_modal_1').showModal()} className="text-yellow-500 hover:text-yellow-600">
                                    <Edit size={16} />
                                  </button>
                                  <button className="text-red-500 hover:text-red-600"  
                                  onClick={() => deleteTask(task._id)}>
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
      <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Create Task</h3>
        <form onSubmit={UpdateTask}> {/* Wrap inputs inside form */}
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
            update at: {new Date().toLocaleString()}
          </div>

          {/* Category Selection */}
          <label className="block text-sm font-medium text-gray-700 mt-2">Category</label>
          <select name="category" className="select select-bordered w-full mt-2">
            <option value="todo">Todo</option>
          </select>

          {/* Modal Actions */}
          <div className="modal-action mt-4">
            
              <button type="button"  onClick={() => document.getElementById('my_modal_1').close()} className="btn btn-ghost hover:bg-[#3674B5] hover:border-white">Close</button>
            
            <button type="submit" className="btn bg-[#3674B5]"> Add Task</button> 
          </div>
        </form>
      </div>
    </dialog>
    </div>
  );
};

export default Home;
