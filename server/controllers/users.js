const userModel = require("../models/user.js");
const Crypto = require("crypto-js");
const { default: mongoose } = require("mongoose");
const movieModel = require("../models/movie");
const { response } = require("express");

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

const findIfUserIsSignedUp = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({
      error: "Please provide your email.",
    });
  try {
    const response = await userModel.find({ email });
    console.log(response);
    if (response.length === 1)
      return res.status(400).json({ error: "User already exists." });
    else res.status(200).json({ message: "Success" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Oppse! Somthing went wrong. Please try again later." });
  }
};

const getUsersMyList = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userModel.findById(id);
    const myList = await Promise.all(
      response.myList.map(async (movieId) => {
        try {
          const movie = await movieModel.findById(movieId);
          return movie;
        } catch (err) {
          res
            .status(400)
            .json({ error: "Could not fetch details for the movie.", err });
        }
      })
    );
    res.status(200).json(myList);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not find the user.", err });
  }
};

const addToMyList = async (req, res) => {
  const { id } = req.params;
  const { movieId } = req.body;
  if (!movieId && typeof movieId !== "string")
    return res.status(400).json({
      error:
        "Either the movie id was not sent to us or the movie id was in the incorrect format.",
    });
  try {
    const user = await userModel.findById(id);
    if (!user)
      return res.status(400).json({ error: "This user has not signed up." });
    const movieExists = await movieModel.findById(movieId);
    if (!movieExists)
      return res.status(400).json({
        error: "The movie you are trying to add to your list does not exist.",
      });
    if (user.myList.includes(movieId)) {
      return res
        .status(400)
        .json({ error: "The movie already exists in your list." });
    }
    if (user.myList.length < 5) {
      const addToMyList = await user.myList.push(movieId);
      if (!addToMyList) {
        return res.status(400).json({
          error: "Oppse! an error occured while adding the movie to your list",
        });
      }
      user.save();
      res
        .status(200)
        .json({ message: "Movie successfully added to your list" });
    } else {
      return res.status(400).json({
        error:
          "You can only save 4 movies to your list. Remove some to add more.",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Oppse! an error occured while adding the movie to your list",
      err,
    });
  }
};

const removeMovieFromMyList = async (req, res) => {
  const { id } = req.params;
  const { movieId } = req.body;
  if (!movieId)
    return res.status(400).json({ error: "The movie id must be provideed" });
  try {
    const response = await userModel.findByIdAndUpdate(
      id,
      {
        $pull: { myList: movieId },
      },
      { new: true }
    );
    res.status(200).json({ message: "Successfully Removed.", response });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Could not remove the Movie from the list.", err });
  }
};

module.exports = {
  removeMovieFromMyList,
  addToMyList,
  updateUserController,
  findUserController,
  deleteUserController,
  findAllUsersController,
  getUserStatsControleer,
  findIfUserIsSignedUp,
  getUsersMyList,
};
