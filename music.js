/* ---------------------------------------------------------------------
Pooja Gupta, CJ Guzman, Hersh Kalsi, Brendan Schierloh
CSE 163
Peru.js
Referenced:

Previous Project
https://github.com/nityadavarapalli/enhancementproject

Click-To-Zoom
https://bl.ocks.org/mbostock/2206590

Different Shapes
https://bl.ocks.org/denisemauldin/1cacff932f3868aad2d7815384a0a6fa

Add Link to Objects
http://bl.ocks.org/d3noob/8150631

Additions:
Look of Map, Format of tooltips, Click to Zoom, Different Shapes, Hover over Boundary Lines, Added Reference to Link
----------------------------------------------------------------------*/ 

/*jslint browser: true*/
/*global d3*/

var treeData =
  {
  "name":"Instruments",
  "children": [
    {"name":"Idiophones",
     "children": [
       {"name":"Struck idiophones",
       "children": [
         {"name":"Directly struck idiophones",
         "children":[
          {"name":"Marimba"},
          {"name":"Gyil"},
          {"name":"Marimba"},
          {"name":"Cajon"},
          {"name":"Steelpan"}
         ]},
         {"name":"Indirectly struck idiophones",
         "children":[
          {"name":"Pandeiro"},
          {"name":"Angklung"}
         ]}
       ]},
       {"name":"Plucked idiophones",
       "children":[
         {"name":"In the form of a frame"},
         {"name":"In the form of a comb",
         "children":[
          {"name":"Mbira"}
         ]},
         {"name":"Mixed sets of lamellophones"}
       ]},
       {"name":"Friction idiophones",
       "children": [
         {"name":"Friction sticks"},
         {"name":"Friction plaques"},
         {"name":"Friction vessels"}
       ]},
       {"name":"Blown idiophones",
       "children": [
         {"name":"Blown sticks"},
         {"name":"Blown plaques"}
       ]},
       {"name":"Unclassified idiophones"}
     ]},
    {"name":"Membranophones",
    "children": [
      {"name":"Struck membranophones",
      "children": [
        {"name":"Directly struck membranophones",
        "children":[
          {"name":"Daf"},
          {"name":"Doira"},
          {"name":"Madal"},
          {"name":"Darbuka"}
        ]},
        {"name":"Shaken membranophones"}
      ]},
      {"name":"Plucked membranophones"},
      {"name":"Friction membranophones",
      "children": [
        {"name":"Friction drums with stick"},
        {"name":"Friction drum with cord"},
        {"name":"Hand friction drums"}
      ]},
      {"name":"Singing membranes (kazoos)",
      "children": [
        {"name":"Free kazoos"},
        {"name":"Tube or vessel-kazoos"}
      ]},
      {"name":"Unclassified membranophones"}
    ]},
    {"name":"Chordophones",
    "children": [
      {"name":"Simple chordophones or zithers",
       "children": [
         {"name":"Bar zithers",
         "children":[
          {"name":"Saraswati veena"},
          {"name":"Pin pia"}
         ]},
         {"name":"Tube zithers",
         "children":[
          {"name":"Koto"},
          {"name":"Gayageum"},
          {"name":"Valiha"}
         ]},
         {"name":"Raft zithers"},
         {"name":"Board zithers",
         "children":[
          {"name":"Kantele"},
          {"name":"Cimbalom"},
          {"name":"Tar"},
          {"name":"Kokles"},
          {"name":"Langeleik"}
         ]},
         {"name":"Trough zithers"},
         {"name":"Bar zithers"}
       ]},
      {"name":"Composite chordophones",
      "children":[
        {"name":"Lutes",
        "children":[
          {"name":"Lyra"},
          {"name":"Nyatiti"},
          {"name":"Endongo"},
          {"name":"Talharpa"},
          {"name":"Kithara"},
          {"name":"Kinnor"},
          {"name":"đàn bầu"},
          {"name":"Crwth"},
          {"name":"Banjo"},
          {"name":"Rubab"},
          {"name":"Lahuta"},
          {"name":"Dranyen"},
          {"name":"Chrango"},
          {"name":"Pipa"},
          {"name":"Tamburica"},
          {"name":"Bouzouki"},
          {"name":"Oud"},
          {"name":"Mandolin"},
          {"name":"Dombra"},
          {"name":"Komuz"},
          {"name":"Gusle"},
          {"name":"Kudyapi"},
          {"name":"Saz"},
          {"name":"Dotara"},
          {"name":"Cuatro"},
          {"name":"Tres"},
          {"name":"Waldzither"},
          {"name":"Ukulele"},
          {"name":"Morin Khuur"},
          {"name":"Fiddle"},
          {"name":"Portugeese guitar"},
          {"name":"Guitar"},
          {"name":"Dutar"}
        ]},
        {"name":"Harps",
        "children":[
          {"name":"Saung-gauk"},
          {"name":"Harp"},
          {"name":"Paraguayan harp"},
          {"name":"Cláirseach"}
        ]},
        {"name":"Harp Lutes"}
      ]},
      {"name":"Unclassified chordophones"}
    ]},
    {"name":"Aerophones",
    "children": [
      {"name":"Free aerophones",
      "children": [
        {"name":"Displacement free aerophones",
        "children":[
          {"name":"Tambin"}
        ]},
        {"name":"Interruptive free aerophones",
        "children":[
          {"name":"Bandoneón"},
          {"name":"English concertina"},
          {"name":"Khene"},
          {"name":"Garmon"},
          {"name":"Accordion"}
        ]},
        {"name":"Plosive aerophones"}
      ]},
      {"name":"Non-free aerophones (wind instruments proper)",
      "children": [
         {"name":"Edge-blown aerophones or flutes",
         "children":[
          {"name":"Duduk daduk"},
          {"name":"Rondador"},
          {"name":"Nose flute"},
          {"name":"Fujara"}
         ]},
         {"name":"Reed aerophones",
         "children":[
          {"name":"Birbyne"},
          {"name":"Bagpipes"},
          {"name":"Bock"},
          {"name":"Balaban"},
          {"name":"Gaida"}
         ]},
         {"name":"Trumpets",
         "children":[
          {"name":"Didgeridoo"},
          {"name":"Abeng"},
          {"name":"Lesiba"},
          {"name":"Alphorn"}
         ]},
         {"name":"Mixed sets of wind instruments"} 
      ]},
      {"name":"Mixed sets of aerophones"}
    ]},
    {"name":"Electrophones"}
  ]
};



