const db = require("../utils/database");

module.exports = class Product {
  constructor(id, title, description, isAvailable) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isAvailable = isAvailable;
  }
  static getAllEmployee() {
    return db.execute("SELECT * from products");
  }
  save() {
    return db.execute(
      "INSERT INTO products (title, description, isAvailable) VALUES (?, ?,?)",
      [this.title, this.description, this.isAvailable]
    );
  }
  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
  static deletById(id) {
    return db.execute("DELETE FROM products WHERE products.id = ?", [id]);
  }

  static updateById(id, fieldsToUpdate) {
    db.query("UPDATE products SET ? WHERE id = '" + id + "'", fieldsToUpdate);
  }
};
