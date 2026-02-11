import React, { useEffect, useState } from "react";
import "./About.scss";

const BASE_URL = "http://localhost:8000";

const founderScreen = "about_founder";
const chairmanScreen = "chairman";

const About: React.FC = () => {
  const [founderImage, setFounderImage] = useState<string | null>(null);
  const [chairmanImage, setChairmanImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        // Founder Image
        const founderRes = await fetch(
          `${BASE_URL}/api/gallery/${founderScreen}`
        );
        const founderData: string[] = await founderRes.json();
        if (founderData.length > 0) {
          setFounderImage(
            `${BASE_URL}/images/${founderScreen}/${founderData[0]}`
          );
        }

        // Chairman Image
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
        console.error("Failed to load about images", err);
      }
    }

    loadImages();
  }, []);

  return (
    <div className="about-page">

      <section className="founders">

        <div className="founder-card">
          <h3>Founder</h3>
          {founderImage && (
            <img src={founderImage} alt="Founder" />
          )}
          <p>
            Our CHAIRMAN / CORRESPONDENT: <strong>Mr. C. Thasian</strong>,
            has been a visionary leader dedicated to advancing nursing
            education and healthcare excellence.
          </p>
        </div>

        <div className="founder-card">
          <h3>Vice Chairman</h3>
          {chairmanImage && (
            <img src={chairmanImage} alt="Vice Chairman" />
          )}
          <p>
            <strong>Mrs. Mariamma Thasian</strong>, Vice Chairman of
            Thasiah College of Nursing.
          </p>
        </div>

      </section>

      <section className="content-section">
        <h3>History</h3>
        <p>
          Thasiah College of Nursing, Marthandam is a self-supporting
          Nursing College imparting nursing education for students
          belonging to weaker sections of society.
        </p>
      </section>

      <section className="content-section">
        <h3>Philosophy</h3>
        <ul>
          <li>Nursing is a dynamic art and science.</li>
          <li>Learning happens in an environment of freedom.</li>
          <li>Focus on professional and personal development.</li>
        </ul>
      </section>

      <section className="content-section">
        <h3>College Aims</h3>
        <ul>
          <li>Provide academic excellence with practical experience.</li>
          <li>Uplift weaker sections through nursing education.</li>
          <li>Develop talented healthcare professionals.</li>
        </ul>
      </section>

    </div>
  );
};

export default About;