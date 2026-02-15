import React, { useEffect, useState } from "react";
import "./About.scss";

const BASE_URL = "http://localhost:8000";

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
        console.error("Failed to load images", err);
      }
    }

    loadImages();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="about-page">

      <section className="founders">

        <div className="founder-card">
          <h3>Founder</h3>
          {founderImage && <img src={founderImage} alt="Founder" />}
          <p>{data.founder_text}</p>
        </div>

        <div className="founder-card">
          <h3>Vice Chairman</h3>
          {chairmanImage && <img src={chairmanImage} alt="Vice Chairman" />}
          <p>{data.vice_chairman_text}</p>
        </div>

      </section>

      <section className="content-section">
        <h3>History</h3>
        <p>{data.history}</p>
      </section>

      <section className="content-section">
        <h3>Philosophy</h3>
        <ul>
          {data.philosophy.split("\n").map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="content-section">
        <h3>College Aims</h3>
        <ul>
          {data.college_aims.split("\n").map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

    </div>
  );
};

export default About;