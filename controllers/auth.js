const Book = require("../models/Books");
// const { check, validationResult } = require("express-validator");

exports.getAllData = (req, res) => {
  Book.getAllEmployee()
    .then((data) => res.json(data[0]))
    .catch((e) => res.json({ message: e }));
};

exports.postData = async (req, res) => {
  const { title, description, isAvailable } = req.body;
  if (Array.isArray(title)) {
    for (let i = 0; i < title.length; i++) {
      const book = new Book(null, title[i], description[i], isAvailable[i]);
      await book.save();
    }
  } else {
    const book = new Book(null, title, description, isAvailable);
    await book.save();
  }
  res.status(200).json({});
  // .redirect("/");
};

exports.deleteData = (req, res) => {
  Book.deletById(req.params.id)
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
};

exports.updateData = (req, res) => {
  Book.updateById(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
};