var barMargin = {top: 10, right: 50, bottom: 10, left: 100},
    barWidth = 560 - barMargin.left - barMargin.right,
    barHeight = 300 - barMargin.top - barMargin.bottom;
var barsvg = d3.select("body").append("svg")
    .attr("width", document.getElementById('container').offsetWidth)
    .attr("height", 470)
  .append("g")
    .attr("transform", "translate("
          + -50 + "," + 80 + ")");
barsvg.append("text").attr("x", "805px")             
        .attr("y", "-40px")
        .attr("text-anchor", "middle")  
        .style("font-size", "25px") 
        .style("font-weight", "bold")  
        .text("Classification Comparisons by the Numbers");

var barX = d3.scaleBand().rangeRound([0, barWidth]).padding(0.1),
    barY = d3.scaleLinear().rangeRound([barHeight, 0]);

//BROAD TYPE BAR GRAPH
var barG = barsvg.append("g")
    .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");
var bartooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

d3.csv("broad-type.csv")
  	.then((data) => {
        return data.map((d) => {
          d.frequency = +d.frequency;
          console.log(d.frequency);
          return d;  
        });
		})
  	.then((data) => {
        barX.domain(data.map(function(d) { return d.letter; }));
        barY.domain([0, d3.max(data, function(d) { return d.frequency; })]);

        barG.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + barHeight + ")")
            .call(d3.axisBottom(barX))
            .selectAll("text")
            .attr("transform", "rotate(-25)")
            .attr("dx", "-1em")
            .style("text-anchor", "end")
            .style("font-size", "11px");

        barG.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(barY))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", "-2.3em")
            .attr("dx", "-7em")
            .attr("text-anchor", "end")
            .text("Frequency in Map")
            .style("fill", "black")
            .style("font-size", "15px");

        barG.selectAll(".bar")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return barX(d.letter); })
            .attr("y", function(d) { return barY(d.frequency); })
            .attr("width", barX.bandwidth())
            .style("fill", function(d){
                if (d.letter === "Chordophone"){
                    return "#89B6A5";
                }
                if(d.letter === "Aerophone") {
                       return "#FFD275";}//aqua
                if(d.letter === "Idiophone") {
                       return "#8D6A9F";}//red
                if(d.letter === "Membranophone") {
                       return "#DB5A42";
                }
            })
            .attr("height", function(d) { 
            return barHeight - barY(d.frequency); })
            .on("mouseover", function(d){
                bartooltip.transition()
                       .duration(100)
                       .style("background", "black")
                       .style("opacity", ".8");
                var percentage = ((d.frequency/86)*100).toFixed(2);
                // Format the tooltip
                bartooltip.html(d.frequency + " countries have a(n) " + d.letter + " as their national instrument.<br>" + percentage + "% of the national instruments on the map are classified as a(n) " + d.letter + " according to the broad type classification.")
                       .style("left", (d3.event.pageX ) + "px")
                       .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", function(d) {
                bartooltip.transition()
                .duration(500)
                .style("opacity", 0);
            });
    
        barG.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .text(function(d){
                return d.frequency;
            })
            .attr("x", function(d, i) {
                return barX(d.letter) + 45;
            })
            .attr("y", function(d){
                return barY(d.frequency) - 2;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .style("font-weight", "bold")
            .attr("fill", "black")
            .attr("text-anchor", "middle");
    
        barG.append("text")
        .attr("x", "215px")             
        .attr("y", 0 - (barMargin.top / 2 + 15))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")   
        .style("text-decoration", "underline")
        .text("Frequency of Instruments on Map Classified by Broad Type");
});
    
            
//MINOT TYPE BAR GRAPH
var barMargin2 = {top: 10, right: 50, bottom: 10, left: 100},
    barWidth2 = 560 - barMargin2.left - barMargin2.right,
    barHeight2 = 300 - barMargin2.top - barMargin2.bottom;
var barG2 = barsvg.append("g")
    .attr("transform", "translate(" + 600 + "," + barMargin2.top + ")");
var bartooltip2 = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
var barX2 = d3.scaleBand().rangeRound([0, barWidth2]).padding(0.1),
    barY2 = d3.scaleLinear().rangeRound([barHeight2, 0]);

