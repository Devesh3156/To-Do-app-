const form = document.querySelector("form");
const input = document.querySelector("form input");
const select = document.querySelector("#priority");
const tasksContainer = document.querySelector(".tasks");

let todos = [];

// Function to load todos from local storage
const loadTodosFromLocalStorage = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  if (savedTodos) {
    todos = savedTodos;
    displayTodos();
  }
};

// Function to save todos to local storage
const saveTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Load todos from local storage when the page loads
window.addEventListener("load", loadTodosFromLocalStorage);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = {
    text: input.value,
    priority: select.value,
    checked: false,
    id: new Date().getTime(),
  };

  todos.push(todo);
  saveTodosToLocalStorage(); // Save todos to local storage
  // Reset the form
  e.target.reset();

  displayTodos();
});

const displayTodos = () => {
  tasksContainer.innerHTML = "";

  todos.forEach((todo) => {
    const taskEl = document.createElement("div");
    const inputEl = document.createElement("input");
    const textEl = document.createElement("p");
    const delButton = document.createElement("button");
    const editButton = document.createElement("button");

    taskEl.classList.add("task");
    inputEl.classList.add("checkbox");
    delButton.classList.add("delete");
    editButton.classList.add("edit");
    textEl.classList.add("text");

    inputEl.type = "checkbox";
    inputEl.checked = todo.checked;
    textEl.innerHTML = `${todo.text} - Priority: ${todo.priority}`;
    delButton.innerHTML = "Delete";
    editButton.innerHTML = "Edit";

    // Check if the task is completed and apply "done" class accordingly
    if (todo.checked) {
      taskEl.classList.add("done");
      inputEl.checked = true; // Ensure checkbox stays checked
    } else {
      taskEl.classList.remove("done");
      inputEl.checked = false; // Ensure checkbox stays unchecked
    }

    delButton.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodosToLocalStorage(); // Save todos to local storage
      displayTodos();
    });

    editButton.addEventListener("click", () => {
      const newText = prompt("Enter new text for the task:", todo.text);
      if (newText !== null) {
        todo.text = newText;
        saveTodosToLocalStorage(); // Save todos to local storage
        displayTodos();
      }
    });

    inputEl.addEventListener("change", (e) => {
      todo.checked = e.target.checked;
      saveTodosToLocalStorage(); // Save todos to local storage
      displayTodos();
    });

    taskEl.appendChild(inputEl);
    taskEl.appendChild(textEl);
    taskEl.appendChild(delButton);
    taskEl.appendChild(editButton);
    tasksContainer.appendChild(taskEl);
  });
};


