import React, { useEffect, useState } from "react";
import "./Contact.scss";

const Contact: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${API_BASE}/api/contact-info`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="contact-page">
      <h1 className="page-title">Contact Us</h1>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>{data.office_title}</h3>
          <p>{data.office_address}</p>

          <div className="contact-details">
            <span>📞 {data.office_phone}</span>
            <span>📱 {data.office_mobile1}</span>
            <span>📱 {data.office_mobile2}</span>
            <span>🌐 {data.website}</span>
          </div>
        </div>

        <div className="contact-card">
          <h3>{data.campus_title}</h3>
          <p>{data.campus_address}</p>

          <div className="contact-details">
            <span>📞 {data.campus_phone}</span>
            <span>📱 {data.campus_mobile1}</span>
            <span>📱 {data.campus_mobile2}</span>
          </div>
        </div>
      </div>

      <div className="location-card">
        <h3>Location</h3>
        <p>{data.location_description}</p>
      </div>
    </div>
  );
};

export default Contact;