d3.csv("minot-type.csv")
  	.then((data) => {
        return data.map((d) => {
          d.frequency = +d.frequency;
          console.log(d.frequency);
          return d;  
        });
		})
  	.then((data) => {
        barX2.domain(data.map(function(d) { return d.letter; }));
        barY2.domain([0, d3.max(data, function(d) { return d.frequency; })]);
        barG2.append("text").attr("text", "Number of Each Minot Type on Map")
            .style("fill", "black")
            .style("font-size", "15px");
        barG2.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + barHeight2 + ")")
            .call(d3.axisBottom(barX2))
            .selectAll("text")
            .attr("transform", "rotate(-30)")
            .attr("dx", "-1em")
            .style("text-anchor", "end")
            .style("font-size", "11px");

        barG2.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(barY2))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", "-2.3em")
            .attr("dx", "-7em")
            .attr("text-anchor", "end")
            .text("Frequency in Map")
            .style("fill", "black")
            .style("font-size", "15px");

        barG2.selectAll(".bar")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return barX2(d.letter); })
            .attr("y", function(d) { return barY2(d.frequency); })
            .attr("width", barX2.bandwidth())
            .attr("height", function(d) { 
            return barHeight2 - barY2(d.frequency); })
            .style("fill", function(d){
                var classification = d.letter;
                if(classification === "Composite Chordophone") {
                   return "#359c75";} 
                if(classification === "Free Aerophone") {
                       return "#e0a936";}
                if(classification === "Non-Free Aerophone") {
                       return "#916303";}
                if(classification === "Struck Idiophone") {
                       return "#67218a";}
                if(classification === "Simple Chordophone") {
                       return "#076943";} 
                if(classification === "Struck Membranophone") {
                       return "#f29483";}
                if(classification === "Plucked Idiophone") {
                       return "#c389e0";}
            })
            .on("mouseover", function(d){
                bartooltip2.transition()
                       .duration(100)
                       .style("background", "black")
                       .style("opacity", ".8");
                var percentage = ((d.frequency/86)*100).toFixed(2);
                // Format the tooltip
                bartooltip2.html(d.frequency + " countries have a(n) " + d.letter + " as their national instrument.<br>" + percentage + "% of the national instruments on the map are classified as a(n) " + d.letter + " according to the minot type classification.")
                       .style("left", (d3.event.pageX ) + "px")
                       .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", function(d) {
                bartooltip2.transition()
                .duration(500)
                .style("opacity", 0);
            });
    
            barG2.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .text(function(d){
                return d.frequency;
            })
            .attr("x", function(d, i) {
                return barX2(d.letter) + 25;
            })
            .attr("y", function(d){
                return barY2(d.frequency) -2;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .attr("text-anchor", "middle");
    
            barG.append("text")
            .attr("x", "710px")             
            .attr("y", 0 - (barMargin.top / 2 + 15))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")
            .text("Frequency of Instruments on Map Classified by Minot Type");
    });
    
//SPECIFIC TYPE BAR GRAPH
    var barMargin3 = {top: 10, right: 50, bottom: 10, left: 100},
    barWidth3 = 560 - barMargin3.left - barMargin3.right,
    barHeight3 = 300 - barMargin3.top - barMargin3.bottom;
var barG3 = barsvg.append("g")
    .attr("transform", "translate(" + 1100 + "," + barMargin3.top + ")");
var bartooltip3 = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
var barX3 = d3.scaleBand().rangeRound([0, barWidth3]).padding(0.1),
    barY3 = d3.scaleLinear().rangeRound([barHeight3, 0]);
d3.csv("specific-type.csv")
  	.then((data) => {
        return data.map((d) => {
          d.frequency = +d.frequency;
          return d;  
        });
		})
  	.then((data) => {
        barX3.domain(data.map(function(d) { return d.letter; }));
        barY3.domain([0, d3.max(data, function(d) { return d.frequency; })]);

        barG3.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + barHeight3 + ")")
            .call(d3.axisBottom(barX3))
            .selectAll("text")
            .attr("transform", "rotate(-30)")
            .attr("dx", "-.5em")
            .style("text-anchor", "end")
            .style("font-size", "11px");

        barG3.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(barY3))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", "-2.3em")
            .attr("dx", "-7em")
            .attr("text-anchor", "end")
            .text("Frequency in Map")
            .style("fill", "black")
            .style("font-size", "15px");

        barG3.selectAll(".bar")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return barX3(d.letter); })
            .attr("y", function(d) { return barY3(d.frequency); })
            .attr("width", barX3.bandwidth())
            .attr("height", function(d) { 
            return barHeight3 - barY3(d.frequency); })
            .style("fill", function(d){
                var classification = d.letter;
                if(classification === "Lute") {
                       return "#5EB182";} 
                if(classification === "Harp") {
                       return "#B1DBB3";}
                if(classification === "Interruptive Free Aerophone") {
                       return "#F8E473";}
                if(classification === "Displacement Free Aerophone") {
                       return "#fcf4a3";}
                if(classification === "Flute") {
                       return "#ffe5b4";} 
                if(classification === "Trumpet") {
                       return "#FFC30B";}
                if(classification === "Reed Aerophone") {
                       return "#DBDC69";}
                if(classification === "Form of a Comb") {
                       return "#C8B9EE";} 
                if(classification === "Board Zither") {
                       return "#6CA87A";}
                if(classification === "Tube Zither") {
                       return "#A0C7A1";}
                if(classification === "Bar Zither") {
                       return "#3A895B";}
                if(classification === "Indirectly Struck Idiophone") {
                       return "#8D7CBC";} 
                if(classification === "Directly Struck Idiophone") {
                       return "#ADA9D4";}
                if(classification === "Directly Struck Membranophone") {
                       return "#FBCFE2";}
            })
            .on("mouseover", function(d){
                bartooltip3.transition()
                       .duration(100)
                       .style("background", "black")
                       .style("opacity", ".8");
                var percentage = ((d.frequency/86)*100).toFixed(2);
                // Format the tooltip
                bartooltip3.html(d.frequency + " countries have a(n) " + d.letter + " as their national instrument.<br>" + percentage + "% of the national instruments on the map are classified as a(n) " + d.letter + " according to the specific type classification.")
                       .style("left", (d3.event.pageX ) + "px")
                       .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", function(d) {
                bartooltip3.transition()
                .duration(500)
                .style("opacity", 0);
            });
            
    
        barG3.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .text(function(d){
                return d.frequency;
            })
            .attr("x", function(d, i) {
                return barX3(d.letter) + 12;
            })
            .attr("y", function(d){
                return barY3(d.frequency) - 2;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .attr("text-anchor", "middle");
    
        barG.append("text")
            .attr("x", "1210px")             
            .attr("y", 0 - (barMargin.top / 2 + 15))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")
            .attr("font-decoration", "underlined")
            .text("Frequency of Instruments on Map Classified by Specific Type");
});
   

