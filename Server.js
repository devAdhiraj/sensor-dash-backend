const express = require("express");
const cors = require("cors")
const path = require('path');
const mongoose = require("mongoose");
const sensorsRouter = require("./routes/Sensors");
const {verifyToken} = require("./middleware/Auth");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.protocol !== "https" && req.method === "GET") {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    return next();
});

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.status(400).send({ status: 404, message: err.message }); // Bad request
  }
  next();
});
app.use(verifyToken);
app.use("/api/sensors", express.urlencoded({ extended: false }));
app.use("/api/sensors", express.json());
app.use("/api/sensors", sensorsRouter);
app.get("/jwt-cookie", (req, res) => {
  try{

    if(req.cookies.token){
      return res.status(200).json(req.cookies.token);
    }
    return res.status(200).json("")
  } catch(err) {
    return res.status(400).json({error: err.message});
  }
});

app.get("*", (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, "build", "index.html"));
  } catch(err){
    res.status(500).send("An error occured:",  err.message);
  }
});

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

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
