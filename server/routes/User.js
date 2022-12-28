const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

router.use(require("express").json());

//register user
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength((min = 7), (max = 15)),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(500).json({ error: error.array() });
      }

      const data = await User.findOne({ email });
      if (data) {
        return res.status(400).json({
          error: `User with this email already exists`,
        });
      }

      bcrypt.hash(password, 10, async (err, hashed) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        const user = await User.create({ email, password: hashed });
        res.status(200).json({
          status: "Registered successfully",
          user,
        });
      });
    } catch (e) {
      res.status(500).json({
        status: "failed",
        message: e.message,
      });
    }
  }
);

//User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email });
  if (userData != null) {
    const result = await bcrypt.compare(password, userData.password);
    if (result) {
      const token = jwt.sign(
        {
          expire: Math.floor(Date.now() / 10) + 1200,
          data: userData._id,
        },
        process.env.JWT_KEY
      );
      res.status(200).json({
        status: "signed in successfully,",
        token,
      });
    } else {
      res.status(400).json({
        status: "failed",
        error: "invalid email or password",
      });
    }
  } else {
    res.status(400).json({
      status: "failed",
      error: "User not found",
    });
  }
});

module.exports = router;
