const BadRequest = require("../errors/bad-request");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest("Please provide email or password");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: 120000,
  });
  res.status(201).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello ${req.user.username}`,
    secret: `your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
