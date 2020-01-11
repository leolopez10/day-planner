// Times are supposed to be 9 AM til 5 PM, but went to midnight for testing
const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

// Updates past, present, future time-blocks every 30 seconds(set up at top)
const timeBlockCheck = 30000;
var updateInterval;

// Current Day is initially Today
var curDate = moment().clone();

// Set's the current day in the header
function setCurrentDateLabel() {
    $("#currentDay").text(curDate.format('dddd, MMMM Do'));
}

// Saving info into local storage
function handleSave() {
    var saveInLocal = $(this).siblings(".description");
    var hour = saveInLocal.attr("data-hour");
    var text = saveInLocal.val();
    localStorage.setItem(getStoreDatePrefix() + hour.trim(), text.trim());
    $("#updating").fadeIn(100).fadeOut(1000);
}

// Loads current day onto the page with 5 second fade-in
function loadDay(fadeTime = 500) {
    clearInterval(updateInterval);

    $(".container").html(""); // Clear out old data
    // Creates time-blocks (from CONSTANT at top)
    for (var i = 0; i < times.length; i++) {
        $(".container").append(createTimeBlock(times[i]));
    }

    // Updates past, present, future time-blocks every 30 seconds(set up at top)
    updateInterval = setInterval(checkTimeBlocks, timeBlockCheck);

    //****************************************
    // STYLING
    // Change opacity of description on hover
    $('.description').hover(function () {
        $(this).toggleClass("active");
    });
    // Hover over save button changes opacity and makes disk larger
    $('.saveBtn').hover(function () {
        $(this).toggleClass("active");
    });

    $(".container").hide().fadeIn(fadeTime);
}

// Check the timeblocks to see if their tense has changed
// Go through each hour and compare 
function checkTimeBlocks() {
    console.log("Check Time Blocks Active");
    var $descriptions = $('.description');
    $descriptions.each(function (index) {
        var hour12 = $(this).attr("data-hour"); // Get the hour
        var t = getMoment12H(hour12);
        var tense = getTense(t);
        if ($(this).hasClass(tense)) {
            //console.log("/NO CHANGE");
        } else if (tense === "present") {
            $(this).removeClass("past future");
        } else if (tense === "past") {
            $(this).removeClass("present future");
        } else if (tense === "future") {
            $(this).removeClass("past present");
        } else {
            alert("Unknown Tense");
        }
        $(this).addClass(tense);
    });
}

// Create a Time Block Group
function createTimeBlock(hour24) {
    var row = createEl("div", "row");
    var timeBlock = createEl("div", "time-block");
    timeBlock.appendChild(row);
    var colHour = createEl("div", "col-sm-1 col-12 pt-3 hour", hour24);
    row.appendChild(colHour);
    var colText = createEl("textarea", "col-sm-10 col-12 description", hour24);
    row.appendChild(colText);
    var colSave = createEl("div", "col-sm-1 col-12 saveBtn");
    row.appendChild(colSave);
    // Disk icon from fontawesome.com
    var iconSave = createEl("i", "far fa-save");
    colSave.appendChild(iconSave);

    return timeBlock;
}

// Create a single page element
// tag = tag to create 
// cls = classes to assign
// hour24 = the current hour (only used by hour and description classes)
function createEl(tag, cls, hour24) {
    var el = document.createElement(tag);
    // Special Handling for Hour and Description Columns which need the hour
    if (hour24) {
        var t = getMoment24H(hour24);
        var displayHour = formatAmPm(t);
        if (cls.includes("description")) {
            // description class
            cls += " " + getTense(t);
            el.textContent = localStorage.getItem(getStoreDatePrefix() + displayHour);
            el.setAttribute("data-hour", displayHour);
        } else {
            // hour class
            el.textContent = displayHour.padEnd(4, " ");
        }
    }
    // Set the classes on the element
    el.setAttribute("class", cls);
    return el;
}

// Check to see if the specified time is in the past present or future compared to time now.
// t = hour moment
// returns appropriate tense class (past, present, or future)
function getTense(t) {
    var cls;
    var n = moment();

    if (n.isSame(t, "hour") &&
        n.isSame(t, "day") &&
        n.isSame(t, "month") &&
        n.isSame(t, "year")) {
        cls = "present";
    } else if (n.isAfter(t)) {
        cls = "past"
    } else {
        cls = "future";
    }
    return cls;
}

//**********************************
// GET STRING
// Get string prefix for localStorage based off curDate
function getStoreDatePrefix() {
    return curDate.format("YYYYMMDD-");
}

// Return the moment formated as a 12-hour AM/PM time string (Example: 10AM)
function formatAmPm(m) {
    return m.format("h A");
}

//**********************************
// GET MOMENT
// Create a new moment based off curDate and a 12hr AM/PM format time string
function getMoment12H(hour12) {
    return moment(curDate.format("YYYYMMDD ") + hour12, "YYYYMMDD hA");
}

// Create a new moment based off curDate and a 24hr format time string
function getMoment24H(hour24) {
    return moment(curDate.format("YYYYMMDD ") + hour24, "YYYYMMDD H");
}

// Document Ready
$(function () {
    // Set the date in the header
    setCurrentDateLabel();

    // Setup Save Button Events through the container element
    $(".container").on("click", ".saveBtn", handleSave);

    // Load the day into the view 
    loadDay();
})