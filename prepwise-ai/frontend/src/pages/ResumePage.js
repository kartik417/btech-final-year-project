import ResumeUpload from "../components/ResumeUpload";
import Navbar from "../components/Navbar";
import "./ResumePage.css";

function ResumePage() {
  return (
    <div className="resume-page">
        <Navbar/>
      <h1>Resume Analyzer</h1>
      <p>Upload your resume and get AI-based feedback</p>

      <ResumeUpload />
    </div>
  );
}

export default ResumePage;