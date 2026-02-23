import { useEffect, useState } from "react";
import "./CourseManager.scss";

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

export default function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL ;

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    duration: "",
    council_no: "",
    affiliation: "",
    program_details: "",
  });

  const [objectivesArray, setObjectivesArray] = useState<string[]>([]);
  const [newObjective, setNewObjective] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/courses/`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("objectives", JSON.stringify(objectivesArray));

    try {
      if (editingId) {
        await fetch(
          `${API_BASE}/api/courses/${editingId}`,
          {
            method: "PUT",
            body: formData,
          }
        );
      } else {
        await fetch(`${API_BASE}/api/courses/`, {
          method: "POST",
          body: formData,
        });
      }

      resetForm();
      fetchCourses();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);

    let parsedObjectives: string[] = [];
    try {
      parsedObjectives = course.objectives
        ? JSON.parse(course.objectives)
        : [];
    } catch {
      parsedObjectives = [];
    }

    setObjectivesArray(parsedObjectives);

    setForm({
      title: course.title,
      subtitle: course.subtitle,
      duration: course.duration,
      council_no: course.council_no || "",
      affiliation: course.affiliation || "",
      program_details: course.program_details || "",
    });
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_BASE}/api/courses/${id}`, {
      method: "DELETE",
    });
    fetchCourses();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      subtitle: "",
      duration: "",
      council_no: "",
      affiliation: "",
      program_details: "",
    });
    setObjectivesArray([]);
    setNewObjective("");
  };

  return (
    <div className="course-manager">
      <h2>Manage Courses</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Subtitle *</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) =>
              setForm({ ...form, subtitle: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Duration *</label>
          <input
            type="text"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Council Number</label>
          <input
            type="text"
            value={form.council_no}
            onChange={(e) =>
              setForm({ ...form, council_no: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Affiliation</label>
          <textarea
            value={form.affiliation}
            onChange={(e) =>
              setForm({ ...form, affiliation: e.target.value })
            }
          />
        </div>

        {/* 🔥 Objectives UI */}
        <div className="form-group">
          <label>Objectives of the Course</label>

          <div className="objectives-box">
            {objectivesArray.map((obj, index) => (
              <div key={index} className="objective-item ">
                <span>{obj}</span>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() =>
                    setObjectivesArray(
                      objectivesArray.filter((_, i) => i !== index)
                    )
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="objective-input">
            <input
              type="text"
              value={newObjective}
              placeholder="Enter new objective..."
              onChange={(e) => setNewObjective(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (newObjective.trim()) {
                  setObjectivesArray([
                    ...objectivesArray,
                    newObjective,
                  ]);
                  setNewObjective("");
                }
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Programme of Study</label>
          <textarea
            value={form.program_details}
            onChange={(e) =>
              setForm({
                ...form,
                program_details: e.target.value,
              })
            }
          />
        </div>

        <button type="submit">
          {editingId ? "Update Course" : "Add Course"}
        </button>
      </form>

      <div className="course-list">
        {courses.map((c) => (
          <div key={c.id} className="course-card-admin">
            <h4>{c.title}</h4>
            <div>
              <button onClick={() => handleEdit(c)}>✏️</button>
              <button onClick={() => handleDelete(c.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}