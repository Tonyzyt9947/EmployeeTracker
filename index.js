// Import required files and modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Establish connection with sql server
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to employee_db database.`)
);

// Questions prompted by inquirer
// Menu selections
const menu = [
    {
        type: 'list',
        name: 'menu',
        message: 'Select an action:',
        choices:['View all departments','View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
]
// Return to Menu option
const returnMenu = [
    {
        type: 'input',
        name: 'menu',
        message: 'Enter "return" to return to menu',
    }
]
// Add department prompt
const addDpQ = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of this department:',
    }
]
// Add role prompt
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
// Add employee prompt
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

// Inquirer function that prompts menu
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

// Inquirer function return to menu
function backtoMenu(){
    inquirer.prompt(returnMenu)
    .then((answers)=>{
        if (answers.name="return"){
            promptMenu()
        }
    })
}

// View department function, query to sql server to display desired table
function viewDp(){
    db.query('SELECT ID, Name FROM departments', function (err, results) {
        console.table(results);
        backtoMenu()
    });
    
}

// View roles function, query to sql server to display desired table
function viewRole(){
    db.query(
        `Select r.ID, 
                r.title AS "Job Title", 
                r.Salary, 
                d.name AS Department 
                FROM roles r, departments d 
                WHERE r.department_id=d.id;`, 
        
        function (err, results) {
        console.table(results);
        backtoMenu()
    });
    
}
// View employees function, query to sql server to display desired table
function viewEmployee(){

    db.query(
        `SELECT e.ID, 
                e.first_name AS "First Name",
                e.last_name AS "Last Name",
                r.title AS "Job Title", 
                d.name AS Department, 
                r.Salary, 
                m.last_name AS Manager 
                
                FROM  employees e
                LEFT JOIN employees m
                  ON e.manager_id = m.id
                LEFT JOIN roles r
                  ON e.role_id=r.id
                LEFT JOIN departments d
                  ON r.department_id=d.id`,
                
        function (err, results) {
        console.table(results);
        backtoMenu()
      });
    
}
// Inquirer function prompts that adds department, and manipulates database accordingly
function promptDp(){
    inquirer.prompt(addDpQ) 
    .then((answers)=>{
        db.query('INSERT INTO departments SET ?', {name: answers.name}, function (err, results) {
            
            console.log(
`
Department "${answers.name}" added
`)

            viewDp()
        });
    })
}
// Inquirer function prompts that adds role, and manipulates database accordingly
function promptRole(){
    inquirer.prompt(addRoleQ)
    .then((answers)=>{
        db.query(`SELECT ID FROM departments WHERE name="${answers.department}"`, function (err, results) {
            let id = results[0].ID;
            db.query('INSERT INTO roles SET ?', {title: answers.name, salary: answers.salary, department_id: id}, function (err, results) {
                
                console.log(
`
Role "${answers.name}" added
`)
                viewRole()
            });
          
          });
    })
}
// Inquirer function prompts that adds employee, and manipulates database accordingly
function promptEmployee(){
    inquirer.prompt(addEmployeeQ)
    .then((answers)=>{
        db.query(`SELECT ID FROM roles WHERE title="${answers.role}"`, function (err, results) {
            let roleid = results[0].ID;
            db.query(`SELECT ID FROM employees WHERE last_name="${answers.manager}"`, function (err, results) {
                let managerid = results[0].ID;
                db.query('INSERT INTO employees SET ?', {first_name: answers.first_name, last_name: answers.last_name, role_id:roleid, manager_id:managerid }, function (err, results) {
                    
                    console.log(
`
Employee "${answers.first_name, answers.last_name}" added
`)
                    viewEmployee()
                });
            });
          
        });
    })
}
// Inquirer function prompts that updates employee, and manipulates database accordingly
function updateEmployee(){
    db.query(`SELECT * FROM employees`, function (err, results) {
        const updateEmployeeQ = [
            {
                type: 'list',
                name: 'name',
                message: 'Select an employee to update their information:',
                choices: function(){
                    let choiceArr = [];
                    
                        for(i=0;i<results.length;i++){
                            choiceArr.push(results[i].first_name+" "+results[i].last_name)
                        }

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



        inquirer.prompt(updateEmployeeQ)
        .then((answers)=>{
            db.query(`SELECT ID FROM roles WHERE title="${answers.role}"`, function (err, results) {
                let roleid = results[0].ID;
                db.query(`SELECT ID FROM employees WHERE last_name="${answers.manager}"`, function (err, results) {
                    let managerid = results[0].ID;
                    db.query(`UPDATE employees SET role_id="${roleid}", manager_id="${managerid}" WHERE first_name="${answers.name.split(" ")[0]}"`, function (err, results) {
                        
                        console.log(
`
Employee "${answers.name}" information updated
`)
                        viewEmployee()  
                });
            });
          
        });

    })
})}

// Initialize menu upon start of application
promptMenu()