import React, { useState } from 'react';
import ChartInterface from '../components/ChatInterface';
import { useNavigate } from 'react-router-dom';


// Main App component containing the entire dashboard
const Projects = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPath, setCurrentPath] = useState(['Projects', 'RD Sales']);

  const navigate = useNavigate();

  // Sample data for tasks
  const tasks = [
    {
      id: 1,
      title: "Build Landing Page",
      description: "Design and implement the product landing page",
      status: "In Progress",
      assignedTo: "Alice",
      featured: true,
      labels: ["UI", "Frontend"],
      image: "https://placehold.co/600x400/8A2BE2/FFFFFF?text=Landing+Page",
      date: "2025-09-10",
      userAvatar: "https://placehold.co/40x40/FF5733/FFFFFF?text=A",
      tooltip: "Alice - Frontend Dev",
    },
    {
      id: 2,
      title: "Database Migration",
      description: "Migrate from Firebase to Supabase",
      status: "Todo",
      assignedTo: "Bob",
      featured: false,
      labels: ["Backend", "Database"],
      image: "https://placehold.co/600x400/2ECC71/FFFFFF?text=Database+Migration",
      date: "2025-09-15",
      userAvatar: "https://placehold.co/40x40/3498DB/FFFFFF?text=B",
      tooltip: "Bob - Backend Engineer",
    },
    {
      id: 3,
      title: "User Authentication",
      description: "Add Clerk-based authentication for admin routes",
      status: "Completed",
      assignedTo: "Charlie",
      featured: false,
      labels: ["Security", "Auth"],
      image: "https://placehold.co/600x400/E67E22/FFFFFF?text=Auth+System",
      date: "2025-09-01",
      userAvatar: "https://placehold.co/40x40/F1C40F/000000?text=C",
      tooltip: "Charlie - Security Lead",
    },
  ];

  const handleBreadcrumbClick = (index) => {
    // Navigate to the clicked breadcrumb link by slicing the array
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
  };

  return (
    <div className={`h-screen w-screen flex font-sans ${isDarkMode ? 'bg-[#1e1e2d] text-white' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* Sidebar */}
      <div className={`w-64 p-6 flex flex-col justify-between ${isDarkMode ? 'bg-[#29293e]' : 'bg-gray-200'} rounded-tr-lg rounded-br-lg`}>
        {/* Company and Nav */}
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gray-600"></div>
            <span className="text-lg font-bold">Synergy Sphere</span>
          </div>
          <nav className="space-y-4">
            <a href="#" className="flex items-center p-3 rounded-lg bg-gray-700 text-white font-semibold">
              Projects
            </a>
            <a href="#" className="flex items-center p-3 rounded-lg text-gray-400 hover:bg-gray-700">
              My Tasks
            </a>
          </nav>
        </div>

        {/* Theme and User Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-700 p-2 rounded-full">
            <button onClick={() => setIsDarkMode(true)} className={`p-2 rounded-full ${isDarkMode ? 'bg-white text-gray-800' : 'text-gray-400'}`}>
              🌙
            </button>
            <button onClick={() => setIsDarkMode(false)} className={`p-2 rounded-full ${!isDarkMode ? 'bg-white text-gray-800' : 'text-gray-400'}`}>
              ☀️
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={()=> navigate('/profile')}>
              <img src="https://placehold.co/40x40/5A26A2/FFFFFF?text=TU" alt="User Avatar" className="w-10 h-10 rounded-full" />
            </button>
            <div className="text-sm">
              <p className="font-semibold">Test User</p>
              <p className="text-gray-400">user@mail</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            {currentPath.map((path, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>›</span>}
                <span 
                  className={index === currentPath.length - 1 ? "text-white font-semibold" : "cursor-pointer hover:text-white"}
                  onClick={() => handleBreadcrumbClick(index)}
                >
                  {path}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search..." className={`w-64 py-2 px-4 rounded-full ${isDarkMode ? 'bg-[#29293e]' : 'bg-gray-200'}`} />
            <button onClick={()=> navigate('/projects/new')} className="bg-[#595982] flex items-center space-x-2 py-2 px-4 rounded-full text-white font-semibold">
              ➕ <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className={`p-4 rounded-2xl relative ${isDarkMode ? 'bg-[#29293e]' : 'bg-white'} overflow-hidden`}>
              {task.featured && (
                <div className="absolute top-0 left-0 bg-purple-500 text-white text-xs px-2 py-1 rounded-br-lg z-10">
                  Featured
                </div>
              )}
              {/* Labels */}
              <div className="flex space-x-2 absolute top-4 right-4 z-10">
                {task.labels.map((label, index) => (
                  <div>
                    <span key={index} className="px-2 py-1 bg-gray-600 text-xs text-white rounded-full">{label}</span>
                  </div>
                ))}
              </div>
              <img src={task.image} alt="Task" className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
              <p className="text-sm mb-2 text-gray-400">{task.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>📅 {task.date}</span>
                <div className="flex items-center space-x-1">
                  <img src={task.userAvatar} alt="User" className="w-8 h-8 rounded-full border-2 border-white" title={task.tooltip} />
                </div>
                <button onClick={() =>navigate('/project')}>Go to Project</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
