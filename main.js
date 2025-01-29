const inputField = document.getElementById("task");
const taskList = document.getElementById("tasks");
let popup = document.getElementById("popup");

const daySelect = document.getElementById("day");
const monthSelect = document.getElementById("month");
const hourSelect = document.getElementById("hour");
const minuteSelect = document.getElementById("minute");

const dateTimePicker = document.getElementById("date-time-picker");

const months = [
  ["January", 31],
  ["February", 28],
  ["March", 31],
  ["April", 30],
  ["May", 31],
  ["June", 30],
  ["July", 31],
  ["August", 31],
  ["September", 30],
  ["October", 31],
  ["November", 30],
  ["December", 31],
];

(function fillMonthSection() {
  for (let i = 0; i < months.length; i++) {
    const option = document.createElement("option");
    option.textContent = months[i][0];
    monthSelect.appendChild(option);
  }

  monthSelect.value = months[0][0];
})();

function fillDaySection(month) {
  daySelect.options.length = 0;
  let dayNum = months.find((months) => months[0] === month)[1];
  for (let i = 1; i <= dayNum; i++) {
    const option = document.createElement("option");
    option.textContent = i;
    daySelect.appendChild(option);
  }

  daySelect.value = "1";
}

function fillHourSection() {
  for (let i = 0; i < 24; i++) {
    const element = document.createElement("option");
    element.textContent = i.toString(10).padStart(2, "0");
    hourSelect.appendChild(element);
  }
}

function fillMinuteSection() {
  for (let i = 0; i < 60; i++) {
    const element = document.createElement("option");
    element.textContent = i.toString(10).padStart(2, "0");
    minuteSelect.appendChild(element);
  }
}

function newTask() {
  if (inputField.value != "") {
    popup.classList.add("popup-container-opened");
  }
}

function removeTask(button) {
  console.log(button);
  button.className = "button-done";

  let element = button.parentElement;
  element.className = "task-done";
  setTimeout(() => {
    element.remove();
  }, 1000);
}

function createNewTask() {
  popup.classList.remove("popup-container-opened");

  let newButton = document.createElement("button");
  newButton.setAttribute("onclick", "removeTask(this)");

  let newElement = document.createElement("li");
  newElement.appendChild(newButton);
  newElement.appendChild(document.createTextNode(inputField.value));

  taskList.append(newElement);

  inputField.value = "";
  popup.classList.add("popup-remove");

  setTimeout(() => {
    popup.classList.remove("popup-remove");
  }, 500);

  dateTimePicker.classList.remove("date-time-picker-opened");
}

function selectTime() {
  if (!dateTimePicker) {
    console.error("Element with ID 'date-time-picker' not found.");
    return;
  }

  dateTimePicker.classList.toggle("date-time-picker-opened");
}

fillDaySection(monthSelect.value);
fillHourSection();
fillMinuteSection();

monthSelect.onchange = function () {
  fillDaySection(monthSelect.value);
};