/*
DENDROGRAM: CLASSIFICAITON OF INSTRUMENTS
*/
// Setthe dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 560 - margin.left - margin.right,
    height = 1190 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var innersvg = d3.select("body").append("svg")
    .attr("width", 1500)
    .attr("height", 1200)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");
innersvg.append("text").attr("x", "675px")             
        .attr("y", "20px")
        .attr("text-anchor", "middle")  
        .style("font-size", "25px") 
        .style("font-weight", "bold")  
        .text("Classification Tree by Hornbostel-Sachs System");

    
var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);
update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {
  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = innersvg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
            var classification = d.data.name;
            if(classification === "Composite chordophone") {
                   return "#32a852";} 
            else if(classification === "Free aerophone") {
                   return "#7cb7eb";}
            else if(classification === "Non-free aerophones (wind instruments proper)") {
                   return "#daa5f2";}
            else if(classification === "Struck idiophones") {
                   return "#e36db4";}
            else if(classification === "Simple chordophones or zither") {
                   return "#871b1f";} 
            else if(classification === "Struck membranophones") {
                   return "#edd539";}
            else if(classification === "Plucked idiophones") {
                   return "#2f9685";}
            else if(classification === "Chordophones") {
                  return "#BE79DF";}//purple  
            else if(classification === "Aerophones") {
                   return "#00FFFF";}//aqua
            else if(classification === "Idiophones") {
                   return "#c90e0e";}//red
            else if(classification === "Membranophones") {
                   return "#194719";
            }else{
               return d._children ? "lightsteelblue" : "#fff"; 
            }
           
            
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        var classification = d.data.name;
        if(classification === "Composite chordophones") {
           return "#359c75";} 
        else if(classification === "Free aerophones") {
               return "#e0a936";}
        else if(classification === "Non-Free aerophones (wind instruments proper)") {
               return "#916303";}
        else if(classification === "Struck idiophones") {
               return "#67218a";}
        else if(classification === "Simple chordophones or zithers") {
               return "#076943";} 
        else if(classification === "Struck membranophones") {
               return "#f29483";}
        else if(classification === "Plucked idiophones") {
               return "#c389e0";}
        else if(classification === "Chordophones") {
              return "#89B6A5";}//purple  
        else if(classification === "Aerophones") {
               return "#FFD275";}//aqua
        else if(classification === "Idiophones") {
               return "#8D6A9F";}//red
        else if(classification === "Membranophones") {
               return "#DB5A42";}
        else if(classification === "Lutes") {
                   return "#5EB182";} 
        else if(classification === "Harps") {
                   return "#B1DBB3";}
        else if(classification === "Interruptive free aerophones") {
                   return "#F8E473";}
        else if(classification === "Displacement free aerophones") {
                   return "#fcf4a3";}
        else if(classification === "Edge-blown aerophones or flutes") {
                   return "#ffe5b4";} 
        else if(classification === "Trumpets") {
                   return "#FFC30B";}
        else if(classification === "Reed aerophones") {
                   return "#DBDC69";}
        else if(classification === "In the form of a comb") {
                   return "#C8B9EE";} 
        else if(classification === "Board zithers") {
                   return "#6CA87A";}
        else if(classification === "Tube zithers") {
                   return "#A0C7A1";}
        else if(classification === "Bar zithers") {
                   return "#3A895B";}
        else if(classification === "Indirectly struck idiophones") {
                   return "#8D7CBC";} 
        else if(classification === "Directly struck idiophones") {
                   return "#ADA9D4";}
        else if(classification === "Directly struck membranophones") {
                   return "#FBCFE2";
        }else{
           return d._children ? "grey" : "#fff"; 
        }
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = innersvg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
//      console.log(d);

    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}



/*
GEOMAP: CLASSIFICATION OF NATIONAL INSTRUMENTS
*/

// Width and height
var width = document.getElementById('container').offsetWidth,
    height = 500;

// Use the geoMercator to visualize the projection.
var projection = d3.geoMercator()
    .center([0,35])
    .scale((width) / 1.9 / Math.PI)
    .translate([width / 2, height / 1.9]);

// Will be used to create the path
var path = d3.geoPath().projection(projection);

// Creates zoom variable for later pan/zoom functionality
var zoom = d3.zoom().scaleExtent([1,8]).on("zoom", zoomed);

// Create the canvas
var svg = d3.select("#container")
	        .append("svg")
	        .attr("width", width)
	        .attr("height", height)
            .style("border", "3px")
            .append("g");

// Create secondary layer to canvas SVG
var g = svg.append("g");

// Create tooltip to be used for information on shapes and countries
var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

// Call zoom and further functions
svg.call(zoom);

//Function to zoom and transform the page
function zoomed() {
  console.log('zoom');
  // Transform all the attributes that are attached to the var g
  g.attr("transform", d3.event.transform);
}

d3.select(self.frameElement).style("height", height + "px");

