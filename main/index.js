//dependencies
const inquirer = require("inquirer");

//write inquirer prompts
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      if (response.choice === "view all departments") {
        //get departments then rerun prompt
        getDepartments();
        //wait a second before prompting again
        setTimeout(function () {
          init();
        }, 1000);
      } else if (response.choice === "view all roles") {
        //get roles then rerun prompt after a second
        getRoles();
        //wait a second before prompting again
        setTimeout(function () {
          init();
        }, 1000);
      } else if (response.choice === "view all employees") {
        //get roles then rerun prompt after a second
        getEmployees();
        //wait a second before prompting again
        setTimeout(function () {
          init();
        }, 1000);
      }
    });
}

//add a department inquirer prompt

//fetch functions
const getDepartments = async () => {
  //fetch data
  const response = await fetch("http://localhost:3001/api/view-departments", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    //custom display
    console.log(`\n id department \n-- ----------`);
    //loop through data to log it
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id}  ${data[i].department}`);
    }
  } else {
    console.log(response.statusText);
  }
};

const getEmployees = async () => {
  //fetch data
  const response = await fetch("http://localhost:3001/api/view-employees", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    //custom display
    console.log(
      `id first_name last_name   title      department      salary      manager \n-- ---------- ---------  ---------   -----------    -------     -------------`
    );
    //loop through data to log it
    for (let i = 0; i < data.length; i++) {
      console.log(
        `${data[i].id}  ${data[i].first_name}      ${data[i].last_name}        ${data[i].title}        ${data[i].department}        ${data[i].salary}      ${data[i].manager}`
      );
    }
  } else {
    console.log(response.statusText);
  }
};

const getRoles = async () => {
  //fetch data
  const response = await fetch("http://localhost:3001/api/view-roles", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    //custom display
    console.log(
      `id title      department       salary \n-- --------   -------------    -----------`
    );
    //loop through data to log it
    for (let i = 0; i < data.length; i++) {
      console.log(
        `${data[i].id}  ${data[i].title}         ${data[i].department}         ${data[i].salary}`
      );
    }
  } else {
    console.log(response.statusText);
  }
};

// calls function
init();
