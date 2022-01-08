$('#currentDay').text(moment().format('LL'));
var timeContainer = $('.container');
const idTypeInput = 'input-';


var noteObj = {
    textObj: {}
};

//The following variables allow for more customization. They allow you to update the length of the calendar day and the start time.
var numOfHours = 8;
var startTime = 9;

//Creates the base layout for the day planner.
function startUp() {
    var newNumOfHours = startTime;
    var newStartTime = startTime;

    //Iterates through the list to create a flexible number of hours that can easily be changed.
    for (var i =0; i<newNumOfHours;i++) {

        var timeBlock = $('<section/>');
        timeContainer.append(timeBlock);
        timeBlock.addClass('timeBlock');
    
        var curTime = ($('<label/>'));
        curTime.append(moment(newStartTime, "h").format("h a"));
        
        let userInput = ($('<textarea/>'))
        userInput.attr("type", "text");
        userInput.attr('id', idTypeInput + newStartTime);
        userInput.val('');

        let saveButton = ($('<button/>'));
        saveButton.addClass('saveBtn far fa-save');
        saveButton.attr('id', newStartTime);
    
        timeBlock.append(curTime);
        timeBlock.append(userInput);
        timeBlock.append(saveButton);

        newStartTime++;
        if(newStartTime == 23){
            newStartTime = 0;
        }
    
        saveButton.click(updateLocalStorage);
    }
    updateTextDisplay();

}


//Adds the textarea value to the local storage on save
function updateLocalStorage(event) {
    let text = $('#'+ idTypeInput + event.target.id ).val();
    noteObj['textObj'][event.target.id] = text;
    localStorage.setItem('noteObj', JSON.stringify(noteObj));
    updateTextDisplay();
}

//Updates the current textareas one loading and saving
function updateTextDisplay(){
    var newNumOfHours = startTime;
    var newStartTime = startTime;
    var curObj;
    if(localStorage.getItem('noteObj')){   
        curObj = JSON.parse(localStorage.getItem('noteObj'));
    } else curObj = noteObj;
    
    for(var i = 0; i < newNumOfHours; i++){
        if(!curObj['textObj'][i+newStartTime]){
            $('#'+ idTypeInput + [i+newStartTime] ).val("");
        } else {
            
            $('#'+ idTypeInput + [i+newStartTime] ).val(curObj['textObj'][i+newStartTime]);
        }
        startTime++;
        if(newStartTime == 23){
            newStartTime = 0;
        }
        updateColor([i+newStartTime]);

    }
}


//On loading and updating the site, it will add and remove classes to match the colors needed based on the current time. 
function updateColor(hour) {
    var curHour = moment().hours();
    if (hour - curHour > 0) {
        $('#' + idTypeInput + hour).addClass('future');
        $('#' + idTypeInput + hour).removeClass('past');
        $('#' + idTypeInput + hour).removeClass('present');
    }else if (hour - curHour <0) {
        $('#' + idTypeInput + hour).addClass('past');
        $('#' + idTypeInput + hour).removeClass('future');
        $('#' + idTypeInput + hour).removeClass('present');
    }else{
        $('#' + idTypeInput + hour).addClass('present');
        $('#' + idTypeInput + hour).removeClass('past');
        $('#' + idTypeInput + hour).removeClass('future');

    }
}

function main() {
    startUp();
    updateTextDisplay();
}

main();