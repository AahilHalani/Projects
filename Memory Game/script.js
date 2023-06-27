const section = document.querySelector("section");
let lives = document.querySelector("span");

let live_count = 10;

lives.textContent = `Lives: ${live_count}`;

const getData = () => [
    {imgSrc: "./images/bomb.jpg", name: "bomb"},
    {imgSrc: "./images/lion.jpg", name: "lion"},
    {imgSrc: "./images/buddha.jpg", name: "buddha"},
    {imgSrc: "./images/lemon.jpg", name: "lemon"},
    {imgSrc: "./images/snake.jpg", name: "snake"},
    {imgSrc: "./images/ribbon.jpg", name: "ribbon"},
    {imgSrc: "./images/star.jpg", name: "star"},
    {imgSrc: "./images/eye.jpg", name: "eye"},
    {imgSrc: "./images/bomb.jpg", name: "bomb"},
    {imgSrc: "./images/lion.jpg", name: "lion"},
    {imgSrc: "./images/buddha.jpg", name: "buddha"},
    {imgSrc: "./images/lemon.jpg", name: "lemon"},
    {imgSrc: "./images/snake.jpg", name: "snake"},
    {imgSrc: "./images/ribbon.jpg", name: "ribbon"},
    {imgSrc: "./images/star.jpg", name: "star"},
    {imgSrc: "./images/eye.jpg", name: "eye"},
];

//randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

const cardGenerator = () => {
    const cardData = randomize();
    cardData.forEach((item)=>{
        console.log(item);

        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');

        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach image to the cards

        face.src = item.imgSrc;  
        card.setAttribute('name', item.name);
        //Attach cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle("toggle");
            checkcards(e);

        });
    });
};

const checkcards = (e)=> {
    console.log(e);
    const clickedcard = e.target;
    clickedcard.classList.add('flipped');
    const flippedcards = document.querySelectorAll('.flipped')

    
    if(flippedcards.length === 2){
        if(flippedcards[0].getAttribute('name') === flippedcards[1].getAttribute('name')){
            console.log('match');
            flippedcards.forEach((card)=>{
                card.classList.remove('flipped')
                card.style.pointerEvents = 'none';
            });
        }else{
            console.log('wrong');
            flippedcards.forEach((card) =>{
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggle'),1500);
            });
            live_count--;
            lives.innerHTML = `Lives: ${live_count}`;

            if(live_count == 0){
                lives.innerHTML = `Lives: ${live_count}`;
                setTimeout(() => alert('Game Over!'),1000);   
                let cardData = randomize();
                let cards = document.querySelectorAll('.card');
                cardData.forEach((item,index) =>{
                    setTimeout(() => cards[index].classList.remove('toggle'),1000);
                    cards[index].style.pointerEvents = 'none';
                    setTimeout(() => cards[index].classList.toggle('toggle_face'),1000);
                })
            }
        }
    }
}

// const restart = () => {
//     let cardData = randomize();
//     let faces = document.querySelectorAll('.face');
//     let cards = document.querySelectorAll('.card');

//     cardData.forEach((index,item) => {
//         cards[index].classList.remove('toggle');
//     })

// };

cardGenerator(); 