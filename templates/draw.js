var canvas = document.getElementById("canvas");
var xcoords = [200,400,300];
var ycoords = [150,350,550];
var teamsizes = [6,4,9];
var teamnames = ["a","b","c"];

var canvas2 = document.getElementById("canvas2");
var cxcor = [30,60,70];
var fxcor = [75,27,47];
var gxcor = [23,83,39];
var cycor = [28,97,54];
var fycor = [74,97,76];
var gycor = [28,38,58];
var csize = [5,8,9];
var fsize = [7,3,7];
var gsize = [9,12,8];



var lowx = Math.min(...xcoords);
var highx = Math.max(...xcoords);
var lowy = Math.min(...ycoords);
var highy = Math.max(...ycoords);
var sizelow = Math.min(...teamsizes);
var sizehigh = Math.max(...teamsizes);

var findmin = function(a,b,c){
    return Math.min(Math.min(...a),Math.min(...b),Math.min(...c));
};
var findminx = findmin(cxcor,fxcor,gxcor);

var findminy = findmin(cycor,fycor,gycor);

var findmax = function(a,b,c){
    return Math.max(Math.max(...a),Math.max(...b),Math.max(...c));
};

var findmaxx = findmax(cxcor,fxcor,gxcor);

var findmaxy = findmax(cycor,fycor,gycor);

var draw = function(){
    var i ;
    for (i = 0; i < xcoords.length; i++){
	var coord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	coord.setAttribute("fill", "blue");
	coord.setAttribute("class", "allPositions");
	canvas.appendChild(coord);
    }
    var coords = d3.selectAll(".allPositions");
    coords.data(xcoords);
    coords.attr("cx", function(d){return ((d-lowx)/(highx-lowx)*450+70)});
    coords.data(ycoords);
    coords.attr("cy", function(d){return ((d-lowy)/(highy-lowy)*450+80)});
    coords.data(teamsizes);
    coords.attr("r", function(d){return  (d)});
};

draw()

var draw2 = function(){
    for (i = 0; i < cxcor.length; i++){
	var ccoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	ccoord.setAttribute("fill", "blue");
	ccoord.setAttribute("class","center");
	canvas2.appendChild(ccoord);
    };
    var ccoords = d3.selectAll(".center");
    ccoords.data(cxcor);
    ccoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
    ccoords.data(cycor);
    ccoords.attr("cy", function(d){return ((d-findminy)/(findmaxy-findminy)*450+80)});
    ccoords.data(csize);
    ccoords.attr("r", function(d){return  (d)});var i ;
    
    for (i = 0; i < fxcor.length; i++){
	var fcoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	fcoord.setAttribute("fill", "red");
	fcoord.setAttribute("class", "forward");
	canvas2.appendChild(fcoord);
    };
    var fcoords = d3.selectAll(".forward");
    fcoords.data(fxcor);
    fcoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
    fcoords.data(fycor);
    fcoords.attr("cy", function(d){return ((d-findminy)/(findmaxy-findminy)*450+80)});
    fcoords.data(fsize);
    fcoords.attr("r", function(d){return  (d)});

    for (i = 0; i < gxcor.length; i++){
	var gcoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	gcoord.setAttribute("fill", "black");
	gcoord.setAttribute("class", "guard");
	canvas2.appendChild(gcoord);
    };
    var gcoords = d3.selectAll(".guard");
    gcoords.data(gxcor);
    gcoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
    gcoords.data(gycor);
    gcoords.attr("cy", function(d){return ((d-findminy)/(findmaxy-findminy)*450+80)});
    gcoords.data(gsize);
    gcoords.attr("r", function(d){return  (d)});
};

draw2()
