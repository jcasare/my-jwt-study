const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const UnauthenticatedError = require("../errors/unauthenticated");
require("dotenv").config();
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("not authorized for this service", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedMsg = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decodedMsg;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("not authorized for this service", 401);
  }
};

module.exports = authMiddleware;
