const mssql = require("mssql");
const config = {
  user: "sa",
  password: "alwaysme@123!!",
  server: "CBLLAP0756",
  options: {
    trustServerCertificate: true,
  },
  database: "node_p1",
};
// export NODE_TLS_REJECT_UNAUTHORIZED=0

module.exports = class Product {
  constructor(id, title, description, isAvailable) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isAvailable = isAvailable;
  }

  static async getAllBook() {
    const tableName = "products_table";
    try {
      await mssql.connect(config);
      const { recordset } = await mssql.query`exec sp_BookList ${tableName}`;
      console.log("1--->", recordset);
      return recordset;
    } catch (err) {
      console.log(err);
    }
  }
  async save() {
    const tableName = "products_table";
    try {
      mssql.connect(config);
      await mssql.query`exec sp_AddNewBook ${tableName} , ${this.title}, 
     ${this.description}, ${this.isAvailable}
    `;
    } catch (err) {
      console.log(err);
    }
    // return mssql.execute(
    //   "call node_p1.InsertBook(?,?,?)",
    //   [this.title, this.description, this.isAvailable],
    //   function (err, result) {
    //     if (err) {
    //       console.log("err:", err);
    //     } else {
    //       console.log("results:", result);
    //     }
    //   }
    // );
  }
  static async findById(id) {
    const tableName = "products_table";
    mssql.connect(config);
    try {
      const result = await mssql.query`exec sp_GetBookById ${id},${tableName}`;
      return result.recordset;
    } catch (err) {
      console.log("Error querying database", err);
      return err;
    }
  }
  static async deletById(id) {
    const tableName = "products_table";
    try {
      await mssql.connect(config);
      return await mssql.query`exec sp_DeleteBook ${id},${tableName}`;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateById(id, fieldsToUpdate) {
    const tableName = "products_table";
    try {
      await mssql.connect(config);
      const { title, description, isAvailable } = fieldsToUpdate;
      const fieldToUpdate = Object.keys(fieldsToUpdate);
      return await mssql.query`exec sp_UpdateBookData ${tableName},${id},
    ${fieldToUpdate[0] === undefined ? null : fieldToUpdate[0]},
    ${fieldToUpdate[1] === undefined ? null : fieldToUpdate[1]},
    ${fieldToUpdate[2] === undefined ? null : fieldToUpdate[2]},
    ${fieldToUpdate[0] === undefined ? null : title},
    ${fieldToUpdate[1] === undefined ? null : description},
    ${fieldToUpdate[2] === undefined ? null : isAvailable}`;
    } catch (err) {
      console.log(err);
    }
    // return db.execute("call node_p1.updateBook2(?,?,?,?,?,?,?)", [
    //   id,
    //   fieldToUpdate[0] === undefined ? null : fieldToUpdate[0],
    //   fieldToUpdate[1] === undefined ? null : fieldToUpdate[1],
    //   fieldToUpdate[2] === undefined ? null : fieldToUpdate[2],
    //   fieldToUpdate[0] === undefined ? null : title,
    //   fieldToUpdate[1] === undefined ? null : description,
    //   fieldToUpdate[2] === undefined ? null : isAvailable,
    // ]);
  }
};
