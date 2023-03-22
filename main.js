
let taskList = [];
let filterList = [];
let doneList = [];
let tabs = document.querySelectorAll(".menu div");
let mode = "all";
let underLine = document.getElementById("under-line");
let menu = document.querySelectorAll(".menu div:not(:first-of-type)");
let taskText = document.getElementsByClassName("taskList");
let hideText = document.getElementsByClassName("hideText");


menu.forEach((menu) => menu.addEventListener("click", (e) => indicator(e.currentTarget)));

function indicator(e) {
  underLine.style.left = e.offsetLeft + "px";
  underLine.style.width = e.offsetWidth + "px";
  underLine.style.top = e.offsetTop + e.offsetHeight + "px";
}

for(let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event) {filter(event)});
}

let inputBox = document.getElementById("textBox"); 
inputBox.addEventListener("mousedown", function() {
  hideText[0].style.display = "block";
  underLine.style.top = "195px";
  underLine.style.transition = "0";
})

/* 마우스를 input 태그 바깥에 클릭했을 때 작동하는 함수
inputBox.addEventListener("mouseleave", function() {
  hideText[0].style.display = "none";
  underLine.style.top = "175px";
  underLine.style.transition = "0";
})
let contentBox = document.getElementsByClassName("contentBox");
*/

let addListBtn = document.getElementById("addListBtn");
addListBtn.addEventListener("click", addList);

function addList() {
  let task = {
    id : randomIdGenerate(),
    taskContent : inputBox.value,
    isComplete : false,
  };
  taskList.push(task);
  inputBox.value = "";
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
      resultHTML += `<div id="taskBox" class="taskList">
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