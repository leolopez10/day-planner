//Global Variables
var containerEl = $(".container");
var rowEl = $(".row");
var contentEl = $(".content");
var timeBlock = $(".time-block");
var hourEl = $(".hour");
var currentDayEl = $("#currentDay");

// descriptions for each hour
var descriptionEl = $("#description");
var saveBtn = $(".saveBtn");


//Call previous description
renderDescription();
// renderRow();

//Get current date for the header and display it.
moment().format('LL');

//Store description after clicking save button for each hour
//9am
saveBtn.on("click", function (event) {
    event.preventDefault();
    var descriptionInput = $("#description").val();
    localStorage.setItem("discription", (descriptionInput));

})
    
//Render the text again if page is left
function renderDescription() {
    var description = localStorage.getItem("discription");
    descriptionEl.text(description);
}




