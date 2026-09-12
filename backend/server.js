require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const { startReminderScheduler } = require("./services/reminderScheduler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Health check
app.get("/api/health", async (req, res) => {
  res.json({
    ok: true,
    database: "MongoDB",
    service: "Agentic AI Event Management"
  });
});

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/registrations", require("./routes/registrations"));
app.use("/api/venues", require("./routes/venues"));
app.use("/api/speakers", require("./routes/speakers"));

// Error handler
app.use(errorHandler);

// Local development
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Backend running on http://localhost:${PORT}`);
      });

      startReminderScheduler();
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      process.exit(1);
    });
}

// Export Express app for Vercel
module.exports = app;