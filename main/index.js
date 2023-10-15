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
          "quit",
        ],
      },
    ])
    .then((response) => {
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
      } else if (response.choice === "add a department") {
        //run add department function
        addDepartmentPromt();
      } else if (response.choice === "add a role") {
        //run add role function
        addRolesPrompt();
      } else if (response.choice === "add an employee") {
        //run add employee function
        addEmployeePrompt();
      } else if (response.choice === "update an employee role") {
        //runn update employee role function
        updateRolePrompt();
      } else {
        console.log("You have successfully quit this session!");
      }
    });
}

//add a department inquirer prompt
const addDepartmentPromt = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((response) => {
      //post response to database then rerun main prompt
      addDepartment(response.name);
      //wait a second before prompting again
      setTimeout(function () {
        init();
      }, 1000);
    });
};
//add roles inquirer prompt
const addRolesPrompt = async () => {
  //get list of fetched current departments (not jut seeded)
  const currentDepartments = await getCurrentDepartments();
  //ask prompts
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department",
        message: "What department does this role belong to?",
        choices: currentDepartments,
      },
    ])
    .then((response) => {
      //post response to database then rerun main prompt
      addRole(response.title, response.salary, response.department);
      //wait a second before prompting again
      setTimeout(function () {
        init();
      }, 1000);
    });
};

//add roles inquirer prompt
const addEmployeePrompt = async () => {
  //get list of fetched current departments and roles (not jut seeded)
  const currentDepartments = await getCurrentDepartments();
  const currentRoles = await getCurrentRoles();
  const managerOption = ["null"];
  //concat lists
  const currentManagers = managerOption.concat(await getCurrentManagers());
  //ask prompts
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?",
      },
      {
        type: "list",
        name: "title",
        message: "What is the title of their role?",
        choices: currentRoles,
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of their role?",
      },
      {
        type: "list",
        name: "department",
        message: "What department do they belong to?",
        choices: currentDepartments,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is their current manager?",
        choices: currentManagers,
      },
    ])
    .then((response) => {
      //post response to database then rerun main prompt
      addEmployee(
        response.first_name,
        response.last_name,
        response.title,
        response.salary,
        response.department,
        response.manager
      );
      //wait a second before prompting again
      setTimeout(function () {
        init();
      }, 1000);
    });
};

//update employee role inquirer prompt
const updateRolePrompt = async () => {
  //get list of fetched current departments (not jut seeded)
  const currentRoles = await getCurrentRoles();
  const currentEmployees = await getCurrentEmployees();
  //ask prompts
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to select?",
        choices: currentEmployees,
      },
      {
        type: "list",
        name: "role",
        message: "which role would you like to assign to this employee?",
        choices: currentRoles,
      },
    ])
    .then((response) => {
      //split full name into first and last so we can access the correct row throw sql queries in backend
      const fullname = response.employee.split(" ");
      const first_name = fullname[0];
      const last_name = fullname[1];

      //post response to database then rerun main prompt
      updateRole(first_name, last_name, response.role);
      //wait a second before prompting again
      setTimeout(function () {
        init();
      }, 1000);
    });
};

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

const getCurrentDepartments = async () => {
  //set up empty list to hold departments
  const departments = [];

  //fetch data
  const response = await fetch("http://localhost:3001/api/view-departments", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    //add departments to list
    for (const obj of data) {
      departments.push(obj.department);
    }
    //return list
    return departments;
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

const getCurrentEmployees = async () => {
  //set up empty list to hold departments
  const employees = [];

  //fetch data
  const response = await fetch(
    "http://localhost:3001/api/view-only-employees",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.ok) {
    const data = await response.json();
    //add departments to list
    for (const obj of data) {
      //concat first name and last name then push
      const fullName = `${obj.first_name} ${obj.last_name}`;
      employees.push(fullName);
    }
    //return list
    return employees;
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

const getCurrentRoles = async () => {
  //set up empty list to hold departments
  const roles = [];

  //fetch data
  const response = await fetch("http://localhost:3001/api/view-roles", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    //add roles to list
    for (const obj of data) {
      roles.push(obj.title);
    }
    //return list
    return roles;
  } else {
    console.log(response.statusText);
  }
};

const getCurrentManagers = async () => {
  //set up empty list to hold departments
  const managers = [];

  //fetch data
  const response = await fetch("http://localhost:3001/api/view-managers", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    //add managers to list
    for (const obj of data) {
      managers.push(obj.manager);
    }
    //return list
    return managers;
  } else {
    console.log(response.statusText);
  }
};

//post request
const addDepartment = async (department) => {
  const response = await fetch("http://localhost:3001/api/add-department", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ department: department }),
  });

  if (response.ok) {
    console.log("department added");
  } else {
    console.log(response.statusText);
  }
};

//add role
const addRole = async (title, salary, department) => {
  const response = await fetch("http://localhost:3001/api/add-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      salary: salary,
      department: department,
    }),
  });

  if (response.ok) {
    console.log("Role added");
  } else {
    console.log(response.statusText);
  }
};
//add employee
const addEmployee = async (
  first_name,
  last_name,
  title,
  salary,
  department,
  manager
) => {
  const response = await fetch("http://localhost:3001/api/add-employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      title: title,
      salary: salary,
      department: department,
      manager: manager,
    }),
  });

  if (response.ok) {
    console.log("Employee added");
  } else {
    console.log(response.statusText);
  }
};

//put request
const updateRole = async (first_name, last_name, role) => {
  const response = await fetch(
    "http://localhost:3001/api/update-employee-role",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        role: role,
      }),
    }
  );

  if (response.ok) {
    console.log(`Role updated for ${first_name} ${last_name}`);
  } else {
    console.log(response.statusText);
  }
};

// calls function
init();
