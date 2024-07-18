let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let delAll = document.querySelector(".del-all");

let tasksArray = []; //Empty Array To Store Tasks

// Add Tasks To Array From localStorage
if (localStorage.getItem("task")) {
  tasksArray = JSON.parse(localStorage.getItem("task"));
}

// click on add tasks
submit.addEventListener("click", () => {
  // check input faild
  if (input.value !== "") {
    // Add Task To Array
    addTasksToArray(input.value);
    // Empty Input Field
    input.value = "";
    //Add Tasks To Page
    addToPage(tasksArray);
    // Add Data To localStorage
    addToLocal(tasksArray);
    show();
  }
});

function addTasksToArray(taskText) {
  // Data
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Data To Array
  tasksArray.push(task);
}

function addToPage(tasksArray) {
  tasks.textContent = "";
  tasksArray.forEach((task) => {
    // Creating task div
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("data-id", task.id);
    // Creating task p
    let p = document.createElement("p");
    p.textContent = task.title;
    p.classList.add("par");
    taskDiv.append(p);
    // Creating Delete button
    let del = document.createElement("button");
    del.textContent = "Delete";
    del.classList.add("del");

    taskDiv.append(del);
    // Add Done Class
    if (task.completed === true) {
      taskDiv.classList.add("done");
    }
    // Add Task To Page
    tasks.append(taskDiv);
  });
}

// click On Task Element
tasks.addEventListener("click", (e) => {
  // Add Done Class when click on paragraph
  if (e.target.classList.contains("par")) {
    // Change completed
    completed(e.target.parentElement.getAttribute("data-id"));
    // done class Toggle
    e.target.parentElement.classList.toggle("done");
  }
  // Add Done Class when click on task
  if (e.target.classList.contains("task")) {
    // Change completed
    completed(e.target.getAttribute("data-id"));
    // done class Toggle
    e.target.classList.toggle("done");
  }
  // Delete Task
  if (e.target.classList.contains("del")) {
    // delete task from localStorage
    delFromLocal(e.target.parentElement.getAttribute("data-id"));
    // delete task from page
    e.target.parentElement.remove();

    show();
  }
});

// Delete All Tasks
delAll.addEventListener("click", () => {
  if (tasks.textContent != "") {
    // Delete From Local
    window.localStorage.removeItem("task");
    tasksArray = [];
    // Delete From Page
    tasks.textContent = "";

    show();
  }
});

function addToLocal(tasksArray) {
  window.localStorage.setItem("task", JSON.stringify(tasksArray));
}
// Get Data From localStorage
if (window.localStorage.getItem("task")) {
  addToPage(tasksArray);
}

function completed(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskId) {
      tasksArray[i].completed == false
        ? (tasksArray[i].completed = true)
        : (tasksArray[i].completed = false);
    }
  }

  addToLocal(tasksArray);
}

function delFromLocal(taskId) {
  tasksArray = tasksArray.filter((task) => taskId != task.id);

  addToLocal(tasksArray);
}

function show() {
  if (tasks.childElementCount !== 0) {
    tasks.style.visibility = "visible";
    delAll.style.visibility = "visible";
  } else {
    tasks.style.visibility = "hidden";
    delAll.style.visibility = "hidden";
  }
}

show();
