// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrCheck);
todoFilter.addEventListener("click", filterTodos);

// Functions
function addTodo(event) {
  event.preventDefault();

  const inputValue = todoInput.value;
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  saveTodoToLocal(inputValue);

  const todoItem = document.createElement("li");
  todoItem.innerText = inputValue;
  todoItem.classList.add("todo-item");
  todoDiv.appendChild(todoItem);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-button");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function deleteOrCheck(event) {
  const item = event.target;

  if (item.classList[0] === "trash-button") {
    const todoDiv = item.parentElement;
    todoDiv.classList.add("fall");
    removeTodoFromLocal(todoDiv);
    todoDiv.addEventListener("transitionend", function () {
      todoDiv.remove();
    });
  }

  if (item.classList[0] === "completed-button") {
    const todoDiv = item.parentElement;
    todoDiv.classList.toggle("completed");
  }
}

function filterTodos(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "not-completed":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveTodoToLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = checkLocalStorageTodos();

  todos.forEach(function (todo) {
    const inputValue = todo;
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const todoItem = document.createElement("li");
    todoItem.innerText = inputValue;
    todoItem.classList.add("todo-item");
    todoDiv.appendChild(todoItem);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeTodoFromLocal(todo) {
  let todos = checkLocalStorageTodos();
  const todoItemName = todo.children[0].innerText;

  todos.splice(todos.indexOf(todoItemName), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkLocalStorageTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
