const mainDiv = document.querySelector(".Main");
const button = document.querySelector("#reset");
let divList = [];

for (let x = 0; x < 16; x++){
    divList[x] = document.createElement('div');
    divList[x].classList.add("box");
}

divList.forEach(div => mainDiv.appendChild(div));
divList.forEach(div => div.addEventListener('mouseover', draw));

function draw(e){
    e.target.classList.add("drawn");
}

button.addEventListener('click', reset);

function reset(e){
    divList.forEach(div =>  div.classList.remove("drawn"));

}


/*TODO
    increase size to 400x400px
    
    allow different grid sizes

    allow different drawing colors
        allow grey-scale drawing color that adds a percentage opacity/value




*/