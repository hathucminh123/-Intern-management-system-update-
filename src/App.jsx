import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SigninPage from './pages/LoginPage/SigninPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './components/MentorComponent/Dashboard';
import Schedule from './components/MentorComponent/Schedule';
import TaskPerformance from './components/MentorComponent/TaskPerformance';
import Chat from './components/MentorComponent/Chat';
import CustomMenu from './components/CustomMenu';
import './App.css';

function App() {

  const userRole = 'mentor'; 

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          <Route path="/sign-in" element={<SigninPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/mentor" element={<CustomMenu userRole={userRole} />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<Dashboard />} />
              <Route path="task" element={<TaskPerformance />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="chat" element={<Chat />} />
            </Route>
            <Route path="/hr" element={<CustomMenu userRole={userRole} />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<Schedule />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
