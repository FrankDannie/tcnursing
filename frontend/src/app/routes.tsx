import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import { JSX } from "react";
import About from "../pages/About/About";
import Courses from "../pages/Courses/Courses";
import Contact from "../pages/Contact/Contact";
import CampusFacilities from "../pages/CampusFacilities/CampusFacilities";
import Login from "../pages/Admin/Login/AdminLogin"
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard"
import Admission from "../pages/Admission/Admission";
import News from "../pages/News/News";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/admin/login" />;
};

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/campus/facilities" element={<CampusFacilities />} />
        <Route path="/news" element={<News />} />


        <Route path="/admin/login" element={<Login />} /> 
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route
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
