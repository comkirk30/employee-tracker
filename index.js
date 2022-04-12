const inquirer = require("inquirer");
const db = require("./db/query");
const cTable = require("console.table");
const dbConnect = require("./db/connection");

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "startMenu",
        message: "What would you like to do?",
        choices: [
          "Show All Roles",
          "Add Role",
          "Show All Departments",
          "Add Department",
          "Show All Employees",
          "Add Employee",
          "Update Employee Role",
        ],
      },
    ])
    .then((answers) => {
      const choice = answers.startMenu;
      console.log(choice);
      if (choice === "Show All Roles") {
        //to do :
        showAllRoles();
      } else if (choice === "Add Role") {
        addRole();
      } else if (choice === "Show All Departments") {
        showAllDepartments();
      } else if (choice === "Show All Employees") {
        showAllEmployees();
      } else if (choice === "Add Employee") {
        addEmployee();
      } else if (choice === "Add Department") {
        addDepartment();
      } else if (choice === "Update Employee Role") {
        updateEmployeeRole();
      }
    });

  const addRoleQuestion = [
    {
      type: "input",
      name: "title",
      message: "What is the title of the new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "Salary of the new role?",
    },
    {
      type: "input",
      name: "department",
      message: "What department is the new role part of?",
    },
  ];

  const addDepartmentQuestion = [
    {
      type: "input",
      name: "title",
      message: "What department do you wish to add?",
    },
  ];

  const addEmployeeQuestion = [];

  const chooseEmployeeQuestion = [];

  const updateEmployeeRoleQuestion = [
    {
      type: "input",
      name: "role_id",
      message: "Which new role do you want for the employee?",
    },
  ];

  function showAllRoles() {
    db.showAllRoles().then(() => promptUser());
  }

  function showAllDepartments() {
    db.showAllDepartments().then(() => promptUser());
  }
  function showAllEmployees() {
    db.showAllEmployees().then(() => promptUser());
  }
  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "What is the name of the new department?",
        },
      ])
      .then((response) => {
        db.addDepartment(response.departmentName)
          .then((result) => console.log(result))
          .then(() => promptUser());
      });
  }

  const addRole = () => {
    let departments = [];
    dbConnect.query("Select * from department", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        departments.push({
          name: res[i].name,
          value: res[i].id,
        });
      }
    });
    console.log(departments);
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "Salary of the new role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "What department is the new role part of?",
          choices: departments,
        },
      ])
      .then((response) => {
        console.log(response);
        db.addRole(response)
          .then(() => console.log("Successfully added"))
          .then(() => promptUser());
      });
  };

  const addEmployee = () => {
    let roles = [];
    dbConnect.query("Select * from role", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        roles.push({
          name: res[i].title,
          value: res[i].id,
        });
      }
    });
    let managers = [];
    dbConnect.query("Select * from employee", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        managers.push({
          name: res[i].first_name + ", " + res[i].last_name,
          value: res[i].id,
        });
      }
    });
    console.log(roles);
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Employee first name",
        },
        {
          type: "input",
          name: "last_name",
          message: "Employee last name",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the role for the employee?",
          choices: roles,
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the manager for the employee?",
          choices: managers,
        },
      ])

      .then((response) => {
        console.log(response);
        db.addEmployee(response)
          .then(() => console.log("Successfully added"))
          .then(() => promptUser());
      });
  };
};

// const chooseEmployee = () => {
//   const result = await inquirer
//   .prompt(chooseEmployeeQuestion);

//   dbConnect.query('Select * from role', function(err, res){
//           console.log("");
//           console.log(results);
//         });

const updateEmployeeRole = () => {
  let employees = [];
  dbConnect.query("Select * from employee", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      employees.push({
        name: res[i].first_name + ", " + res[i].last_name,
        value: res[i].id,
      });
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Which employee do you need to update?",
          choices: employees,
        },
      ])
      .then((res) => {
        console.log("Added", res);
        let employee_id = res.employee_id;
        
        let roles = [];
        dbConnect.query("Select * from role", function (err, res) {
          for (let i = 0; i < res.length; i++) {
            roles.push({
              name: res[i].title,
              value: res[i].id,
            });
          }
        });
        console.log(roles);
        inquirer.prompt([
          {
            type: "input",
            name: "role_id",
            message: "What is the new role for the employee?",
            choices: roles,
          },
        ])
        .then((response) => {
          console.log(response);
          // db.updateEmployeeRole(employee_id, response.role_id)
          // .then(() => console.log("Successfully updated"))
          // .then(() => promptUser());
          //  db.addEmployee(response)
          //    .then(() => console.log("Successfully added"))
          //    .then(() => promptUser());
        });
      });
  });
};

//  {
//     type: 'list',
//     name: 'role_id',
//     message: 'Which new role do you want for the employee?',
//   },

// const sql = `UPDATE employee SET role_id = ${result.role_id}
// WHERE id = ${employeeID}`;

// db.query(sql, function (err, results) {
//   console.log("");
//   console.log(results);
// });
// startMenu();

const startApp = () => {
  console.log("Welcome to My Employee Log");
  console.log("Please choose an option to begin:");
  promptUser();
};
startApp();
