import "./About.scss";
import campusImg from "../../images/campus.png";

export default function About() {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-image">
          <img src={campusImg} alt="Campus" />
        </div>

        <div className="about-text">
          <h2>About Our College</h2>

          <p>
            Thasiah College of Nursing provides world-class education
            designed to prepare future healthcare professionals.
          </p>

          <p>
            Our programs combine academic excellence, clinical training,
            and professional development.
          </p>

          <a href="/about" className="btn-primary">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}