const mainDiv = document.querySelector(".Main");
const startButton = document.querySelector(".start");
const button = document.querySelector("#reset");
const colorButtons = document.querySelectorAll("#color");
const slider = document.querySelector('.optionsSlider');
const offScreen = document.querySelector('.falseMain');
const textBoxes = document.querySelectorAll('.text');
let divList = [];
let colors = ["#000000", "#ff5733", "#fcff33", "#74ff33", "#33ffe0", "#337dff", "#ce33ff", "#ff336b", "#ffffff"];
let currentColor = "#000000";
let colorSelector = "Black";

mainDiv.style.visibility = "hidden";

//intially set divs in drawing board. Checks to see if screen is powered on. Turns on power if false, turns off if true.
startButton.addEventListener("click", initialSet);
function initialSet(){
    //turn on screen, set resolution
    if(powerToggle()){
        offScreen.style.visibility = "hidden";
        mainDiv.style.visibility = "visible";
        slider.style.visibility = "visible";

        let res = 25;
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
    //turn off screen.
    else{
        offScreen.style.visibility = "visible";
        mainDiv.style.visibility = "hidden";
        slider.style.visibility = "hidden";
        clearDivs();
    }
}

function powerToggle(){
    let powerOn = true;
    if (offScreen.style.visibility == "hidden"){
        powerOn = false;
    }
    return powerOn;
}

//update resolution if slider is at a 25% interval.
slider.oninput = function(){
    if(this.value %25 ==0){
    setResolution(this);
    }
}


function setResolution(e){
    clearDivs();
    let res = e.value;
        res = Math.ceil(res/25)*25;
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

//sets current color global var using target's inner text
colorButtons.forEach(color => color.addEventListener('click', setColor))
function setColor(e){
    colorSelector = e.target.innerText;
}

//color logic tree, uses global var set in setColor
function getColor(e){
    if (colorSelector == "Rainbow"){
        color = Math.floor(Math.random() * 7);
    }
    else if(colorSelector == "Black"){
        color = 0;
    }
    //split text to grab r from rgb. modifies value and applies it to entire rgb field
    else if(colorSelector == "GreyScale"){
        let newColor = e.target.style.background;
        splitColors = newColor.split(",", 2)
        splitColors[0] = splitColors[0].slice(4);
        let curVal = splitColors[0];
        curVal -= 16;

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
    //Logic for greyscale drawing. does not set drawn status
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
    read up on and apply media queries to text boxes. disable them when screen size is too small.
*/