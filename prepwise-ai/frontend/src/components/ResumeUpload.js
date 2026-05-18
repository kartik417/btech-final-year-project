import { useState } from "react";
import axios from "axios";
import "./ResumeUpload.css";

function ResumeUpload() {

  const [file, setFile] = useState(null);

  const [role, setRole] = useState("mern");

  const [jobDesc, setJobDesc] = useState("");

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const baseURL =
    "https://btech-final-year-project-bkak.onrender.com";

  // const baseURL =
  //   "http://localhost:5000";



  const handleFileChange = (e) => {

    const selectedFile =
      e.target.files[0];

    if (!selectedFile) return;

    const allowedTypes = [

      "application/pdf",

      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (
      !allowedTypes.includes(
        selectedFile.type
      )
    ) {

      setError(
        "Only PDF and DOCX files are allowed"
      );

      return;
    }

    if (
      selectedFile.size >
      5 * 1024 * 1024
    ) {

      setError(
        "File size must be less than 5MB"
      );

      return;
    }

    setError("");

    setFile(selectedFile);
  };

  // =========================
  //  UPLOAD
  // =========================

  const upload = async () => {

    if (!file) {

      setError(
        "Please select resume first"
      );

      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    formData.append("role", role);

    formData.append("jobDesc", jobDesc);

    try {

      setLoading(true);

      setData(null);

      setError("");

      const res = await axios.post(

        `${baseURL}/api/resume/upload`,

        formData
      );

      setData(res.data);

      //  AUTO SCROLL
      setTimeout(() => {

        window.scrollTo({

          top: document.body.scrollHeight,

          behavior: "smooth"
        });

      }, 300);

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.error ||

        "Error uploading resume"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  //  SCORE COLOR
  // =========================

  const getScoreColor = () => {

    if (!data) return "#3b82f6";

    if (data.score >= 80) {
      return "#22c55e";
    }

    if (data.score >= 60) {
      return "#f59e0b";
    }

    return "#ef4444";
  };

  return (

    <div className="resume-container">

      <div className="resume-card">

        {/*  HEADER */}
        <div className="header">

          <h1>
            AI Resume Intelligence
          </h1>

          <p>
            Analyze your resume with
            AI-powered ATS insights,
            strengths, weaknesses and
            personalized recommendations.
          </p>

        </div>

        {/*  ROLE */}
        <div className="form-group">

          <label>
            Target Role
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
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

        {/*  JOB DESCRIPTION */}
        <div className="form-group">

          <label>
            Job Description
          </label>

          <textarea
            rows="5"
            placeholder="Paste job description for ATS matching..."
            value={jobDesc}
            onChange={(e) =>
              setJobDesc(e.target.value)
            }
          />

        </div>

        {/*  FILE */}
        <div className="form-group">

          <label className="file-upload">

            {
              file
                ? `📄 ${file.name}`
                : "📄 Upload Resume"
            }

            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />

          </label>

          <p className="upload-note">

            Supported:
            PDF, DOCX
            (Max 5MB)

          </p>

        </div>

        {/*  ERROR */}
        {error && (

          <div className="error-box">

            {error}

          </div>

        )}

        {/*  BUTTON */}
        <button
          className="analyze-btn"
          onClick={upload}
          disabled={loading}
        >

          {
            loading
              ? "⏳ Analyzing Resume..."
              : "Analyze Resume"
          }

        </button>

        {/*  LOADING */}
        {loading && (

          <div className="loading-box">

            <div className="loader"></div>

            <h3>
              AI is analyzing your resume...
            </h3>

            <div className="loading-steps">

              <p>
                ✓ Checking ATS compatibility
              </p>

              <p>
                ✓ Scanning technical skills
              </p>

              <p>
                ✓ Evaluating projects
              </p>

              <p>
                ✓ Generating AI insights
              </p>

            </div>

          </div>

        )}

        {/*  RESULT */}
        {data && (

          <div className="result-box">

            {/*  TOP SECTION */}
            <div className="top-grid">

              {/* SCORE */}
              <div className="score-card">

                <div className="score-circle">

                  <svg viewBox="0 0 120 120">

                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      className="bg"
                    />

                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      className="progress"
                      style={{
                        stroke:
                          getScoreColor(),

                        strokeDashoffset:
                          326 -
                          (326 * data.score) / 100
                      }}
                    />

                  </svg>

                  <div className="score-content">

                    <h2>
                      {data.score}%
                    </h2>

                    <p>
                      {data.level}
                    </p>

                  </div>

                </div>

              </div>

              {/* ATS */}
              {/* <div className="ats-card">

                <h3>
                  ATS Match Score
                </h3>

                <h2>
                  {data.atsScore}%
                </h2>

                <p>
                  Resume compatibility
                  with provided job
                  description
                </p>

              </div> */}

            </div>

            {/*  AI SUMMARY */}
            <div className="ai-summary">

              <h3>
                AI Career Summary
              </h3>

              <p>

                Your resume demonstrates
                {

                  data.score >= 80

                    ? " strong technical skills and good ATS optimization."

                    : data.score >= 60

                      ? " moderate technical strength but needs improvement in ATS optimization and resume structure."

                      : " weak resume optimization and requires major improvements in skills, projects and structure."
                }

              </p>

            </div>

            {/*  ANALYSIS */}
            <div className="analysis-grid">

              {/* STRENGTHS */}
              <div className="analysis-card">

                <h3>
                  ✅ Strengths
                </h3>

                <div className="tags">

                  {(data.foundSkills || [])
                    .map((s, i) => (

                      <span
                        key={i}
                        className="tag"
                      >

                        {s}

                      </span>

                    ))}

                </div>

              </div>

              {/* WEAKNESSES */}
              <div className="analysis-card">

                <h3>
                  ⚠ Weaknesses
                </h3>

                <div className="tags">

                  {(data.missingSkills || [])
                    .map((s, i) => (

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

            {/*SECTION ANALYSIS */}
            {data.sectionScores && (

              <div className="section-analysis">

                <h3>
                  Resume Analysis
                </h3>

                {
                  Object.entries(
                    data.sectionScores
                  ).map(([key, value]) => (

                    <div
                      key={key}
                      className="section-row"
                    >

                      <span className="section-name">

                        {key}

                      </span>

                      <div className="mini-progress">

                        <div
                          className="mini-fill"
                          style={{
                            width: `${value * 5}%`
                          }}
                        ></div>

                      </div>

                      <span>

                        {value}

                      </span>

                    </div>

                  ))
                }

              </div>

            )}

            {/*  WARNINGS */}
            {!data.hasProjects && (

              <div className="warn">

                ⚠ Add strong technical projects

              </div>

            )}

            {!data.hasExperience && (

              <div className="warn">

                ⚠ Add internship or work experience

              </div>

            )}

            {/* SUGGESTIONS */}
            {data.suggestions?.length > 0 && (

              <div className="suggestions">

                <h3>
                  AI Improvement Suggestions
                </h3>

                <ul>

                  {data.suggestions.map(
                    (s, i) => (

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