import React, { useEffect, useState } from "react";
import "./Home.scss";

// Feature images (unchanged)
import coursesImg from "../../images/courses.jpg";
import campusImg from "../../images/campus.png";
import admissionImg from "../../images/admission.jpeg";

// 🔥 Auto-load ALL hero images
const heroImages = Object.values(
  import.meta.glob("../../images/home/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  })
) as string[];

export default function Home() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      {/* HERO SLIDER */}
      <section className="hero premium-hero">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`hero-slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
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

      {/* FEATURES */}
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
          <p>Start your journey with us. Check admission details.</p>
          <a href="/admission" className="btn-outline">Get Started</a>
        </div>
      </section>
    </div>
  );
}
