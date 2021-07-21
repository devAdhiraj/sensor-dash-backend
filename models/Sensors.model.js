const { Schema, model } = require("mongoose");
const sensorsSchema = new Schema(
  {
    temp: Number,
    humid: Number,
    light: Number,
  },
  {
    timestamps: true,
    // autoindex: false,
  }
);
// sensorsSchema.index({ updatedAt: -1 });
const Sensors = model("Sensors", sensorsSchema);
module.exports = Sensors;
