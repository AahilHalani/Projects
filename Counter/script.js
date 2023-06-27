const add = document.getElementById('add');
const reset = document.getElementById('reset');
const sub = document.getElementById('subtract');
let count = 0;
let paraEl = document.getElementById('para');
let counterEl = document.getElementById('counter');
let string = 'previous count: ';
function add_counter(){
    count++;
    counterEl.innerHTML = count;
    console.log(count);
}

function reset_counter(){
    count=0;
    counterEl.innerHTML = count;
    console.log(count);
}

function sub_counter(){
    count--;
    counterEl.innerHTML = count;
    console.log(count);
}

function save(){
    paraEl.innerHTML += count + ',';
    count = 0;
    counterEl.innerHTML = count;
    console.log(count);
}

function delete_data(){
    count=0;
    counterEl.innerHTML = count;
    console.log(count);

    paraEl.innerHTML = string;
}