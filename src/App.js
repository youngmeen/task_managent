import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/common/ThemeToggle';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Members from './pages/Members';
import CreateTask from './pages/create/CreateTask';
import CreateProject from './pages/create/CreateProject';
import CreateSchedule from './pages/create/CreateSchedule';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/members" element={<Members />} />
        <Route path="/tasks/create" element={<CreateTask />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/calendar/create" element={<CreateSchedule />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
        </Router>
      </ThemeProvider>
  );
}

export default App;