/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40

const width_space = 16

var goalsScored = [],
  opponents = []

var yScale = d3.scaleLinear(),
  colorScale = d3.scaleLinear(),
  xScale = d3.scaleLinear()

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (error, data) => {
    if(error) console.log(error)
    else {
      data.forEach(datum => {
        goalsScored.push(datum.GoalsScored)
        opponents.push(datum.Opponent)
      })
      yScale.domain([0, d3.max(goalsScored)])
        .range([0, height-margin])
      xScale.domain([0, goalsScored.length])
        .range([0, width-marginLeft])
      colorScale.domain([0, d3.max(goalsScored)])
        .range(['pink', 'red'])
      redraw(goalsScored, opponents)
    }
  })
}

// redraw function
let redraw = (dataset, opponents) => {
  // Your data to graph here
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return xScale(i) + marginLeft
    })
    .attr('y', (d, i) => {
      return height - yScale(d) - margin
    })
    .attr('width', (d, i) => {
      return xScale(i+1) - xScale(i) - 2
    })
    .attr('height', (d) => {
      return yScale(d)
    })
    .attr('fill', colorScale)

  let yAxisScale = yScale.domain([0, d3.max(dataset)])
    .range([height - margin, 0])

  let y_axis = d3.axisLeft()
    .scale(yAxisScale)
    .ticks(4)
    .tickPadding(3)

  svg.append('g')
    .attr('transform', `translate(${marginLeft})`)
    .call(y_axis)

  let xAxisScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, width - marginLeft])

  let x_axis = d3.axisBottom()
    .scale(xAxisScale)
    .ticks(46)
    .tickPadding(3)

  svg.append('g')
    .attr('transform', `translate(${marginLeft}, ${height-margin})`)
    .call(x_axis)
}

reload()
