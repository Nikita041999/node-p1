const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Book = require("../models/Books");

router.get("/", (req, res) => {
  Book.getAllEmployee()
    .then((data) => res.json(data[0]))
    .catch((e) => res.json({ message: e }));
});

router.post("/", (req, res) => {
  check("title").isString();
  check("description").isLength({ min: 5 });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    // redirect Ahead
    // res.status(422).render()
  }
  const book = new Book(null, req.body.title, req.body.description);
  book
    .save()
    .then(() => {
      res.status(200);
      // .redirect("/");
    })
    .catch((e) => res.json({ message: e }));
});

router.delete("/:id", (req, res) => {
  Book.deletById(req.params.id)
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
});

router.put("/:id", (req, res) => {
  check("title").isString();
  check("description").isLength({ min: 5 });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    // redirect Ahead
    // res.status(422).render()
  }
  Book.updateById(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
});

module.exports = router;
