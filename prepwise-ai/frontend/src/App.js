import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import CodingPage from "./pages/CodingPage";
import HRPage from "./pages/HRPage";
import ResumePage from "./pages/ResumePage";
import ResultPage from "./pages/ResultPage";
import ProblemPage from "./pages/ProblemPage";
import InterviewPage from "./pages/InterviewPage";
import CareerSelection from "./pages/CareerSelection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/hr" element={<HRPage />}></Route>
        <Route path="/coding" element={<CodingPage />}></Route>
        <Route path="/resume" element={<ResumePage />}></Route>
        <Route path="/result" element={<ResultPage />}></Route>

        <Route path="/coding/:id" element={<ProblemPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/career" element={<CareerSelection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;