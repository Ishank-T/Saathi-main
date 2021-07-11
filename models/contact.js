const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;
