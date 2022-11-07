const express = require("express");
const router = express.Router();
const bookController = require("../controllers/auth");
const { validateBookString } = require("../middlewares/bookAuth");

router.get("/", bookController.getAllData);

router.post("/", validateBookString, bookController.postData);

router.delete("/:id", bookController.deleteData);

router.put("/:id", validateBookString, bookController.updateData);

module.exports = router;
