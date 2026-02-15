import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./AdminDashboard.scss";
import GalleryManager from "../Gallery/GalleryManager";
import NewsManager from "../News/NewsManager";
import CourseManager from "../Course/CourseManager";
import ContactManager from "../Contact/ContactManager";
import AdmissionManager from "../Admission/AdmissionManager";

export type AdminSection =
  | "gallery"
  | "news"
  | "admission"
  | "courses"
  | "contact";

export default function AdminDashboard() {
  const [section, setSection] = useState<AdminSection>("gallery");

  return (
    <div className="admin-layout">
      <Sidebar active={section} onChange={setSection} />

      <main className="admin-content">
        {section === "gallery" && <GalleryManager/>}
        {section === "news" && <NewsManager/>}
        {section === "admission" && <AdmissionManager/>}
        {section === "courses" && <CourseManager/>}
        {section === "contact" && < ContactManager />}
      </main>
    </div>
  );
}
