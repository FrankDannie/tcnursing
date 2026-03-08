import { useEffect, useState } from "react";
import "./CoursesHome.scss";

interface Course {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  council_no?: string;
  affiliation?: string;
  objectives?: string;
  program_details?: string;
}

export default function CoursesHome() {
  const [courses, setCourses] = useState<Course[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/api/courses/`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <section className="courses-home">
      <div className="container">
        <h2>Our Nursing Programs</h2>

        {courses.map((course) => {
          let objectives: string[] = [];

          try {
            objectives = course.objectives
              ? JSON.parse(course.objectives)
              : [];
          } catch {
            objectives = [];
          }

          return (
            <div className="course-card" key={course.id}>
              <h1>{course.title}</h1>

              <h2>{course.subtitle}</h2>

              <div className="course-info">
                <span>Duration: {course.duration}</span>

                {course.council_no && (
                  <span>INC No: {course.council_no}</span>
                )}
              </div>

              {course.affiliation && (
                <p className="affiliation">{course.affiliation}</p>
              )}

              {objectives.length > 0 && (
                <div className="course-section">
                  <h3>Objectives</h3>

                  <ul>
                    {objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              {course.program_details && (
                <div className="course-section">
                  <h3>Programme of Study</h3>

                  <p>{course.program_details}</p>
                </div>
              )}

              <a href="/admission" className="apply-btn">
                Apply Now
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}