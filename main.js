
let taskList = [];
let filterList = [];
let doneList = [];
let tabs = document.querySelectorAll(".menu div");
let mode = "all";

for(let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event) {filter(event)});
}

let inputBox = document.getElementById("textBox"); 
let contentBox = document.getElementsByClassName("contentBox");

let addListBtn = document.getElementById("addListBtn");
addListBtn.addEventListener("click", addList);

function addList() {
  let task = {
    id : randomIdGenerate(),
    taskContent : inputBox.value,
    isComplete : false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "notDone" || mode == "done") {
    list = filterList;
  }
  for(let i = 0; i < list.length; i++) {
    if(list[i].isComplete == true) {
      resultHTML += `<div class="taskList">
      <div class="task-done">${list[i].taskContent}</div>
      <div class="button">
        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
        <button onclick="toggleRemove('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`
    } else {
      resultHTML += `<div class="taskList">
    <div>${list[i].taskContent}</div>
    <div class="button">
      <button onclick="toggleComplete('${list[i].id}')"><i class="fa-sharp fa-solid fa-check"></i></button>
      <button onclick="toggleRemove('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  </div>`
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
  console.log(list);
}

function toggleRemove(id) {
  for(let i = 0; i < taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList.splice(taskList[i], 1);
      break;   }
  }
  render();
}

function toggleComplete(id) {
  for(let i = 0; i < taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
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
  console.log("filter클릭됨", event.target);
  if(mode == "all") {
    render();
  } else if (mode == "notDone") {
    for (let i = 0; i < taskList.length; i++) {
      if(taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if(taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}