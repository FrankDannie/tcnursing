import { useState } from "react";
import Sidebar from "./Sidebar";
import "./AdminDashboard.scss";
import GalleryManager from "./gallery/GalleryManager";
import NewsManager from "./NewsManager";
import CourseManager from "./CourseManager";
import ContactManager from "./ContactManager";

export type AdminSection =
  | "gallery"
  | "news"
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
        {section === "courses" && <CourseManager/>}
        {section === "contact" && < ContactManager />}
      </main>
    </div>
  );
}
