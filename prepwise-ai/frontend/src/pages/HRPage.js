import { useNavigate  } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./HRPage.css";
function HRPage() {
    const navigate = useNavigate ();
    const listOfInterviews = ["Mern Stack Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Machine Learning Engineer"];
    return (
        <>
            <Navbar />
            <div className="hr-container">
                <div className="heading-container">
                    <p>Prepare for interviews with confidence!</p>
                    <p>Practice answering common HR questions and get feedback on your responses.</p>
                </div>
                <div className="interviews-container">
                    <p>List of Available Interview Based on profiles</p>
                   <div className="interview-card-container">
                       {listOfInterviews.map((interview, index) => (
                           <div key={index} className="interview-card">
                               <p>{interview}</p>
                               <button className="start-interview-btn" onClick={() => navigate("/interview", {
                                state: { profile: interview }
                               })}>
                                   Start Interview
                               </button>
                           </div>
                       ))}
                   </div>
                </div>

            </div>
        </>
    )
}
export default HRPage;