//Parse the data
//Data will be graabed from countries.geo.json and Map_of_Gods.csv
//Below code was supplemented from LA v SF group	
//var types = [];
d3.json("countries.geo.json").then(function(json) {
        
    
        d3.csv("nation-instruments.csv").then(function(data){
//            console.log(data);
            //nation,instrument,description,hsnumber,link ,broadtype,minottype,specfictype
        //  through each element of the csv
		for (var i = 0; i < data.length; i++) {
			// Get data for csv element
            console.log()
            var name = data[i].instrument;
            var nation = data[i].nation;
            var description = data[i].description;
            var hsnumber = data[i].hsnumber;
            var link = data[i].link;
            var broadType = data[i].broadtype;
            var minotType = data[i].minottype;
            var specificType = data[i].specifictype; 
			for (var j = 0; j < json.features.length; j++) {
				var jsonCountry = json.features[j].properties.name;
                
                
                //console.log(j);
				if (nation == jsonCountry) {
					// Assign the color retrieved from the csv to the
					// 		matching json element.
                    
                    json.features[j].properties.name = name;
                    json.features[j].properties.nation = nation;
                    json.features[j].properties.description = description;
                    json.features[j].properties.hsnumber= hsnumber;
                    json.features[j].properties.link = link;
                    json.features[j].properties.broadType = broadType;
                    json.features[j].properties.minotType = minotType;
                    json.features[j].properties.specificType = specificType;
					break;
                }//if(csvLocation == jsonCountry
            }//for loop
        }//outer for loop
       
        //This moves all the paths to the svg/g canvas
        //Color scheme for initial countries is from GodChecker.com
        g.selectAll("path")
         .data(json.features)
         .enter()
         .append("path")
         .attr("d", path)
         // When a region is clicked on, call the clicked function to zoom in to the region. 
        .on("click", clicked)
         // set the boundary color in between countries
         .attr("id", "boundary")
        
         // set the colors for the regions
         // regions can be based on their instument type color:
         //color scheme for broad type:
         //   1) Chordophone: #89B6A5
         //   2) Aerophone: #FFD275
         //   3) Idiophone: #8D6A9F
         //   4) Membranophone: #DB5A42
         .style("fill", function(d) {
//            console.log(d.properties.specificType);
            var classification = d.properties.broadType;
            if(classification === "Chordophone") {
                   return "#89B6A5";
                    }//purple  
            if(classification === "Aerophone") {
                   return "#FFD275";}//aqua
            if(classification === "Idiophone") {
                   return "#8D6A9F";}//red
            if(classification === "Membranophone") {
                   return "#DB5A42";
            }else {
                // light grey 
                return "rgb(213,222,217)";}
        })//This is for the style attribute for the path
        // Add a tooltip to show the name of the country.
        .on('mouseover', function(d) {  
            if (typeof d.properties.description !== 'undefined'){
                tooltip.transition()
                       .duration(100)
                       .style("background", "black")
                       .style("opacity", ".8");
                // Format the tooltip
                tooltip.html("<div><b>Name of Instrument</b>: " + d.properties.name + "</div><div><b>Country</b>: " + 
                d.properties.nation + "</div><div><b>Description</b>: " + d.properties.description + "</div><div><b>Broad Type</b>: " + d.properties.broadType + 
                "</div><div><b>Minot Type</b>: " + d.properties.minotType + "</div><div><b>Specific Type</b>: " + d.properties.specificType)
                       .style("left", (d3.event.pageX ) + "px")
                       .style("top", (d3.event.pageY) + "px");
//                div.select("button").on("click", function() {
//                    div.style("opacity", 0)
//                });
            }else{
                tooltip.html("Country: " + d.properties.nation)
                .style("left", (d3.event.pageX ) + "px")
                .style("top", (d3.event.pageY) + "px")
            }
        })
        // Deactivate the tooltip
        .on("mouseout", function(d) {
            tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });  
            
    });//These bracets are for d3.csv line above
});//These brackets are for d3.json line


// Function to implement click-to-zoom via transform 
function clicked(d) {
  var x, y, k;

  // Check if map is centered on clicked point
  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  // Scale Map
  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
  
}

// set the colors for the regions
    // regions can be based on their instument type color:
    //color scheme for minot type:
    //   1) Composite chordophone: #359c75
    //   2) Free aerophone: #e0a936
    //   3) Non-free aerophone: #916303
    //   4) Struck idiophone: #67218a
    //   5) Simple chordophone: #076943
    //   6) Plucked idiophone: #c389e0
    //   7) Struck Membranophone: #f29483
function changeMinotColorScheme(){
    //change color scheme
    g.selectAll("path")
    .style("fill", function(d) {
            var classification = d.properties.minotType;
            if(classification === "Composite chordophone") {
                   return "#359c75";} 
            if(classification === "Free aerophone") {
                   return "#e0a936";}
            if(classification === "Non-free aerophones (wind instruments proper)") {
                   return "#916303";}
            if(classification === "Struck idiophone") {
                   return "#67218a";}
            if(classification === "Simple chordophones or zither") {
                   return "#076943";} 
            if(classification === "Struck membranophone") {
                   return "#f29483";}
            if(classification === "Plucked idiophone") {
                   return "#c389e0";}
            else {
                // light grey 
                return "rgb(213,222,217)";}
    });
    
    //change legend
    legend.attr("x", width-250).attr("width", 250);
    legendText.attr("x", width - 100);
    
    //remove current legend values
    chordophoneColor.style("opacity", 0);
    chordophoneText.style("opacity", 0);
    aerophoneColor.style("opacity", 0);
    aerophoneText.style("opacity", 0);
    idiophoneColor.style("opacity", 0);
    idiophoneText.style("opacity", 0);
    membranophoneColor.style("opacity", 0);
    membranophoneText.style("opacity", 0);
    LuteColor.style("opacity", 0);
    LuteText.style("opacity", 0);
    HarpColor.style("opacity", 0);
    HarpText.style("opacity", 0);
    IFAColor.style("opacity", 0);
    IFAText.style("opacity", 0);
    DFAColor.style("opacity", 0);
    DFAText.style("opacity", 0);
    FluteColor.style("opacity", 0);
    FluteText.style("opacity", 0);
    TrumpetColor.style("opacity", 0);
    TrumpetText.style("opacity", 0);
    RAColor.style("opacity", 0);
    RAText.style("opacity", 0);
    CombColor.style("opacity", 0);
    CombText.style("opacity", 0);
    BarColor.style("opacity", 0);
    BarText.style("opacity", 0);
    BoardColor.style("opacity", 0);
    BoardText.style("opacity", 0);
    ISIColor.style("opacity", 0);
    ISIText.style("opacity", 0);
    DSIColor.style("opacity", 0);
    DSIText.style("opacity", 0);
    DSMColor.style("opacity", 0);
    DSMText.style("opacity", 0);
    TubeColor.style("opacity", 0);
    TubeText.style("opacity", 0);
    
    //add new legend values
    compositeChordophoneColor.style("opacity", 10);
    compositeChordophoneText.style("opacity", 1);
    freeAerophoneColor.style("opacity", 1);
    freeAerophoneText.style("opacity", 1);
    nonfreeAerophoneColor.style("opacity", 1);
    nonfreeAerophoneColorText.style("opacity", 1);
    struckIdiophoneColor.style("opacity", 1);
    struckIdiophoneText.style("opacity", 1);
    simpleChordophoneColor.style("opacity", 1);
    simpleChordophoneText.style("opacity", 1);
    struckMembranophoneColor.style("opacity", 1);
    struckMembranophoneText.style("opacity", 1);
    pluckedIdiophoneColor.style("opacity", 1);
    pluckedIdiophoneText.style("opacity", 1);
   
    
}

