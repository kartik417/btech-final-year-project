import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./ProblemPage.css";

function ProblemPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState(null);
    const [code, setCode] = useState("");
    const [result, setResult] = useState(null);
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("dark");

    // 🔥 THEME APPLY
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    // 🔥 FETCH QUESTION
    useEffect(() => {
        axios.get("http://localhost:5000/api/code/questions")
            .then(res => {
                const q = res.data.find(x => x.id === Number(id));
                setQuestion(q);
            })
            .catch(() => {
                alert("Error loading question");
            });
    }, [id]);

    // 🔥 DEFAULT CODE TEMPLATE
    useEffect(() => {
        if (language === "javascript") {
            setCode(`function solve(a, b) {
  
}`);
        } else if (language === "python") {
            setCode(`def solve(a, b):
    pass`);
        } else if (language === "java") {
            setCode(`class Solution {
  public static int solve(int a, int b) {
    
  }
}`);
        }
    }, [language]);

    // 🔥 RUN CODE
    const runCode = async () => {
        try {
            if (language !== "javascript") {
                alert("⚠ Only JavaScript supported currently");
                return;
            }

            const res = await axios.post("http://localhost:5000/api/code/run", {
                code,
                questionId: Number(id)
            });

            setResult(res.data);
        } catch (err) {
            console.log(err);
            alert("Execution failed");
        }
    };

    if (!question) return <p style={{ padding: "20px" }}>Loading...</p>;

    return (
        <>
            <Navbar />

            <div className="problem-page">

                {/* 🔹 LEFT SIDE */}
                <div className="question-section">

                    <div style={{ marginBottom: "15px" }}>
                        <h2>{question.title}</h2>

                        <span className={`badge ${question.difficulty?.toLowerCase()}`}>
                            {question.difficulty}
                        </span>
                    </div>

                    <p>{question.description}</p>

                    <div className="action-buttons">

                        <button
                            className="back-btn"
                            onClick={() => navigate("/coding")}
                        >
                            Back to Problems
                        </button>

                        <button
                            className="theme-btn"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
                        </button>

                    </div>

                </div>

                {/* 🔹 RIGHT SIDE */}
                <div className="editor-section">

                    {/* 🔥 HEADER (TOP FIXED) */}
                    <div className="editor-header">

                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                        </select>

                        <button className="run-btn" onClick={runCode}>
                            Run Code
                        </button>

                    </div>

                    {/* 🔥 EDITOR */}
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    {/* 🔥 RESULT */}
                    {result && (
                        <div className="result-box">

                            <h3>Score: {result.score}%</h3>

                            {result.results?.map((r, i) => (
                                <div key={i} className="test-case">

                                    <p><b>Input:</b> {JSON.stringify(r.input)}</p>
                                    <p><b>Output:</b> {r.output}</p>
                                    <p><b>Expected:</b> {r.expected}</p>

                                    <p className={r.isCorrect ? "pass" : "fail"}>
                                        {r.isCorrect ? "✅ Passed" : "❌ Failed"}
                                    </p>

                                </div>
                            ))}

                        </div>
                    )}
                </div>

            </div>
        </>
    );
}

export default ProblemPage;