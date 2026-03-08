import { useEffect, useState } from "react";
import "./SuccessStories.scss";

export default function SuccessStories() {
  const [stories, setStories] = useState<any[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const loadStories = async () => {
      const res = await fetch(`${API_BASE}/success-stories/`);
      const data = await res.json();
      setStories(data);
    };

    loadStories();
  }, []);

  return (
    <div className="success-stories">

      {stories.map((story, index) => (

        <div
          className={`success-story ${index % 2 !== 0 ? "reverse" : ""}`}
          key={story.id}
        >

          <div className="story-image">
            {story.photo_url && (
              <img src={`${API_BASE}${story.photo_url}`} alt={story.name} />
            )}
          </div>

          <div className="story-content">

            <h3>{story.name}</h3>

            <p className="meta">
              {story.degree} • {story.academic_year}
            </p>

            <p className="city">{story.city_in_germany}</p>

            <p className="story-text">{story.short_story}</p>

            <div className="timeline">
            {(story.start_year || story.moved_year) && (
  <div className="timeline">

    {story.start_year && (
      <span>Started {story.start_year}</span>
    )}

    {story.moved_year && (
      <span>Moved to Germany {story.moved_year}</span>
    )}

  </div>
)}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}