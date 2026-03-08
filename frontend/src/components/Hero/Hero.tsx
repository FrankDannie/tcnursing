import { useEffect, useState } from "react";
import "./Hero.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const screen = "home";

export default function Hero() {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch(`${BASE_URL}/api/gallery/${screen}`);
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed loading hero images", err);
      }
    }

    loadImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className="hero">
      {images.map((img, i) => (
        <div
          key={img}
          className={`hero-slide ${i === current ? "active" : ""}`}
          style={{
            backgroundImage: `url(${BASE_URL}/images/${screen}/${img})`,
          }}
        />
      ))}

      <div className="hero-overlay" />

      <div className="hero-content">
        <h4>Crafting Excellence</h4>

        <h1>
          Welcome to <span>Thasiah College of Nursing</span>
        </h1>

        <p>
          Empowering the next generation of healthcare professionals
          through excellence in nursing education.
        </p>

        <div className="hero-buttons">
          <a href="/courses" className="btn-primary">
            View Courses
          </a>

          <a href="/admission" className="btn-outline">
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}