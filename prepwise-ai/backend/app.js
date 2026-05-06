const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");
const app = express();
const codingRoutes = require("./routes/codingRoutes");
const evalRoutes = require("./routes/evaluationRoutes");
const hrRoutes = require("./routes/hrRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("PrepWise AI Backend Running Successfully!");
});
app.use("/api/resume", resumeRoutes);
app.use("/api/code", codingRoutes);
app.use("/api/eval", evalRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/interview", interviewRoutes);
module.exports = app;