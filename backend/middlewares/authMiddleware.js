const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("token", token);
      //decodes token id
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const decoded = jwt.verify(token, "nigam1234");
      console.log("decoded", decoded);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;
