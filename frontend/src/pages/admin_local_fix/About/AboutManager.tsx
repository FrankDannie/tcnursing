import { useEffect, useState } from "react";
import "./AboutManager.scss";

interface AboutData {
  id?: number;
  founder_text: string;
  vice_chairman_text: string;
  history: string;
  philosophy: string;
  college_aims: string;
}

const emptyData: AboutData = {
  founder_text: "",
  vice_chairman_text: "",
  history: "",
  philosophy: "",
  college_aims: "",
};

export default function AboutManager() {
  const [form, setForm] = useState<AboutData>(emptyData);
  const [saving, setSaving] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${API_BASE}/api/about`)
      .then(res => res.json())
      .then(res => {
        if (res) setForm(res);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);

    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `${API_BASE}/api/about/${form.id}`
      : `${API_BASE}/api/about`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert(form.id ? "Updated" : "Created");
    setSaving(false);
  };

  return (
    <div className="about-manager">
      <h2>About Page Management</h2>

      <label>Founder Text</label>
      <textarea
        name="founder_text"
        value={form.founder_text}
        onChange={handleChange}
      />

      <label>Vice Chairman Text</label>
      <textarea
        name="vice_chairman_text"
        value={form.vice_chairman_text}
        onChange={handleChange}
      />

      <label>History</label>
      <textarea
        name="history"
        value={form.history}
        onChange={handleChange}
      />

      <label>Philosophy (One per line)</label>
      <textarea
        name="philosophy"
        value={form.philosophy}
        onChange={handleChange}
      />

      <label>College Aims (One per line)</label>
      <textarea
        name="college_aims"
        value={form.college_aims}
        onChange={handleChange}
      />

      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : form.id ? "Update" : "Create"}
      </button>
    </div>
  );
}