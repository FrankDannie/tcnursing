import { useEffect, useState } from "react";
import "./Courses.scss";

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

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${API_BASE}/api/courses/`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="courses-page">Loading courses...</div>;
  }

  return (
    <div className="courses-page">
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
          <section className="course-card" key={course.id}>
            <h1>{course.title}</h1>
            <h2>{course.subtitle}</h2>

            <div className="course-info">
              <span>Duration: {course.duration}</span>
              {course.council_no && (
                <span>Indian Nursing Council No: {course.council_no}</span>
              )}
            </div>

            {course.affiliation && (
              <p className="affiliation">{course.affiliation}</p>
            )}

            {objectives.length > 0 && (
              <div className="course-section">
                <h3>Objectives of the Course</h3>
                <ul>
                  {objectives.map((obj, index) => (
                    <li key={index}>{obj}</li>
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
          </section>
        );
      })}
    </div>
  );
}