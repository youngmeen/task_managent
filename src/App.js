import React from 'react';
import {SpeedInsights} from "@vercel/speed-insights/react"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {ThemeProvider} from './contexts/ThemeContext';
import ThemeToggle from './components/common/ThemeToggle';
import Login from './pages/auth/index';
import Dashboard from './pages/dashboard/index';
import Tasks from './pages/tasks/index';
import Projects from './pages/projects/index';
import Calendar from './pages/calendar/index';
import Profile from './pages/user/index';
import Members from './pages/members/index';
import CreateTask from './pages/tasks/index';

function App() {
	return (<ThemeProvider>
			<Router>
				<ThemeToggle/>
				<Routes>
					<Route path="/login" element={<Login/>}/>
					<Route path="/dashboard" element={<Dashboard/>}/>
					<Route path="/tasks" element={<Tasks/>}/>
					<Route path="/projects" element={<Projects/>}/>
					<Route path="/calendar" element={<Calendar/>}/>
					<Route path="/profile" element={<Profile/>}/>
					<Route path="/members" element={<Members/>}/>
					<Route path="/tasks/create" element={<CreateTask/>}/>
					<Route path="/" element={<Navigate to="/login" replace/>}/>
					<Route path="*" element={<Navigate to="/login" replace/>}/>
				</Routes>
			</Router>
		</ThemeProvider>);
}

export default App;