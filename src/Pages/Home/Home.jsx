import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Clock, Edit, Trash2 } from "lucide-react";
import { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import UseAuth from "../../Hooks/UseAuth/UseAuth";
import AxiosPublic from "../../Hooks/UseAxios/AxiosPublic";
import { TaskContext } from "../../context/TaskProvider"; // ✅ Context API Use

const Home = () => {
  const { user } = UseAuth();
  const axiosPublic = AxiosPublic();
  const { tasks, fetchTasks } = useContext(TaskContext); // ✅ Context API থেকে Task আনছি

  useEffect(() => {
    if (!user?.email) return;
    fetchTasks(); // ✅ Context API থেকে Task আনছি
  }, [user?.email]);

  // ✅ **Drag & Drop Logic**
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // **Same Column-এর ভিতরে Move করলে Reorder হবে**
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tasks[source.droppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      fetchTasks(); // ✅ Data Sync হবে
    } else {
      // **Column Change হলে Backend Update করবো**
      const sourceItems = Array.from(tasks[source.droppableId]);
      const destinationItems = Array.from(tasks[destination.droppableId]);

      const [movedItem] = sourceItems.splice(source.index, 1);
      movedItem.category = destination.droppableId;

      destinationItems.splice(destination.index, 0, movedItem);

      // **Optimistic UI Update**
      fetchTasks();

      try {
        await axiosPublic.put(`/tasks/${movedItem._id}`, { category: destination.droppableId });
        toast.success("Task updated successfully!");
      } catch (error) {
        toast.error("Failed to update task!");
        console.error("Error updating task:", error);
      }
    }
  };

  // ✅ **Delete Task Function**
  const deleteTask = async (taskId) => {
    try {
      await axiosPublic.delete(`/tasks/${taskId}`);
      fetchTasks(); // ✅ **Auto Refresh হবে**
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task!");
      console.error("Error deleting task:", error);
    }
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
                        {column === "todo"
                          ? "To-Do"
                          : column === "inprogress"
                          ? "In Progress"
                          : "Done"}
                      </h2>
                    </div>

                    {/* Draggable Tasks */}
                    <div className="p-4 space-y-3">
                      {tasks[column]?.map((task, index) => (
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
                                  <button className="text-yellow-500 hover:text-yellow-600">
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => deleteTask(task._id)}
                                  >
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
    </div>
  );
};

export default Home;
