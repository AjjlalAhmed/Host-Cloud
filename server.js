// Loading thing we neeed
const express = require("express");
const mongoose = require("mongoose")
const env = require("dotenv").config
const ejs = require("ejs");
const postMudule = require("./Routes/postRoutes")
// Create app
const app = express();
// Create middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json())
// Impoting routes
const getRoutes = require("./Routes/getRoutes");
const postRoutes = postMudule.router;
// Routes middleware
app.use("/", getRoutes);
app.use("/api/", postRoutes);
// Connecting to DB
mongoose.connect(
  "mongodb://127.0.0.1:27017/siteName_db",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);
// Create Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
