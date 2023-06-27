const daysel = document.getElementById('dys');
const hoursel = document.getElementById('hrs');
const minutesel = document.getElementById('mins');
const secondsel = document.getElementById('secs');

const newYears = "1 Jan 2023";

function countdown(){
    const newYearsdate = new Date(newYears);
    const currentdate = new Date();

    const tseconds = (newYearsdate - currentdate) / 1000;

    const days = Math.floor(tseconds/3600/24);
    const hours = Math.floor(tseconds/3600) % 24;
    const minutes = Math.floor(tseconds/60) % 60;
    const seconds = Math.floor(tseconds % 60)

    console.log(days,hours,minutes,seconds);

    daysel.innerHTML = days;
    hoursel.innerHTML = hours;
    minutesel.innerHTML = minutes;
    secondsel.innerHTML = seconds;

    if(hours < 10){
        hoursel.innerHTML = `0${hours}`;
    }

    if(minutes < 10){
        minutesel.innerHTML = `0${minutes}`;
    }
    
    if(seconds < 10){
        secondsel.innerHTML = `0${seconds}`;

    }
}

countdown();

setInterval(countdown,1000);

const toggle = document.getElementById('toggle');

toggle.addEventListener('change', (e) =>{
    document.body.classList.toggle('dark',e.target.checked)
});