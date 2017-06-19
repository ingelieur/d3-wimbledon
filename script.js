/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40

const width_space = 15

var goalsScored = []

var yScale = d3.scaleLinear()

var colorScale = d3.scaleLinear()

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

//svg.selectAll('rect')
//  .data(dataset)
//  .enter()
//  .append('rect')


// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (error, data) => {
    if(error) console.log(error)
    else {
      data.forEach(datum => {
        goalsScored.push(datum.GoalsScored)
      })
      yScale.domain([0, d3.max(goalsScored)])
        .range([0, height])
      colorScale.domain([0, d3.max(goalsScored)])
        .range(['green', 'red'])
      redraw(goalsScored)
    }
  })
}

// redraw function
let redraw = (dataset) => {
  // Your data to graph here
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i*width_space
    })
    .attr('y', (d, i) => {
      return height - yScale(d)
    })
    .attr('width', 13)
    .attr('height', (d) => {
      return yScale(d)
    })
    .attr('fill', colorScale)
}

reload()
