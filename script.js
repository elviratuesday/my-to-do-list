// declarations
const addBtn = document.getElementById("addBtn");
const myInput =  document.getElementById("my-input");
const myTasklist = document.getElementById("list-container");
var list = document.querySelector('ul');

// get items out of storage!!
loadTasks();

function addTask() {
  const task = myInput.value.trim();

  if (task) {
    createTaskElement(task);
    myInput.value = "";

    saveTasks();
  } else {
    alert("You must write something!");
  }
}

addBtn.addEventListener("click", addTask);

function createTaskElement(task) {
  const listItem = document.createElement("li");

  listItem.textContent = task;

  // creates the delete button
  var txt = document.createTextNode("\u00D7");
  const close = document.createElement("span");
  close.appendChild(txt);
  close.className = "close";

  listItem.appendChild(close);
  myTasklist.appendChild(listItem);

  close.addEventListener("click", function(){
    myTasklist.removeChild(listItem);
    saveTasks()
  });
}

// checks the task as done
list.addEventListener("click", function(ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
  }
}, false);


// save and load items in storage!!
function saveTasks() {
  let tasks = [];
  myTasklist.querySelectorAll("li").forEach(function(item) {
    tasks.push(item.textContent.replace("\u00D7", "").trim());
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(createTaskElement);
}

