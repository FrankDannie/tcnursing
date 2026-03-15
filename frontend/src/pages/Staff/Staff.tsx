import React, { useEffect, useState } from "react";
import "./Staff.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Staff = () => {
  const [staff, setStaff] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/staff`)
      .then(res => res.json())
      .then(data => setStaff(data));
  }, []);

  return (
    <div className="staff-page">

      <div className="staff-grid">
        {staff.map((member, index) => (
          <div className="staff-card" key={index}>
            <img
              src={`${BASE_URL}/images/staff/${member.image}`}
              alt={member.name}
            />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="desc">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;