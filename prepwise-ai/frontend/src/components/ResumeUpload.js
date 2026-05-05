import { useState } from "react";
import axios from "axios";
import "./ResumeUpload.css";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("mern");
  const [jobDesc, setJobDesc] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseURL = "https://btech-final-year-project-bkak.onrender.com";
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

      const res = await axios.post(
        `${baseURL}/api/resume/upload`,
        formData
      );

      setData(res.data);
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

        {/* 🔹 FORM */}
        <div className="form-group">
          <label>Target Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="mern">MERN Developer</option>
            <option value="java">Java Developer</option>
            <option value="python">Python Developer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Job Description</label>
          <textarea
            placeholder="Paste job description (optional)"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>

        {/* 🔥 Better File Input */}
        <div className="form-group">
          <label className="file-upload">
            {file ? file.name : "📄 Upload Resume"}
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              hidden
            />
          </label>
        </div>

        <button
          className="analyze-btn"
          onClick={upload}
          disabled={loading}
        >
          {loading ? "⏳ Analyzing..." : "Analyze Resume"}
        </button>

        {/* 🔹 EMPTY STATE */}
        {!data && !loading && (
          <p className="hint">Upload resume to get AI insights</p>
        )}

        {/* 🔥 RESULT */}
        {data && (
          <div className="result-box">

            <div className="score-box">
              <h2>{data.score}</h2>
              <p>Score</p>
            </div>

            {data.atsScore > 0 && (
              <p className="ats">ATS Match: {data.atsScore}%</p>
            )}

            {/* Skills */}
            <div className="skills-section">
              <h4>Skills</h4>
              <div className="tags">
                {(data.foundSkills || []).map((s, i) => (
                  <span key={i} className="tag">{s}</span>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="skills-section">
              <h4>Missing Skills</h4>
              <div className="tags">
                {(data.missingSkills || []).map((s, i) => (
                  <span key={i} className="tag missing">{s}</span>
                ))}
              </div>
            </div>

            {/* Warnings */}
            {!data.hasProjects && (
              <p className="warn">⚠ Add Projects section</p>
            )}
            {!data.hasExperience && (
              <p className="warn">⚠ Add Experience section</p>
            )}

            {/* Suggestions */}
            {data.suggestions?.length > 0 && (
              <div className="suggestions">
                <h4>Suggestions</h4>
                <ul>
                  {data.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
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