const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
  blog: [
    {
      Image: { type: String, required: true },
      Title: { type: String, required: true },
      Description: { type: String, required: true },
    },
  ],

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Blog = mongoose.model("blog", pageSchema);

module.exports = Blog;
