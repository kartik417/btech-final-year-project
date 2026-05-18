import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FaSearch,
  FaCode,
  FaFire,
  FaLaptopCode,
} from "react-icons/fa";

import "./CodingPage.css";

function CodingPage() {

  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const baseURL = "https://btech-final-year-project-bkak.onrender.com";
  // const baseURL = "http://localhost:5000";

  // 🔥 Fetch Questions
  useEffect(() => {

    axios
      .get(`${baseURL}/api/code/questions`)
      .then((res) => {
        setQuestions(res.data);
        setFilteredQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  // 🔥 Filters
  useEffect(() => {

    let updated = questions;

    // Search
    if (search) {
      updated = updated.filter((q) =>
        q.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Difficulty
    if (difficulty !== "All") {
      updated = updated.filter(
        (q) => q.difficulty === difficulty
      );
    }

    // Topic
    if (topic !== "All") {
      updated = updated.filter(
        (q) => q.topic === topic
      );
    }

    setFilteredQuestions(updated);

  }, [search, difficulty, topic, questions]);

  // Unique Topics
  const topics = [...new Set(questions.map((q) => q.topic))];

  return (
    <>
      <Navbar />

      <div className="coding-page">

        {/* 🔥 HERO */}
        <div className="coding-header">

          <h1>
            <FaLaptopCode /> Coding Practice
          </h1>

          <p>
            Master DSA & Interview Questions with AI-powered preparation
          </p>

        </div>

        {/* 🔥 STATS */}
        <div className="stats-box">

          <div className="stat-card">
            <FaCode className="stat-icon" />
            <h2>{questions.length}</h2>
            <p>Total Problems</p>
          </div>

          <div className="stat-card">
            <FaFire className="stat-icon easy-icon" />
            <h2>
              {
                questions.filter(
                  (q) => q.difficulty === "Easy"
                ).length
              }
            </h2>
            <p>Easy</p>
          </div>

          <div className="stat-card">
            <FaFire className="stat-icon medium-icon" />
            <h2>
              {
                questions.filter(
                  (q) => q.difficulty === "Medium"
                ).length
              }
            </h2>
            <p>Medium</p>
          </div>

          <div className="stat-card">
            <FaFire className="stat-icon hard-icon" />
            <h2>
              {
                questions.filter(
                  (q) => q.difficulty === "Hard"
                ).length
              }
            </h2>
            <p>Hard</p>
          </div>

        </div>

        {/* 🔥 FILTERS */}
        <div className="filters">

          <div className="search-box">

            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search coding questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="All">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="All">All Topics</option>

            {topics.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}

          </select>

        </div>

        {/*  LOADING */}
        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Loading Questions...</p>
          </div>
        ) : (
          <div className="problem-list">

            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (

                <div className="problem-card" key={q.id}>

                  <div className="problem-top">

                    <h3>{q.title}</h3>

                    <span
                      className={`badge ${q.difficulty.toLowerCase()}`}
                    >
                      {q.difficulty}
                    </span>

                  </div>

                  <span className="topic-badge">
                    {q.topic}
                  </span>

                  <p>{q.description}</p>

                  <button
                    onClick={() => navigate(`/coding/${q.id}`)}
                  >
                    Solve Problem →
                  </button>

                </div>

              ))
            ) : (
              <div className="no-data">

                <h2>No Questions Found 😢</h2>

                <p>
                  Try changing filters or search keywords
                </p>

              </div>
            )}

          </div>
        )}

      </div>
    </>
  );
}

export default CodingPage;