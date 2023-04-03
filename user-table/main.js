import "./style.css";

const app = document.querySelector("#app");
const tableContainer = document.querySelector("#table-container");

const table = document.createElement("table");
table.className = "my-table";
table.innerHTML = `
<thead>
  <tr>
    <th>Name</th>
    <th>Username</th>
    <th>Email</th>
    <th>Phone</th>
  </tr>
</thead>
`;
tableContainer.appendChild(table);

const tbody = document.createElement("tbody");
table.appendChild(tbody);

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    tableFromList(users);
  })
  .catch((err) => {
    console.log(err);
  });

function tableFromList(list) {
  list.forEach((item) => {
   addUserToTable(item)
  });
}

const newUserForm = document.querySelector(".new-user-form");
const addBtn = document.querySelector(".add-btn");
newUserForm.onsubmit = createUser;

function createUser() {
  const formElements = newUserForm.elements;
  let newUserObject = {
    name: formElements.name.value,
    username: formElements.username.value,
    email: formElements.email.value,
    phone: formElements.phone.value,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newUserObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("there was an error");
      }
      return response.json()
    })
    .then(user =>{
      addUserToTable(user)
    })
    .catch((err) => console.log(err));
}

function addUserToTable(user){
  let row = document.createElement("tr");
  row.innerHTML = `
  <td>${user.name}</td>
  <td>${user.username}</td>
  <td>${user.email}</td>
  <td>${user.phone}</td>
  `;
  tbody.appendChild(row);
}