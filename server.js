const express = require("express");
// const routes = require("./routes");
// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(routes);

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL Username
    user: "root",
    // TODO: Add MySQL Password
    password: "bash",
    database: "business_db",
  },
  console.log(`Connected to the business_db database.`)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//routes here because when I try to run the request through routers it gives me an error saying "db.query is not a function", why?
app.get("/api/view-departments", (req, res) => {
  db.query("SELECT * FROM departments", (err, result) => res.json(result));
});

app.get("/api/view-roles", (req, res) => {
  db.query("SELECT * FROM roles", (err, result) => res.json(result));
});

app.get("/api/view-employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => res.json(result));
});

// app.get("/view-tables", (req, res) => {
//   const query = "SHOW TABLES";

//   db.query(query, (err, response) => {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.json(response);
//     }
//   });
// });

//so db can be used for queries in routes
module.exports = db;
