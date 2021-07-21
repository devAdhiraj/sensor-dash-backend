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

try {
  console.log("about to connect");
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  console.log("done with this");
} catch (err) {
  console.log("Err:", err);
}
const connection = mongoose.connection;
console.log(connection);
connection.once("open", () => {
  console.log("MongoDB connection established successfully!");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
