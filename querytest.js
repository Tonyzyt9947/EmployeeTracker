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

// db.query('SELECT * FROM departments', function (err, results) {
//   console.log(err)
//   console.table(results);
// });

// db.query('SELECT * FROM roles', function (err, results) {
//   console.log(err)
//   console.table(results);
// });

db.query('SELECT * FROM employees', function (err, results) {
  console.log(err)
  console.log(results);
});

// db.query('SELECT department_id FROM roles', function (err, results) {
//     console.log(err)
//     console.table(results);
// });

// db.query('SELECT id FROM departments', function (err, results) {
//   console.log('ga')
//   console.log(err)
//   console.table(results);
// });

// db.query('Select r.ID, r.title AS "Job Title", r.Salary, d.name AS Department FROM roles AS r, departments AS d WHERE r.department_id=d.id;', function (err, results) {
//   console.log(err)
//   console.table(results);
// });

// db.query('SELECT * FROM departments', function (err, results) {
//   console.log('ga')
//   console.log(err)
//   console.table(results);
// });
// db.query('SELECT * FROM roles', function (err, results) {
//     console.table(results);
// });

// db.query('SELECT e.ID, e.first_name, e.last_name, r.title AS "Job Title", d.name AS Department, r.Salary, m.last_name AS Manager FROM departments AS d, roles AS r, employees AS e, employees AS m WHERE e.role_id=r.id AND r.department_id=d.id AND e.manager_id=m.id;', function (err, results) {
//     console.log(err)
//     console.table(results);
// });

// db.query('INSERT INTO departments SET ?', {name: "Mathematics"}, function (err, results) {
    
// });

// db.query('SELECT * FROM departments', function (err, results) {
//   console.log(err)
//   console.table(results);
// });

// db.query('DELETE FROM departments WHERE name="Mathematics"', function (err, results) {
  
// });

// db.query('SELECT ID FROM departments WHERE name="Physics"', function (err, results) {
//   let id = results[0].ID;
//   db.query('INSERT INTO roles SET ?', {title: "Cook", salary: 10, department_id: id}, function (err, results) {
//     db.query('SELECT * FROM roles', function (err, results) {
//       console.log(err)
//       console.table(results);
//     });

//   });

// });

// // console.log(id)


// db.query('DELETE FROM roles WHERE title="cook"', function (err, results) {
  
// });

// db.query('SELECT * FROM roles', function (err, results) {
//   console.log(err)
//   console.table(results);
// });