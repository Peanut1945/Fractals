const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.height = 600
canvas.width = 1200
const width = canvas.width
const height = canvas.height
const maxIterations = 1000
let zoom = 1
let offsetX = 0
let offsetY = 0

function getColor(iteration) {
  // Change the colour gradient
  const r = (iteration % 256) // Red component
  const g = (iteration % 128) * 2 // Green component
  const b = (iteration % 64) * 4 // Blue component

  return [r, g, b]
}

function drawMandelbrot() {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const zx = 1.5 * (x - width / 2) / (0.5 * zoom * width) + offsetX
      const zy = (y - height / 2) / (0.5 * zoom * height) + offsetY
      let zx2 = zx
      let zy2 = zy
      let iteration = 0

      while (zx2 * zx2 + zy2 * zy2 < 4 && iteration < maxIterations) {
        const xtemp = zx2 * zx2 - zy2 * zy2 + zx
        zy2 = 2 * zx2 * zy2 + zy
        zx2 = xtemp
        iteration++
      }

      const pixelIndex = (y * width + x) * 4
      const color = iteration === maxIterations ? [0, 0, 0] : getColor(iteration)

      data[pixelIndex] = color[0] // Red component
      data[pixelIndex + 1] = color[1] // Green component
      data[pixelIndex + 2] = color[2] // Blue component
      data[pixelIndex + 3] = 255 // Alpha component
    }
  }

  ctx.putImageData(imageData, 0, 0)
}

function zoomIn(x, y) {
  offsetX = (x - width / 2) * (2 / zoom / width) + offsetX
  offsetY = (y - height / 2) * (2 / zoom / height) + offsetY
  zoom *= 2

  drawMandelbrot()
}



drawMandelbrot()
canvas.addEventListener('dblclick', (event) =>{
  const rect = canvas.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  console.log(mouseX)
  zoomIn(mouseX, mouseY)
})