import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SigninPage from './pages/LoginPage/SigninPage';
import MentorPage from './pages/MentorPage/MentorPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css'


const routes = [
  { path: '/sign-in', page: SigninPage },
  { path: '/mentor', page: MentorPage, protected: true },
];

function App() {
  return (
    <div className='App' >
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          {routes.map((route) => (
            route.protected ? (
              <Route key={route.path} path={route.path} element={<ProtectedRoute />}>
                <Route path={route.path} element={<route.page />} />
              </Route>
            ) : 
            (
              <Route key={route.path} path={route.path} element={<route.page />} />
            )
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
