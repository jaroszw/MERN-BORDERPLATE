const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

const URI = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "HELLO WORLD" });
});

app.use("/api", require("./routes/index"));

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is listienning on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
