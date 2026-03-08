import React, { useEffect, useState } from "react";
import "./CampusFacilities.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const screen = "campus_facilities";

const CampusFacilities: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch(`${BASE_URL}/api/gallery/${screen}`);
        const data: string[] = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to load images", err);
      }
    }

    loadImages();
  }, []);

  return (
    <div className="facilities-page">
  
      <div className="facilities-header">
        <h1>Campus Facilities</h1>
        <p>Explore the modern infrastructure and spaces that support our academic community.</p>
      </div>
  
      <div className="gallery-grid">
        {images.map((img) => (
          <div
            className="gallery-card"
            key={img}
            onClick={() => setSelected(img)}
          >
            <img
              src={`${BASE_URL}/images/${screen}/${img}`}
              alt="Campus facility"
            />
          </div>
        ))}
      </div>
  
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <img src={`${BASE_URL}/images/${screen}/${selected}`} />
        </div>
      )}
  
    </div>
  );
};

export default CampusFacilities;