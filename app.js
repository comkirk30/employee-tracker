const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

const startMenuQuestion = [
    {
      type: 'list',
      name: 'startMenuQuestion',
      message: 'What would you like to do?',
      choices: [
        "Show All Roles",
        "Add a Role",
        "Show All Departments",
        "Add a Department",
        "Show All Employees",
        "Add an Employee",
        "Update an Employee's Role"
      ]
    }
  ]

  const addRollQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role?',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the new role?',
    },
    {
        type: 'input',
        name: 'department',
        message: 'What department is the new role in?'
    }
]
