document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.querySelector('input[name="input"]');
  const answerBox = document.querySelector('input[name="answer"]');
  const alertBox = document.querySelector("div.alert");

  inputBox.onsearch = function () {
    let inputArray = this.value.split(" ");
    let answerArray = answerBox.value.split(" ");

    let newArray = inputArray.map(function (item, index) {
      if (item == answerArray[index]) {
        return '<span class="bg-white">' + item + "</span>";
      } else {
        return '<span class="bg-danger text-white">' + item + "</span>";
      }
    });

    alertBox.innerHTML = newArray.join(" ");
  };
});
