let menuBar = document.getElementById("menu-bar");
let menu = document.querySelectorAll(".menu div:not(:first-of-type)");
let addTaskBtn = document.getElementById("add-task");
let input = document.getElementById("taskInput");

let taskList = [];
let list = [];
let filterList = [];
let mode = "all";

console.log(menu);

menu.forEach((menu) => menu.addEventListener("click", (e) => menuIndicator(e)));

function menuIndicator(e) {
  menuBar.style.left = e.currentTarget.offsetLeft + "px";
  menuBar.style.width = e.currentTarget.offsetWidth + "px";
  menuBar.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

addTaskBtn.addEventListener("click", addList);

for(let i = 0; i < menu.length; i++) {
  menu[i].addEventListener("click", function(event) {filter(event)})
}


function addList() {
  let task = {
    id : randomIdGenerate(),
    taskValue : input.value,
    isComplete : false,
  }
  taskList.push(task);
  input.value = "";
  render();
  }

function render() {
  let resultHTML = "";
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "not-done" || mode == "done") {
    list = filterList;
  }
  console.log(list);
  for(let i = 0; i < list.length; i++) {
    if(list[i].isComplete == true) {
      resultHTML += `<div id="taskBox" class="task">
      <div id="task-done" class="task-name">${list[i].taskValue}</div>
      <div class="buttons">
        <button id="delete" onclick="checkBtn('${list[i].id}')"><i class="fa-sharp fa-solid fa-arrow-rotate-left"></i></button>
        <button id="delete" onclick="deleteBtn('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`
    } else {
      resultHTML += `<div class="task">
      <div class="task-name">${list[i].taskValue}</div>
      <div class="buttons">
        <button id="check" onclick="checkBtn('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button id="delete" onclick="deleteBtn('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`
    }
  }
  document.getElementById("task-list").innerHTML = resultHTML;
}

function checkBtn(id) {
  for(let i = 0; i < taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteBtn(id) {
  for(let i = 0; i < taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList.splice(taskList[i], 1);
      break;
    }
  }
  render();
}

function randomIdGenerate() {
  return Math.random().toString(36).substr(2, 16);
}


function filter(event) {
  filterList = [];
  mode = event.target.id;
  console.log(mode)
  if(mode == "all") {
    render();
  } else if (mode == "not-done") {
    for(let i = 0; i < taskList.length; i++) {
      if(taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for(let i = 0; i < taskList.length; i++) {
      if(taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}