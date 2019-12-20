//Global Variables
var containerEl = $(".container");
var rowEl = $(".row");
var contentEl = $(".content");
var hourEl = $(".hour");
var timeBlock = $(".time-block");
var saveBtn = document.querySelector(".saveBtn");
var descriptionEl = document.querySelector("#description");

//Call previous description
renderDescription();
renderRow();

//Store description after clicking save button
saveBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var descriptionInput = document.querySelector("#description").value;
    localStorage.setItem("description", (descriptionInput));

})

//Render the text again if page is left
function renderDescription() {
    var description = localStorage.getItem("description");
    descriptionEl.textContent = description;
}

//Create new elements for the document.
function renderRow() {
    var row = document.createElement("div");
    row.className("col-md-12 content");
    row.style("background: black;");
    containerEl.append(row);

}


