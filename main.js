// input 창을 클릭하면 입력창이 아래로 내려오도록 설정
// input 창을 벗어나면(포커스를 해제하면) 원위치로 돌아가도록 설정
// + 버튼을 누르면 All 탭에 목록이 추가 되도록 설정
// 체크 버튼을 클릭하면 투두리스트텍스트의 배경색이 바뀌고 취소선 생성, 체크가 화살표로 바뀜

let hideText = document.getElementsByClassName("hideText");
let todoList_All = document.getElementById("todoList_All");
let todoList_not_Done = document.getElementById("todoList_not-Done");
let todoList_Done = document.getElementById("todoList_Done");


let allBtn = document.getElementsByClassName("allBtn");
allBtn[0].addEventListener("click", function() {
  notDoneBtn[0].style.borderBottom = "none";
  allBtn[0].style.borderBottom = "4px solid pink";
  doneBtn[0].style.borderBottom = "none";
})


let notDoneBtn = document.getElementsByClassName("notDoneBtn");
notDoneBtn[0].addEventListener("click", function() {
  let notDone = document.getElementsByClassName("not-done");
  notDoneBtn[0].style.borderBottom = "4px solid pink";
  allBtn[0].style.borderBottom = "none";
  doneBtn[0].style.borderBottom = "none";
  for (let i = 0; i < notDone.length; i++) {
    todoList_not_Done.appendChild(notDone[i]);
  }
  todoList_All.style.display = "none";
  todoList_Done.style.display = "none";
})

let doneBtn = document.getElementsByClassName("doneBtn");
doneBtn[0].addEventListener("click", function() {
  notDoneBtn[0].style.borderBottom = "none";
  allBtn[0].style.borderBottom = "none";
  doneBtn[0].style.borderBottom = "4px solid pink";
})

let inputBox = document.getElementById("textBox");
inputBox.addEventListener("mousedown", slideBox);

let contentBox = document.getElementsByClassName("contentBox");

let addListBtn = document.getElementById("addListBtn");
addListBtn.addEventListener("click", addList);
addListBtn.addEventListener("click", hiddenBox);


function slideBox() {
  hideText[0].style.display = "block";
  inputBox.placeholder = "";
}

function hiddenBox() {
  hideText[0].style.display = "none";
  inputBox.placeholder = "오늘의 할일은?";
  inputBox.value = "";
}

function addList() {
  let firstDivElement = document.createElement("div")
  firstDivElement.classList.add("list-content");
  firstDivElement.classList.add("not-done");
  todoList_All.appendChild(firstDivElement);


  const secondDivElement = document.createElement("div");
  secondDivElement.classList.add("todoListText");
  firstDivElement.appendChild(secondDivElement);
  secondDivElement.textContent = inputBox.value;

  const thirdDivElement = document.createElement("div");
  thirdDivElement.classList.add("icons");
  firstDivElement.appendChild(thirdDivElement);

  const doneBtn = document.createElement("span");
  doneBtn.classList.add("material-symbols-outlined");
  doneBtn.classList.add("doneBtn");
  thirdDivElement.appendChild(doneBtn);
  doneBtn.textContent = "done";
  doneBtn.addEventListener("click", replayBtn);

  function replayBtn() {
    firstDivElement.classList.remove("not-done");
    firstDivElement.classList.add("done");
    firstDivElement.style.backgroundColor = "#ccc";
    secondDivElement.style.textDecoration = "line-through";
    doneBtn.textContent = "undo"
    doneBtn.style.color = "gray";
    todoList_Done.appendChild(firstDivElement);
    doneBtn.addEventListener("click", function() {
      firstDivElement.classList.remove("done");
      firstDivElement.classList.add("not-done");
      firstDivElement.style.backgroundColor = "";
      secondDivElement.style.textDecoration = "";
      doneBtn.textContent = "done"
      doneBtn.style.color = "rgb(1, 197, 1)";
      todoList_not_Done.appendChild(firstDivElement);
    })
  }
  // let returnBtn = document.getElementsByClassName("returnBtn");
  // returnBtn.addEventListener("click", function() {
  //   returnBtn[0].classList.remove("returnBtn");
  //   returnBtn[0].classList.add("doneBtn");
  // })

  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("material-symbols-outlined");
  deleteBtn.classList.add("deleteBtn");
  thirdDivElement.appendChild(deleteBtn);
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", function() {
    firstDivElement.remove();
  });


}