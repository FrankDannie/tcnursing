import { useEffect, useState } from "react";
import "./SuccessStories.scss";  

export default function SuccessStories() {
  const [stories, setStories] = useState<any[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL ;

  useEffect(() => {
    const loadStories = async () => {
      const res = await fetch(`${API_BASE}/success-stories/`);
      const data = await res.json();
      setStories(data);
    };

    loadStories();
  }, []);

  return (
    <div className="success-grid">
      {stories.map((story) => (
        <div className="success-card" key={story.id}>
          {story.photo_url && (
            <img src={`${API_BASE}${story.photo_url}`} alt={story.name} />
          )}

          <h3>{story.name}</h3>

          <p className="meta">
            <strong>{story.degree}</strong> | {story.academic_year}
          </p>

          <p className="city">{story.city_in_germany}</p>

          <p className="story">{story.short_story}</p>

          <div className="timeline">
            <span>Started: {story.start_year}</span>
            <span>Moved: {story.moved_year}</span>
          </div>
        </div>
      ))}
    </div>
  );
}