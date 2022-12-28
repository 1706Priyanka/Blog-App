const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", true);
const connectToDB = () => {
  return mongoose
    .connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection established to DB");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectToDB;
