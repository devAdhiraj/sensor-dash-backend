const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sensorsRouter = require("./routes/Sensors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use("/api", express.urlencoded({ extended: false }));
app.use("/api", express.json());
app.use("/api/sensors", sensorsRouter);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error("----Error----\n", err);
  });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully!");
});
mongoose.connection.on("error", function (err) {
  console.error("Could not connect to mongo server!");
  console.error(err);
});
app.get("*", (req, res) => {
  res.status(404).send("<h1>Invalid Api Route</h1><p>Try out /api/sensors</p>");
});
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
