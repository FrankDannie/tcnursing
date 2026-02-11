import React, { useEffect, useState } from "react";
import "./CampusFacilities.scss";

const BASE_URL = "http://localhost:8000";
const screen = "campus_facilities";

const CampusFacilities: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch(
         `${BASE_URL}/api/gallery/${screen}`
        );
        const data: string[] = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to load campus images", err);
      }
    }

    loadImages();
  }, []);

  return (
    <div className="facilities-page">
      <h1 className="page-title">Campus Facilities Gallery</h1>

      <div className="gallery-grid">
        {images.map((img) => (
          <div className="gallery-card" key={img}>
            <img
              src={`${BASE_URL}/images/${screen}/${img}`}
              alt="Campus Facility"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusFacilities;