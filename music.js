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
    {"name":"Idiophones (1)",
     "children": [
       {"name":"Struck idiophones (11)",
       "children": [
         {"name":"Directly struck idiophones (111)",
         "children":[
          {"name":"Marimba"},
          {"name":"Gyil"},
          {"name":"Marimba"},
          {"name":"Cajon"},
          {"name":"Steelpan"}
         ]},
         {"name":"Indirectly struck idiophones (112)",
         "children":[
          {"name":"Pandeiro"},
          {"name":"Angklung"}
         ]}
       ]},
       {"name":"Plucked idiophones (12)",
       "children":[
         {"name":"In the form of a frame (121)"},
         {"name":"In the form of a comb (122)",
         "children":[
          {"name":"Mbira"}
         ]},
         {"name":"Mixed sets of lamellophones (123)"}
       ]},
       {"name":"Friction idiophones (13)",
       "children": [
         {"name":"Friction sticks (131)"},
         {"name":"Friction plaques (132)"},
         {"name":"Friction vessels (133)"}
       ]},
       {"name":"Blown idiophones (12)",
       "children": [
         {"name":"Blown sticks (141)"},
         {"name":"Blown plaques (142)"}
       ]},
       {"name":"Unclassified idiophones (15)"}
     ]},
    {"name":"Membranophones (2)",
    "children": [
      {"name":"Struck membranophones (21)",
      "children": [
        {"name":"Directly struck membranophones (211)",
        "children":[
          {"name":"Daf"},
          {"name":"Doira"},
          {"name":"Madal"},
          {"name":"Darbuka"}
        ]},
        {"name":"Shaken membranophones (212)"}
      ]},
      {"name":"Plucked membranophones (22)"},
      {"name":"Friction membranophones (23)",
      "children": [
        {"name":"Friction drums with stick (231)"},
        {"name":"Friction drum with cord (232)"},
        {"name":"Hand friction drums (233)"}
      ]},
      {"name":"Singing membranes (kazoos) (24)",
      "children": [
        {"name":"Free kazoos (241)"},
        {"name":"Tube or vessel-kazoos (242))"}
      ]},
      {"name":"Unclassified membranophones (25)"}
    ]},
    {"name":"Chordophones (3)",
    "children": [
      {"name":"Simple chordophones or zithers (31)",
       "children": [
         {"name":"Bar zithers (311)",
         "children":[
          {"name":"Saraswati veena"},
          {"name":"Pin pia"}
         ]},
         {"name":"Tube zithers (312)",
         "children":[
          {"name":"Koto"},
          {"name":"Gayageum"},
          {"name":"Valiha"}
         ]},
         {"name":"Raft zithers (313)"},
         {"name":"Board zithers (314)",
         "children":[
          {"name":"Kantele"},
          {"name":"Cimbalom"},
          {"name":"Tar"},
          {"name":"Kokles"},
          {"name":"Langeleik"}
         ]},
         {"name":"Trough zithers (315)"},
         {"name":"Bar zithers (316)"}
       ]},
      {"name":"Composite chordophones (32)",
      "children":[
        {"name":"Lutes (321)",
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
        {"name":"Harps (322)",
        "children":[
          {"name":"Saung-gauk"},
          {"name":"Harp"},
          {"name":"Paraguayan harp"},
          {"name":"Cláirseach"}
        ]},
        {"name":"Harp Lutes (323)"}
      ]},
      {"name":"Unclassified chordophones (33)"}
    ]},
    {"name":"Aerophones (4)",
    "children": [
      {"name":"Free aerophones (41)",
      "children": [
        {"name":"Displacement free aerophones (411)",
        "children":[
          {"name":"Tambin"}
        ]},
        {"name":"Interruptive free aerophones (412)",
        "children":[
          {"name":"Bandoneón"},
          {"name":"English concertina"},
          {"name":"Khene"},
          {"name":"Garmon"},
          {"name":"Accordion"}
        ]},
        {"name":"Plosive aerophones (413)"}
      ]},
      {"name":"Non-free aerophones (wind instruments proper) (42)",
      "children": [
         {"name":"Edge-blown aerophones or flutes (421)",
         "children":[
          {"name":"Duduk daduk"},
          {"name":"Rondador"},
          {"name":"Nose flute"},
          {"name":"Fujara"}
         ]},
         {"name":"Reed aerophones (422)",
         "children":[
          {"name":"Birbyne"},
          {"name":"Bagpipes"},
          {"name":"Bock"},
          {"name":"Balaban"},
          {"name":"Gaida"}
         ]},
         {"name":"Trumpets (423)",
         "children":[
          {"name":"Didgeridoo"},
          {"name":"Abeng"},
          {"name":"Lesiba"},
          {"name":"Alphorn"}
         ]},
         {"name":"Mixed sets of wind instruments (424)"} 
      ]},
      {"name":"Mixed sets of aerophones (43)"}
    ]},
    {"name":"Electrophones (5)"}
  ]
};
// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 560 - margin.left - margin.right,
    height = 590 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var innersvg = d3.select("body").append("svg")
    .attr("width", 1000)
    .attr("height", 600)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

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
      console.log("testing");

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





