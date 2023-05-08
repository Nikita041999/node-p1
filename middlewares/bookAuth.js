const Book = require("../models/Books");

exports.validateBookString = async (req, res, next) => {
  let isValid = true;
  let message = "";
  const isAvType = ["string", "number", "boolean"];
  let newBody = {};
  Object.keys(req.body).map((key) => {
    if (
      key.toLocaleLowerCase() !== "title" &&
      key.toLocaleLowerCase() !== "description" &&
      key.toLocaleLowerCase() !== "isavailable"
    ) {
      res.status(401).json({ message: "Invalid Fields" });
    }
    newBody[key.toLowerCase()] = req.body[key];
  });

  const { title, description, isavailable } = newBody;
  if (
    Array.isArray(title) === true ||
    Array.isArray(description) === true ||
    Array.isArray(isavailable) === true
  ) {
    const len = title.length;
    if (description.length !== len || isavailable.length !== len) {
      isValid = false;
      message = "Number and type of items should be same.";
    }
  } 
  else if (typeof title !== "string") {
    isValid = false;
    message = "Title is not in String format";
  } else if (typeof description !== "string") {
    isValid = false;
    message = "Description is not in String format";
  } else if (!title.length || !description.length) {
    isValid = false;
    message = "Fields cannot be empty";
  } else if (!isAvType.includes(typeof isavailable)) {
    isValid = false;
    message = "isavailable1 Should be either 1/0/yes/no/ture/false";
  } else if (typeof isavailable === "number") {
    if (isavailable != 1 && isavailable != 0) {
      isValid = false;
      message = "isavailable2 Should be either 1/0/yes/no/ture/false";
    }
  } else if (typeof isavailable === "string") {
    if (
      isavailable.toLowerCase() !== "yes" &&
      isavailable.toLowerCase() !== "no"
    ) {
      isValid = false;
      message = "isavailable3 Should be either 1/0/yes/no/ture/false";
    }
  }

  if (!isValid) {
    res.status(401).json({ message });
  } else {
    req.body = {
      title,
      description,
      isAvailable: isavailable,
    };
  }
  next();
};



// if (description.length !== len || isavailable.length !== len) {
//   isValid = false;
//   message = "Number and type of items should be same.";
// }
// } else if (typeof title !== "string") {
// isValid = false;
// message = "Title is not in String format";
// } else if (typeof description !== "string") {
// isValid = false;
// message = "Description is not in String format";
// } else if (!title.length || !description.length) {
// isValid = false;
// message = "Fields cannot be empty";
// } else if (!isAvType.includes(typeof isavailable)) {
// isValid = false;
// message = "isavailable1 Should be either 1/0/yes/no/ture/false";
// } else if (typeof isavailable === "number") {
// if (isavailable != 1 && isavailable != 0) {
//   isValid = false;
//   message = "isavailable2 Should be either 1/0/yes/no/ture/false";
// }
// } else if (typeof isavailable === "string") {
// if (
//   isavailable.toLowerCase() !== "yes" &&
//   isavailable.toLowerCase() !== "no"
// ) {
//   isValid = false;
//   message = "isavailable3 Should be either 1/0/yes/no/ture/false";
// }
// }
