import React from 'react';
import {
  select,
  scaleLinear,
  scaleOrdinal,
  scaleBand,
  max,
  axisLeft,
  axisBottom,
  area,
  line,
  curveMonotoneX,
  nest,
  selectAll,
} from 'd3';
import './engagementTrends.scss';

export const EngagementTrends = () => (
  <div>
    <svg className="svgDiv" />
  </div>
);

// constants
const svgWidth = '1000';
const svgHeight = '300';
const margin = {
  top: 100, left: 50, bottom: 50, right: 10,
};
const innerWidth = svgWidth - margin.left - margin.right;
const innerHeight = svgHeight - margin.top - margin.bottom;
const circleRadius = 2;
const onBoardingLabel = 'onBoarding';
const offBoardingLabel = 'offBoarding';
const xValue = d => d.finalDate;
const yValue = d => d.totalNumber;
const colorValue = d => d.automationType;

// generate color for area graph
const areaColorScale = scaleOrdinal()
  .domain(['onBoarding', 'offboarding'])
  .range(['rgb(216,200,186)', 'rgba(221,234,219)']);

// generate color for line graph
const lineColorScale = scaleOrdinal()
  .domain(['onBoarding', 'offboarding'])
  .range(['#c33e37', '#9DB68C']);

// line and area graph
const renderAreaGraph = (g, classType, nested, dataValues, colorValues) => {
  const element = g.selectAll(classType)
    .data(nested)
    .enter()
    .append('path')
    .attr('class', classType)
    .attr('d', dataValues)
    .attr('fill', classType === '.area-path' ? colorValues : 'none')
    .attr('stroke', classType === '.line-path' ? colorValues : 'none');
  return element;
};

// circles
const renderCircles = (g, elementType, data, yPosition, xPosition, circleColor) => {
  const circleElements = g.selectAll(elementType)
    .data(data)
    .enter()
    .append(elementType)
    .attr('cy', yPosition)
    .attr('cx', xPosition)
    .attr('r', circleRadius)
    .style('fill', circleColor);
  return circleElements;
};

// render xAxisGroup
const renderXAxisGroup = (g, xAxis) => {
  // xAxis group
  const xAxisGroup = g.append('g')
    .call(xAxis)
    .attr('class', 'x-axis-group')
    .attr('transform', `translate(0, ${innerHeight})`);

  // Add x Axis onBoarding Label
  xAxisGroup.append('text')
    .attr('class', 'on-boarding-label')
    .attr('y', 30)
    .attr('x', innerWidth - 510)
    .text(onBoardingLabel)
    .attr('fill', 'black');

  // Add x Axis offBoarding Label
  xAxisGroup.append('text')
    .attr('class', 'off-boarding-label')
    .attr('y', 30)
    .attr('x', innerWidth - 450)
    .text(offBoardingLabel)
    .attr('fill', 'black');

  // Add x Axis offBoarding Label rectangle
  xAxisGroup.append('rect')
    .attr('x', 460)
    .attr('y', 24)
    .attr('width', 7)
    .attr('height', 7)
    .attr('fill', '#c33e37');

  // Add x Axis onBoarding Label rectangle
  xAxisGroup.append('rect')
    .attr('x', 400)
    .attr('y', 24)
    .attr('width', 7)
    .attr('height', 7)
    .attr('fill', '#5d9d52');

  return xAxisGroup;
};

// Defining the renderGraph function
const renderGraph = (data, g) => {
  // make x Scale using scaleBand
  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth]);

  // make y Scale using scaleLinear
  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0])
    .nice();

  // call axisLeft and axisBottom to make x and y axis
  const xAxis = axisBottom(xScale)
    .tickPadding(2);

  const yAxis = axisLeft(yScale);
  g.append('g')
    .call(yAxis);

  // render renderXAxisGroup
  renderXAxisGroup(g, xAxis);

  // reduce on the length of the xAxis domain line
  g.select('.x-axis-group .domain')
    .attr('d', 'M0.5,6V0.5H860.5V6');

  // add classes to the different ticks of xAxis
  const ticks = selectAll('.tick');
  ticks.attr('class', (d, i) => `x${i}`);

  // generate area graph data
  const areaGenerator = area()
    .x(d => xScale(xValue(d)))
    .y0(innerHeight)
    .y1(d => yScale(yValue(d)))
    .curve(curveMonotoneX);

  // generate line graph data
  const lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(curveMonotoneX);

  // nest for multiple lines/area
  const nested = nest()
    .key(colorValue)
    .entries(data);

  // Add area graph domain
  areaColorScale.domain(nested.map(d => d.key));

  // Add line graph domain
  lineColorScale.domain(nested.map(d => d.key));

  const areaValues = d => areaGenerator(d.values);
  const areaColors = d => areaColorScale(d.key);

  const lineValues = d => lineGenerator(d.values);
  const lineColors = d => lineColorScale(d.key);

  // Add area graph
  renderAreaGraph(g, '.area-path', nested, areaValues, areaColors);

  // Add line graph
  renderAreaGraph(g, '.line-path', nested, lineValues, lineColors);

  // Add circles
  renderCircles(
    g,
    'circle',
    data,
    d => yScale(yValue(d)),
    d => xScale(xValue(d)),
    d => (d.automationType === 'onBoarding' ? '#5d9d52' : '#c33e37'),
  );
};

export const createEngagementTrend = (trendData) => {
  // selecting the svg element from DOM and adding attributes to it
  const svg = select('svg')
    .attr('width', +svgWidth)
    .attr('height', +svgHeight);

  // Add a group element to group the elements
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const automationData = trendData.map((d) => {
    const automationDate = new Date(d.createdAt);
    const month = automationDate.toLocaleString('default', { month: 'short' });
    const day = automationDate.toLocaleString('default', { weekday: 'short' });
    const date = automationDate.getDate();
    const year = automationDate.getFullYear();
    const finalDate = `${day} ${month} ${date} ${year}`;
    const totalNumber = +d.number;
    const automationType = d.type;
    const data = {
      finalDate,
      totalNumber,
      automationType,
    };
    return data;
  });

  // return render function to display the data
  return renderGraph(automationData, g, areaColorScale, lineColorScale);
};
