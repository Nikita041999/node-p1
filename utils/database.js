const mssql = require("mssql");
// const mysql = require("mysql2");
const config = {
  user: "sa",
  password: "alwaysme@123!!",
  server: "CBLLAP0756",
  database: "colorx-cloud-db",
  // database: "node_p1",
  driver: "msnodesqlv8",
  options: {
    trustedConnections: true,
  },
};

// async () => {
//   try {
//     // make sure that any items are correctly URL encoded in the connection string
//     await mssql.connect(
//       "Server=CBLLAP0756,1433;Database=node_p1;user=sa;password=alwaysme@123!!"
//     );
//     const result = await mssql.query`select * from mytable where id = ${value}`;
//     console.dir(result);
//   } catch (err) {
//     console.log("--->", err);
//     // ... error checks
//   }
// };

// mssql.connect(config, async () => {
//   try {

//     await mssql.connect(config);
//   } catch (err) {
//     console.log("--->", err);
//   }
// });

// const pool = mssql.connect(config, async () => {
//   try {
//     console.log(1);
//     await mssql.connect(config);
//     const result = await mssql.query`select * from mytable`;
//     console.dir(result);
//   } catch (err) {
//     console.log("--->", err);
//   }
// });

const pool = () => {
  return mssql.connect(config);
};

module.exports = pool();
// module.exports = pool.mssql;
