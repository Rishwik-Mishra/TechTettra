import './App.css'
import User from './pages/User'
import Project from './pages/Project'
import Projects from './pages/projects'
import NewProject from './pages/NewProject';
import NewTask from './pages/NewTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/profile" element={<User />} />
        <Route path="/projects/new" element={<NewProject />} />
        <Route path="/tasks/new" element={<NewTask />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
