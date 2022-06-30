const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/books");
app.use(cors());
app.use(bodyParser.json());

app.use("/books", bookRoutes);
app.listen(4000);
