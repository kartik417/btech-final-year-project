import { useNavigate } from "react-router-dom";

import {
  FaCode,
  FaServer,
  FaLaptopCode,
  FaRobot,
  FaChartBar,
  FaJava
} from "react-icons/fa";

import "./CareerSelection.css";

function CareerSelection() {

  const navigate = useNavigate();

  const careers = [

    {
      title: "Frontend Developer",
      icon: <FaLaptopCode />,
      skills: ["HTML", "CSS", "JavaScript", "React"],
      level: "Beginner Friendly"
    },

    {
      title: "Backend Developer",
      icon: <FaServer />,
      skills: ["Node.js", "Express", "MongoDB"],
      level: "Intermediate"
    },

    {
      title: "MERN Stack Developer",
      icon: <FaCode />,
      skills: ["MongoDB", "Express", "React", "Node"],
      level: "Most Popular"
    },

    {
      title: "AI/ML Engineer",
      icon: <FaRobot />,
      skills: ["Python", "ML", "Deep Learning"],
      level: "Advanced"
    },

    {
      title: "Data Analyst",
      icon: <FaChartBar />,
      skills: ["Excel", "SQL", "Power BI"],
      level: "Trending"
    },

    {
      title: "Java Developer",
      icon: <FaJava />,
      skills: ["Java", "Spring Boot", "DSA"],
      level: "Enterprise"
    }

  ];

  const handleSelect = (career) => {

    localStorage.setItem("career", career);

    navigate("/dashboard");

  };

  return (

    <div className="career-page">

      {/* HERO */}
      <div className="career-header">

        <span className="career-tag">
          🚀 AI Career Guidance
        </span>

        <h1>
          Choose Your Career Path
        </h1>

        <p>
          Select your dream role and get a personalized
          AI-powered preparation roadmap.
        </p>

      </div>

      {/* GRID */}
      <div className="career-grid">

        {careers.map((career, index) => (

          <div
            className="career-card"
            key={index}
            onClick={() => handleSelect(career.title)}
          >

            {/* ICON */}
            <div className="career-icon">

              {career.icon}

            </div>

            {/* TITLE */}
            <h2>{career.title}</h2>

            {/* LEVEL */}
            <span className="career-level">
              {career.level}
            </span>

            {/* SKILLS */}
            <div className="career-skills">

              {career.skills.map((skill, i) => (

                <span key={i}>
                  {skill}
                </span>

              ))}

            </div>

            {/* DESC */}
            <p>
              Start your personalized AI preparation journey
              with roadmap, coding, resume & interviews.
            </p>

            {/* BUTTON */}
            <button>
              Explore Path →
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default CareerSelection;