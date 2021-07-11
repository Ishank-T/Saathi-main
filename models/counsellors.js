const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CounsellorSchema = new Schema({
  name: {
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

const Counsellor = mongoose.model("counsellor", CounsellorSchema);

module.exports = Counsellor;
