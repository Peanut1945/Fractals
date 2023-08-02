const page = document.querySelector(".pageNumber")
const canvas = document.getElementById("snowflake")
const backButton = document.getElementById("left")
const nextButton = document.getElementById("right")
const info = document.querySelector(".text")
const max = 4
const min = 0


const flake = canvas.getContext("2d")

let rect = canvas.getBoundingClientRect()

// canvas.width = rect.width * devicePixelRatio
// canvas.height = rect.height * devicePixelRatio

// flake.scale(devicePixelRatio , devicePixelRatio)
canvas.width = 420
canvas.height = 420

canvas.style.width = "30vw"
canvas.style.height = "40vh"

i = 4

let p1 =  {
    x:150,
    y:0
}
let p2 =  {
    x:305,
    y:250
}
let p3 =  {
    x:0,
    y:250
}


let image = (c1 , c2 , i) => {
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
        flake.strokeStyle = "#ffffff"
        flake.stroke()
    }
    else{
        i = i -1
        //image(c1 , c2 , i)
        image(c1, p1, i)
        image(p1 , p2 , i)
        image(p2 , p3 , i)
        image(p3, c2, i)
    }
}

function drawShape(p1,p2,p3,i){
    flake.clearRect(0,0,canvas.width,canvas.height)
    image(p1 , p2 , i)
    image(p2 , p3 , i)
    image(p3 , p1 , i)
}





function pageDisplay (){
    console.log(page.value)
    if (page.value == 0){
        flake.clearRect(0,0,canvas.width,canvas.height)
        flake.beginPath()
        flake.moveTo(p1.x,p1.y)
        flake.lineTo(p2.x,p2.y)
        flake.lineTo(p3.x,p3.y)
        flake.lineTo(p1.x,p1.y)
        flake.strokeStyle = "#ffffff"
        flake.stroke()
        info.textContent = "Let's say this triangle has side length of 1. This means it has perimeter of 3 (1+1+1 = 3). But can we take this triangle and turn it into a fractile?"
    }
    else if(page.value == 1){
        let i = 1
        drawShape(p1,p2,p3,i)
        info.textContent = "As we have now split each length into thirds, but added a third to each side, we can find the new perimeter of 3 + (1/3)3 = 4 "
    }
    else if(page.value == 2){
        let i = 2
        drawShape(p1,p2,p3,i)
        info.textContent = "After a third iteration, as we can see here, each side of the original triangle has gained 4/6 (as each of the 4 smaller sections has gained half of a third = (1/6)4) so the new perimeter is now 5+1/3"
    }
    else if(page.value == 3){
        let i = 3
        drawShape(p1,p2,p3,i)
        info.textContent = "With these perimeters we have a Geometric series appearing. With each iteration the perimeter gets bigger by a factor of 4/3 (we can also see this in the fractional dimensions page). We can write this series as r=0 -> ∞ ∑ 3(4/3)^r  "
    }
    else if (page.value == 4){
        let i = 4
        drawShape(p1,p2,p3,i)
        info.textContent = "Now the astute among you may realise looking at this that as the common ratio is greater than one, this is a divergent series. This means that as the iterations aproach infinity, so does the perimeter."
    }
}

page.value = 0

backButton.addEventListener("click" , () =>{
    if(page.value != 0){
        page.value--
    }
    else {page.value = max}
    pageDisplay()
})
nextButton.addEventListener("click" , () =>{
    if(page.value != max){
        page.value++
    }
    else{
        page.value = min
    }
    pageDisplay()
})


pageDisplay()
