import "./Home.scss";

import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import CoursesHome from "../../components/CoursesHome/CoursesHome";
import CampusFacilities from "../../components/CampusFacilities/CampusFacilities";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />

      <About />
      <CoursesHome />
      <CampusFacilities />
    </div>
  );
}