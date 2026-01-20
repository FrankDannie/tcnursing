import React from "react";
import "./About.scss";

import chairmanImg from "../../images/chairman.jpeg";
import viceChairmanImg from "../../images/Mariamma.gif";

const About: React.FC = () => {
  return (
    <div className="about-page">

      {/* Founder Section */}
      <section className="founders">

        <div className="founder-card">
          <h3>Founder</h3>
          <img src={chairmanImg} alt="Chairman" />
          <p>
            Our CHAIRMAN / CORRESPONDENT: <strong>Mr. C. Thasian</strong>, has been
            a visionary leader dedicated to advancing nursing education and
            healthcare excellence.
          </p>
        </div>

        <div className="founder-card">
          <h3>Vice Chairman</h3>
          <img src={viceChairmanImg} alt="Vice Chairman" />
          <p>
            <strong>Mrs. Mariamma Thasian</strong>, Vice Chairman of Thasiah
            College of Nursing.
          </p>
        </div>

      </section>

      {/* History Section */}
      <section className="content-section">
        <h3>History</h3>
        <p>
          Thasiah College of Nursing, Marthandam is a self-supporting Nursing
          College imparting nursing education for students belonging to weaker
          sections of society. The institution is run by Chellakan Memorial
          Educational and Charitable Trust with the objective of promoting
          educational and charitable activities.
        </p>
      </section>

      {/* Philosophy Section */}
      <section className="content-section">
        <h3>Philosophy</h3>

        <p>
          The College of Nursing helps to meet the needs of the State of Tamil
          Nadu and Indian Nursing Council for professional nurses who will assume
          responsibility in health promotion and disease prevention.
        </p>

        <ul>
          <li>
            Nursing is a dynamic art and science aiming at optimum health.
          </li>
          <li>
            Learning happens in an environment of freedom and intellectual
            instruction.
          </li>
          <li>
            Focus on professional and personal development of students.
          </li>
        </ul>
      </section>

      {/* College Aims */}
      <section className="content-section">
        <h3>College Aims</h3>

        <ul>
          <li>
            Provide academic excellence with practical experience.
          </li>
          <li>
            Uplift weaker sections through nursing education.
          </li>
          <li>
            Develop dedicated and talented healthcare professionals.
          </li>
        </ul>

      </section>

    </div>
  );
};

export default About;
