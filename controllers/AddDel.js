const SensorsData = require("../models/Sensors.model");

const addData = async (req, res) => {
  const key = req.headers["x-adsecretapikey"];
  if (!key || key != process.env.ADSECRETAPIKEY) {
    return res.status(401).send("Unauthorized");
  }
  const { temp, humid, light } = req.body;
  if (!temp || !humid || !light) {
    return res.status(400).send("undefined fields");
  }
  try {
    const SensorEntry = new SensorsData({
      temp: temp,
      humid: humid,
      light: light,
    });
    await SensorEntry.save();
    return res.status(200).json("s"); // s = success
  } catch (err) {
    return res.status(400).json("f"); // f = failed
  }
};

const delData = async (req, res) => {
  try {
    let delItems = req.body;
    if (!delItems) {
      return res.status(204).send("No items to delete");
    }
    SensorsData.deleteMany(
      {
        _id: {
          $in: delItems,
        },
      },
      (err, result) => {
        if (err) {
          res.status(400).send("Error deleting");
        } else {
          res.status(200).send("Success");
        }
      }
    );
  } catch (err) {
    res.status(400).send("Request Error");
  }
};

module.exports = { addData, delData };
