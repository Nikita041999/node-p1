const Book = require("../models/Books");
var fs = require("fs");

exports.getAllData = async (req, res) => {
  try {
    const data = await Book.getAllBook();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

exports.postData = async (req, res) => {
  try {
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
    res.status(200).send({ data: req.body });
  } catch (err) {
    res.send(err);
  }
};

exports.getBookData = async (req, res) => {
  try {
    let _id = Number(req.params.id);
    const data = await Book.findById(_id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

exports.deleteData = async (req, res) => {
  try {
    let pattern = /[0-9]/;
    if (req.params.id.length < 3 && pattern.test(req.params.id)) {
      Book.deletById(req.params.id);
      res.send("Deleted");
    } else {
      message = "Please send id of type number and length < 3";
      res.send(message);
    }
  } catch (err) {
    res.send(err);
  }
};

exports.updateData = async (req, res) => {
  try {
    const data = await Book.updateById(req.params.id, req.body);
    res.status(200).send(data);
  } catch (err) {
    res.send(err);
  }
};
