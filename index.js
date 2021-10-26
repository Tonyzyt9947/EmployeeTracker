const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to employee_db database.`)
);

db.query('SELECT * FROM departments', function (err, results) {
    console.table(results);
});

db.query('SELECT * FROM roles', function (err, results) {
    console.table(results);
});

db.query("SELECT * FROM employees WHERE role_id = '2' ", function (err, results) {
    console.log(err)
    console.table(results);
});