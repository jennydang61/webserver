const Profile = require("../model/Profile");

const createNewProfile = async (req, res) => {
  const {
    // // profile_ID,
    // user_ID,
    // description,
    // rentRange,
    // cleanliness,
    // roomCapacity,
    // location,
    // noiseTolerance,
    // socialHabits,
    // sleepSchedule,
    formData,
  } = req.body;

  console.log("formData: ", formData);
  console.log("req.user_ID: ", req.user_ID);

  if (!req.user_ID || !formData.description) {
    return res.status(400).json({ message: "user_ID or description missing." });
  }

  try {
    // insert into the table
    await Profile.add(
      //   profile_ID,
      req.user_ID,
      formData.description,
      formData.rentRange,
      formData.cleanliness,
      formData.roomCapacity,
      formData.location,
      formData.noiseTolerance,
      formData.socialHabits,
      formData.sleepSchedule
    );
    res.status(201).json({ success: "Profile successfully created." });
  } catch (err) {
    console.log("profileController: ", err);
    res.status(500).json({ message: err.message });
  }
};

const getProfiles = async (req, res) => {
  try {
    // console.log("reach 3"); // devel
    const [profiles] = await Profile.fetchAll();
    const user_ID = req.user_ID;
    if (!profiles)
      return res
        .status(204)
        .json({ message: "No profiles found - profileController" });
    console.log("Profiles: ", profiles); // devel
    res.json({ profiles, user_ID });
  } catch (err) {
    console.log(err);
  }
};

const getOne = async (req, res) => {
  try {
    const [[profile]] = await Profile.fetch(req.user_ID);
    console.log("ID:", req.user_ID);
    console.log("Profile:", profile);
    res.json(profile);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createNewProfile, getProfiles, getOne };
