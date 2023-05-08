const express = require("express");
const router = express.Router();
const bookController = require("../controllers/auth");
const { validateBookString } = require("../middlewares/bookAuth");

router.get("/", bookController.getAllData);

// router.post("/", validateBookString, bookController.postData);
router.post("/", bookController.postData);
router.get("/:id", bookController.getBookData);
router.delete("/:id", bookController.deleteData);

router.put("/:id", bookController.updateData);

module.exports = router;
