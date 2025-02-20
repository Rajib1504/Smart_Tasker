import React from 'react';
import { Clock, Edit, Trash2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Task Dashboard
          </h1>
        </header>
        
        {/* Task Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* To-Do Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-gray-700 font-semibold">To-Do</h2>
             
            </div>
            
            <div className="p-4 space-y-3">
              <div className="p-3 bg-white rounded border border-gray-200 flex flex-col gap-2 hover:border-blue-300 hover:shadow-md transition-all">
                <h3 className="font-medium text-gray-800">Title</h3>
                <p className="text-sm text-gray-600">Description</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> Created at: 2/21/2025
                  </span>
                  <div className="flex gap-2">
                    <button className="text-yellow-500 hover:text-yellow-600"><Edit size={16} /></button>
                    <button className="text-red-500 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* In Progress Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-gray-700 font-semibold">In Progress</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-3 bg-white rounded border border-gray-200 flex flex-col gap-2 hover:border-yellow-300 hover:shadow-md transition-all">
                <h3 className="font-medium text-gray-800">Title</h3>
                <p className="text-sm text-gray-600">Description</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> Created at: 2/21/2025
                  </span>
                  <div className="flex gap-2">
                    <button className="text-yellow-500 hover:text-yellow-600"><Edit size={16} /></button>
                    <button className="text-red-500 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Done Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-gray-700 font-semibold">Done</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-3 bg-white rounded border border-gray-200 flex flex-col gap-2 hover:border-green-300 hover:shadow-md transition-all">
                <h3 className="font-medium text-gray-800">Title</h3>
                <p className="text-sm text-gray-600">Description</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> Created at: 2/21/2025
                  </span>
                  <div className="flex gap-2">
                    <button className="text-yellow-500 hover:text-yellow-600"><Edit size={16} /></button>
                    <button className="text-red-500 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
