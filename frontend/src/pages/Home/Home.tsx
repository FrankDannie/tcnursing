import React, { useEffect, useState } from "react";
import "./Home.scss";

// ✅ Static feature images (KEEP SAME)
import coursesImg from "../../images/courses.jpg";
import campusImg from "../../images/campus.png";
import admissionImg from "../../images/admission.jpeg";

const BASE_URL = "http://localhost:8000";
const screen = "home";

export default function Home() {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  // 🔥 Load hero images from API
  useEffect(() => {
    async function loadHeroImages() {
      try {
        const res = await fetch(
           `${BASE_URL}/api/gallery/${screen}`
        );
        const data: string[] = await res.json();
        setHeroImages(data);
      } catch (err) {
        console.error("Failed to load hero images", err);
      }
    }

    loadHeroImages();
  }, []);

  // Auto slide
  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <div className="home">
      {/* HERO SLIDER (API DRIVEN) */}
      <section className="hero premium-hero">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`hero-slide ${index === current ? "active" : ""}`}
            style={{
              backgroundImage: `url(${BASE_URL}/images/${screen}/${img})`,
            }}
          />
        ))}

        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>Welcome to Thasiah College of Nursing</h1>
          <p>Where Education Meets Excellence</p>
          <a href="/admission" className="btn-primary">
            Apply Now
          </a>
        </div>
      </section>

      {/* FEATURES (STATIC IMAGES) */}
      <section className="features">
        <div className="feature-card">
          <img src={coursesImg} alt="Courses" />
          <h3>Academics</h3>
          <p>Explore programs designed for your success.</p>
          <a href="/courses" className="btn-outline">Learn More</a>
        </div>

        <div className="feature-card">
          <img src={campusImg} alt="Campus" />
          <h3>Campus Facilities</h3>
          <p>Discover a vibrant campus full of opportunities.</p>
          <a href="/campus/facilities" className="btn-outline">Explore</a>
        </div>

        <div className="feature-card">
          <img src={admissionImg} alt="Admissions" />
          <h3>Admissions</h3>
          <p>Start your journey with us.</p>
          <a href="/admission" className="btn-outline">Get Started</a>
        </div>
      </section>
    </div>
  );
}