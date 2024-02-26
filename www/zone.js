export const zone = {
  n: 45.7868,
  s: 45.772,
  e: 4.8611,
  w: 4.8432,
}
export const bbox = `${s},${w},${n},${e}`

const WINDOW_PROPORTION = 0.8
const RATIO = (targetZone.n - targetZone.s) / (targetZone.e - targetZone.w)

export const createZoneCanvas = (canvas) => {
  // size the canvas
  let width, height
  if (window.innerWidth / window.innerHeight > RATIO) {
    height = window.innerHeight
    width = window.innerHeight * RATIO
  } else {
    height = window.innerWidth / RATIO
    width = window.innerWidth
  }

  canvas.height = height * WINDOW_PROPORTION
  canvas.width = width * WINDOW_PROPORTION

  // draw the background
  let ctx = canvas.getContext("2d")
  if (!ctx) {
    console.error("Impossible to fetch the 2d context")
    return
  }

  // rectangle background
  ctx.beginPath()
  ctx.rect(0, 0, width * WINDOW_PROPORTION, height * WINDOW_PROPORTION)
  ctx.fillStyle = "rgba(100, 100, 100, 0.1)"
  ctx.fill()
}
