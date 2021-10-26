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

function showMenu(){
    inquirer.prompt(menu)
    .then((answers)=>{
        switch(answers.menu){
            case 'View all departments':
                viewDp();
                break; 
            case 'View all roles':
                viewRole();
                break; 
            case 'View all employees':
                viewEmployee();
                break;
            case 'Add a department':
                break;
            case 'Add a role':
                break;
            case 'Add an employee':
                break;
            case 'Update an employee role':
                break;
        }
    })
}

function viewDp(){
    db.query('SELECT ID, Name FROM departments', function (err, results) {
        console.table(results);
    });
}

function viewRole(){
    db.query('Select r.ID, r.title AS "Job Title", r.Salary, d.name AS Department FROM roles AS r, departments AS d WHERE r.department_id=d.id;', function (err, results) {
        console.table(results);
    });
}

function viewEmployee(){
    db.query('SELECT e.ID, e.first_name, e.last_name, r.title AS "Job Title", d.name AS Department, r.Salary, m.last_name AS Manager FROM departments AS d, roles AS r, employees AS e, employees AS m WHERE e.role_id=r.id AND r.department_id=d.id AND e.manager_id=m.id;', function (err, results) {
        console.table(results);
    });
}

function addDp(dpName){
    
}