import { useState } from "react";
import Sidebar from "./Sidebar";
import "./AdminDashboard.scss";
import GalleryManager from "./gallery/GalleryManager";

export type AdminSection =
  | "gallery"
  | "news"
  | "courses"
  | "faculty"
  | "contact";

export default function AdminDashboard() {
  const [section, setSection] = useState<AdminSection>("gallery");

  return (
    <div className="admin-layout">
      <Sidebar active={section} onChange={setSection} />

      <main className="admin-content">
        {section === "gallery" && <GalleryManager/>}
        {section === "news" && <h2>News & Announcements</h2>}
        {section === "courses" && <h2>Courses</h2>}
        {section === "faculty" && <h2>Faculty</h2>}
        {section === "contact" && <h2>Contact Messages</h2>}
      </main>
    </div>
  );
}
