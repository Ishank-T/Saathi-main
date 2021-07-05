const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  ImagePath: {
    type: String,
    unique: [true, "File path is not unique"],
    required: [true, "Path not specified"],
  },
});

const Activity = mongoose.model("activity", ActivitySchema);

module.exports = Activity;
