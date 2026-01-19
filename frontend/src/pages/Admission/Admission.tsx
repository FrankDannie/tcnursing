import "./Admission.scss";

export default function Admission() {
  return (
    <section className="admission container">
      <header className="page-header">
        <h1>Admission</h1>
        <p>Thasiah College of Nursing</p>
      </header>

      <section className="block">
        <h3>Application Form</h3>
        <p>
          Application form and prospectus can be obtained on payment of ₹500
          by cash or DD drawn in favour of Chellakan Memorial Educational Trust.
        </p>
        <a className="download" href="/forms/Application.pdf" download>
          Download Application Form
        </a>
      </section>

      <section className="block">
        <h3>Eligibility</h3>
        <p>12 years of schooling with Physics, Chemistry & Biology.</p>
        <p>Candidate must be 17 years old on or before 31st December.</p>
      </section>

      <section className="block">
        <h3>Application Submission</h3>
        <ul>
          <li>HSC / Equivalent Mark Sheet</li>
          <li>Transfer Certificate</li>
          <li>Conduct Certificate</li>
          <li>Community Certificate</li>
          <li>Medical Fitness Certificate</li>
        </ul>
      </section>

      <section className="block">
        <h3>Programme of Study</h3>
        <p>
          Duration: 4 years including 6 months of integrated practice.
        </p>
      </section>
    </section>
  );
}
