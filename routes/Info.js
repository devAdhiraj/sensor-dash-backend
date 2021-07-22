const router = require("express").Router();
router.get("/", (req, res) => {
  try {
    const info = {
      port: process.env.PORT || 5000,
      uri: process.env.ATLAS_URI || "uri is null or undefined",
    };
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json("Error - ", err);
  }
});

module.exports = router;
