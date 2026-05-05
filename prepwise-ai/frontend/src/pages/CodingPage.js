import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./CodingPage.css"
function CodingPage() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/code/questions")
      .then(res => setQuestions(res.data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="coding-page">
        <h1>Coding Problems</h1>

        <div className="problem-list">
          {questions.map(q => (
            <div className="problem-card" key={q.id}>

              <h3>{q.title}</h3>

              {/* 🔥 Difficulty badge */}
              <span className={`badge ${q.difficulty.toLowerCase()}`}>
                {q.difficulty}
              </span>

              <p>{q.description}</p>

              <button onClick={() => navigate(`/coding/${q.id}`)}>
                Solve →
              </button>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CodingPage;