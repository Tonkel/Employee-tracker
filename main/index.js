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
      getEmployees();
    });
}

// calls function
init();

const getEmployees = async () => {
  //fetch data
  const response = await fetch("http://localhost:3001/api/view-departments", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();

    console.log(`id department \n-- -----------`);
    //loop through data to log it
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id}  ${data[i].department}`);
    }
  } else {
    console.log(response.statusText);
  }
};
