const canvas = document.querySelector("canvas")

const flake = canvas.getContext("2d")


//flake.translate(.5*canvas.width, .5*canvas.height)

let rect = canvas.getBoundingClientRect()

canvas.width = rect.width * devicePixelRatio
canvas.height = rect.height * devicePixelRatio

flake.scale(devicePixelRatio , devicePixelRatio)

canvas.style.width = "50vw"
canvas.style.height = "35vh"

let i = 5


let p1 =  {
    x:50,
    y:100
}
let p2 =  {
    x:250,
    y:100
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


image(p1 , p2 , i)

// draw.beginPath()
// draw.moveTo((canvas.width)/4, ((canvas.height)-100))
// draw.lineTo((canvas.width)/2, ((canvas.height)-100))
// draw.stroke()