// Width and height
var width = document.getElementById('container').offsetWidth-60,
    height = 500,
    centered;

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
         //   1) Chordophone: #BE79DF
         //   2) Aerophone: #00FFFF
         //   3) Idiophone: #c90e0e
         //   4) Membranophone: #194719
         .style("fill", function(d) {
            var classification = d.properties.broadType;
            if(classification === "Chordophone") {
                   return "#BE79DF";}//purple  
            if(classification === "Aerophone") {
                   return "#00FFFF";}//aqua
            if(classification === "Idiophone") {
                   return "#c90e0e";}//red
            if(classification === "Membranophone") {
                   return "#194719";}
            else {
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
                       .style("top", (d3.event.pageY) + "px")
                div.select("button").on("click", function() {
                    div.style("opacity", 0)
                });
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
    //   1) Composite chordophone: #32a852
    //   2) Free aerophone: #7cb7eb
    //   3) Non-free aerophone: #daa5f2
    //   4) Struck idiophone: #e36db4
    //   5) Simple chordophone: #871b1f
    //   6) Plucked idiophone: #2f9685
    //   7) Struck Membranophone: #edd539
function changeMinotColorScheme(){
    //change color scheme
    g.selectAll("path")
    .style("fill", function(d) {
            var classification = d.properties.minotType;
            if(classification === "Composite chordophone") {
                   return "#32a852";} 
            if(classification === "Free aerophone") {
                   return "#7cb7eb";}
            if(classification === "Non-free aerophones (wind instruments proper)") {
                   return "#daa5f2";}
            if(classification === "Struck idiophone") {
                   return "#e36db4";}
            if(classification === "Simple chordophones or zither") {
                   return "#871b1f";} 
            if(classification === "Struck membranophone") {
                   return "#edd539";}
            if(classification === "Plucked idiophone") {
                   return "#2f9685";}
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


function changeBroadColorScheme(){
    g.selectAll("path")
    .style("fill", function(d) {
            var classification = d.properties.broadType;
            if(classification === "Chordophone") {
                   return "#BE79DF";}//purple  
            if(classification === "Aerophone") {
                   return "#00FFFF";}//aqua
            if(classification === "Idiophone") {
                   return "#c90e0e";}//red
            if(classification === "Membranophone") {
                   return "#194719";}
            else {
                // light grey 
                return "rgb(213,222,217)";}
    });
    
    //change legend
    legend.attr("x", width-200).attr("width", 200);
    legendText.attr("x", width - 75);
    
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
}

// Legend for Instrument Classification 
//Legend should be 200 for broad type and 250 for minot type
var legend = svg.append("rect")
    .attr("x", width-200)
    .attr("y", height-120)
    .attr("width", 200)
    .attr("rx", 10)
    .attr("ry", 10)
    .style("opacity",0.5)
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
var chordophoneColor = svg.append("circle")
    .attr("class", "chordophoneColor")
    .attr("r", 5)
    .attr("cx", width-170)
    .attr("cy", height-80)
    .style("fill", "#BE79DF");

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
    .style("fill", "#00FFFF");

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
    .style("fill", "#c90e0e");

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
    .style("fill", "#194719");

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
    .style("fill", "#32a852");

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
    .style("fill", "#edd539");

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
    .style("fill", "#7cb7eb");

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
    .style("fill", "#daa5f2");

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
    .style("fill", "#e36db4");

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
    .style("fill", "#871b1f");

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
    .style("fill", "#2f9685");

var pluckedIdiophoneText = svg.append("text")
    .attr("class", "label")
    .attr("x", width -99)
    .attr("y", height-1)
    .style("text-anchor", "end")
    .style("opacity", 0)
    .text("Plucked Idiophone");

anychart.onDocumentReady(function () {
      // The data used in this sample can be obtained from the CDN
      // https://cdn.anychart.com/samples/sunburst-charts/coffee-flavour-wheel/data.json
      anychart.data.loadJsonFile(
        'sunburstdata.json',
        function (data) {
          // makes tree from the data for the sample
          var dataTree = anychart.data.tree(data, 'as-table');

          // create sunburst chart
          var chart = anychart.sunburst(dataTree);

          // set calculation mode
          chart.calculationMode('ordinal-from-root');

          // set chart title
          chart.title('Instrument Classifications');

          // set settings for the penultimate level labels
          chart.level(-2).labels().position('radial');

          // set chart labels settings
          chart.labels().hAlign('center');

          // set settings for leaves labels
          chart.leaves().labels().minFontSize(8).textOverflow('...');

          // the fill specified in the data has priority
          // set point fill
          chart.fill(function () {
            return anychart.color.darken(this.parentColor, 0.15);
          });

          // set container id for the chart
          chart.container('container2');
          // initiate chart drawing
          chart.draw();
        }
      );
    });

