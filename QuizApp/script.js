const quizData = [
    {
        question: "What color does yellow and green make?",
        a:"Lime",
        b:"Ocean Mist",
        c: "Maroon",
        d: "Tangerine",
        correct: "c",
    },
    {
        question: "MS-Word is an example of _____",
        a:"OS",
        b:"processing device",
        c:"Application software",
        d:"An input device",
        correct: "c"
    },
    {
        question:"Ctrl, Shift and Alt are called .......... keys.",
        a:"modifier",
        b:"function",
        c: "alphanumeric",
        d: "adjustment",
        correct: "a",
    },
    {
        question:"A computer cannot 'boot' if it does not have the _____",

        a:"Compiler",
        b:"Loader",
        c: "Operating system",
        d: "Assembler",
        correct: "c",        
    },
    {
        question:"With reference to Remote Sensing Technology, what does LIDAR stand for ?",
        a:"Light Detection and Ranging",
        b:"Light Direction and Revolving",
        c:"Light Dimension and Reflection",
        d:"Light Distraction and Refraction",
    }
]

const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submit_btn = document.getElementsByClassName('submit');
let current_quiz = 0;
let score = 0;
const scoreEl = document.getElementById('score_para');
loadquiz();

function loadquiz(){
    const currentquizdata = quizData[current_quiz];
    questionEl.innerText = currentquizdata.question;

    a_text.innerText = currentquizdata.a;
    b_text.innerText = currentquizdata.b;
    c_text.innerText = currentquizdata.c;
    d_text.innerText = currentquizdata.d;

}

function check(){
    const ansEl = document.getElementsByClassName('answer');
    ansEl.forEach((answers)=>{
        console.log(answers.checked());
    })
}

    submit_btn.addEventListener('click', ()=> { 
        current_quiz++;
        check();       
    })

function next_question(){

    check();
    current_quiz++;
if(current_quiz < quizData.length){
    loadquiz();
}
else{
    alert('Quiz Finished!');
}
}