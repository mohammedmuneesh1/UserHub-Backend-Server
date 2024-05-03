const jwt = require("jsonwebtoken");
const userCollection = require("../model/User");
const bcrypt = require("bcrypt");
const STATUS = require("../constant/constant");

async function userRegister(req, res) {
  const obj = req.body;
  const data = await userCollection.findOne({ userName: obj.userName });
  if (data) {
    return res
      .status(403)
      .json({
        status: STATUS.FAILURE,
        message: "Username already taken. please choose another name"
      });
  }
  obj.password = await bcrypt.hash(obj.password, 10);
  await userCollection.create(obj);
  return res
    .status(200)
    .json({ status: STATUS.SUCCESS, message: "user registered successfully1." });
}

async function userLogin(req, res) {
  const { userName, password } = req.body;
  const userData = await userCollection.findOne({ userName }).select("-__v");
  if (!userData) {
    return res
      .status(404)
      .json({ status: STATUS.FAILURE, message: "User not found." });
  }
  const verifyUser = await bcrypt.compare(password, userData.password);
  if (!verifyUser) {
    return res
      .status(401)
      .json({ status: STATUS.FAILURE, message: "Incorrect password." });
  }
  const token = jwt.sign(
    { Id: userData._id.toString() },
    process.env.USER_KEY,
    { expiresIn: "1d" }
  );
  return res
    .status(200)
    .json({
      status: STATUS.SUCCESS,
      message: "user login successfully.",
      token
    });
}

async function viewProfile(req, res) {
  const userId = req.Id;
  const data = await userCollection
    .findOne({ _id: userId })
    .select("-__v -_id -password -updatedAt");
  return res
    .status(200)
    .json({
      status: STATUS.SUCCESS,
      message: "user profile has been fetched successfully",
      data
    });
}

async function updateProfile(req, res) {
  const userId = req.Id;
  const obj = req.body;
  if (obj.userName) {
    return res
      .status(403)
      .json({
        status: STATUS.FAILURE,
        message: "user cant update username at current moment."
      });
  }
  if (obj.password) {
    return res
      .status(403)
      .json({
        status: STATUS.FAILURE,
        message: "updation has been failed due to presence of password"
      });
  }
  await userCollection.findByIdAndUpdate({ _id: userId }, { $set: obj });
  return res
    .status(200)
    .json({
      status: STATUS.SUCCESS,
      message: "user profile has been updated successfully."
    });
}

async function userHome(req, res) {
  return res
    .status(200)
    .json({ status: STATUS.SUCCESS, message: "welcome to home" });
}

module.exports = {
  userRegister,
  userLogin,
  viewProfile,
  updateProfile,
  userHome
};
