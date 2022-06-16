// Here we create user and login users.
const userModel = require("../models/user.js");
const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

const registerController = async (req, res, next) => {
  const { email, password } = req.body;
  const hash = Crypto.AES.encrypt(
    password,
    process.env.CLIENT_SECRET
  ).toString();

  const user = new userModel({
    email,
    password: hash,
  });

  try {
    const response = await user.save();
    const { password, ...info } = response._doc;
    res.status(201).json(info);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ error: "An account with this email has already been created." });
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      res.status(400).json({ error: "Incorrect Email or Password" });
      return;
    }

    const decrypt = Crypto.AES.decrypt(
      userExists.password,
      process.env.CLIENT_SECRET
    );
    const passwordInDatabase = decrypt.toString(Crypto.enc.Utf8);

    if (password === passwordInDatabase) {
      const { password, ...info } = userExists._doc;
      const token = jwt.sign(
        {
          id: info._id,
          isAdmin: info.isAdmin,
        },
        process.env.CLIENT_SECRET,
        { expiresIn: "3h" }
      );

      //same site = lax is actually the default value for same site
      //if you dont provide the value. but its done here just to be aware.
      //The secure property can be used later if it is running on https domain
      res.cookie(info._id, token, {
        httpOnly: true,
        SameSite: "Lax",
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
      });
      res.status(200).json(info);
    } else {
      res.status(400).json({ error: "Incorrect Password" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Login Failed", errLog: err });
  }
};

const authenticateUserController = async (req, res) => {
  const userId = req.user.id;
  try {
    const userInformation = await userModel.findById(userId);
    if (!userInformation)
      res.status(400).json({ error: "User is not authenticated." });
    const { password, ...info } = userInformation._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({ error: "Could not fetch user information." });
  }
};

const logoutUserController = (req, res) => {
  const cookies = req.headers.cookie;
  req.cookies[`${req.user.id}`] = "";
  res.clearCookie(`${req.user.id}`);
  return res.status(200).json({ message: "Successfully Logged Out." });
};

module.exports = {
  registerController,
  loginController,
  authenticateUserController,
  logoutUserController,
};
