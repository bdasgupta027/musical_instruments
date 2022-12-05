
var margin = {top: 20, right: 100, bottom: 30, left: 100},
    width = document.getElementById('container').offsetWidth / 2 + 60 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;;
var innersvg = d3.select("body")
    .attr("width", width)
    .attr("height", 500)
    .attr("x", 900)
    .append("g")
    .attr("transform", "translate("
          + width + 600 + "," + margin.top + ")");


var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = innersvg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("broad-type.csv")
  	.then((data) => {
        return data.map((d) => {
          d.frequency = +d.frequency;
          console.log(d.frequency);
          return d;  
        });
		})
  	.then((data) => {
        x.domain(data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");

        g.selectAll(".bar")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.letter); })
            .attr("y", function(d) { return y(d.frequency); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { 
            return height - y(d.frequency); });
    })
    .catch((error) => {
    		throw error;
    });
