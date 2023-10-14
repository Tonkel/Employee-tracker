const router = require("express").Router();
const db = require("../../server");
const mysql = require("mysql2");

//write routes

// /api/users/view-departments
router.get("/view-departments", (req, res) => {
  db.query("SELECT * FROM departments", (err, result) => res.json(result));
});

module.exports = router;
