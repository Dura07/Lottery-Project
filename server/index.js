require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");

const app = express();
// Render usually uses port 10000, but it's good to keep this flexible
const PORT = process.env.PORT || 10000;

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. API Routes (Check these BEFORE static files)
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

// 3. Serve frontend static files
// This assumes your HTML/CSS/JS are in a folder named 'public' in the root
app.use(express.static(path.join(__dirname, "../public")));

// 4. Catch-all to frontend
// This ensures that if a user refreshes the page on a sub-route, they get index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 PM Lotto Server is Live!`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`📂 Static Folder: ${path.join(__dirname, "../public")}`);
  console.log(`=================================`);
});