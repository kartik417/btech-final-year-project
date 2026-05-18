import { roadmaps } from "../data/roadmaps";
import "./Roadmap.css";

function Roadmap() {

  const career = localStorage.getItem("career");

  const skills = roadmaps[career] || [];

  return (
    <div className="roadmap-section">

      <h2>Your Learning Roadmap </h2>

      <div className="roadmap-grid">{skills.map((skill, index) => (
          <div className="roadmap-card" key={index}>
            {skill}
          </div>
        ))}

      </div>

    </div>
  );
}

export default Roadmap;