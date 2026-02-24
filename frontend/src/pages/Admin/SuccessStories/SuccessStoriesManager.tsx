import { useEffect, useState } from "react";
import "./SuccessStoriesManager.scss";

export default function SuccessStoriesManager() {
  const [stories, setStories] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchStories = async () => {
    const res = await fetch(`${API_BASE}/success-stories/`);
    const data = await res.json();
    setStories(data);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({});
    setPhoto(null);
    setEditingId(null);
  };

  const submit = async () => {
    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (photo) data.append("photo", photo);

    if (editingId) {
      // ✅ UPDATE
      await fetch(`${API_BASE}/success-stories/${editingId}`, {
        method: "PUT",
        body: data,
      });
    } else {
      // ✅ CREATE
      await fetch(`${API_BASE}/success-stories`, {
        method: "POST",
        body: data,
      });
    }

    resetForm();
    setLoading(false);
    fetchStories();
  };

  const deleteStory = async (id: string) => {
    await fetch(`${API_BASE}/success-stories/${id}`, {
      method: "DELETE",
    });
    fetchStories();
  };

  const editStory = (story: any) => {
    setEditingId(story.id);
    setForm({
      name: story.name,
      degree: story.degree,
      academic_year: story.academic_year,
      current_hospital: story.current_hospital,
      city_in_germany: story.city_in_germany,
      start_year: story.start_year,
      moved_year: story.moved_year,
      short_story: story.short_story,
    });
  };

  return (
    <div className="success-manager">
      <h2>
        {editingId ? "Edit Success Story" : "Success Stories Manager"}
      </h2>

      <div className="form-card">
        <input name="name" value={form.name || ""} placeholder="Full Name" onChange={handleChange} />
        <input name="degree" value={form.degree || ""} placeholder="Degree" onChange={handleChange} />
        <input name="academic_year" value={form.academic_year || ""} placeholder="Academic Year" onChange={handleChange} />
        <input name="current_hospital" value={form.current_hospital || ""} placeholder="Current Hospital" onChange={handleChange} />
        <input name="city_in_germany" value={form.city_in_germany || ""} placeholder="City in Germany" onChange={handleChange} />
        <input name="start_year" value={form.start_year || ""} placeholder="Start Year" onChange={handleChange} />
        <input name="moved_year" value={form.moved_year || ""} placeholder="Moved Year" onChange={handleChange} />
        <textarea name="short_story" value={form.short_story || ""} placeholder="Short Story" onChange={handleChange} />

        <input type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />

        <button onClick={submit} disabled={loading}>
          {loading
            ? "Saving..."
            : editingId
            ? "Update Story"
            : "Save Story"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ background: "#777", marginTop: "10px" }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="stories-list">
        {stories.map((story) => (
          <div className="mini-card" key={story.id}>
            {story.photo_url && (
              <img
                src={`${API_BASE}${story.photo_url}`}
                alt={story.name}
              />
            )}

            <div>
              <h4>{story.name}</h4>
              <p>{story.degree}</p>
              <p>{story.short_story}</p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{ background: "#2563eb" }}
                onClick={() => editStory(story)}
              >
                Edit
              </button>

              <button
                style={{ background: "#dc2626" }}
                onClick={() => deleteStory(story.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}