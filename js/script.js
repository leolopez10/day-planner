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

//make an array of times
var times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

//Get current date for the header and display it.
var currentDate = moment().format('LL');
currentDayEl.text(currentDate);

for(var i = 0; i < times.length; i++){
    createTimeBlock();
}

createTimeBlock();

// createTimeBlock();

//create timeblocks that follow my html
function createTimeBlock(){
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

    // hourEl.text(times[i]);

    contentEl.append(hourEl);
     //create textarea for discription
    var text = $("<textarea>");
    text.addClass("description past")

    // text.attr("data-hour", times[i]);

    contentEl.append(text);
    //create a save button
    var saveBtn = $("<button>");
    saveBtn.addClass("saveBtn");
    saveBtn.text("save");
    contentEl.append(saveBtn);



}


function createTime1Block(hour) {
    var row = createEl("div", "row");
    var timeBlock = createEl("div", "time-block");
    timeBlock.appendChild(row);
    var colHour = createEl("div", "hour", hour);
    row.appendChild(colHour);
    var colText = createEl("textarea", "description", hour );
    row.appendChild(colText);
    var colSave = createEl("button", "saveBtn");
    row.appendChild(colSave);

    return timeBlock;
}















//******************************************************** */

//Call previous description
// renderDescription();
// renderRow();

// handleSave();
//Store description after clicking save button for each hour


function handleSave() {
    var saveInLocal = $(this).siblings(".description");
    var hour = saveInLocal.attr("data-hour");
    var text = saveInLocal.val();
    localStorage.setItem(hour.trim(), text.trim());

}
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

