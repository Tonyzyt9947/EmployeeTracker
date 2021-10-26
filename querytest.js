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
  console.log(err)
  console.table(results);
});

db.query('SELECT * FROM roles', function (err, results) {
  console.log(err)
  console.table(results);
});

db.query('SELECT * FROM employees', function (err, results) {
  console.log(err)
  console.table(results);
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

db.query('SELECT e.ID, e.first_name, e.last_name, r.title AS "Job Title", d.name AS Department, r.Salary, m.last_name AS Manager FROM departments AS d, roles AS r, employees AS e, employees AS m WHERE e.role_id=r.id AND r.department_id=d.id AND e.manager_id=m.id;', function (err, results) {
    console.log(err)
    console.table(results);
});
// AND m.first_name=e.manager_id