const userModel = require("../models/user.js");
const Crypto = require("crypto-js");

const updateUserController = async (req, res) => {
  const userId = req.params.id;
  if (req.user.id === userId || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = Crypto.AES.encrypt(
        req.body.password,
        process.env.CLIENT_SECRET
      ).toString();
    }
    try {
      const response = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...info } = response._doc;
      res.status(200).json(info);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Could not update user details." });
    }
  } else {
    res
      .status(400)
      .json({ error: "You can only update your account details." });
  }
};

const findUserController = async (req, res) => {
  const searchId = req.params.id || req.user.id;
  try {
    const response = await userModel.findById(searchId);
    if (!response) res.status(400).json({ error: "User does not exist." });
    const { password, ...info } = response._doc;
    res.status(200).json(info);
  } catch (er) {
    console.log(er);
    res.status(500).json({ error: "Could not find user." });
  }
};

const deleteUserController = async (req, res) => {
  if (req.params.id === req.user.id || req.user.isAdmin)
    try {
      const response = await userModel.findByIdAndDelete(req.params.id);
      if (!response)
        res.status(400).json({
          error: "Could not delete user because user does not exist.",
        });
      res.status(200).json(response);
    } catch (er) {
      console.log(er);
      res.status(500).json({ error: "Could not delete user." });
    }
  else {
    res.status(400).json({ error: "You can only delete your account." });
  }
};

//pagination and return new
const findAllUsersController = async (req, res) => {
  const query = req.query.new;
  const skipRecords = req.query.results || 0;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await userModel.find().sort({ _id: -1 }).limit(5)
        : await userModel.find({}, "-password").skip(skipRecords).limit(5);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only admin can view all users!");
  }
};

const getUserStatsControleer = async (req, res) => {
  console.log("ENTERED");
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  updateUserController,
  findUserController,
  deleteUserController,
  findAllUsersController,
  getUserStatsControleer,
};
