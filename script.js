const mainDiv = document.querySelector(".Main");
const startButton = document.querySelector(".start");
const button = document.querySelector("#reset");
const resButtons = document.querySelectorAll("#resolution");
const colorButtons = document.querySelectorAll("#color");
let divList = [];
let colors = ["#000000", "#ff5733", "#fcff33", "#74ff33", "#33ffe0", "#337dff", "#ce33ff", "#ff336b", "#ffffff"];
let currentColor = "#000000";
let colorSelector = "Black";

mainDiv.style.visibility = "hidden";

//intially set divs in drawing board.
startButton.addEventListener("click", initialSet);
function initialSet(){
    mainDiv.style.visibility = "visible";
    startButton.style.visibility = "hidden";

    let res = 10;
    let squareRes = res*res;
    let boxDimensions = 400/res;
        for (let x = 0; x < squareRes; x++){
            divList[x] = document.createElement('div');
            divList[x].classList.add("box");
        }
        mainDiv.style.gridTemplateColumns = `repeat(auto-fill, ${boxDimensions}px)`;
        mainDiv.style.gridTemplateRows = `repeat(auto-fill, ${boxDimensions}px)`;
    appendDivs();
    reset();
}

resButtons.forEach(button => button.addEventListener('click', setResolution));
function setResolution(e){
    clearDivs();
    let res = e.target.classList.item(0);
    let squareRes = res*res;
    let boxDimensions = 400/res;
        for (let x = 0; x < squareRes; x++){
            divList[x] = document.createElement('div');
            divList[x].classList.add("box");
            console.log(divList[x]);
        }
        mainDiv.style.gridTemplateColumns = `repeat(auto-fill, ${boxDimensions}px)`;
        mainDiv.style.gridTemplateRows = `repeat(auto-fill, ${boxDimensions}px)`;
    appendDivs();
    reset();
}


colorButtons.forEach(color => color.addEventListener('click', setColor))
function setColor(e){
    colorSelector = e.target.innerText;
}


function getColor(e){
    if (colorSelector == "Rainbow"){
        color = Math.floor(Math.random() * 7);
    }
    else if(colorSelector == "Black"){
        color = 0;
    }
    else if(colorSelector == "GreyScale"){
        let newColor = e.target.style.background;
        splitColors = newColor.split(",", 2)
        splitColors[0] = splitColors[0].slice(4);
        let curVal = splitColors[0];
        curVal -= 16;

        console.log(curVal);
        console.log(typeof(curVal));
        return `rgba(${curVal}, ${curVal}, ${curVal}, 1)`;
    }
    else if(colorSelector == "Erase"){
        color = 8;
    }
    return colors[color];
}

function clearDivs(){
    divList.forEach(div => mainDiv.removeChild(div));
}

function appendDivs(){
	divList.forEach(div => mainDiv.appendChild(div));
	divList.forEach(div => div.addEventListener('mouseover', draw));
    divList.forEach(div => div.classList.add("pixel"));
}

function draw(e){
    //Logic to draw on an un-drawn square.
    if(!e.target.classList.contains("drawn") && (colorSelector !="Erase") &&(colorSelector != "GreyScale")){
        currentColor = getColor(e);
        e.target.style.background = `${currentColor}`;
        e.target.classList.add("drawn");
    }
    //Logic for greyscale drawing.
    else if(!e.target.classList.contains("drawn") && colorSelector == "GreyScale"){
        currentColor = getColor(e);
        e.target.style.background = `${currentColor}`;
    }
    //Remove drawn status from pixel and reset color to white.
    else if(colorSelector == "Erase"){
        e.target.style.background = `white`;
        e.target.classList.remove("drawn");
    }
}

button.addEventListener('click', reset);

function reset(e){
    divList.forEach(div =>  div.classList.remove("drawn"));
    divList.forEach(div =>  div.style.background = "rgba(255,255,255,1)");
}


/*TODO
       Allow user-inputtable grid size. Perhaps with a sliding scale.

       Make it pretty
*/