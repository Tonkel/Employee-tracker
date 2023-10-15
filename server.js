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

app.get("/api/view-managers", (req, res) => {
  db.query("SELECT manager FROM employees", (err, result) => res.json(result));
});

app.get("/api/view-only-employees", (req, res) => {
  db.query("SELECT first_name, last_name FROM employees", (err, result) =>
    res.json(result)
  );
});

//post routes
app.post("/api/add-department", (req, res) => {
  db.query(
    `INSERT INTO departments (department) VALUE ("${req.body.department}")`,
    (err, result) =>
      res.json({
        message: "success",
        department: req.body.department,
      })
  );
});

app.post("/api/add-role", (req, res) => {
  db.query(
    `INSERT INTO roles (title, department, salary) VALUES ("${req.body.title}", "${req.body.department}", "${req.body.salary}")`,
    (err, result) =>
      res.json({
        message: "success",
        title: req.body.title,
        department: req.body.department,
        salary: req.body.salary,
      })
  );
});

app.post("/api/add-employee", (req, res) => {
  db.query(
    `INSERT INTO employees (first_name, last_name, title, department, salary, manager) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${req.body.title}", "${req.body.department}", "${req.body.salary}", "${req.body.manager}")`,
    (err, result) =>
      res.json({
        message: "success",
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        title: req.body.title,
        department: req.body.department,
        salary: req.body.salary,
        manager: req.body.manager,
      })
  );
});

//put routes
app.put("/api/update-employee-role", (req, res) => {
  db.query(
    `UPDATE employees SET title = "${req.body.role}" WHERE first_name = "${req.body.first_name}" AND last_name = "${req.body.last_name}"`,
    (err, result) => res.json({ message: "success", role: req.body.role })
  );
});

//so db can be used for queries in routes
module.exports = db;
