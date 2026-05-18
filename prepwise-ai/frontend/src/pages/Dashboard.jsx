import Navbar from "../components/Navbar";
import Roadmap from "../components/Roadmap";
import { useNavigate } from "react-router-dom";

import {
  FaBookOpen,
  FaCode,
  FaFileAlt,
  FaMicrophone,
  FaChartLine
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {

  const career = localStorage.getItem("career");
const navigate = useNavigate();
 const dashboardCards = [

  {
    icon: <FaBookOpen />,
    title: "Learning Roadmap",
    desc: "Track your complete AI learning journey.",
    // path: "/roadmap"
  },

  {
    icon: <FaCode />,
    title: "Coding Practice",
    desc: "Solve real interview coding questions.",
    path: "/coding"
  },

  {
    icon: <FaFileAlt />,
    title: "Resume Analyzer",
    desc: "Improve ATS score with AI suggestions.",
    path: "/resume"
  },

  {
    icon: <FaMicrophone />,
    title: "HR Interview",
    desc: "Practice HR and communication rounds.",
    path: "/hr"
  }

];

  return (
    <>

      <Navbar />

      <div className="dashboard-page">

        {/* HERO */}
        <div className="dashboard-hero">

          <div className="dashboard-left">

            <span className="dashboard-tag">
               Personalized Dashboard
            </span>

            <h1>
              Welcome Back
            </h1>

            <h2>
              {career}
            </h2>

            <p>
              Continue your AI-powered preparation journey
              and improve your interview readiness.
            </p>

          </div>

          {/* PROGRESS CARD */}
          <div className="dashboard-progress-card">

            <div className="progress-top">

              <h3>Overall Progress</h3>

              <span>65%</span>

            </div>

            <div className="progress-bar">

              <div className="progress-fill"></div>

            </div>

            <div className="progress-stats">

              <div>
                <h4>25+</h4>
                <p>Problems Solved</p>
              </div>

              <div>
                <h4>8</h4>
                <p>Skills Completed</p>
              </div>

            </div>

          </div>

        </div>

        {/* GRID */}
        <div className="dashboard-grid">

          {dashboardCards.map((card, index) => (

            <div className="dashboard-card" key={index}>

              <div className="dashboard-icon">

                {card.icon}

              </div>

              <h3>{card.title}</h3>

              <p>{card.desc}</p>

            <button onClick={() => navigate(card.path)}>
  Explore →
</button>
            </div>

          ))}

        </div>

        {/* STATS */}
        <div className="dashboard-stats">

          <div className="dashboard-stat-card">

            <FaChartLine />

            <h3>120+</h3>

            <p>Interview Questions</p>

          </div>

          <div className="dashboard-stat-card">

            <FaCode />

            <h3>500+</h3>

            <p>Coding Problems</p>

          </div>

          <div className="dashboard-stat-card">

            <FaBookOpen />

            <h3>15+</h3>

            <p>Learning Modules</p>

          </div>

        </div>

        {/* ROADMAP */}
        <Roadmap />

      </div>

    </>
  );
}

export default Dashboard;