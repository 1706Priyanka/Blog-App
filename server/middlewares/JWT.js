const { verify } = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

const tokenValidation = (req, res, next) => {
  const tokenHeader = req.header("token");
  if (!tokenHeader) {
    return res.json("users not logged in");
  }
  try {
    verify(tokenHeader, process.env.JWT_KEY, async (err, decode) => {
      if (err) {
        return res.status(400).json({ error: "Unauthorized" });
      }
      const user = await User.findOne({ _id: decode.data });
      if (user) {
        req.user = user._id;
        next();
      } else {
        res.status(400).json({ error: "failed" });
      }
    });
  } catch (e) {
    res.status(400).json({ error: "forbidden" });
  }
};

module.exports = { tokenValidation };
