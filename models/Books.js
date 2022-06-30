const db = require("../utils/database");

module.exports = class Product {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
  static getAllEmployee() {
    return db.execute("SELECT * from products");
  }
  save() {
    return db.execute(
      "INSERT INTO products (title, description) VALUES (?, ?)",
      [this.title, this.description]
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
