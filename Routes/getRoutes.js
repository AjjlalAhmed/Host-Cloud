// Loading thing we neeed
const express = require("express");
const puppeteer = require("puppeteer");
const postMudule = require("../Routes/postRoutes");
const mongoose = require("mongoose");
const searchModel = require("../models/search");

// Create router
const router = express.Router();
// Get Request
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/service", (req, res) => {
  res.render("service");
});
router.get("/contact", (req, res) => {
  res.render("contact");
});
// Search Request
router.get("/search", async (req, res) => {
  const inputValue = postMudule.inputValue;
  const domain = await searchModel.findOne({ domainName: `${inputValue}` });
  if (domain) {
    res.send(domain);
  } else {
    const browser = await puppeteer.launch({
      'args' : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const browserWSEndpoint = browser.wsEndpoint();
    (async () => {
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        if (
          req.resourceType() == "stylesheet" ||
          req.resourceType() == "font" ||
          req.resourceType() == "image"
        ) {
          req.abort();
        } else {
          req.continue();
        }
      });
      let httpReq = await page.goto(`http://${inputValue}`);
      await browser.close();
      res.send({
        domainName: `${inputValue}`,
        domainAvailability: "not available",
      });
    })()
      .then()
      .catch(async (e) => {
        try {
          if (
            e.message ==
            `net::ERR_INTERNET_DISCONNECTED at http://${inputValue}`
          ) {
            res.send({
              domainName: `check your connection`,
              domainAvailability: "error",
            });
            await browser.close();
          } else if (
            e.message == `net::ERR_NAME_NOT_RESOLVED at http://${inputValue}`
          ) {
            const browser2 = await puppeteer.connect({ browserWSEndpoint });
            const page = await browser.newPage();
            let httpReqs = await page.goto(`https://${inputValue}`);
            res.send({
              domainName: `${inputValue}`,
              domainAvailability: "not available",
            });
            await browser2.close();
          } else if (
            e.message == `net::ERR_CONNECTION_TIMED_OUT at http://${inputValue}`
          ) {
            await browser.close();
            res.send({
              domainName: `check your connection`,
              domainAvailability: "error",
            });
          }
        } catch (e) {
          const browser2 = await puppeteer.connect({ browserWSEndpoint });
          await browser2.close();
          res.send({
            domainName: `${inputValue}`,
            domainAvailability: "available",
          });
        }
      });
  }
});

// Exporting router
module.exports = router;
