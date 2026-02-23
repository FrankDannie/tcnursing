import { useEffect, useState } from "react";
import "./Admission.scss";

interface AdmissionData {
  has_pdf: any;
  id?: number;
  application_info: string;
  eligibility: string;
  candidate_selection: string;
  submission_documents: string;
  programme_details: string;
}

export default function Admission() {
  const [data, setData] = useState<AdmissionData | null>(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${API_BASE}/api/admission`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(() => {});
  }, []);

  if (!data) return <div className="container">Loading...</div>;

  const doc_url = `${API_BASE}/api/admission/download`

  return (
    <section className="admission container">
      <header className="page-header">
        <h1>Admission</h1>
        <p>Thasiah College of Nursing</p>
      </header>

      <section className="block">
        <h3>Application Form</h3>
        <p>{data.application_info}</p>
        {data.has_pdf && (
  <a
    href="doc_url"
    className="download"
  >
    Download Application Form
  </a>
)}
      </section>

      <section className="block">
        <h3>Eligibility</h3>
        <p>{data.eligibility}</p>
      </section>

      <section className="block">
        <h3>Application Submission</h3>
        <p style={{ whiteSpace: "pre-line" }}>
          {data.submission_documents}
        </p>
      </section>

      <section className="block">
        <h3>Candidate Selection</h3>
        <p>{data.candidate_selection}</p>
      </section>

      <section className="block">
        <h3>Programme of Study</h3>
        <p>{data.programme_details}</p>
      </section>
    </section>
  );
}