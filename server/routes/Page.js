const router = require("express").Router();
const Blog = require("../models/Page");
const tokenValidation = require("../middlewares/JWT");
const bodyParser = require("body-parser");
const cors = require("cors");

router.use(require("express").json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//creating blog
router.post("/create", tokenValidation, cors(), async (req, res) => {
  try {
    let user = await Blog.find({ userId: req.user });
    if (user.length > 0) {
      user = await Blog.find({ userId: req.user }).updateOne(
        {},
        {
          $push: {
            blog: req.body,
          },
        }
      );
    } else {
      user = await Blog.create({
        blog: req.body,
        userId: req.user,
      });
    }
    res.status(200).json({
      status: "successful",
      result: user,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

//get all post
router.get("/allblogs", tokenValidation, async (req, res) => {
  try {
    const users = await Blog.find({ userId: req.user });
    res.status(200).json({
      users,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = router;
