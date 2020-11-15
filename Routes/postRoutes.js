// Loading thing we neeed
const express = require("express");
// Create router
const router = express.Router();
// Routes
router.post("/search", (req, res) => {
  const inputValue = req.body[0];
  res.sendStatus(200);
  exports.inputValue = inputValue;
  console.log(inputValue);
});

// Exporting router
exports.router = router;
