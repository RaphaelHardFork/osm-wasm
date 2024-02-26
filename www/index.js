import init from "./pkg/maps.js"
import {
  getBuildings,
  getGardens,
  getNamedBuildings,
  getTrees,
  getWalkways,
  getWater,
} from "./queries.js"
import { createZoneCanvas } from "./zone.js"

// constants
const WATER_COLOR = "rgb(83,156,156)"
const GARDENS_COLOR = "rgb(136,172,140)"
const WALKWAYS_COLOR = "rgb(0,0,0)"
const TREES_COLOR = "rgb(40,107,83)"
const BUILDINGS_COLOR = "rgb(98,90,87)"
const NAMED_BUILDINGS_COLOR = "rgb(220,177,102)"

// drawing the canvas
let canvas = document.getElementById("canvas")
createZoneCanvas(canvas)

window.addEventListener("resize", () => {
  createZoneCanvas(canvas)
})

// main script
async function run() {
  await init()
  console.log("🎬 WASM initated")

  let ctx = canvas.getContext("2d")

  const water_data = getWater(url)
  const garden_data = getGardens(url)
  const walkway_data = getWalkways(url)
  const tree_data = getTrees(url)
  const building_data = getBuildings(url)
  const nbuilding_data = getNamedBuildings(url)

  console.log("🔍 fetch OSM data")

  Promise.all([
    water_data,
    garden_data,
    walkway_data,
    tree_data,
    building_data,
    nbuilding_data,
  ]).then((values) => {
    const [water, gardens, walkways, trees, buildings, named_buildings] = values
    drawPolygons(ctx, water, WATER_COLOR, null)
    drawPolygons(ctx, gardens, GARDENS_COLOR, null)
    drawPolygons(ctx, walkways, null, WALKWAYS_COLOR)
    for (let tree of trees) {
      ctx.beginPath()
      ctx.arc(tree[0], tree[1], 3, 0, 2 * Math.PI)
      ctx.fillStyle = TREES_COLOR
      ctx.fill()
      ctx.closePath()
    }
    drawPolygons(ctx, buildings, BUILDINGS_COLOR, null)
    drawPolygons(ctx, named_buildings, NAMED_BUILDINGS_COLOR, null)
  })
}

run()

function drawPolygons(ctx, p, fill, stroke) {
  for (let polygon of p) {
    ctx.beginPath()
    for (let point of polygon) {
      ctx.lineTo(point[0], point[1])
    }
    if (fill) {
      ctx.fillStyle = fill
      ctx.fill()
    }
    if (stroke) {
      ctx.strokeStyle = stroke
      ctx.stroke()
    }
    ctx.closePath()
  }
}
