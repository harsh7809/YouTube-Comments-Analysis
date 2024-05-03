document.addEventListener("DOMContentLoaded", function() {
    // Extract the values of positivity, negativity, and neutrality using querySelector
    let positivity = parseFloat(document.querySelector("#posit").innerText);
    let negativity = parseFloat(document.querySelector("#negat").innerText);
    let neutrality = parseFloat(document.querySelector("#neut").innerText);

    // Define the data array including the extracted values
    var data = [
        { label: "Positivity", value: positivity },
        { label: "Negativity", value: negativity },
        { label: "Neutrality", value: neutrality }
    ];

    // Set up dimensions for the pie chart
    var width = 350;
    var height = 350;
    var radius = Math.min(width, height) / 2;

    // Set up color scale for the pie chart
    var color = d3.scaleOrdinal()
        .domain(data.map(function(d) { return d.label; }))
        .range(d3.schemeCategory10);

    // Create the pie layout
    var pie = d3.pie()
        .value(function(d) { return d.value; });

    // Create an arc generator
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Select the SVG element
    var svg = d3.select("#pie-chart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Generate the pie chart
    var arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    // Draw each arc
    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d) { return color(d.data.label); });

    // Add labels to the arcs
    arcs.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("text-anchor", "middle")
        .text(function(d) { return d.data.label; });

});
