const SensorsData = require("../models/Sensors.model");
const jwt = require("jsonwebtoken");
const { createHash } = require('crypto');

const addData = async (req, res) => {
  try{
    const key = req.headers["x-adsecretapikey"];
    if (!key || createHash('sha256').update(key).digest('hex') !== process.env.ADSECRETAPIKEY) {
      const {token} = req.body;
      try{
        jwt.verify(token, process.env.JWT_SECRET_KEY);
      }
      catch(err){
        return res.status(401).json("Unauthorized")
      }
    }
  } catch(err){
    res.status(401).json("Unauthorized.")
  }

  try{
      const { temp, humid, light } = req.body;
      if (!temp || !humid || !light) {
        return res.status(400).json("undefined fields");
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
  } catch(err){
    return res.status(400).json("Request Error");
  }
};

const delData = async (req, res) => {
  try{
    const key = req.headers["x-adsecretapikey"];
    if (!key || createHash('sha256').update(key).digest('hex') !== process.env.ADSECRETAPIKEY) {
      const {token} = req.body;
      try{
        jwt.verify(token, process.env.JWT_SECRET_KEY);
      }
      catch(err){
        return res.status(401).json("Unauthorized")
      }
    }
  } catch(err){
    res.status(401).json("Unauthorized.")
  }
  try {
    let delItems = req.body;
    if (!delItems) {
      return res.status(204).json("No items to delete");
    }
    SensorsData.deleteMany(
      {
        _id: {
          $in: delItems,
        },
      },
      (err, result) => {
        if (err) {
          res.status(400).json("Error deleting");
        } else {
          res.status(200).json("Success");
        }
      }
    );
  } catch (err) {
    res.status(400).json("Request Error");
  }
};

module.exports = { addData, delData };
