import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./HomePage.css";

function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            {/* 🔹 HERO SECTION */}
            <section className="hero">
                <div className="hero-content">
                    <h1>PrepWise AI</h1>
                    <p>
                        AI-powered interview preparation platform with resume analysis,
                        coding tests, and HR evaluation.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="btn-primary"
                            onClick={() => navigate("/coding")}
                        >
                            Start Coding Practice
                        </button>

                        <button
                            className="btn-secondary"
                            onClick={() => navigate("/resume")}
                        >
                            Analyze Resume
                        </button>
                    </div>
                </div>
            </section>

            {/* 🔥 FEATURES / SERVICES */}
            <section className="services">
                <h2>Our Features</h2>

                <div className="card-container">
                    {/* Resume */}
                    <div className="card">
                        <h3>Resume Analyzer</h3>
                        <p>Analyze resume with AI and get ATS score</p>
                        <button onClick={() => navigate("/resume")}>
                            Try Now
                        </button>
                    </div>

                    {/* Coding */}
                    <div className="card coding-card">
                        <h3>💻 Coding Practice</h3>

                        <p>
                            Solve real interview questions from Easy to Hard level with test cases.
                        </p>



                        <button onClick={() => navigate("/coding")}>
                            Explore Problems →
                        </button>
                    </div>

                    {/* HR */}
                    <div className="card">
                        <h3>HR Interview</h3>
                        <p>Improve communication and confidence</p>
                        <button onClick={() => navigate("/hr")}>
                            Practice HR
                        </button>
                    </div>
                </div>
            </section>

            {/* 🔹 ABOUT */}
            <section className="about">
                <h2>About PrepWise AI</h2>
                <p>
                    PrepWise AI helps students prepare for interviews using intelligent
                    evaluation systems. It analyzes resume quality, coding skills, and
                    communication ability to provide a complete readiness score.
                </p>
            </section>

            {/* 🔹 CONTACT */}
            <section className="contact">
                <h2>Contact</h2>
                <p>Email: your@email.com</p>
            </section>
        </>
    );
}

export default HomePage;