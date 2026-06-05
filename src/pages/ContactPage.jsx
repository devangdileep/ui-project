import React from "react";
import { ExternalLink, Cpu, Code, Palette, Layers, Eye } from "lucide-react";
import "../css/contactme.css";

const developers = [
  {
    name: "Devang Dileep",
    initials: "DD",
    role: "Lead Architect",
    portfolio: "https://devangdileep.github.io/personal-portfolio/",
    classId: "dev-1",
    specialtyIcon: <Cpu size={16} />
  },
  {
    name: "Ananth Krishna CS",
    initials: "AK",
    role: "Frontend Engineer",
    portfolio: "https://ananth2007.github.io/project-portfolio/",
    classId: "dev-2",
    specialtyIcon: <Code size={16} />
  },
  {
    name: "Harith Bhuvan S",
    initials: "HB",
    role: "UI/UX Specialist",
    portfolio: "https://harith10069.github.io/portfolio-website/",
    classId: "dev-3",
    specialtyIcon: <Palette size={16} />
  },
  {
    name: "Sravan NN",
    initials: "SN",
    role: "Fullstack Developer",
    portfolio: "https://thesvnverse.github.io/portfolio-website/",
    classId: "dev-4",
    specialtyIcon: <Layers size={16} />
  },
  {
    name: "Muhammed Jasim Khan",
    initials: "MJ",
    role: "Accessibility Expert",
    portfolio: "https://jasimjaskerkhan-a11y.github.io/MY_PORTFOLIO/",
    classId: "dev-5",
    specialtyIcon: <Eye size={16} />
  }
];

function ContactPage() {
  return (
    <div className="contact-container">
      {/* Centered Hero Header */}
      <header className="contact-hero animate-fade-in-up">
        <span className="eyebrow">Our Team</span>
        <h1>Meet the Developers</h1>
        <p>
          Meet the core engineering and design team behind Wanderly Tours. 
          Click on any developer card to explore their full personal portfolio and previous creations.
        </p>
      </header>

      {/* Centered Developers Section */}
      <section className="developers-section">
        <div className="developers-list">
          {developers.map((dev) => (
            <div key={dev.name} className="dev-card">
              <div className="dev-avatar-wrapper">
                <div className={`dev-avatar ${dev.classId}`}>
                  {dev.initials}
                </div>
                <div className="dev-specialty-icon">
                  {dev.specialtyIcon}
                </div>
              </div>
              <div className="dev-info">
                <h3>{dev.name}</h3>
              </div>
              <a
                href={dev.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="dev-portfolio-btn"
                title={`Visit ${dev.name}'s Portfolio`}
              >
                View Portfolio <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
