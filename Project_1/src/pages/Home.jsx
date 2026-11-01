import { useState } from "react";
import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

const skills = ["C", "C++", "Java", "HTML", "CSS", "React"];

export default function Home() {
  const [themeColor, setThemeColor] = useState("#2563eb");
  const [showAbout, setShowAbout] = useState(true);

  function changeHeaderColor() {
    setThemeColor((current) => current === "#2563eb" ? "#00ee00" : "#2563eb");
  }

  return (
    <div className="portfolio-home">
      <Header name="KISHAN CHOTALIYA" color={themeColor} />
      <div className="portfolio-actions">
        <button onClick={changeHeaderColor}>Change Header Color</button>
        <button onClick={() => setShowAbout((visible) => !visible)}>
          {showAbout ? "Hide About" : "Show About"}
        </button>
      </div>
      {showAbout && <About />}
      <Skills skills={skills} />
      <Footer email="kishan@example.com" />
    </div>
  );
}
