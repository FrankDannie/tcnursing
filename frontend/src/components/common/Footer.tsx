import React, { useEffect, useState } from "react";
import "./Footer.scss";

export default function Footer() {
  const [data, setData] = useState<any>(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/api/contact-info`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-about">
          <h3>Thasiah College of Nursing</h3>
          <p>{data.campus_address}</p>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📞 {data.campus_phone}</p>
          <p>📱 {data.campus_mobile1}</p>
          <p>📧 {data.website}</p>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Thasiah College of Nursing. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}