// //Global Variables
var containerEl = $(".container");
// var rowEl = $(".row");
var contentEl = $(".content");
// var timeBlock = $(".time-block");
// var hourEl = $(".hour");
var currentDayEl = $("#currentDay");

// // descriptions for each hour
// var descriptionEl = $("#description");
// var saveBtn = $(".saveBtn");
//**************************************************************** */

console.log(moment().clone())

//make an array of times
var times = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

//Get current date for the header and display it.
// var currentDate = moment().format('LL');
var currentDate = moment().format('MMMM Do YYYY, h:mm');
currentDayEl.text(currentDate);

for (var i = 0; i < times.length; i++) {
    createTimeBlock();
    saveToBrowser();

}


// createTimeBlock();

//create timeblocks that follow my html
function createTimeBlock() {
    //Create container element
    var containerEl = $(".container");
    //create timeblock
    var timeBlock = $("<div>");
    timeBlock.addClass("time-block");
    containerEl.append(timeBlock);
    //create row
    var rowDiv = $("<div>");
    rowDiv.addClass("row");
    timeBlock.append(rowDiv);
    //create contentDiv
    var contentEl = $("<div>");
    contentEl.addClass("col-md-12 content");
    rowDiv.append(contentEl);
    //create hour div
    var hourEl = $("<div>");
    hourEl.addClass("hour");
    //look up how to formate these number into time
    hourEl.text(times[i]);
    contentEl.append(hourEl);
    //create textarea for discription
    var text = $("<textarea>");
    text.addClass("description past")
    text.attr("data-hour", times[i]);
    contentEl.append(text);
    //create a save button
    var saveBtn = $("<button>");
    saveBtn.addClass("saveBtn");
    saveBtn.text("save");
    contentEl.append(saveBtn);





    saveBtn.on("click", function () {
        var saveInLocal = $(this).prev(".description");
        var hour = saveInLocal.attr("data-hour");
        var text = saveInLocal.val();
        localStorage.setItem(hour, text);
    })

    return timeBlock;

}


// handleSave();
//Store description after clicking save button for each hour
function saveToBrowser() {


}


//******************************************************** */

//Call previous description
// renderDescription();
// renderRow();



// saveBtn.on("click", function (event) {
//     event.preventDefault();
//     var descriptionInput = $("#description").val();
//     localStorage.setItem("description", (descriptionInput));

// })

// //Render the text again if page is left
// function renderDescription() {
//     var description = localStorage.getItem("discription");
//     descriptionEl.text(description);
// }

//************************************************************************** */

