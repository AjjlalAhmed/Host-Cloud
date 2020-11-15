// Loading thing we neeed
const express = require("express");
const puppeteer = require("puppeteer");
const postMudule = require("../Routes/postRoutes");

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
router.get("/search", (req, res) => {
  const inputValue = postMudule.inputValue;
  console.log(inputValue);
  (async () => {
    const browser = await puppeteer.launch();
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
    try {
      let httpPage = await page.goto(`http://${inputValue}`);
      await page.close();
      if (typeof httpPage == "object") {
        res.send({
          domainName: `${inputValue}`,
          domainavailability: "not available",
        });
      }
    } catch (e) {
      if (
        e.message == `net::ERR_INTERNET_DISCONNECTED at http://${inputValue}`
      ) {
        res.send({
          domainName: `check inernet connection`,
          domainavailability: "error",
        });
        await browser.close();
      } else if (
        e.message == `net::ERR_NAME_NOT_RESOLVED at http://${inputValue}`
      ) {
        res.send({
          domainName: `${inputValue}`,
          domainavailability: "available",
        });
        await browser.close();
      } else if (
        e.message == `net::ERR_CONNECTION_TIMED_OUT at https://${inputValue}`
      ) {
        await browser.close();
      }
    } finally {
      const page = await browser.newPage();
      setTimeout( async () => {
        await browser.close();
      },6000)
      let httpsPage = await page.goto(`https://${inputValue}`);
      if (typeof httpsPage == "object") {
      } else {
        res.send({
          domainName: `${inputValue}`,
          domainavailability: "available",
        });
      }
    }
  })();
});

// Exporting router
module.exports = router;
