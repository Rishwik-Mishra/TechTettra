import React from 'react';

const App = () => {
  // Dummy data to simulate fetching from a backend
  const user = {
    name: "Jane Doe",
    role: "Project Manager",
    userId: "user12345",
    email: "jane.doe@example.com",
    dob: "January 1, 1990",
    dateJoined: "March 15, 2020",
    location: "San Francisco, CA",
    jobRole: "Software Engineer"
  };

  const connections = [
    { name: "Alex Brown", role: "UX Designer at TechCorp", avatarText: "AB" },
    { name: "Chris Davis", role: "Backend Developer", avatarText: "CD" },
    { name: "Emily Foster", role: "Marketing Lead", avatarText: "EF" },
    { name: "George Harris", role: "Product Manager", avatarText: "GH" },
  ];

  const projects = [
    { name: "Website Redesign", status: "3 tasks remaining" },
    { name: "Mobile App V1.0", status: "5 tasks remaining" },
    { name: "Q3 Marketing Campaign", status: "1 task remaining" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 text-gray-800 font-inter">
      {/* Header */}
      <header className="bg-indigo-600 shadow-lg sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          <h1 className="text-xl md:text-2xl font-bold text-white">User Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              id="logout-btn"
              className="px-4 py-2 text-sm font-semibold bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* User Profile Card */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 text-white">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white shadow-md"
                src="https://via.placeholder.com/150"
                alt="User Profile"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold">{user.name}</h2>
              <p className="text-sm opacity-90 mt-1">{user.role}</p>
              <div className="mt-4 flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-white">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-id-card"></i>
                  <span className="font-medium">User ID:</span> <span>{user.userId}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-envelope"></i>
                  <span className="font-medium">Email:</span> <span>{user.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information Card */}
            <div className="bg-blue-50 rounded-xl shadow-lg border border-blue-200 p-6 space-y-4">
              <h3 className="text-xl font-bold text-blue-800">Personal Information</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center space-x-3">
                  <i className="fas fa-birthday-cake text-purple-500"></i>
                  <span className="font-medium">Date of Birth:</span> <span>{user.dob}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="fas fa-calendar-alt text-teal-500"></i>
                  <span className="font-medium">Date of Joining:</span> <span>{user.dateJoined}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-yellow-500"></i>
                  <span className="font-medium">Location:</span> <span>{user.location}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="fas fa-briefcase text-orange-500"></i>
                  <span className="font-medium">Role:</span> <span>{user.jobRole}</span>
                </li>
              </ul>
            </div>

            {/* My Connections Card */}
            <div className="bg-green-50 rounded-xl shadow-lg border border-green-200 p-6 space-y-4">
              <h3 className="text-xl font-bold text-green-800">My Network</h3>
              <ul className="space-y-4">
                {connections.map((connection, index) => (
                  <li key={index} className="flex items-center space-x-4">
                    <img
                      className="h-10 w-10 rounded-full border border-gray-300"
                      src={"https://via.placeholder.com/150"}
                      alt="User Avatar"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{connection.name}</h4>
                      <span className="text-sm text-gray-500">{connection.role}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* My Projects Card */}
            <div className="bg-purple-50 rounded-xl shadow-lg border border-purple-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-purple-800">My Projects</h3>
                <button className="px-4 py-1 text-sm font-semibold bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                  <i className="fas fa-plus mr-1"></i> New
                </button>
              </div>
              <ul className="space-y-4 text-sm text-gray-700">
                {projects.map((project, index) => (
                  <li key={index} className="flex items-center space-x-4">
                    <i className="fas fa-project-diagram text-indigo-500"></i>
                    <div>
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <span className="text-xs text-gray-500">{project.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;