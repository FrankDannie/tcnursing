import React, { useEffect, useState } from "react";
import { getPages, Page } from "../../services/pages.api";
import "./Home.scss";

// Import images
import coursesImg from "../../images/courses.jpg";
import campusImg from "../../images/campus.png";
import admissionImg from "../../images/admission.jpeg";
import heroBg from "../../images/home/collegeentrance.jpg";


export default function Home() {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    getPages().then(setPages).catch(console.error);
  }, []);

  return (
    <div className="home">

    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff"
      }}
    >
      <h1>Welcome to Thasiah College of Nursing</h1>
      <p>Where Education Meets Excellence</p>
      <a href="/admission" className="btn-primary">
        Apply Now
      </a>
    </section>


      {/* Features Section */}
      <section className="features">

        <div className="feature-card">
          <img src={coursesImg} alt="Courses" />
          <h3>Academics</h3>
          <p>Explore programs designed for your success.</p>
          <a href="/courses" className="btn-outline">
            Learn More
          </a>
        </div>

        <div className="feature-card">
          <img src={campusImg} alt="Campus" />
          <h3>Campus Facilities</h3>
          <p>Discover a vibrant campus full of opportunities.</p>
          <a href="/campus/facilities" className="btn-outline">
            Explore
          </a>
        </div>

        <div className="feature-card">
          <img src={admissionImg} alt="Admissions" />
          <h3>Admissions</h3>
          <p>Start your journey with us. Check admission details.</p>
          <a href="/admission" className="btn-outline">
            Get Started
          </a>
        </div>

      </section>

    </div>
  );
}
