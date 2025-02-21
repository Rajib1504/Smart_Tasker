import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Clock, Edit, Trash2 } from 'lucide-react';
import { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState({
    todo: [
      { id: "1", title: "Task 1", description: "Description 1" },
      { id: "2", title: "Task 2", description: "Description 2" }
    ],
    inprogress: [
      { id: "3", title: "Task 3", description: "Description 3" }
    ],
    done: []
  });

  const handleDragEnd = (result) => {
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
      destinationItems.splice(destination.index, 0, movedItem);

      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems
      }));
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
                        {column === "todo" ? "To-Do" : column === "inprogress" ? "In Progress" : "Done"}
                      </h2>
                    </div>

                    {/* Draggable Tasks */}
                    <div className="p-4 space-y-3">
                      {tasks[column].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
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
                                  <button className="text-red-500 hover:text-red-600">
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
