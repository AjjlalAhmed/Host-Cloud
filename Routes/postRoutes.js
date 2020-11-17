// Loading thing we neeed
const express = require("express");
const searchModel = require("../models/search");
// Create router
const router = express.Router();
// Routes
router.post("/search", (req, res) => {
  const inputValue = req.body[0];
  res.sendStatus(200);
  exports.inputValue = inputValue;
});

router.post("/save", async (req, res) => {
  let data = req.body;
  const siteData = new searchModel({
    domainName: data.domainName,
    domainAvailability: data.domainAvailability,
  });
  let domainData = await searchModel.findOne({
    domainName: `${data.domainName}`,
  });
  if (domainData) {
    return;
  } else {
    const saveData = siteData.save((e) => {
      if (e) {
        res.send(e);
      } else {
        res.send("ok");
      }
    });
  }
});

// Exporting router
exports.router = router;
