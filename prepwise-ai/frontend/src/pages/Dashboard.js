import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <h1>
                    Welcome to the Dashboard
                </h1>
                <button onClick={ () => navigate("/hr")}>
                    Go to HR Evaluation Page
                </button>
            </div>
        </>
    )
}

export default Dashboard;