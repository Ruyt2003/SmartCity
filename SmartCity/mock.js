const mockjs = require("mockjs");
const wuhan_builds = require("./GIS_DATA/Wuhan_Buildings.json")
const wuhan_roads = require("./GIS_DATA/Wuhan_roads.json")
const wuhan_events=require('./GIS_DATA/Wuhan_events.json')
const wuhan_population = require('./GIS_DATA/wuhanPop.json')
const subLine = require('./GIS_DATA/地铁_线路.json')
const subStation = require('./GIS_DATA/地铁_站点.json')

module.exports = () => {
      return mockjs.mock({
            wuhan_builds,
            wuhan_roads,
            wuhan_events,
            wuhan_population,
            subLine,
            subStation
      })
}