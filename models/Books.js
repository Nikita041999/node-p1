const db = require("../utils/database");

module.exports = class Product {
  constructor(id, title, description, isAvailable) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isAvailable = isAvailable;
  }
  static getAllEmployee() {
    return db.execute("call node_p1.SongList()");
  }
  save() {
    return db.execute(
      "call node_p1.InsertSong(?,?,?)",
      [this.title, this.description, this.isAvailable],
      function (err, result) {
        if (err) {
          console.log("err:", err);
        } else {
          console.log("results:", result);
        }
      }
    );
  }
  static findById(id) {
    // return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
    return db.execute("call node_p1.findSongById(?)", [id]);
  }
  static deletById(id) {
    return db.execute("call node_p1.DeleteSong", [id]);
  }

  static updateById(id, fieldsToUpdate) {
    const { title, description, isAvailable } = fieldsToUpdate;
    const fieldToUpdate = Object.keys(fieldsToUpdate)[0];
    if (title) {
      db.execute("call node_p1.updateSong(?,?,?)", [id, fieldToUpdate, title]);
    } else if (description) {
      db.execute("call node_p1.updateSong(?,?,?)", [
        id,
        fieldToUpdate,
        description,
      ]);
    } else if (isAvailable) {
      db.execute("call node_p1.updateSong(?,?,?)", [
        id,
        fieldToUpdate,
        isAvailable.toString(),
      ]);
    }
    // db.query("UPDATE products SET ? WHERE id = '" + id + "'", fieldsToUpdate);
    // return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
