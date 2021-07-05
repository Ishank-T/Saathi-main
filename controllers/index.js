const About = require("../models/about");
const Activity = require("../models/activities");
exports.indexView = (req, res) => res.render("landing");

exports.aboutView = async (req, res) => {
  try {
    const AboutData = await About.findOne({});
    const ActivityData = await Activity.find();
    return res.render("about", { about: AboutData, activity: ActivityData });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};
