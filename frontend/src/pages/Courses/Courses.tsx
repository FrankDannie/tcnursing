import React from "react";
import "./Courses.scss";

const Courses: React.FC = () => {
  return (
    <div className="courses-page">

      {/* MSc Nursing Section */}
      <section className="course-card">
        <h1>Master of Science in Nursing</h1>
        <h2>M.Sc. (Nursing)</h2>

        <div className="course-info">
          <span>Duration: 2 Years</span>
          <span>Indian Nursing Council No: 2904076</span>
        </div>

        <p className="affiliation">
          M.Sc (Nursing) affiliated by The Tamil Nadu Dr. M.G.R Medical University
          <br />
          Order No: Proc.No.Affln.II(3) dated 26.07.2013
        </p>
      </section>

      {/* BSc Nursing Section */}
      <section className="course-card">
        <h1>Bachelor of Science in Nursing</h1>
        <h2>B.Sc. (Nursing)</h2>

        <div className="course-info">
          <span>Duration: 4 Years</span>
        </div>

        <div className="course-section">
          <h3>Objectives of the Course</h3>

          <ul>
            <li>
              Provide high standards of education by adopting holistic approach.
            </li>
            <li>
              Develop knowledge, skills and attitude in comprehensive patient care.
            </li>
            <li>
              Demonstrate competence in nursing skills and health team coordination.
            </li>
            <li>
              Develop leadership qualities of integrity and responsibility.
            </li>
            <li>
              Practice ethical values in personal and professional life.
            </li>
          </ul>
        </div>

        <div className="course-section">
          <h3>Programme of Study</h3>

          <p>
            The duration of the Basic B.Sc Nursing Programme is 4 years including
            6 months of integrated practice. Examination will be conducted by the
            Tamil Nadu Dr. M.G.R Medical University in the month of August every
            year. Monthly term tests will be conducted and marks will be sent
            through post.
          </p>
        </div>

      </section>

    </div>
  );
};

export default Courses;
