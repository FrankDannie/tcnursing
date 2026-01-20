import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import { JSX } from "react";
import About from "../pages/About/About";
import Courses from "../pages/Courses/Courses";
// import Contact from "../pages/public/Contact";
// import AdminDashboard from "../pages/admin/Dashboard";
// import AdminPages from "../pages/admin/Pages";
// import Login from "../pages/admin/Login";
import Admission from "../pages/Admission/Admission";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" />;
};

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/admission" element={<Admission />} />
{/* 
        <Route path="/admin/login" element={<Login />} /> */}
        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pages"
          element={
            <ProtectedRoute>
              <AdminPages />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
  );
}
