let addButton = document.querySelector(".add-btn");
let toDoList = document.querySelector(".to-do-list");
let input = document.getElementById("toDoItem");

function handleAddClick() {
    if(input.value){
        
  let listItem = document.createElement("li");
  listItem.textContent = input.value;
  listItem.classList.add("list-item");
  toDoList.append(listItem);
    }
}
addButton.addEventListener("click", handleAddClick);

function handleItemClick(e) {
  let target = e.target;
  if (target.closest("li")) {
    target.closest("li").classList.toggle("completed");
  }
}
document.addEventListener("click", handleItemClick);

function handleItemDblClick(e) {
  let target = e.target;
  let li =target.closest("li");
  if (li) {
    li.classList.add("removed");
  }
  li.addEventListener("transitionend", () => {
   li.remove()
   li.removeEventListener("transitionend")
  });
}
document.addEventListener("dblclick", handleItemDblClick);
