import { useEffect, useState } from "react";
import "./SuccessStoriesManager.scss"; 

export default function SuccessStoriesManager() {
  const [stories, setStories] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL ;

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

  const submit = async () => {
    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (photo) data.append("photo", photo);

    await fetch(`${API_BASE}/success-stories`, {
      method: "POST",
      body: data,
    });

    setForm({});
    setPhoto(null);
    setLoading(false);
    fetchStories();
  };

  const deleteStory = async (id: string) => {
    await fetch(`${API_BASE}/success-stories/${id}`, {
      method: "DELETE",
    });
    fetchStories();
  };

  return (
    <div className="success-manager">
      <h2>Success Stories Manager</h2>

      <div className="form-card">
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="degree" placeholder="Degree" onChange={handleChange} />
        <input name="academic_year" placeholder="Academic Year" onChange={handleChange} />
        <input name="current_hospital" placeholder="Current Hospital" onChange={handleChange} />
        <input name="city_in_germany" placeholder="City in Germany" onChange={handleChange} />
        <input name="start_year" placeholder="Start Year" onChange={handleChange} />
        <input name="moved_year" placeholder="Moved Year" onChange={handleChange} />
        <textarea name="short_story" placeholder="Short Story" onChange={handleChange} />

        <input type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />

        <button onClick={submit} disabled={loading}>
          {loading ? "Saving..." : "Save Story"}
        </button>
      </div>

      <div className="stories-list">
        {stories.map((story) => (
          <div className="mini-card" key={story.id}>
            {story.photo_url && <img src={story.photo_url} alt={story.name} />}
            <div>
              <h4>{story.name}</h4>
              <p>{story.degree}</p>
            </div>
            <button onClick={() => deleteStory(story.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}