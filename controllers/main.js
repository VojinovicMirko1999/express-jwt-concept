const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError(
      "Please provide username and password",
      StatusCodes.BAD_REQUEST
    );
  }

  // for testing, normaly it will be get form DB
  const id = new Date().getDate(); // gets the current day in month (1/ ... /27/28/30/31)

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User logged in", token });
};

const dashboard = async (req, res) => {
  const user = req.user;

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${user.username}`,
    secret: `Authorized data: ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
