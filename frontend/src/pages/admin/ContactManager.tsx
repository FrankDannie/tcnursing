import React, { useEffect, useState } from "react";
import "./ContactManager.scss";

interface ContactForm {
  id?: number;
  office_title: string;
  office_address: string;
  office_phone: string;
  office_mobile1: string;
  office_mobile2: string;
  website: string;
  campus_title: string;
  campus_address: string;
  campus_phone: string;
  campus_mobile1: string;
  campus_mobile2: string;
  location_description: string;
}

const emptyForm: ContactForm = {
  office_title: "",
  office_address: "",
  office_phone: "",
  office_mobile1: "",
  office_mobile2: "",
  website: "",
  campus_title: "",
  campus_address: "",
  campus_phone: "",
  campus_mobile1: "",
  campus_mobile2: "",
  location_description: "",
};

const ContactManager: React.FC = () => {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/contact-info")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setForm(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const method = form.id ? "PUT" : "POST";
      const url = form.id
        ? `http://localhost:8000/api/contact-info/${form.id}`
        : `http://localhost:8000/api/contact-info`;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert(form.id ? "Updated successfully!" : "Created successfully!");
    } catch {
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="contact-manager">Loading...</div>;

  return (
    <div className="contact-manager">
      <h2>Contact Information Management</h2>

      {/* ADMIN OFFICE */}
      <div className="section-card">
        <h3>Administrative Office</h3>

        <label>Office Title</label>
        <input
          name="office_title"
          value={form.office_title}
          onChange={handleChange}
        />

        <label>Office Address</label>
        <textarea
          name="office_address"
          rows={4}
          value={form.office_address}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          name="office_phone"
          value={form.office_phone}
          onChange={handleChange}
        />

        <label>Mobile 1</label>
        <input
          name="office_mobile1"
          value={form.office_mobile1}
          onChange={handleChange}
        />

        <label>Mobile 2</label>
        <input
          name="office_mobile2"
          value={form.office_mobile2}
          onChange={handleChange}
        />

        <label>Website</label>
        <input
          name="website"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      {/* CAMPUS */}
      <div className="section-card">
        <h3>College Campus</h3>

        <label>Campus Title</label>
        <input
          name="campus_title"
          value={form.campus_title}
          onChange={handleChange}
        />

        <label>Campus Address</label>
        <textarea
          name="campus_address"
          rows={4}
          value={form.campus_address}
          onChange={handleChange}
        />

        <label>Campus Phone</label>
        <input
          name="campus_phone"
          value={form.campus_phone}
          onChange={handleChange}
        />

        <label>Campus Mobile 1</label>
        <input
          name="campus_mobile1"
          value={form.campus_mobile1}
          onChange={handleChange}
        />

        <label>Campus Mobile 2</label>
        <input
          name="campus_mobile2"
          value={form.campus_mobile2}
          onChange={handleChange}
        />
      </div>

      {/* LOCATION */}
      <div className="section-card">
        <h3>Location Description</h3>

        <textarea
          name="location_description"
          rows={6}
          value={form.location_description}
          onChange={handleChange}
        />
      </div>

      <button
        className="save-btn"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : form.id ? "Update" : "Create"}
      </button>
    </div>
  );
};

export default ContactManager;