import React, { useEffect, useState } from "react";
import "./About.scss";
import SuccessStories from "../SuccessStories/SuccessStories";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const founderScreen = "about_founder";
const chairmanScreen = "chairman";

interface AboutData {
  id?: number;
  founder_text: string;
  vice_chairman_text: string;
  history: string;
  philosophy: string;
  college_aims: string;
}

const About: React.FC = () => {
  const [data, setData] = useState<AboutData | null>(null);
  const [founderImage, setFounderImage] = useState<string | null>(null);
  const [chairmanImage, setChairmanImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/about`)
      .then(res => res.json())
      .then(res => setData(res));

    async function loadImages() {
      try {
        const founderRes = await fetch(
          `${BASE_URL}/api/gallery/${founderScreen}`
        );
        const founderData: string[] = await founderRes.json();

        if (founderData.length > 0) {
          setFounderImage(
            `${BASE_URL}/images/${founderScreen}/${founderData[0]}`
          );
        }

        const chairmanRes = await fetch(
          `${BASE_URL}/api/gallery/${chairmanScreen}`
        );
        const chairmanData: string[] = await chairmanRes.json();

        if (chairmanData.length > 0) {
          setChairmanImage(
            `${BASE_URL}/images/${chairmanScreen}/${chairmanData[0]}`
          );
        }
      } catch (err) {
        console.error("Image load failed", err);
      }
    }

    loadImages();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="about-page">

        {/* ===============================
          FOUNDER SECTION
      =============================== */}

      <section className="leader-section">

      <div className="leader-overlay" />

      <div className="leader-container">

        <div className="leader-text">

          <h1>FOUNDER'S MESSAGE</h1>

          <p className="leader-designation">
          MR.C.THASIAN
          </p>

          <p className="leader-message">
            {data.founder_text}
          </p>

        </div>

        <div className="leader-image">

        {founderImage && <img src={founderImage} alt="Founder" />}

        </div>

      </div>

      </section>

      {/* ===============================
          GROUP LEADER MESSAGE SECTION
      =============================== */}

      <section className="leader-section">

        <div className="leader-overlay" />

        <div className="leader-container">

          <div className="leader-text">

            <h1>VICE-CHAIRMAN'S MESSAGE</h1>

            <p className="leader-designation">
            MRS. MARIAMMA THASIAN
            </p>

            <p className="leader-message">
              {data.vice_chairman_text}
            </p>

          </div>

          <div className="leader-image">

            {chairmanImage && (
              <img src={chairmanImage} alt="Chairman" />
            )}

          </div>

        </div>

      </section>


      {/* ===============================
        HISTORY
      ================================ */}

      <section className="info-section">

      <div className="info-card">

        <h3>History</h3>

        <p>{data.history}</p>

      </div>

      </section>


      {/* ===============================
            PHILOSOPHY
      ================================ */}

      <section className="info-section">

      <div className="info-card">

        <h3>Philosophy</h3>

        <ul className="styled-list">
          {data.philosophy.split("\n").map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

      </div>

      </section>


      {/* ===============================
            COLLEGE AIMS
      ================================ */}

      <section className="info-section">

      <div className="info-card">

        <h3>College Aims</h3>

        <ul className="styled-list">
          {data.college_aims.split("\n").map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

      </div>

      </section>

      {/* ===============================
        SUCCESS STORIES
      ================================ */}

      <section className="success-section">

      <div className="success-container">

        <div className="success-header">
          <h2>Success Stories</h2>
          <p>
            Our graduates are building successful careers in Germany and across
            Europe. Here are some inspiring journeys.
          </p>
        </div>

        <SuccessStories />

      </div>

      </section>

    </div>
  );
};

export default About;