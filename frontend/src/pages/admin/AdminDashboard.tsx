import { useState } from "react";
import Sidebar from "./Sidebar";
import "./AdminDashboard.scss";
import GalleryManager from "./gallery/GalleryManager";
import NewsManager from "./NewsManager";

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
        {section === "news" && <NewsManager/>}
        {section === "courses" && <h2>Courses</h2>}
        {section === "faculty" && <h2>Faculty</h2>}
        {section === "contact" && <h2>Contact Messages</h2>}
      </main>
    </div>
  );
}
