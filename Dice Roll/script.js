const picdata = [
    'url("./images/1.png")',
    'url("./images/2.png")',
    'url("./images/3.png")',
    'url("./images/4.png")',
    'url("./images/5.png")',
    'url("./images/6.png")'
]

// const random1 = Math.floor(Math.random()*picdata.length)+1;
// console.log(random1);

// const img1 = "./images/" + random1 + ".png";
// console.log(img1);

// document.querySelectorAll("img")[0].setAttribute("src",img1);

// const random2 = Math.floor(Math.random()*picdata.length)+1;
// console.log(random2);

// const img2 = "./images/" + random2 + ".png";
// console.log(img2);

// document.querySelectorAll("img")[1].setAttribute("src",img2);


// if (random1 > random2){
//     document.querySelector('h1').textContent = "User 1 Wins!";     
// }
// else if(random2 > random1){
//     document.querySelector('h1').textContent = "User 2 Wins!";
// }
// else{
//     document.querySelector('h1').textContent = "It's a Draw!"; 
// }


const pic = document.querySelector(".dice");
var id1;

function start(){
    var a = Math.floor(Math.random()*picdata.length); 
    console.log(a);
    var img = picdata[a];
    console.log(img);
    pic.style.background = img;
}

function startroll(){
    id1 = setInterval(start,100);
}

function stoproll(){
    clearInterval(id1);
}
