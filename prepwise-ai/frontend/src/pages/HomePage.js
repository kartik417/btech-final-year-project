import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
    FaCode,
    FaRobot,
    FaFileAlt,
    FaMicrophone,
    FaArrowRight
} from "react-icons/fa";

import "./HomePage.css";

function HomePage() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            {/* HERO */}
            <section className="home-hero">

                <div className="home-hero-overlay"></div>

                <div className="home-hero-content">

                    <span className="home-hero-tag">
                         AI Powered Interview Preparation
                    </span>

                    <h1 className="home-hero-title">
                        Crack Your Dream Job with AI
                    </h1>

                    <p className="home-hero-description">

                        Personalized Roadmaps, Coding Practice,
                        Resume Analysis & Mock Interviews
                        in one AI-powered platform.

                    </p>

                    <div className="home-hero-buttons">

                        <button
                            className="home-primary-btn"
                            onClick={() => navigate("/career")}
                        >
                            Start Your Journey
                            <FaArrowRight />
                        </button>

                        <button
                            className="home-secondary-btn"
                            onClick={() => navigate("/coding")}
                        >
                            Explore Coding
                        </button>

                    </div>

                </div>

            </section>

            {/* STATS */}
            <section className="home-stats-section">

                <div className="home-stat-card">

                    <h2>500+</h2>

                    <p>Coding Problems</p>

                </div>

                <div className="home-stat-card">

                    <h2>100+</h2>

                    <p>Interview Questions</p>

                </div>

                <div className="home-stat-card">

                    <h2>AI</h2>

                    <p>Powered Evaluation</p>

                </div>

            </section>

            {/* FEATURES */}
            <section className="home-features-section">

                <h2 className="section-title">
                    Platform Features
                </h2>

                <div className="home-feature-grid">

                    {/* CARD */}
                    <div className="home-feature-card">

                        <div className="home-feature-icon-wrapper">
                            <FaFileAlt className="home-feature-icon" />
                        </div>

                        <h3>Resume Analyzer</h3>

                        <p>
                            Analyze resume with AI and improve ATS score instantly.
                        </p>

                        <button onClick={() => navigate("/resume")}>
                            Try Now
                        </button>

                    </div>

                    {/* CARD */}
                    <div className="home-feature-card">

                        <div className="home-feature-icon-wrapper">
                            <FaCode className="home-feature-icon" />
                        </div>

                        <h3>Coding Practice</h3>

                        <p>
                            Practice coding interview questions with test cases.
                        </p>

                        <button onClick={() => navigate("/coding")}>
                            Solve Problems
                        </button>

                    </div>

                    {/* CARD */}
                    <div className="home-feature-card">

                        <div className="home-feature-icon-wrapper">
                            <FaMicrophone className="home-feature-icon" />
                        </div>

                        <h3>HR Interview</h3>

                        <p>
                            Improve confidence and communication skills.
                        </p>

                        <button onClick={() => navigate("/hr")}>
                            Practice HR
                        </button>

                    </div>

                    {/* CARD */}
                    <div className="home-feature-card">

                        <div className="home-feature-icon-wrapper">
                            <FaRobot className="home-feature-icon" />
                        </div>

                        <h3>AI Career Guidance</h3>

                        <p>
                            Get personalized learning roadmaps based on career goals.
                        </p>

                        <button onClick={() => navigate("/career")}>
                            Get Started
                        </button>

                    </div>

                </div>

            </section>
            {/* ROADMAP */}
            <section className="home-roadmap-section">

                <h2 className="section-title">
                    Career Learning Roadmaps
                </h2>

                <div className="home-roadmap-grid">

                    <div className="home-roadmap-card">
                        <h3>Frontend Developer</h3>
                        <p>HTML • CSS • JavaScript • React</p>
                    </div>

                    <div className="home-roadmap-card">
                        <h3>MERN Stack</h3>
                        <p>MongoDB • Express • React • Node</p>
                    </div>

                    <div className="home-roadmap-card">
                        <h3>AI / ML Engineer</h3>
                        <p>Python • ML • Deep Learning</p>
                    </div>

                </div>

            </section>
            {/* TESTIMONIALS */}
            <section className="home-testimonial-section">

                <h2 className="section-title">
                    Student Success Stories
                </h2>

                <div className="home-testimonial-grid">

                    <div className="home-testimonial-card">

                        <p>
                            “PrepWise AI helped me improve coding
                            and crack my internship interview.”
                        </p>

                        <h4>— Rahul Sharma</h4>

                    </div>

                    <div className="home-testimonial-card">

                        <p>
                            “Resume Analyzer increased my ATS score
                            and I got shortlisted.”
                        </p>

                        <h4>— Priya Verma</h4>

                    </div>

                    <div className="home-testimonial-card">

                        <p>
                            “The roadmap feature guided me from beginner
                            to full stack developer.”
                        </p>

                        <h4>— Aman Gupta</h4>

                    </div>

                </div>

            </section>
            {/* CTA */}
            <section className="home-cta-section">

                <h2>
                    Start Your Interview Preparation Today 
                </h2>

                <p>
                    Join PrepWise AI and become interview ready.
                </p>

                <button
                    className="home-primary-btn"
                    onClick={() => navigate("/career")}
                >
                    Get Started
                </button>

            </section>
            {/* FOOTER */}
            <footer className="home-footer">

                <h2>PrepWise AI</h2>

                <p>
                    AI-powered platform for interview preparation.
                </p>

                <div className="home-footer-links">

                    <span>Home</span>
                    <span>Features</span>
                    <span>Contact</span>

                </div>

                <p className="footer-copy">
                    © 2026 PrepWise AI. All rights reserved.
                </p>

            </footer>
        </>
    );
}

export default HomePage;