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

db.query("SELECT * FROM employees JOIN roles ON employees.role_id = roles.id", function (err, results) {
    console.log(err)
    console.table(results);
});


const menu = [
    {
        type: 'list',
        name: 'menu',
        message: 'Select an action:',
        choices:['View all departments','View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
]

const addDpQ = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of this department:',
    }
]

const addRoleQ = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of this role:',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of this role:',
    },
    {
        type: 'input',
        name: 'department',
        message: 'Enter the department of this role:',
    }
]

const addEmployeeQ = [
    {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of this employee:',
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of this employee:',
    },
    {
        type: 'input',
        name: 'role',
        message: 'Enter the role of this employee:',
    },
    {
        type: 'input',
        name: 'manager',
        message: 'Enter the name of manager of employee, (Enter null if this employee has no manager)',
    }
]