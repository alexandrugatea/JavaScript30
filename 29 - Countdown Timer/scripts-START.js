let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    // clear existing timers
    clearTimerAnimation();

    // setInterval does not start immediately, so we need to call than as soon as the function is invoked
    // We run it immediately once, then once every second
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check when to stop 
        if(secondsLeft < 0) {
            clearTimerAnimation();
            return;
        };

        //display timer
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const hr = Math.floor(seconds / 3600).toString().padStart(2, '0');
    let remainder = seconds % 3600;

    const min = Math.floor(remainder / 60).toString().padStart(2, '0');
    remainder = Math.floor(remainder % 60)

    const sec = remainder.toString().padStart(2, '0');

    timerDisplay.querySelector(".hours").innerHTML = hr;
    timerDisplay.querySelector(".minutes").innerHTML = min;
    timerDisplay.querySelector(".seconds").innerHTML = sec;
    
    const carets = timerDisplay.querySelectorAll(".caret");
    if (sec % 2 === 0)  {
        carets.forEach(caret => caret.style.opacity = 1)
    } else {
        carets.forEach(caret => caret.style.opacity = 0)
    }
} 

function clearTimerAnimation() {
    clearInterval(countdown);
}


function displayEndTime(timestamp) {
    const end = new Date(timestamp);

    const hours = end.getHours().toString().padStart(2, '0');
    const minutes = end.getMinutes().toString().padStart(2, '0');

    endTime.textContent = `Be Back At ${hours}:${minutes}`;
}

buttons.forEach(button =>  button.addEventListener("click", startTimer));


document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const timeToAdd = parseInt(this.querySelector('[type=text]').value * 60); 
    timer(timeToAdd);
    this.reset();
});


function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

function displayCurrentTime() {
    const currentContainer = document.getElementById('currentTime'); // Ensure you have an element with this ID in your HTML
    setInterval(() => {
        let now = new Date();
        let year = now.getFullYear();
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthName = monthNames[now.getMonth()];
        let day = now.getDate();
        let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dayName = dayNames[now.getDay()];
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        // Format the time string with spans
        let timeString = `
            <span>${dayName}</span>,
            <span>${day.toString().padStart(2, '0')}</span> 
            <span>${monthName}</span>
            <span>${year}</span>
            <span>${hours.toString().padStart(2, '0')}</span>:
            <span>${minutes.toString().padStart(2, '0')}</span>:
            <span>${seconds.toString().padStart(2, '0')}</span>
        `;

        // Set the innerHTML of your container
        currentContainer.innerHTML = timeString;

    }, 1000);
}
displayCurrentTime();

