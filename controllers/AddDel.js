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
  try {
    if (req.params.id === "last") {
      await SensorsData.findOneAndDelete(
        {},
        { sort: { updatedAt: -1 }, limit: 1 }
      );
    } else {
      await SensorsData.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted");
    }
  } catch (err) {
    res.status(400).json("error");
  }
};

module.exports = { addData, delData };
