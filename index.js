const inquirer = require('inquirer');
const db = require('./db/query');
const cTable = require('console.table');
const dbConnect = require('./db/connection');


const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'startMenu',
      message: 'What would you like to do?',
      choices: [
        "Show All Roles",
        "Add Role",
        "Show All Departments",
        "Add Department",
        "Show All Employees",
        "Add Employee",
        "Update Employee Role",
      ]
    }
  ]).then((answers) => {
    const choice = answers.startMenu;
    console.log(choice);
    if(choice === 'Show All Roles') {
      //to do :
      showAllRoles()
    }else if(choice === 'Add Role') {
      addRole();

    }
    else if(choice === 'Show All Departments') {
      showAllDepartments()
  }
    else if(choice === 'Show All Employees') { 
      showAllEmployees()
    }
  
    else if(choice === 'Add Department') {
    addDepartment()
  }

});
  


const addRoleQuestion = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role?',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Salary of the new role?',
    },
    {
        type: 'input',
        name: 'department',
        message: 'What department is the new role part of?',
    }
]

const addDepartmentQuestion = [
    {
        type: 'input',
        name: 'title',
        message: 'What department do you wish to add?',
    }
]

const addEmployeeQuestion = [
    {
      type: 'input',
      name: 'first_name',
      message: 'Employee first name',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Employee last name',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is the role for the employee?',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Who is the manager for the employee?',
    }
  ]
  
  const chooseEmployeeQuestion = [
    {
      type: 'input',
      name: 'employee_id',
      message: 'Which employee do you want to change?',
    },
  ]
  
  const updateEmployeeRoleQuestion = [
    {
      type: 'input',
      name: 'role_id',
      message: 'Which new role do you want for the employee?',
    },
  ]

  function showAllRoles(){
  db.showAllRoles().then(()=>promptUser());
  }

  function showAllDepartments(){
    db.showAllDepartments().then(()=>promptUser());
  }
  function showAllEmployees(){
    db.showAllEmployees().then(()=>promptUser());
  }
  function addDepartment(){
    inquirer
      .prompt([
        {
          type: 'input', 
          name: 'departmentName',
          message: 'What is the name of the new department?',
        }])
        .then((response)=> 
        {
        db.addDepartment(response.departmentName).then((result)=> console.log(result)).then(()=>promptUser()
          )});
  }



  const addRole = () => {
    let departments=[]
    dbConnect.query('Select * from department', function(err, res){
      for (let i = 0; i < res.length; i++){
        departments.push({
          name: res[i].name, 
          value: res[i].id,

        })
      }
    })
    console.log (departments)
    inquirer
    .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of the new role?',
      },
      {
          type: 'input',
          name: 'salary',
          message: 'Salary of the new role?',
      },
      {
          type: 'list',
          name: 'department_id',
          message: 'What department is the new role part of?',
          choices: departments
      }
  
    ])
      .then((response)=>
      {
        console.log (response)
        db.addRole(response).then(()=> console.log('Successfully added')).then(()=> promptUser())
      }
      )
    
  
    
   

   // startMenu();
  }

  // const addDepartment = async() => {
  //   const result = await inquirer.prompt(addDepartmentQuestion)
  //   const sql = `INSERT INTO department (name)
  //   VALUES (?)`;
  //   const params = [result.name];
  
  //   db.query(sql, params, function (err, results) {
  //     console.log("");
  //     console.log(results);
  //   });
  //   startMenu();
  // }

  // const addEmployee = async() => {
  //   const result = await inquirer.prompt(addEmployeeQuestions)
  //   const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  //   VALUES (?,?,?,?)`;
  //   const params = [result.first_name, result.last_name, result.role_id, result.manager_id];
  
  //   db.query(sql, params, function (err, results) {
  //     console.log("");
  //     console.log(results);
  //   });
  //   startMenu();
  // }

  const chooseEmployee = async() => {
    const result = await inquirer.prompt(chooseEmployeeQuestion);
  
    db.query('SELECT role.id, role.title FROM role', function (err, results) {
            console.log("");
            console.log(results);
          });
    
    updateEmployeeRole(result.employee_id);
  }

  const updateEmployeeRole = async(employeeID) => {
    const result = await inquirer.prompt(updateEmployeeRoleQuestion)
    const sql = `UPDATE employee SET role_id = ${result.role_id}
    WHERE id = ${employeeID}`;
  
    db.query(sql, function (err, results) {
      console.log("");
      console.log(results);
    });
    startMenu();
  }

  // const startMenu = async() => {
  //   const result = await inquirer.prompt(startMenuQuestion)
  //   .then(function(result) {
  //     switch (result.startMenuQuestion) {
  //       case "Show All Roles":
  //         db.query('SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
  //           console.log("");
  //           console.log(results);
  //         });
  //         startMenu();
    
        
  //       case "Add A Role":
  //         db.query('SELECT * FROM department', function (err, results) {
  //           console.log("");
  //           console.log(results);
  //         });
  //         addRole();
          
  
  //       case "Show All Departments":
  //         db.query('SELECT * FROM department', function (err, results) {
  //           console.log("");
  //           console.log(results);
  //         });
  //         startMenu();
          
  
  //       case "Add Department":
  //         addDepartment();
        
  
  //       case "Show All Employees":
  //         db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (err, results) {
  //           console.log("");
  //           console.log(results);
  //         });
  //         startMenu();
          
  
  //       case "Add Employee":
  //         db.query('SELECT role.*, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
  //           console.log("");
  //           console.log(results);
  //         });
  //         db.query('SELECT employee.*, role.title AS role_title FROM employee LEFT JOIN role ON employee.role_id = role.id', function (err, results) {
  //           console.log("");
  //           console.log(results);
  //         });
  //         addEmployee();
          
  
  //       case "Update Employee Role":
  //         db.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee', function (err, results) {
  //           console.log("");
  //           console.log(results);
  //         });
  //         chooseEmployee();
  //     }
  //   });
  // }
  
 

}
const startApp  = () => {
  console.log('Welcome to My Employee Log');
  console.log('Please choose an option to begin:');
  promptUser();
 
}
startApp();
    
  