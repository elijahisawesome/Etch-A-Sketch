const mainDiv = document.querySelector(".Main");
const button = document.querySelector("#reset");
const resButtons = document.querySelectorAll("#resolution");

let divList = [];


resButtons.forEach(button => button.addEventListener('click', setResolution));


function setResolution(e){
let res = e.target.classList.item(0);
let squareRes = res*res;
let boxDimensions = res/400;


    for (let x = 0; x < squareRes; x++){
        divList[x] = document.createElement('div');
        divList[x].classList.add("box");
	    console.log(divList[x]);
    }

    
	mainDiv.style.grid-template-columns = `${boxDimensions} ${boxDimensions} ${boxDimensions} ${boxDimensions}`;
	mainDiv.style.grid-template-rows = `${boxDimensions} ${boxDimensions} ${boxDimensions} ${boxDimensions}`;

	appendDivs();

}

function appendDivs(){
	divList.forEach(div => mainDiv.appendChild(div));
	divList.forEach(div => div.addEventListener('mouseover', draw));
}

function draw(e){
    e.target.classList.add("drawn");
}

button.addEventListener('click', reset);

function reset(e){
    divList.forEach(div =>  div.classList.remove("drawn"));

}


/*TODO
    
    allow different grid sizes

    allow different drawing colors
        allow grey-scale drawing color that adds a percentage opacity/value




*/