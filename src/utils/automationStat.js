import * as d3 from 'd3';

const calculatePercentage = (sum, successValue) => {
  if (successValue === 0) {
    return 0;
  }
  const percentage = (successValue / sum) * 100;

  return percentage;
};

const createDonut = (stat, container) => {
  const { total, success } = stat || {};

  const successValue = calculatePercentage(total, success);
  const dataset = {
    lower: [0, 100],
    upper: [successValue, 100 - successValue],
  };
  const width = 96;
  const height = 96;
  const format = d3.format('.0%');
  let currentValue = 0;

  const pie = d3.pie().sort(null);
  const arc = d3.arc().innerRadius(30).outerRadius(33);
  const svg = d3.select(`#${container}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate (${width / 2} ${height / 2})`);

  const path = svg.selectAll('path')
    .data(pie(dataset.lower))
    .enter()
    .append('path')
    .attr('class', (d, i) => `color${i}`)
    .attr('d', arc)
    .each(() => currentValue);

  const text = svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('y', 5);

  const progress = 0;
  path
    .data(pie(dataset.upper))
    .transition()
    .duration(5000)
    .attrTween('d', (d) => {
      const arcInterpolator = d3.interpolate(currentValue, d);
      const textInterpolator = d3.interpolate(progress, successValue);
      currentValue = arcInterpolator(0);
      return (t) => {
        text.text(format(textInterpolator(t) / 100));

        return arc(arcInterpolator(t));
      };
    });

  return svg;
};

export default createDonut;