function changeSpecificColorScheme(){
    g.selectAll("path")
    .style("fill", function(d) {
        /*
        if(classification === "Lute") {
                       return "#5EB182";} 
                if(classification === "Harp") {
                       return "#B1DBB3";}
                if(classification === "Interruptive Free Aerophone") {
                       return "#F8E473";}
                if(classification === "Displacement Free Aerophone") {
                       return "#fcf4a3";}
                if(classification === "Flute") {
                       return "#ffe5b4";} 
                if(classification === "Trumpet") {
                       return "#FFC30B";}
                if(classification === "Reed Aerophone") {
                       return "#DBDC69";}
                if(classification === "Form of a Comb") {
                       return "#C8B9EE";} 
                if(classification === "Board Zither") {
                       return "#6CA87A";}
                if(classification === "Tube Zither") {
                       return "#A0C7A1";}
                if(classification === "Bar Zither") {
                       return "#3A895B";}
                if(classification === "Indirectly Struck Idiophone") {
                       return "#8D7CBC";} 
                if(classification === "Directly Struck Idiophone") {
                       return "#ADA9D4";}
                if(classification === "Directly Struck Membranophone") {
                       return "#FBCFE2";}
            })
            */
            var classification = d.properties.specificType;
            if(classification === "Lute") {
                   return "#5EB182";} 
            if(classification === "Harp") {
                   return "#B1DBB3";}
            if(classification === "Interruptive free aerophone") {
                   return "#F8E473";}
            if(classification === "Displacement free aerophone") {
                   return "#fcf4a3";}
            if(classification === "Edge-blown aerophones or flute") {
                   return "#ffe5b4";} 
            if(classification === "Trumpet") {
                   return "#FFC30B";}
            if(classification === "Reed aerophone") {
                   return "#DBDC69";}
            if(classification === "In the form of a comb") {
                   return "#C8B9EE";} 
            if(classification === "Board zither") {
                   return "#6CA87A";}
            if(classification === "Tube zither") {
                   return "#A0C7A1";}
            if(classification === "Bar zither") {
                   return "#3A895B";}
            if(classification === "Indirectly struck idiophone") {
                   return "#8D7CBC";} 
            if(classification === "Directly struck idiophone") {
                   return "#ADA9D4";}
            if(classification === "Directly struck membranophone") {
                   return "#FBCFE2";}
            else {
                // light grey 
                return "rgb(213,222,217)";}
    });
    
    //change legend
    legend.attr("x", width-400).attr("width", 400);
    legendText.attr("x", width - 175);
    
    //legend
    chordophoneColor.style("opacity", 0);
    chordophoneText.style("opacity", 0);
    aerophoneColor.style("opacity", 0);
    aerophoneText.style("opacity", 0);
    idiophoneColor.style("opacity", 0);
    idiophoneText.style("opacity", 0);
    membranophoneColor.style("opacity", 0);
    membranophoneText.style("opacity", 0);
    compositeChordophoneColor.style("opacity", 0);
    compositeChordophoneText.style("opacity", 0);
    freeAerophoneColor.style("opacity", 0);
    freeAerophoneText.style("opacity", 0);
    nonfreeAerophoneColor.style("opacity", 0);
    nonfreeAerophoneColorText.style("opacity", 0);
    struckIdiophoneColor.style("opacity", 0);
    struckIdiophoneText.style("opacity", 0);
    simpleChordophoneColor.style("opacity", 0);
    simpleChordophoneText.style("opacity", 0);
    struckMembranophoneColor.style("opacity", 0);
    struckMembranophoneText.style("opacity", 0);
    pluckedIdiophoneColor.style("opacity", 0);
    pluckedIdiophoneText.style("opacity", 0);
    
    LuteColor.style("opacity", 1);
    LuteText.style("opacity", 1);
    HarpColor.style("opacity", 1);
    HarpText.style("opacity", 1);
    IFAColor.style("opacity", 1);
    IFAText.style("opacity", 1);
    DFAColor.style("opacity", 1);
    DFAText.style("opacity", 1);
    FluteColor.style("opacity", 1);
    FluteText.style("opacity", 1);
    TrumpetColor.style("opacity", 1);
    TrumpetText.style("opacity", 1);
    RAColor.style("opacity", 1);
    RAText.style("opacity", 1);
    CombColor.style("opacity", 1);
    CombText.style("opacity", 1);
    BarColor.style("opacity", 1);
    BarText.style("opacity", 1);
    BoardColor.style("opacity", 1);
    BoardText.style("opacity", 1);
    ISIColor.style("opacity", 1);
    ISIText.style("opacity", 1);
    DSIColor.style("opacity", 1);
    DSIText.style("opacity", 1);
    DSMColor.style("opacity", 1);
    DSMText.style("opacity", 1);
    TubeColor.style("opacity", 1);
    TubeText.style("opacity", 1);
}

