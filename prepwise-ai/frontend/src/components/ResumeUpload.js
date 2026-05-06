import { useState } from "react";
import axios from "axios";
import "./ResumeUpload.css";

function ResumeUpload() {

  const [file, setFile] = useState(null);
  const [role, setRole] = useState("mern");
  const [jobDesc, setJobDesc] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseURL =
    "https://btech-final-year-project-bkak.onrender.com";

  const upload = async () => {

    if (!file) {
      alert("Select resume first");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("role", role);
    formData.append("jobDesc", jobDesc);

    try {

      setLoading(true);
      setData(null);

      const res = await axios.post(
        `${baseURL}/api/resume/upload`,
        formData
      );

      setData(res.data);

      // 🔥 AUTO SCROLL
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });
      }, 300);

    } catch (err) {

      console.error(err);
      alert("Error uploading resume");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="resume-container">

      <div className="resume-card">

        {/* 🔥 TITLE */}
        <h2>AI Resume Analyzer</h2>

        {/* 🔹 ROLE */}
        <div className="form-group">

          <label>Target Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="mern">
              MERN Developer
            </option>

            <option value="java">
              Java Developer
            </option>

            <option value="python">
              Python Developer
            </option>

          </select>

        </div>

        {/* 🔹 JOB DESCRIPTION */}
        <div className="form-group">

          <label>Job Description</label>

          <textarea
            rows="5"
            placeholder="Paste job description (optional)"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

        </div>

        {/* 🔥 FILE */}
        <div className="form-group">

          <label className="file-upload">

            {file
              ? `📄 ${file.name}`
              : "📄 Upload Resume"}

            <input
              type="file"
              hidden
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

          </label>

        </div>

        {/* 🔥 BUTTON */}
        <button
          className="analyze-btn"
          onClick={upload}
          disabled={loading}
        >

          {loading
            ? "⏳ Analyzing..."
            : "Analyze Resume"}

        </button>

        {/* 🔥 EMPTY STATE */}
        {!data && !loading && (

          <p className="hint">

            Upload your resume and receive
            AI-powered ATS analysis,
            skill insights and personalized
            improvement suggestions.

          </p>

        )}

        {/* 🔥 LOADING UI */}
        {loading && (

          <div className="loading-box">

            <div className="loader"></div>

            <h3>
              AI is analyzing your resume...
            </h3>

            <p>
              Checking ATS score, projects,
              experience and role-based skills
            </p>

          </div>

        )}

        {/* 🔥 RESULT */}
        {data && (

          <div className="result-box">

            {/* 🔥 SUCCESS */}
            <p className="ai-message">
              AI successfully analyzed your resume
            </p>

            {/* 🔥 SCORE */}
            <div className="score-box">

              <h2>{data.score}</h2>

              <p>Resume Score</p>

              {/* 🔥 LEVEL */}
              <p className="resume-level">
                {data.level} Resume
              </p>

            </div>

            {/* 🔥 PROGRESS */}
            <div className="progress-wrapper">

              <div
                className="progress-bar"
                style={{
                  width: `${data.score}%`
                }}
              ></div>

            </div>

            {/* 🔥 ATS */}
            {data.atsScore > 0 && (

              <p className="ats">
                ATS Match: {data.atsScore}%
              </p>

            )}

            {/* 🔥 ANALYSIS GRID */}
            <div className="analysis-grid">

              {/* STRENGTHS */}
              <div className="analysis-card">

                <h4>Strengths</h4>

                <div className="tags">

                  {(data.foundSkills || []).map((s, i) => (

                    <span
                      key={i}
                      className="tag"
                    >
                      {s}
                    </span>

                  ))}

                </div>

              </div>

              {/* IMPROVEMENTS */}
              <div className="analysis-card">

                <h4>Needs Improvement</h4>

                <div className="tags">

                  {(data.missingSkills || []).map((s, i) => (

                    <span
                      key={i}
                      className="tag missing"
                    >
                      {s}
                    </span>

                  ))}

                </div>

              </div>

            </div>

            {/* 🔥 WARNINGS */}
            {!data.hasProjects && (

              <p className="warn">
                ⚠ Add Projects section
              </p>

            )}

            {!data.hasExperience && (

              <p className="warn">
                ⚠ Add Experience section
              </p>

            )}

            {/* 🔥 SUGGESTIONS */}
            {data.suggestions?.length > 0 && (

              <div className="suggestions">

                <h4>
                  AI Suggestions
                </h4>

                <ul>

                  {data.suggestions.map((s, i) => (

                    <li key={i}>
                      {s}
                    </li>

                  ))}

                </ul>

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  );
}

export default ResumeUpload;