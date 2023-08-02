const headOne = document.getElementById("left")
const headTwo = document.getElementById("right")
const slider = document.querySelector("#iterations")
const colourIn = document.querySelector("#colour")
const serpinSlider = document.getElementById("iterations-serpin")
const colourInSerp = document.getElementById("colour-serpin")


//serpinski triangle head
const triCan = document.getElementById("Triangle")
const context = triCan.getContext("2d")

let rect2 = triCan.getBoundingClientRect()
triCan.width = rect2.width*2 * devicePixelRatio
triCan.height = rect2.height*2 * devicePixelRatio

context.scale(devicePixelRatio , devicePixelRatio)

triCan.style.width = rect2.width + "px"
triCan.style.height = rect2.height + "px"


// make snowflake
// const canvas = document.createElement("canvas")
const canvas = document.querySelector("#snowflake")
const flake = canvas.getContext("2d")

let rect = canvas.getBoundingClientRect()
canvas.width = rect.width * devicePixelRatio - 450 
canvas.height = rect.height * devicePixelRatio + 400

flake.scale(devicePixelRatio , devicePixelRatio)

// canvas.style.width = rect.width*0.75 + "px"
// canvas.style.height = rect.height + "px"


canvas.style.width = `clamp(207px,${(rect.width*0.5)/10}vw,100vw)`
canvas.style.height = rect.height + "px"



let colour = "#ffffff"
let colourSerp = "#ffffff"

let i = 4


let p1 =  {
    x:200,
    y:0
}
let p2 =  {
    x:400,
    y:350
}
let p3 =  {
    x:0,
    y:350
}


let image = (c1 , c2 , i , col) => {
    let dx = c2.x - c1.x
    let dy = c2.y - c1.y
    let angle = Math.atan2(dy , dx)
    let length = Math.sqrt(dy * dy + dx * dx)

    //work out new points
    let p1 = {
        x:c1.x + dx/3,
        y:c1.y + dy/3
    }
    let p2 = {
        x:p1.x + (length/3) * Math.cos(angle - Math.PI / 3),
        y:p1.y + (length/3) * Math.sin(angle - Math.PI / 3)
    }
    let p3 = {
        x:c1.x + 2*(dx/3),
        y:c1.y + 2*(dy/3)
    }

    //recursion
    if (i === 0){
        flake.beginPath()
        flake.moveTo(c1.x , c1.y)
        flake.lineTo(c2.x , c2.y)
        flake.strokeStyle = col
        flake.stroke()
    }
    else{
        i = i -1
        //image(c1 , c2 , i)
        image(c1, p1, i , col)
        image(p1 , p2 , i , col)
        image(p2 , p3 , i , col)
        image(p3, c2, i , col)
    }
}



//serpinski

let x = 50
let y = 600
let index = 6
let length = 550


function Serpinski (x,y,length,index,colour){
    console.log(x)
    p1t = {
        x:x+length/4,
        y:y-length*Math.sqrt(3)/4
    }
    p2t = {
        x:x+(length*3/4),
        y:y-length*Math.sqrt(3)/4
    }
    p3t = {
        x:x+length/2,
        y:y
    }

    context.beginPath()
    context.moveTo(p1t.x,p1t.y)
    context.lineTo(p2t.x,p2t.y)
    context.lineTo(p3t.x,p3t.y)
    context.lineTo(p1t.x,p1t.y)
    context.fillStyle = "#205374"
    context.fill()
    context.strokeStyle = colour
    context.stroke()

    if (index !=0) {
        Serpinski(p1t.x,p1t.y,length/2,index-1,colour)
        Serpinski(x,y,length/2,index-1,colour)
        Serpinski(x+length/2,p3t.y,length/2,index-1,colour)
    }

}

function drawSerpinski(x,y,length,index,colour){
    context.beginPath()
    context.moveTo(x,y)
    context.lineTo(x+length , y)
    context.lineTo(x+length/2 , y-length*Math.sqrt(3)/2)
    console.log(length*Math.sqrt(3)/2)
    context.lineTo(x,y)
    // context.fillStyle = "#771414"
    context.fillStyle = colour
    context.fill()
    context.strokeStyle = colour
    context.lineWidth = 0.5
    context.stroke()

    Serpinski(x,y,length,index,colour)

}


//run code

image(p1 , p2 , i , colour)
image(p2 , p3 , i , colour)
image(p3 , p1 , i , colour)

drawSerpinski(x,y,length , index , colourSerp)


// sider for koch
slider.value = 4

slider.addEventListener("change" , () => {
    flake.clearRect(0, 0, canvas.width, canvas.height)
    i = slider.value
    image(p1 , p2 , i,colour)
    image(p2 , p3 , i,colour)
    image(p3 , p1 , i,colour)
})

// colour for koch
colourIn.value = "#ffffff"

colourIn.addEventListener("change" , () => {
    colour = colourIn.value
    flake.clearRect(0, 0, canvas.width, canvas.height)
    image(p1 , p2 , i,colour)
    image(p2 , p3 , i,colour)
    image(p3 , p1 , i,colour)
})

// sierpinski slider
serpinSlider.value = 4

serpinSlider.addEventListener("change" , () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    index = serpinSlider.value
    drawSerpinski(x,y,length , index,colour)
})

//sierpinski COlour
colourInSerp.value = colourSerp

colourInSerp.addEventListener("change", () => {
    colourSerp = colourInSerp.value
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawSerpinski(x,y,length , index , colourSerp)
})