//color scheme for broad type:
         //   1) Chordophone: #89B6A5
         //   2) Aerophone: #FFD275
         //   3) Idiophone: #E3A587
         //   4) Membranophone: #DB5A42

function changeBroadColorScheme(){
    g.selectAll("path")
    .style("fill", function(d) {
            var classification = d.properties.broadType;
            if(classification === "Chordophone") {
                   return "#89B6A5";}//purple  
            if(classification === "Aerophone") {
                   return "#FFD275";}//aqua
            if(classification === "Idiophone") {
                   return "#8D6A9F";}//red
            if(classification === "Membranophone") {
                   return "#DB5A42";}
            else {
                // light grey 
                return "rgb(213,222,217)";}
    });
    
    //change legend
    legend.attr("x", width-200).attr("width", 200);
    legendText.attr("x", width - 75);
    legend.style("opacity", 0.9);
    
    //remove current legend values
    chordophoneColor.style("opacity", 1);
    chordophoneText.style("opacity", 1);
    aerophoneColor.style("opacity", 1);
    aerophoneText.style("opacity", 1);
    idiophoneColor.style("opacity", 1);
    idiophoneText.style("opacity", 1);
    membranophoneColor.style("opacity", 1);
    membranophoneText.style("opacity", 1);
    
    //add new legend values
    compositeChordophoneColor.style("opacity", 0);
    compositeChordophoneText.style("opacity", 0);
    freeAerophoneColor.style("opacity", 0);
    freeAerophoneText.style("opacity", 0);
    nonfreeAerophoneColor.style("opacity", 0);
    nonfreeAerophoneColorText.style("opacity", 0);
    struckIdiophoneColor.style("opacity", 0);
    struckIdiophoneText.style("opacity", 0);
    simpleChordophoneColor.style("opacity", 0);
    simpleChordophoneText.style("opacity", 0);
    struckMembranophoneColor.style("opacity", 0);
    struckMembranophoneText.style("opacity", 0);
    pluckedIdiophoneColor.style("opacity", 0);
    pluckedIdiophoneText.style("opacity", 0);
    LuteColor.style("opacity", 0);
    LuteText.style("opacity", 0);
    HarpColor.style("opacity", 0);
    HarpText.style("opacity", 0);
    IFAColor.style("opacity", 0);
    IFAText.style("opacity", 0);
    DFAColor.style("opacity", 0);
    DFAText.style("opacity", 0);
    FluteColor.style("opacity", 0);
    FluteText.style("opacity", 0);
    TrumpetColor.style("opacity", 0);
    TrumpetText.style("opacity", 0);
    RAColor.style("opacity", 0);
    RAText.style("opacity", 0);
    CombColor.style("opacity", 0);
    CombText.style("opacity", 0);
    BarColor.style("opacity", 0);
    BarText.style("opacity", 0);
    BoardColor.style("opacity", 0);
    BoardText.style("opacity", 0);
    ISIColor.style("opacity", 0);
    ISIText.style("opacity", 0);
    DSIColor.style("opacity", 0);
    DSIText.style("opacity", 0);
    DSMColor.style("opacity", 0);
    DSMText.style("opacity", 0);
    TubeColor.style("opacity", 0);
    TubeText.style("opacity", 0);
}

// Legend for Instrument Classification 
//Legend should be 200 for broad type and 250 for minot type
var legend = svg.append("rect")
    .attr("x", width-200)
    .attr("y", height-120)
    .attr("width", 200)
    .attr("rx", 10)
    .attr("ry", 10)
    .style("opacity",0.9)
    .attr("height", 120)
    .attr("fill", "lightgrey")
    .style("stroke-size", "1px");

var legendText = svg.append("text")
    .attr("class", "legendLabel")
    .attr("x", width -75)
    .attr("y", height-105)
    .style("text-anchor", "end")
    .style("font-weight", "bold")
    .text("Legend");

//Legend Properties for Broad Type

//color scheme for broad type:
         //   1) Chordophone: #E8AE68
         //   2) Aerophone: #FFD275
         //   3) Idiophone: #DB5A42
         //   4) Membranophone: #DB5A42
//   1) Composite chordophone: #359c75
    //   2) Free aerophone: #e0a936
    //   3) Non-free aerophone: #916303
    //   4) Struck idiophone: #67218a
    //   5) Simple chordophone: #076943
    //   6) Plucked idiophone: #c389e0
    //   7) Struck Membranophone: #f29483
var chordophoneColor = svg.append("circle")
    .attr("class", "chordophoneColor")
    .attr("r", 5)
    .attr("cx", width-170)
    .attr("cy", height-80)
    .style("fill", "#89B6A5");

var chordophoneText = svg.append("text")
    .attr("class", "chordophoneText")
    .attr("class", "label")
    .attr("x", width -70)
    .attr("y", height-75)
    .style("text-anchor", "end")
    .text("Chordophone");

var aerophoneColor = svg.append("circle")
    .attr("class", "aerophoneColor")
    .attr("r", 5)
    .attr("cx", width-170)
    .attr("cy", height-60)
    .style("fill", "#FFD275");

var aerophoneText = svg.append("text")
    .attr("class", "aerophoneText")
    .attr("x", width -86)
    .attr("y", height-55)
    .style("text-anchor", "end")
    .text("Aerophone");

var idiophoneColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-170)
    .attr("cy", height-40)
    .style("fill", "#8D6A9F");

var idiophoneText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -91)
    .attr("y", height-35)
    .style("text-anchor", "end")
    .text("Idiophone");

var membranophoneColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-170)
    .attr("cy", height-20)
    .style("fill", "#DB5A42");

var membranophoneText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -48)
    .attr("y", height-15)
    .style("text-anchor", "end")
    .text("Membranophone");

//Legend Propertied for Minot Type
var compositeChordophoneColor = svg.append("circle")
    .attr("class", "chordophoneColor")
    .attr("r", 5)
    .attr("cx", width-230)
    .attr("cy", height-80)
    .style("opacity", 0)
    .style("fill", "#359c75");

var compositeChordophoneText = svg.append("text")
    .attr("class", "chordophoneText")
    .attr("class", "label")
    .attr("x", width -60)
    .attr("y", height-75)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Composite Chordophone");

var struckMembranophoneColor = svg.append("circle")
    .attr("class", "chordophoneColor")
    .attr("r", 5)
    .attr("cx", width-230)
    .attr("cy", height-95)
    .style("opacity", 0)
    .style("fill", "#f29483");

var struckMembranophoneText = svg.append("text")
    .attr("class", "chordophoneText")
    .attr("class", "label")
    .attr("x", width -65)
    .attr("y", height-90)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Struck Membranophone");

var freeAerophoneColor = svg.append("circle")
    .attr("class", "aerophoneColor")
    .attr("r", 5)
    .attr("cx", width-230)
    .attr("cy", height-65)
    .style("opacity", 0)
    .style("fill", "#e0a936");

var freeAerophoneText = svg.append("text")
    .attr("class", "aerophoneText")
    .attr("x", width -117)
    .attr("y", height-60)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Free Aerophone");

var nonfreeAerophoneColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-230)
    .attr("cy", height-50)
    .style("opacity", 0)
    .style("fill", "#916303");

var nonfreeAerophoneColorText= svg.append("text")
    .attr("class", "label")
    .attr("x", width - 84)
    .attr("y", height-45)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Non-Free Aerophone");

var struckIdiophoneColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-230)
    .attr("cy", height-35)
    .style("opacity", 0)
    .style("fill", "#67218a");

var struckIdiophoneText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -109)
    .attr("y", height-31)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Struck Idiophone");

var simpleChordophoneColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-230)
    .attr("cy", height-20)
    .style("opacity", 0)
    .style("fill", "#076943");

var simpleChordophoneText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -83)
    .attr("y", height-15)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Simple Chordophone");

var pluckedIdiophoneColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-230)
    .attr("cy", height-5)
    .style("opacity", 0)
    .style("fill", "#c389e0");

var pluckedIdiophoneText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -99)
    .attr("y", height-1)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Plucked Idiophone");

var LuteColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-375)
    .attr("cy", height-95)
    .style("opacity", 0)
    .style("fill", "#5EB182");

var LuteText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -335)
    .attr("y", height-90)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Lute");

var HarpColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-375)
    .attr("cy", height-80)
    .style("opacity", 0)
    .style("fill", "#B1DBB3");

var HarpText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -333)
    .attr("y", height-75)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Harp");

var IFAColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-375)
    .attr("cy", height-65)
    .style("opacity",0)
    .style("fill", "#F8E473");

var IFAText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -183)
    .attr("y", height-60)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Interruptive Free Aerophone");

var DFAColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-375)
    .attr("cy", height-50)
    .style("opacity", 0)
    .style("fill", "#fcf4a3");

var DFAText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -171)
    .attr("y", height-45)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Displacement Free Aerophone");

var ISIColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-375)
    .attr("cy", height-35)
    .style("opacity", 0)
    .style("fill", "#8D7CBC");

var ISIText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -188)
    .attr("y", height-30)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Indirectly Struck Idiophone");

var DSIColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-375)
    .attr("cy", height-20)
    .style("opacity", 0)
    .style("fill", "#ADA9D4");

var DSIText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -198)
    .attr("y", height-15)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Directly Struck Idiophone");

var DSMColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-375)
    .attr("cy", height-5)
    .style("opacity", 0)
    .style("fill", "#FBCFE2");

var DSMText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -154)
    .attr("y", height)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Directly Struck Membranophone");

var FluteColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-140)
    .attr("cy", height-95)
    .style("opacity", 0)
    .style("fill", "#ffe5b4");

var FluteText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -97)
    .attr("y", height -90)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Flute");

var TrumpetColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-140)
    .attr("cy", height-80)
    .style("opacity", 0)
    .style("fill", "#FFC30B");

var TrumpetText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -77)
    .attr("y", height -75)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Trumpet");

var RAColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-140)
    .attr("cy", height-65)
    .style("opacity", 0)
    .style("fill", "#DBDC69");

var RAText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -23)
    .attr("y", height -60)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Reed Aerophone");

var CombColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-140)
    .attr("cy", height-50)
    .style("opacity", 0)
    .style("fill", "#C8B9EE");

var CombText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -27)
    .attr("y", height -45)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Form of a comb");

var BoardColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-140)
    .attr("cy", height-35)
    .style("opacity", 0)
    .style("fill", "#6CA87A");

var BoardText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -48)
    .attr("y", height -30)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Board Zither");

var BarColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-140)
    .attr("cy", height-20)
    .style("opacity", 0)
    .style("fill", "#3A895B");

var BarText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -64)
    .attr("y", height -15)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Bar Zither");

var TubeColor = svg.append("circle")
    .attr("r", 5)
    .attr("cx", width-140)
    .attr("cy", height-5)
    .style("opacity", 0)
    .style("fill", "#A0C7A1");

var TubeText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -55)
    .attr("y", height)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Tube Zither");
