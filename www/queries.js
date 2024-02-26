import { process_nodes, process_ways, process_relations } from "./pkg/maps.js"

const buildings = `way[building][!name];foreach{(._;>;);out;}`
const named_buildings = `way[building][name];foreach{(._;>;);out;}`
const walkways = `way[highway];foreach{(._;>;);out;}`
const trees = `node[natural=tree];foreach{(._;>;);out;}`
const gardens = `(way[leisure=garden];way[landuse=forest];way[landuse=meadow];);foreach{(._;>;);out;}`
const water = `relation[natural=water];foreach{(._;>;);out;}`

const query = `[timeout:90][bbox:${bbox}];`
export const URL = `https://overpass-api.de/api/interpreter?data=${query}`

// functions
export const getWater = async () => {
  return fetch(`${URL}${water};out;`)
    .then((response) => {
      return response.text()
    })
    .then((data) => {
      return process_relations(data, canvas.clientWidth, canvas.height)
    })
}

export const getWalkways = async () => {
  return fetch(`${URL}${walkways};out;`)
    .then((response) => {
      return response.text()
    })
    .then((data) => {
      return process_ways(data, canvas.clientWidth, canvas.height)
    })
}

export const getBuildings = async () => {
  return fetch(`${URL}${buildings};out;`)
    .then((response) => {
      return response.text()
    })
    .then((data) => {
      return process_ways(data, canvas.clientWidth, canvas.height)
    })
}

export const getNamedBuildings = async () => {
  return fetch(`${URL}${named_buildings};out;`)
    .then((response) => {
      return response.text()
    })
    .then((data) => {
      return process_ways(data, canvas.clientWidth, canvas.height)
    })
}

export const getGardens = async () => {
  return fetch(`${URL}${gardens};out;`)
    .then((response) => {
      return response.text()
    })
    .then((data) => {
      return process_ways(data, canvas.clientWidth, canvas.height)
    })
}

export const getTrees = async () => {
  return fetch(`${URL}${trees};out;`)
    .then((response) => {
      return response.text()
    })
    .then((data) => {
      return process_nodes(data, canvas.clientWidth, canvas.height)
    })
}
