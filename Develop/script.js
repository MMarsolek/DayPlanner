$('#currentDay').text(moment().format('LL'));
var timeContainer = document.querySelector('.container')

//The following variables allow for more customization. They allow you to update the length of the calendar day and the start time.
var numOfHours = 8;
var startTime = 9;


for (var i =0; i<numOfHours;i++) {
    var timeBlock  = document.createElement('section');
    timeBlock.classList.add('timeBlock');

    var curTime = document.createElement('label');
    curTime.textContent = startTime;
    startTime++;

    var userInput = document.createElement('textarea');
    userInput.setAttribute("type", "text");
    userInput.setAttribute('columns', '5000');
    userInput.setAttribute('rows', '5%');
    if(localStorage.getItem(curTime.textContent)) {
        userInput.val(localStorage.getItem(curTime.textContent));
    }




    var saveButton = document.createElement('button');
    saveButton.classList.add('saveBtn', 'ui-button-icon-only', 'far', 'fa-save');
    
    timeBlock.appendChild(curTime);
    timeBlock.appendChild(userInput);
    timeBlock.appendChild(saveButton);

    timeContainer.appendChild(timeBlock);


    saveButton.addEventListener('click', function() {
        console.log(curTime.textContent);
        console.log(userInput.value);
        var text = userInput.value;
        localStorage.setItem(curTime.textContent, text);
    });
}


