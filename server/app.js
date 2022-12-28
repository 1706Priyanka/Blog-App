const express = require("express");
const connectToDB = require("./DB/database");
const dotenv = require("dotenv");
const userRoute = require("./routes/User");
const cors = require("cors");
//const Blog = require("./routes/Page");
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/", userRoute);
// app.use("/", Blog);

app.listen(process.env.PORT, async () => {
  try {
    await connectToDB();
    console.log("Server is up on PORT 3000");
  } catch (e) {
    console.log(e);
  }
});
