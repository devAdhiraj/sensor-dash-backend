const SensorsData = require("../models/Sensors.model");

const addData = async (req, res) => {
  const data = req.body;
  try {
    const SensorEntry = new SensorsData({
      temp: data.temp,
      humid: data.humid,
      light: data.light,
    });
    await SensorEntry.save();
    res.status(200).json("s"); // s = success
  } catch (err) {
    res.status(400).json("f"); // f = failed
  }
};

const delData = async (req, res) => {
  if (req.params.id === "last") {
    try {
      await SensorsData.findOneAndDelete(
        {},
        { sort: { updatedAt: -1 }, limit: 1 }
      );
    } catch (err) {
      res.status(400).json("Error - findOneAndDelete failed.\n", err);
      console.log(err);
    }
  } else {
    try {
      await SensorsData.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted");
    } catch (err) {
      console.log(err);
      res.status(400).json("Error - findByIdAndDelete failed.\n");
    }
  }
};

module.exports = { addData, delData };
