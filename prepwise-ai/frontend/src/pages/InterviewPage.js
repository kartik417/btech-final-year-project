import { useLocation } from "react-router-dom";
import { useState } from "react";

import Timer from "../components/interview/Timer";
import WebcamPreview from "../components/interview/WebcamPreview";
import VoiceRecorder from "../components/interview/VoiceRecorder";
import ConfidenceMeter from "../components/interview/ConfidenceMeter";

import "./InterviewPage.css";

function InterviewPage() {

    const location = useLocation();

    const profile = location.state?.profile;
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [scores, setScores] = useState([]);
    const questions = [
        "Tell me about yourself",
        "Explain React lifecycle",
        "What is JWT authentication?",
        "Difference between SQL and MongoDB",
        "Explain event loop in JavaScript"
    ];

    return (

        <div className="interview-page">

            {/* LEFT SIDE */}
            <div className="left-panel">

                <h2>{profile}</h2>

                <Timer />

                <WebcamPreview />

                <ConfidenceMeter confidence={78} />

            </div>

            {/* RIGHT SIDE */}
            <div className="right-panel">

                <div className="question-card">

                    <p>Question 1</p>

                    <h3>
                        {questions[currentQuestion]}
                    </h3>

                </div>

                <VoiceRecorder />

            </div>

        </div>
    );
}

export default InterviewPage;