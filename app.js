require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/books");
// const PORT = process.env.PORT || 4000;
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
console.log("PORT----->", PORT);
app.use("/books", bookRoutes);
app.listen(PORT);
