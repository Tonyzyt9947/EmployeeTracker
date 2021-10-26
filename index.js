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

const returnMenu = [
    {
        type: 'input',
        name: 'menu',
        message: 'Enter "return" to return to menu',
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
        message: 'Enter the last name of the manager of this employee:',
    }
]

const updateEmployeeQ = [
    {
        type: 'list',
        name: 'name',
        message: 'Select an employee to update their information:',
        choices: function(){
            const choiceArr = []
            db.query(`SELECT * FROM employees`, function (err, results) {
                results.forEach(employee=>{choiceArr.push(employee.first_name+" "+employee.last_name)})
            })
            return choiceArr
        }
    },
    {
        type: 'input',
        name: 'role',
        message: 'Enter the new role of this employee:',
    },
    {
        type: 'input',
        name: 'manager',
        message: 'Enter the last name of the new manager of this employee:',
    }
]

function promptMenu(){
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
                promptDp();
                break;
            case 'Add a role':
                promptRole();
                break;
            case 'Add an employee':
                promptEmployee();
                break;
            case 'Update an employee role':
                updateEmployee();
                break;
        }
    })
}

function backtoMenu(){
    inquirer.prompt(returnMenu)
    .then((answers)=>{
        if (answers.name="return"){
            promptMenu()
        }
        // check if else is needed
    })
}

function viewDp(){
    db.query('SELECT ID, Name FROM departments', function (err, results) {
        console.table(results);
    });
    backtoMenu()
}

function viewRole(){
    db.query('Select r.ID, r.title AS "Job Title", r.Salary, d.name AS Department FROM roles AS r, departments AS d WHERE r.department_id=d.id;', function (err, results) {
        console.table(results);
    });
    backtoMenu()
}

function viewEmployee(){
    db.query('SELECT e.ID, e.first_name, e.last_name, r.title AS "Job Title", d.name AS Department, r.Salary, m.last_name AS Manager FROM departments AS d, roles AS r, employees AS e, employees AS m WHERE e.role_id=r.id AND r.department_id=d.id AND e.manager_id=m.id;', function (err, results) {
        console.table(results);
    });
    backtoMenu()
}

function promptDp(){
    inquirer.prompt(addDpQ)
    .then((answers)=>{
        db.query('INSERT INTO departments SET ?', {name: answers.name}, function (err, results) {
            viewDp()
            console.log(`Department "${answers.name}" added`)
        });
    })
    .then(()=>{backtoMenu()})
}

function promptRole(){
    inquirer.prompt(addRoleQ)
    .then((answers)=>{
        db.query(`SELECT ID FROM departments WHERE name=${answers.department}`, function (err, results) {
            let id = results[0].ID;
            db.query('INSERT INTO roles SET ?', {title: answers.name, salary: answers.salary, department_id: id}, function (err, results) {
                viewRole()
                console.log(`Role "${answers.name}" added`)
            });
          
          });
    })
    .then(()=>{backtoMenu()})
}

function promptEmployee(){
    inquirer.prompt(addEmployeeQ)
    .then((answers)=>{
        db.query(`SELECT ID FROM roles WHERE name=${answers.role}`, function (err, results) {
            let roleid = results[0].ID;
            db.query(`SELECT ID FROM employees WHERE last_name=${answers.manager}`, function (err, results) {
                let managerid = results[0].ID;
                db.query('INSERT INTO employees SET ?', {first_name: answers.first_name, last_name: answers.last_name, role_id:roleid, manager_id:managerid }, function (err, results) {
                    viewEmployee()
                    console.log(`Employee "${answers.first_name, answers.last_name}" added`)
                });
            });
          
        });
    })
    .then(()=>{backtoMenu()})
}

function updateEmployee(){
    inquirer.prompt(updateEmployeeQ)
    .then((answers)=>{
        db.query(`SELECT ID FROM roles WHERE name=${answers.role}`, function (err, results) {
            let roleid = results[0].ID;
            db.query(`SELECT ID FROM roles WHERE name=${answers.manager}`, function (err, results) {
                let managerid = results[0].ID;
                db.query(`UPDATE employees SET role_id=${roleid}, manager_id=${managerid} WHERE first_name=${answers.name.split(" ")[0]}}`, function (err, results) {
                    viewEmployee()
                    console.log(`Employee "${answers.first_name, answers.last_name}" information updated`)
                });
            });
          
        });

    })
    .then(()=>{backtoMenu()})
}