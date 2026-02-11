import { AdminSection } from "./AdminDashboard";
import "./Sidebar.scss";

const items: { key: AdminSection; label: string }[] = [
  { key: "gallery", label: "Gallery" },
  { key: "news", label: "News" },
  { key: "courses", label: "Courses" },
  { key: "faculty", label: "Faculty" },
  { key: "contact", label: "Contact" },
];

export default function Sidebar({
  active,
  onChange,
}: {
  active: AdminSection;
  onChange: (v: AdminSection) => void;
}) {
  return (
    <aside className="admin-sidebar">

      <nav>
        {items.map((i) => (
          <button
            key={i.key}
            className={active === i.key ? "active" : ""}
            onClick={() => onChange(i.key)}
          >
            {i.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
