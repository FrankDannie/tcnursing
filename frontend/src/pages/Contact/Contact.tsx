import React from "react";
import "./Contact.scss";

const Contact: React.FC = () => {
  return (
    <div className="contact-page">

      <h1 className="page-title">Contact Us</h1>

      <div className="contact-grid">

        {/* ADMIN OFFICE */}
        <div className="contact-card">
          <h3>Administrative Office</h3>

          <p>
            <strong>Thasiah College Of Nursing</strong><br />
            Door No. 12/74/2,<br />
            Vellivilagam, Viricode Post,<br />
            Marthandam - 629165,<br />
            Tamil Nadu.
          </p>

          <div className="contact-details">
            <span>📞 Phone: +91 4651 270996</span>
            <span>📱 Mobile 1: +91 9488783541</span>
            <span>📱 Mobile 2: +91 9487251600</span>
            <span>🌐 www.tcnursing.net</span>
          </div>
        </div>

        {/* COLLEGE CAMPUS */}
        <div className="contact-card">
          <h3>College Campus</h3>

          <p>
            <strong>Thasiah College Of Nursing</strong><br />
            Door No. 12/74B/B1,<br />
            Vellivilagam, Viricode Post,<br />
            Marthandam - 629165,<br />
            Tamil Nadu.
          </p>

          <div className="contact-details">
            <span>📞 Phone: +91 4651 270996</span>
            <span>📱 Mobile 1: +91 9488783541</span>
            <span>📱 Mobile 2: +91 9487251600</span>
            <span>🌐 www.tcnursing.net</span>
          </div>
        </div>

      </div>

      {/* LOCATION SECTION */}

      <div className="location-card">
        <h3>Location</h3>

        <p>
          Thasiah College of Nursing is located at Vellivilagam, in Marthandam
          (Nagercoil to Marthandam Main Road), just 1 km away from Marthandam Bus
          Stand, a fast developing town in Kanyakumari District.
          <br /><br />
          Marthandam is well connected by road and rail. The nearest railway
          station is Kuzhithurai (2 km). The nearest airport is Trivandrum (40 km).
          The College campus is located only 1 km from Marthandam Bus Stand.
        </p>
      </div>

    </div>
  );
};

export default Contact;
