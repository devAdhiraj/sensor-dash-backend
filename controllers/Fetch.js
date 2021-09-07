const SensorsData = require("../models/Sensors.model");

const fetchData = async (req, res) => {
  try {
    const { select, sort, limit, skip, rangeStart, rangeEnd } = req.query;
    const query = SensorsData.find();
    if (select) {
      let temp = select.split(",");
      //   console.log(temp);
      query.select(temp);
    }
    if(rangeStart){
      try{
        let queryStart = new Date(rangeStart).toISOString()
        query.where("updatedAt").gte(queryStart)
      }
      catch(err){
        res.status(400).json("Invalid date format")
      }
    }
    if(rangeEnd){
      try{
        let queryEnd = new Date(rangeEnd).toISOString()
        query.where("updatedAt").lte(queryEnd)
      }
      catch(err){
        res.status(400).json("Invalid date format")
      }
    }
    if (sort) {
      const sliceIndex = sort.length - 1;
      let order = sort[sliceIndex] === "1" ? -1 : 1;
      let paramObj = {};
      paramObj[sort.substring(0, sliceIndex)] = order;
      query.sort(paramObj);
    }
    if (skip) {
      query.skip(Number(skip));
    }
    if (limit) {
      query.limit(Number(limit));
    }
    const data = await query.exec();
    // console.log(data);
    res.status(200).json(data || "no data");
  } catch (err) {
    console.log("Error:", err);
    res.status(400).json("Error - find query failed");
  }
};

const fetchOne = async (req, res) => {
  if (req.params.id === "last") {
    try {
      const data = await SensorsData.find()
        .sort({ updatedAt: -1 })
        .limit(1)
        .exec();
      res.status(200).json(data[0] || "no data");
    } catch (err) {
      res.status(400).json("error - .find() query failed");
    }
  } else {
    try {
      const data = await SensorsData.findById(req.params.id);
      res.status(200).json(data || "no data");
    } catch (err) {
      res.status(400).json("Error - findById failed");
    }
  }
};

module.exports = { fetchData, fetchOne };
