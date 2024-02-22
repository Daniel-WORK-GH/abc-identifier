const list = document.getElementById('sortlist')

const asrc = document.getElementById('axx')
const bsrc = document.getElementById('bx')
const csrc = document.getElementById('cnum')
const adst = document.getElementById('texta')
const bdst = document.getElementById('textb')
const cdst = document.getElementById('textc')

/**
 * @type {HTMLCollectionOf<HTMLElement>}
 */
const items = document.getElementsByClassName('item')

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var pickedup = undefined;
var pickedupcopy = undefined;

/**
 * @param {HTMLElement} e 
 */
function getCenterPos(e) {
    if(!e) return;

    var rect = e.getBoundingClientRect();
    
    return (rect.left + rect.right) / 2
}

function getItemIndex(e) {
    for(let i = 0; i < items.length; i++){
        if(e == items.item(i)){
            return i;
        }
    }
    
    return undefined;
}

function checkInRange(min, max, str) {
    var num = Number.parseFloat(str)
    return min <= num && num <= max
}

function getFloatStr(str) {
    var num = Math.round(Number.parseFloat(str) * 100) / 100

    if(num > 0) return "+ " + num;
    return "- " + (-num)
}


function drawCanvas() {
    function getCanvasPos(e) {
        var center = getCenterPos(e)
        var left = canvas.getBoundingClientRect().left;
        center -= left

        return center
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var canvasasrc = getCanvasPos(asrc)
    var canvasadst = getCanvasPos(adst)

    var canvasbsrc = getCanvasPos(bsrc)
    var canvasbdst = getCanvasPos(bdst)

    var canvascsrc = getCanvasPos(csrc)
    var canvascdst = getCanvasPos(cdst)

    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(canvasasrc, 0)
    ctx.lineTo(canvasadst, 150)
    ctx.stroke()

    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(canvasbsrc, 0)
    ctx.lineTo(canvasbdst, 150)
    ctx.stroke()

    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(canvascsrc, 0)
    ctx.lineTo(canvascdst, 150)
    ctx.stroke()
}

drawCanvas()

const promptText = "Enter a number between -25 and 25: "
const min = -25;
const max = 25;
items[0].addEventListener('dblclick', (e) => {
    let value = prompt(promptText);

    if (value == null || value == "") {
        // User cancelled the prompt
    } else {
        if(checkInRange(min, max, value)){
            items[0].innerText = getFloatStr(value) + 'x²'
        }
    }
})

items[1].addEventListener('dblclick', (e) => {
    let value = prompt(promptText);

    if (value == null || value == "") {
        // User cancelled the prompt
    } else {
        if(checkInRange(min, max, value)){
            items[1].innerText = getFloatStr(value) + 'x'
        }
    }
})

items[2].addEventListener('dblclick', (e) => {
    let value = prompt(promptText);

    if (value == null || value == "") {
        // User cancelled the prompt
    } else {
        if(checkInRange(min, max, value)){
            items[2].innerText = getFloatStr(value) 
        }
    }
})

list.addEventListener('dragstart', (e) => {
    pickedup = e.target;
    pickedupcopy = e.target.cloneNode(true)

    setTimeout(() => {
        e.target.style.visibility = 'hidden' 
    }, 0);
});

list.addEventListener('dragover', (event) => {
    const itemindex = getItemIndex(pickedup)

    var uppercenter = getCenterPos(items.item(itemindex + 1))
    var lowercenter = getCenterPos(items.item(itemindex - 1))

    if(event.pageX > uppercenter){
        console.log(`${event.pageX} > ${uppercenter}`);
        list.insertBefore(pickedup, items.item(itemindex + 2));
    }else if(event.pageX < lowercenter) {
        console.log(`${event.pageX} < ${lowercenter}`);
        list.insertBefore(pickedup, items.item(itemindex - 1));
    }
});

list.addEventListener('dragend', (e) => {
    e.target.style.visibility = 'visible' 
    pickedup = undefined
    drawCanvas();
});

// Reset the pickedup item when its let down
document.addEventListener('mouseup', () => {
    pickedup = undefined;
    pickedupcopy = undefined;
});