import { useState } from "react";
import Sidebar from "./Sidebar";
import "./AdminDashboard.scss";
import GalleryManager from "./gallery/GalleryManager";
import NewsManager from "./NewsManager";
import CourseManager from "./CourseManager";
import ContactManager from "./ContactManager";
import AdmissionManager from "./AdmissionManager";

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
