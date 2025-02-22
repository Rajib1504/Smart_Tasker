import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Clock, Edit, Trash2 } from 'lucide-react';
import { useContext, useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import AxiosPublic from "../../Hooks/UseAxios/AxiosPublic";
import { toast } from "react-toastify";
import { TaskContext } from "../../context/TaskProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Home =() => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showModal, setShowModal] = useState(false);
const [editTask, setEditTask] = useState(null);
  const {tasks, setTasks, fetchTasks } = useContext(TaskContext);
  // console.log(tasks)
  const {user}=UseAuth()
 
  const axiosPublic = AxiosPublic()
    
    useEffect(() => {
      if (user?.email) {
        fetchTasks();
      }
    }, [user]); 

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
  
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tasks[source.droppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
  
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: items
      }));
    } else {
   
      const sourceItems = Array.from(tasks[source.droppableId]);
      const destinationItems = Array.from(tasks[destination.droppableId]);
  
      const [movedItem] = sourceItems.splice(source.index, 1);
      movedItem.category = destination.droppableId; 
  
      destinationItems.splice(destination.index, 0, movedItem);
  
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems
      }));

      try {
        await axiosPublic.patch(`/tasks/${movedItem._id}`, { category: destination.droppableId });
        fetchTasks(); 
        toast.success("Task updated successfully ");
      } catch (error) {
        toast.error("Failed to update task", error);
      }
    }
  };
  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };
  
  const onSubmit = async (data) => {
    if (editTask) {
      // Update task (PUT request)
      try {
        const response = await axiosPublic.put(`/tasks/${editTask._id}`, {
          title: data.title,
          description: data.description,
          category: data.category,
          // timestamp: new Date().toISOString(),
          // userEmail: user?.email,
        });

        // console.log("Task Updated:", response.data);
        toast.success("Task updated successfully!");
        fetchTasks();
        setShowModal(false);
        setEditTask(null);
        reset();
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Failed to update task. Please try again.");
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
          fetchTasks(); 
          
          toast.success( "Your task has been deleted")
        } catch (error) {
          toast.error("Error deleting task:", error);
        }
      }
    });
  };
  
  
  
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
                                  <button onClick={() => handleEdit(task)} className="text-yellow-500 hover:text-yellow-600">
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
      {
        showModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                {/* Task Title */}
                <div>
                  <label className="block text-gray-700 font-medium">Task Title <span className="text-red-500">*</span></label>
                  <input
                    defaultValue={editTask?.title}
                    type="text"
                    {...register("title", {
                      required: "Title is required",
                      maxLength: { value: 50, message: "Title cannot exceed 50 characters" }
                    })}
                    className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                    placeholder="Enter task title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-medium">Description <span className="text-red-500">*</span></label>
                  <textarea
                    defaultValue={editTask?.description}
                    {...register("description", {
                      required: "Description is required",
                      maxLength: { value: 200, message: "Description cannot exceed 200 characters" }
                    })}
                    className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none h-24 resize-none"
                    placeholder="Enter task details"
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-medium">Category  <span className="text-red-500">*</span></label>
                  <select
                    defaultValue={editTask?.category}
                    {...register("category", { required: true })}
                    className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                  >
                    <option value="" disabled>Category select</option>
                    <option value="todo">To-Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="modal-action gap-2">
                  <button className="btn bg-indigo-600 text-white">Save</button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn text-white bg-rose-500">Close</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Home;
