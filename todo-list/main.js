"use strict";

let itemList = [];
let inputButton = document.querySelector(".input__button");
inputButton.addEventListener("click", addItem);

function addItem() {
  let item = document.querySelector(".item").value;
  if (item != null) {
    itemList.push(item);
    document.querySelector(".item").value = "";
    document.querySelector(".item").focus();
  }

  showList();
}

function showList() {
  let list = "<ul>";
  for (let i = 0; i < itemList.length; i++) {
    list +=
      "<li>" +
      itemList[i] +
      '<span class="checkBtn" id=' +
      i +
      ">" +
      "\u2713" +
      "</span>" +
      "<span class='close' id=" +
      i +
      ">" +
      "\u00D7" +
      "</span></li>";
  }
  list += "</ul>";
  document.querySelector(".item__list").innerHTML = list;

  let deleteButtons = document.querySelectorAll(".close");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteItem);
  }

  let checkButtons = document.querySelectorAll(".checkBtn");
  for (let i = 0; i < checkButtons.length; i++) {
    checkButtons[i].addEventListener("click", checkItem);
  }
}

function deleteItem() {
  let id = this.getAttribute("id");
  itemList.splice(id, 1);
  showList();
}

function checkItem() {
  let id = this.getAttribute("id");
  let listItem = document.querySelector(
    ".item__list li:nth-child(" + (parseInt(id) + 1) + ")"
  ); // 해당 아이템 가져오기
  listItem.classList.toggle("checked"); // 체크 상태 토글
}
