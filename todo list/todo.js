//getting all required elements

const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todo = document.querySelector(".list");
const cl = document.querySelector(".clear-all");
inputBox.onkeyup = ()=>{
    let userdata = inputBox.value; //getting user entered value
    if(userdata.trim() != 0){ //check if user values are not only spaces
        addBtn.classList.add("active"); // add the css property for active button
    }else{
        addBtn.classList.remove("active"); // remove active button property
    }
}

showlist();
// inputBox.addEventListener("keyup",function(event){
//     if(event.keycode === 13){
//         event.preventDefault();
//         add_item();
//     }
// })

addBtn.onclick = ()=>{
    let userdata = inputBox.value;
    let ls = localStorage.getItem("New todo");
    if(ls == null){
        arr = [];
    }else{
        arr = JSON.parse(ls);
    }
    let text = "new item added";
    arr.push(userdata);
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    localStorage.setItem("New todo",JSON.stringify(arr) );
    showlist();
    addBtn.classList.remove("active"); // remove active button property

}
function showlist(){
    let ls = localStorage.getItem("New todo");
    if(ls == null){
        arr =[];
    }else {
        arr = JSON.parse(ls);
    }


    const pending = document.querySelector(".pending");
    pending.textContent = arr.length;
    if(arr.length > 0){
        cl.classList.add("active");
    }else{
        cl.classList.remove("active");
    }
    
    let new_item = '';
    for(let i=0;i<arr.length;i++) {
       new_item += `<li>${arr[i]}<span onclick="delete_task(${i})"><i class = "fas fa-trash"></i></span></li>` 
    };
    todo.innerHTML = new_item;
    inputBox.value = "";
}
//delete task

function delete_task(i){
    let ls = localStorage.getItem("New todo");
    arr = JSON.parse(ls);
    arr.splice(i,1);
//    let text = "Item Removed";
//   let utterance = new SpeechSynthesisUtterance(text);
//    speechSynthesis.speak(utterance);    
    //update the local storage again after removing a todo

    localStorage.setItem("New todo",JSON.stringify(arr));
    showlist();
}

cl.onclick = ()=>{
//    let text = "All Items Removed";
    arr = [];
//    let utterance = new SpeechSynthesisUtterance(text);
//    speechSynthesis.speak(utterance);  
    localStorage.setItem("New todo",JSON.stringify(arr));
    showlist();
}