const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// app.use("/add-product", (req, res, next) => {
//   console.log("In 1st middleware");
//   res.send("<h1>Hello from add-product!!!</h1>");
// });
// app.use("/", (req, res, next) => {
//   console.log("In 2st middleware");
//   res.send("<h1>Hello from express!!!</h1>");
// });

const bookRoutes = require("./routes/books");
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/books", bookRoutes);
app.listen(4000);
