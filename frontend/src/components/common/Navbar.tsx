import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../images/tnclogo.jpg";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <img src={logo} alt="Thasiah College Logo" />
          <span>Thasiah College of Nursing</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/admission">Admission</Link>
          <Link to="/SuccessStories">SuccessStories</Link>
          <Link to="/news">News</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
