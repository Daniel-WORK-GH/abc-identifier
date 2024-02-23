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
    var num = Math.round(Number.parseFloat(str) * 10) / 10

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

const promptText = "Enter a number between -10 and 10: "
const min = -10;
const max = 10;
items[0].addEventListener('dblclick', (e) => {
    let value = prompt(promptText);

    if (value == null || value == "") {
        // User cancelled the prompt
    } else {
        if(checkInRange(min, max, value)){
            asrc.innerText = getFloatStr(value) + 'x²'
        }
    }
})

items[1].addEventListener('dblclick', (e) => {
    let value = prompt(promptText);

    if (value == null || value == "") {
        // User cancelled the prompt
    } else {
        if(checkInRange(min, max, value)){
            bsrc.innerText = getFloatStr(value) + 'x'
        }
    }
})

items[2].addEventListener('dblclick', (e) => {
    let value = prompt(promptText);

    if (value == null || value == "") {
        // User cancelled the prompt
    } else {
        if(checkInRange(min, max, value)){
            csrc.innerText = getFloatStr(value) 
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

// PHONE SUPPORT
items[0].addEventListener("touchstart", tapHandler0);
items[1].addEventListener("touchstart", tapHandler1);
items[2].addEventListener("touchstart", tapHandler2);

var tapedTwice0 = false;
var tapedTwice1 = false;
var tapedTwice2 = false;

function tapHandler0(event) {
    if(!tapedTwice0) {
        tapedTwice0 = true;
        setTimeout( function() { tapedTwice0 = false; }, 300 );
        return false;
    }
    event.preventDefault();

    let value = prompt(promptText);

    if (value == null || value == "") {
        // User cancelled the prompt
    } else {
        if(checkInRange(min, max, value)){
            asrc.innerText = getFloatStr(value) + 'x²'
        }
    }
}
 

var tapedTwice1 = false;
function tapHandler1(event) {
    if(!tapedTwice1) {
        tapedTwice1 = true;
        setTimeout( function() { tapedTwice1 = false; }, 300 );
        return false;
    }
    event.preventDefault();

    let value = prompt(promptText);

    if (value == null || value == "") {
        // User cancelled the prompt
    } else {
        if(checkInRange(min, max, value)){
            bsrc.innerText = getFloatStr(value) + 'x'
        }
    }

}

var tapedTwice2 = false;
function tapHandler2(event) {
    if(!tapedTwice2) {
        tapedTwice2 = true;
        setTimeout( function() { tapedTwice2 = false; }, 300 );
        return false;
    }
    event.preventDefault();

    let value = prompt(promptText);

    if (value == null || value == "") {
        // User cancelled the prompt
    } else {
        if(checkInRange(min, max, value)){
            csrc.innerText = getFloatStr(value) 
        }
    }
}

items[0].addEventListener('touchstart', () => { onTouchStart(asrc) })
items[1].addEventListener('touchstart', () => { onTouchStart(bsrc) })
items[2].addEventListener('touchstart', () => { onTouchStart(csrc) })

items[0].addEventListener('touchmove', (e) => { onTouchMove(e, asrc) });
items[1].addEventListener('touchmove', (e) => { onTouchMove(e, bsrc) });
items[2].addEventListener('touchmove', (e) => { onTouchMove(e, csrc) });

items[0].addEventListener('touchend', () => { onTounchEnd(asrc) })
items[1].addEventListener('touchend', () => { onTounchEnd(bsrc) })
items[2].addEventListener('touchend', () => { onTounchEnd(csrc) })

items[0].addEventListener('touchcancel', () => { onTounchEnd(asrc) })
items[1].addEventListener('touchcancel', () => { onTounchEnd(bsrc) })
items[2].addEventListener('touchcancel', () => { onTounchEnd(csrc) })

function onTouchStart(sender) {
    sender.style.visibility = 'visible'
}

function onTouchMove(e, sender) {
    sender.style.visibility = 'visible' 
    const itemindex = getItemIndex(sender)

    var touchpos = e.targetTouches[0];
    
    var uppercenter = getCenterPos(items.item(itemindex + 1))
    var lowercenter = getCenterPos(items.item(itemindex - 1))

    if(touchpos.pageX > uppercenter){
        list.insertBefore(sender, items.item(itemindex + 2));
    }else if(touchpos.pageX < lowercenter) {
        list.insertBefore(sender, items.item(itemindex - 1));
    }
    
    drawCanvas();
}

function onTounchEnd(sender) {
    sender.style.visibility = 'visible'
}
