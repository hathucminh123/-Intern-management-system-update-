import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SigninPage from "./pages/LoginPage/SigninPage";
import MentorPage from "./pages/MentorPage/MentorPage";
import HRPage from "./pages/HRPage/HRPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const routes = [
  { path: "/sign-in", page: SigninPage },
  { path: "/mentor", page: MentorPage, protected: true },
  { path: "/hr", page: HRPage, protected: true },
  { path: "hr-detail/:id", page: HRPage, protected: true },
];

function App() {
  return (
    <div className='App' >
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          {routes.map((route) =>
            route.protected ? (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute />}
              >
                <Route path={route.path} element={<route.page />} />
              </Route>
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={<route.page />}
              />
            )
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
