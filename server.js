// Loading thing we neeed
const express = require("express");
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
// Create Port
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
