//Challenge 1: Age in Days
var age;
var year;
var result;

let days = document.getElementById('ans');

function ageindays(){
    year = prompt("Enter birth year: ");
    age = 2021 - year;
    result = age * 365;
    days.innerText = 'You are ' + result + ' days old';
}


function reset(){
    days.innerText = 'Press click to show result';
}

function gen(){
    var image = document.createElement('img');
    var div = document.getElementById('cat');
    image.src = "https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg";
    div.append(image);
}

    var rps = ['rock','paper','scissor'];
    var c_mess = "Computer Wins";
    var p_mess = "Player Wins";
    var text = " ";
    var t_mess = "Its a Tie!";

function rps_game(clickid){

    
    let choice = clickid;
    let human = choice;
    let computer = generate_random();
    let mess = document.getElementById('message');

    if (human === "rock") {
            if (computer === "scissor") {
                console.log(p_mess);
                text = p_mess;
            } else if (computer === "paper"){
                console.log(c_mess);
                text = c_mess;
            } else if(computer === 'rock'){
                text = t_mess;
            }
    }else if (human === "paper" ){
            if (computer === "scissor") {
                console.log(c_mess);
                text = c_mess;
            } else if(computer === "rock"){
                console.log(p_mess);
                text = p_mess;
            } else if(computer === 'paper'){
                text = t_mess;
            }
    }else if(human === "scissor"){ 
            if (computer === "paper"){
                console.log(p_mess);
                text = p_mess;
            }else if(computer === "rock"){
                console.log(c_mess);
                text = c_mess;
            }else if(computer === 'scissor'){
                text = t_mess;
            }
    }


   let first_image = document.createElement('img');
   first_image.src = document.getElementById(human).src;
   console.log(first_image);

   let second_image = document.createElement('img');
   second_image.src = document.getElementById(computer).src;
   console.log(second_image);

   mess.textContent = text;
   document.getElementById('rock').remove();
   document.getElementById('paper').remove();
   document.getElementById('scissor').remove();
   
   let images_div = document.getElementById('images-div');
   images_div.appendChild(first_image);
   images_div.appendChild(second_image);
   //images_div.appendChild(t);


}

function click_id(clicked_id){
    console.log(clicked_id);
    clickid = clicked_id;
    rps_game(clickid);
    
}
function generate_random(){
    let n = Math.floor(Math.random() * 3);
    m = rps[n];
    console.log(m);
    return m;
}

//Changing Buttons Color:

var all_buttons = document.getElementsByTagName('button');
var  copy_all_buttons = []

for(let i=0;i<all_buttons.length;i++){
    copy_all_buttons.push(all_buttons[i].classList[1]);
}
console.log(copy_all_buttons);

function change(){
    let d = document.getElementById('r').value;
    console.log(d);

    console.log(b.value);

    if(b.value === 'Red'){
        red();
    }
}

function red(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    }
}