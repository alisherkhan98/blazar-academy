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
    <th>Actions</th>
  </tr>
</thead>
`;
tableContainer.appendChild(table);

const tbody = document.createElement("tbody");
table.appendChild(tbody);
let usersList = [];
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    usersList = users;
    tableFromList(users);
  })
  .catch((err) => {
    console.log(err);
  });

function tableFromList(list) {
  list.forEach((item) => {
    addUserToTable(item);
  });
}

const newUserForm = document.querySelector(".new-user-form");
newUserForm.onsubmit = createUser;

function createUser() {
  const formElements = newUserForm.elements;
  let newUserObject = {
    name: formElements.name.value,
    username: formElements.username.value,
    email: formElements.email.value,
    phone: formElements.phone.value,
  };
  setLoading(true);
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
      return response.json();
    })
    .then((user) => {
      console.log(user);
      usersList.push(user);
      addUserToTable(user);
      setLoading(false);
    })
    .catch((err) => console.log(err));
}

function addUserToTable(user) {
  let row = document.createElement("tr");
  row.dataset.userId = user.id;
  row.innerHTML = `
  <td>${user.name}</td>
  <td>${user.username}</td>
  <td>${user.email}</td>
  <td>${user.phone}</td>
  <td>
  <button class="action-btn edit-btn" title="edit" data-user-id=${user.id}>  <i class="fa-solid fa-pen-to-square"></i> </button>
  <button class="action-btn delete-btn" title="delete" data-user-id=${user.id}>  <i class="fa-solid fa-trash-can" style="color: #4cabaf;"></i>  </button>
  </td>
  `;
  tbody.appendChild(row);
}

const editDialog = document.getElementById("editDialog");
const editForm = document.getElementById("editForm");
const editBtn = document.getElementById("dialog-edit-btn");
const cancelBtn = document.getElementById("dialog-cancel-btn");

cancelBtn.onclick = () => {
  editDialog.close();
};



// listener per i due tasti elimina e modifica nella tabella
document.addEventListener("click", handleAction);
function handleAction(e) {
  if (!e.target.closest("button") || !e.target.closest("tr")) {
    return;
  }
  const userId = e.target.closest("tr").dataset.userId;
  if (e.target.closest("button").classList.contains("delete-btn")) {
    deleteUser(userId);
  } else if (e.target.closest("button").classList.contains("edit-btn")) {
    openDialog(userId);
  }
}

function deleteUser(id) {
  setLoading(true);
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "DELETE",
  }).then(() => {
    removeUserFromTable(id);
    setLoading(false);
  });
}

function removeUserFromTable(id) {
  let deletedRow = document.querySelector(`tr[data-user-id='${id}']`);
  deletedRow.remove();
}

function openDialog(id) {
  editDialog.show();
  const currentUser = usersList.find((user) => user.id == id);
  const formElements = editForm.elements;
  formElements.name.value = currentUser.name;
  formElements.username.value = currentUser.username;
  formElements.email.value = currentUser.email;
  formElements.phone.value = currentUser.phone;
  editBtn.onclick = ()=>{
    updateUser(id)
  };
}

function updateUser(id) {
  const formElements = editForm.elements;
  let newUserObject = {
    name: formElements.name.value,
    username: formElements.username.value,
    email: formElements.email.value,
    phone: formElements.phone.value,
  };
  if (!editForm.reportValidity()) return
  setLoading(true)
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(newUserObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((newUser) => {
      removeUserFromTable(id)
      addUserToTable(newUser)
      setLoading(false)
      editDialog.close()
    });
}



function setLoading(isLoading) {
  if (isLoading) {
    let loader = document.createElement("div");
    loader.className = "loader";
    document.body.append(loader);
  } else {
    document.querySelectorAll(".loader").forEach((loader) => {
      loader.remove();
    });
  }
}
