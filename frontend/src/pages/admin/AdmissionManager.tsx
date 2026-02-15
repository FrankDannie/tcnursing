import { useEffect, useState } from "react";
import "./AdmissionManager.scss";

interface AdmissionData {
  id?: number;
  application_info: string;
  eligibility: string;
  submission_documents: string;
  programme_details: string;
  candidate_selection: string;
  has_pdf?: boolean;
}

const emptyData: AdmissionData = {
  application_info: "",
  eligibility: "",
  submission_documents: "",
  programme_details: "",
  candidate_selection: "",
};

export default function AdmissionManager() {
  const [form, setForm] = useState<AdmissionData>(emptyData);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/admission")
      .then(res => res.json())
      .then(res => {
        if (res) setForm(res);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);

    const formData = new FormData();
    formData.append("application_info", form.application_info);
    formData.append("eligibility", form.eligibility);
    formData.append("submission_documents", form.submission_documents);
    formData.append("programme_details", form.programme_details);
    formData.append("candidate_selection", form.candidate_selection);

    if (pdfFile) {
      formData.append("pdf", pdfFile);
    }

    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `http://localhost:8000/api/admission/${form.id}`
      : `http://localhost:8000/api/admission`;

    await fetch(url, {
      method,
      body: formData,
    });

    alert(form.id ? "Updated" : "Created");
    setSaving(false);
  };

  return (
    <div className="admission-manager">
      <h2>Admission Management</h2>

      <label>Application Information</label>
      <textarea
        name="application_info"
        value={form.application_info}
        onChange={handleChange}
      />

      <label>Eligibility</label>
      <textarea
        name="eligibility"
        value={form.eligibility}
        onChange={handleChange}
      />

      <label>Submission Documents</label>
      <textarea
        name="submission_documents"
        value={form.submission_documents}
        onChange={handleChange}
      />

      <label>Programme Details</label>
      <textarea
        name="programme_details"
        value={form.programme_details}
        onChange={handleChange}
      />

      <label>Candidate Selection</label>
      <textarea
        name="candidate_selection"
        value={form.candidate_selection}
        onChange={handleChange}
      />

      <label>Upload Application PDF</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          if (e.target.files) {
            setPdfFile(e.target.files[0]);
          }
        }}
      />

      {form.has_pdf && (
        <p style={{ color: "green" }}>PDF already uploaded</p>
      )}

      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : form.id ? "Update" : "Create"}
      </button>
    </div>
  );
}