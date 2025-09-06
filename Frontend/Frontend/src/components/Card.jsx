import React from 'react';
import { useState } from 'react';

// Main App component to demonstrate the Card component
const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  // Example data for a task
  const task = {
    title: 'Optimize Website Controllers',
    tags: ['Frontend', 'Backend'],
    progress: 75,
    deadline: '2023-11-20',
    manager: {
      name: 'Cool Salamander',
      avatarUrl: 'https://placehold.co/40x40/007bff/ffffff?text=CS'
    },
    assignedWorkers: ['John Doe', 'Jane Smith', 'Peter Jones'],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Team Collaboration Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card task={task} isAdmin={isAdmin} />
        {/* You can add more Card components here to see them in a grid */}
        <Card task={{ ...task, title: 'Remove Sales App', progress: 50, deadline: '2023-11-25', tags: ['Feedback', 'Delete'], assignedWorkers: ['Jane Smith'] }} isAdmin={isAdmin} />
        <Card task={{ ...task, title: 'Stripe Integration', progress: 20, deadline: '2023-12-01', tags: ['Payment', 'Stripe'], assignedWorkers: ['Peter Jones', 'Jane Smith'] }} isAdmin={isAdmin} />
      </div>

      <div className="mt-8 flex items-center space-x-4">
        <span className="text-gray-700">Toggle Admin View:</span>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors"
        >
          {isAdmin ? 'Switch to User' : 'Switch to Admin'}
        </button>
      </div>
    </div>
  );
};

// Main Card component
const Card = ({ task, isAdmin }) => {
  const { title, tags, progress, deadline, manager, assignedWorkers } = task;

  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-xl bg-white shadow-lg transform transition-transform duration-300 hover:scale-105">
      {/* Edit button for admin */}
      {isAdmin && (
        <div className="absolute top-2 right-2 z-10">
          <button className="p-1 bg-white rounded-full shadow-lg text-gray-500 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.75 3.164a2 2 0 01-2.828 2.828l-8.485 8.485a.5.5 0 01-.158.114l-2.5 1a.5.5 0 01-.664-.664l1-2.5a.5.5 0 01.114-.158l8.485-8.485a2 2 0 012.828 0z" />
            </svg>
          </button>
        </div>
      )}

      {/* Tags section */}
      <div className="px-3 py-2 flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span key={index} className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            {tag}
          </span>
        ))}
      </div>

      {/* Poster image/Placeholder */}
      <div className="w-full h-32 bg-gray-200 flex items-center justify-center relative overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 opacity-70"></div>
        
        {/* Example SVG placeholder */}
        <svg className="w-20 h-20 text-white z-10 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-5h2v5h-2zm-2.5-7h5c-.5-1-1.5-2-2.5-2s-2 1-2.5 2z"/>
        </svg>
      </div>

      {/* Content section */}
      <div className="p-3 space-y-3">
        <div className="flex justify-between items-center">
          {/* Deadline */}
          <div className="flex items-center text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{deadline}</span>
          </div>
          {/* Manager icon */}
          <div className="flex items-center space-x-2">
            <img className="w-7 h-7 rounded-full border-2 border-white shadow-md" src={manager.avatarUrl} alt={manager.name} />
          </div>
        </div>

        {/* Task title */}
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>

        {/* Assigned workers (only visible for admin) */}
        {isAdmin && (
          <div className="text-xs text-gray-600">
            <span className="font-semibold">Assigned to:</span> {assignedWorkers.join(', ')}
          </div>
        )}

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;
