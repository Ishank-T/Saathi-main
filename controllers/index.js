const About = require("../models/about");
const Activity = require("../models/activities");
const Counsellor = require("../models/counsellors");
const Contact = require("../models/contact");
exports.indexView = (req, res) => res.render("landing");

exports.aboutView = async (req, res) => {
  try {
    const AboutData = await About.findOne({});
    const ActivityData = await Activity.find();
    const CounsellorData = await Counsellor.find();
    return res.render("about", {
      about: AboutData,
      activity: ActivityData,
      counsellor: CounsellorData,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

exports.ContactView = async (req, res) => {
  try {
    const newForm = new Contact(req.body);
    const form = await newForm.save();
    return res.status(200).json({ status: "Success", data: form });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};
