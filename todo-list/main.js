"use strict";

// 상수 정의
const ERROR_MESSAGES = {
  emptyText: "텍스트를 입력해주세요.",
  duplicateItem: "이미 동일한 아이템이 있습니다.",
};

// 아이템 리스트 배열
let itemList = [];
// 아이템 삭제 및 체크 토글 용 아이디
let itemId = 0;

// 버튼 클릭 시 아이템 추가
document.querySelector(".addBtn").addEventListener("click", addItem);
// form의 제출 막고 엔터 누르면 아이템 추가하기
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // 폼의 기본 제출 동작 막기
  addItem();
});

// 아이템 추가 함수
function addItem() {
  // 아이템 input 박스 가져오기
  const itemInput = document.querySelector(".inputItem");
  // 추가하는 아이템 value 및 띄어쓰기 제거
  const newItemText = itemInput.value.trim();

  // input에 아무 것도 없으면 아이템 추가 X
  if (!newItemText) {
    alert(ERROR_MESSAGES.emptyText);
    itemInput.focus();
    return;
  }

  // 동일한 아이템이 있을 경우 아이템 추가 X
  if (
    itemList.some((item) => item.text === newItemText) ||
    itemList.some(
      (item) => item.text.toLowerCase() === newItemText.toLowerCase()
    )
  ) {
    alert(ERROR_MESSAGES.duplicateItem);
    itemInput.focus();
    return;
  }

  // 새로 추가 할 아이템 오브젝트
  const newItem = {
    id: itemId++,
    text: newItemText,
    checked: false,
  };

  // 아이템 리스트에 추가하는 함수
  itemList.push(newItem);
  // 초기화 및 포커스
  itemInput.value = "";
  itemInput.focus();

  // 아이템 리스트 렌더링 함수
  renderList();
}

// 아이템 리스트 렌더링 함수
function renderList() {
  // ul 태그와 li 태그로 리스트 추가하기
  let list = "<ul>";
  for (const item of itemList) {
    const checkedClass = item.checked ? "checked" : "";
    const checkBtnColor = item.checked ? "blue" : "gray";
    list += `
      <li class="${checkedClass}">
        ${item.text}
        <div class="btnWrap">
          <span class="checkBtn" style="color: ${checkBtnColor};" data-id="${item.id}">\u2713</span>
          <span class="deleteBtn" data-id="${item.id}">\u00D7</span>
        </div>
      </li>`;
  }
  list += "</ul>";

  // 아이템이 없으면 리스트에 아무것도 안보이게 하기
  if (itemList.length === 0) {
    list = "";
  }

  // 아이템 리스트에 리스트 추가
  document.querySelector(".itemList").innerHTML = list;
}

// 아이템 리스트에서 체크와 삭제 버튼 이벤트 리스너
document.querySelector(".itemList").addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("deleteBtn")) {
    deleteItem(target.dataset.id);
  } else if (target.tagName === "LI") {
    const itemId = target.querySelector(".checkBtn").dataset.id;
    toggleCheck(itemId);
  }
});

// 아이템 체크 함수
function toggleCheck(itemId) {
  const currentItem = itemList.find((item) => item.id === Number(itemId));
  if (currentItem) {
    currentItem.checked = !currentItem.checked; // 체크 상태 토글
    renderList(); // 리스트 갱신
  }
}

// 아이템 삭제 함수
function deleteItem(itemId) {
  itemList = itemList.filter((item) => item.id !== Number(itemId));
  renderList();
}

// 초기 렌더링
renderList();
