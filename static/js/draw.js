var canvas = document.getElementById("canvas");
var xcoords = [0,30,60,70];
var ycoords = [0,75,27,47];
var teamsizes = [10,6,4,9];
var teamnames = ["a","b","c","d"];

var canvas2 = document.getElementById("canvas2");
var cxcor = [0,30,60,70];
var fxcor = [0,75,27,47];
var gxcor = [0,23,83,39];
var cycor = [0,28,97,54];
var fycor = [0,74,97,76];
var gycor = [0,28,38,58];
var csize = [15,5,8,9];
var fsize = [10,7,3,7];
var gsize = [5,9,12,8];

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

var ajaxCall = function(dbQuery, nameQuery, xStatQuery, yStatQuery){
    $.ajax({
        type: "POST",
        url: '/query', //main.py put to a page that does the quaerry functions. link 
        headers: {"Content-Type": "application/json"},
        data: {db: dbQuery, name : nameQuery, xStat: xStatQuery, yStatQuery},
        success: function(response) {
            //response returns a 2d array
            //console.log("success");
            //console.log(response);
            /*
            PUT YOUR DRAW HELPER FUNCTION HERE?
            */
            //tester here
            /*
            data = response[0]
            console.log(data)
            var coord = document.createElementNS("http://www.w3.org/2000/svg","circle");
            coord.setAttribute("fill", "orange");
            coord.setAttribute("cx", data[1] + 200);
            coord.setAttribute("cy", data[2] + 200);
            coord.setAttribute("r", 10);
            coord.setAttribute("class", "allPositions");
            canvas.appendChild(coord);
            */
        },
        error: function(response, error) {
            console.log("ERROR")
            console.log(response);
            console.log(error);
        }
    });};

ajaxCall("nbaTeams", "team", "games", "win");

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
    coords.attr("cy", function(d){return (600-((d-lowy)/(highy-lowy)*450)-70)});
    coords.data(teamsizes);
    coords.attr("r", function(d){return (d)});

    xval = (highx - lowx) / 10;
    var i;
    for (i = 0; i < xval; i++) {
      var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
      tick.setAttribute("stroke", "black");
      tick.setAttribute("x1", 75);
      tick.setAttribute("y1", 600-i*45-70);
      tick.setAttribute("x2", 65);
      tick.setAttribute("y2", 600-i*45-70);
      canvas.appendChild(tick);
      var label = document.createElementNS("http://www.w3.org/2000/svg","text");
      label.setAttribute("x", 50);
      label.setAttribute("y", 600-i*45-70+3);
      label.setAttribute("font-size", "11px");
      label.setAttribute("fill", "black");
      label.innerHTML = i*10;
      canvas.appendChild(label);
    };

    yval = (highy - lowy) / 10;
    var i;
    for (i = 0; i < yval; i++) {
      var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
      tick.setAttribute("stroke", "black");
      tick.setAttribute("x1", i*45 + 70);
      tick.setAttribute("y1", 600-65);
      tick.setAttribute("x2", i*45 + 70);
      tick.setAttribute("y2", 600-75);
      canvas.appendChild(tick);
      var label = document.createElementNS("http://www.w3.org/2000/svg","text");
      label.setAttribute("x", i*45 + 70-4);
      label.setAttribute("y", 600-50);
      label.setAttribute("font-size", "11px");
      label.setAttribute("fill", "black");
      label.innerHTML = i*10;
      canvas.appendChild(label);
    };

};

draw();

var lineFC;
var lineGC;

var drawLines = function(element1, element2, element3){
    lineFC = document.createElementNS("http://www.w3.org/2000/svg","line");
    lineFC.setAttribute("stroke", "black");
    lineFC.setAttribute("x1", (d3.select(element1).attr("cx")));
    lineFC.setAttribute("y1", (d3.select(element1).attr("cy")));
    lineFC.setAttribute("x2", (d3.select(element2).attr("cx")));
    lineFC.setAttribute("y2", (d3.select(element2).attr("cy")));
    canvas2.appendChild(lineFC);

    lineGC = document.createElementNS("http://www.w3.org/2000/svg","line");
    lineGC.setAttribute("stroke", "black");
    lineGC.setAttribute("x1", (d3.select(element2).attr("cx")));
    lineGC.setAttribute("y1", (d3.select(element2).attr("cy")));
    lineGC.setAttribute("x2", (d3.select(element3).attr("cx")));
    lineGC.setAttribute("y2", (d3.select(element3).attr("cy")));
    canvas2.appendChild(lineGC);
    console.log(d3.select(element1).attr("cx"));
}

var listener = function(thing1,thing2,thing3){
    drawLines(thing1,thing2,thing3);
}

var thing1;
var thing2;
var thing3;
var addListeners = function(){
    for (ia = 0; ia < bigList.length; ia++){
	thing1 = bigList[ia][0];
	thing2 = bigList[ia][1];
	thing3 = bigList[ia][2];
	console.log(thing1);
	if (typeof window.addEventListener === 'function'){
	    (function (thing1,thing2,thing3){
		thing1.addEventListener("mouseover", function(){
		    drawLines(thing1,thing2,thing3);
		});
		thing2.addEventListener("mouseover", function(){
		    drawLines(thing1,thing2,thing3);
		});
		thing3.addEventListener("mouseover", function(){
		    drawLines(thing1,thing2,thing3);
		});
	    })(thing1,thing2,thing3);
	}
	//drawLines(tempList[ia][0],bigList[ia][1],bigList[ia][2]);
	//bigList[ia][0].addEventListener("mouseover", drawLines(bigList[ia][0],bigList[ia][1], bigList[ia][2]), false);
	

	bigList[ia][2].addEventListener("mouseover", function(){listener(bigList[ia][0],bigList[ia][1],bigList[ia][2])}, false);

    }
}

var testing = function(){
    var tester = document.createElementNS("http://www.w3.org/2000/svg","circle");
    tester.setAttribute("fill","black");
    tester.setAttribute("cx", 50);
    tester.setAttribute("cy", 50);
    tester.setAttribute("r", 10);
    canvas2.appendChild(tester);
}

var bigList = [];
var littleList = [];
//var ccoord;
//var fcoord;
//var gcoord;



var draw2 = function(){
	
	for (i = 0; i < cxcor.length; i++){
	    littleList = [];
	    var ccoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	    ccoord.setAttribute("fill", "blue");
	    ccoord.setAttribute("class","center");
	    canvas2.appendChild(ccoord);
	    

	    var fcoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	    fcoord.setAttribute("fill", "red");
	    fcoord.setAttribute("class", "forward");
	    canvas2.appendChild(fcoord);


	    var gcoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	    gcoord.setAttribute("fill", "black");
	    gcoord.setAttribute("class", "guard");
	    canvas2.appendChild(gcoord);

	    littleList.push(fcoord);
	    littleList.push(ccoord);
	    littleList.push(gcoord);

	    bigList.push(littleList);
	    
	    
	    //ccoord.addEventListener("mouseover", function(){drawLines(fcoord,ccoord,gcoord)}, false);
	    //function listener(thing1,thing2,thing3){
	    //    drawLines(thing1,thing2,thing3);
	    //}
	    
	    //fcoord.addEventListener("mouseover", drawLines(fcoord,ccoord,gcoord));
	    //gcoord.addEventListener("mouseover", drawLines(fcoord,ccoord,gcoord));
	};

    var ccoords = d3.selectAll(".center");
    ccoords.data(cxcor);
    ccoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
    ccoords.data(cycor);
    ccoords.attr("cy", function(d){return (600-((d-findminy)/(findmaxy-findminy)*450+70))});
    ccoords.data(csize);
    ccoords.attr("r", function(d){return (d)});

    var fcoords = d3.selectAll(".forward");
    fcoords.data(fxcor);
    fcoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
    fcoords.data(fycor);
    fcoords.attr("cy", function(d){return (600-((d-findminy)/(findmaxy-findminy)*450+70))});
    fcoords.data(fsize);
    fcoords.attr("r", function(d){return (d)});

    var gcoords = d3.selectAll(".guard");
    gcoords.data(gxcor);
    gcoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
    gcoords.data(gycor);
    gcoords.attr("cy", function(d){return (600-((d-findminy)/(findmaxy-findminy)*450+70))});
    gcoords.data(gsize);
    gcoords.attr("r", function(d){return (d)});

    xval = (findmaxx - findminx) / 10;
    var i;
    for (i = 0; i < xval; i++) {
	var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
	tick.setAttribute("stroke", "black");
	tick.setAttribute("x1", 75);
	tick.setAttribute("y1", 600-i*45-70);
	tick.setAttribute("x2", 65);
	tick.setAttribute("y2", 600-i*45-70);
	canvas2.appendChild(tick);
	var label = document.createElementNS("http://www.w3.org/2000/svg","text");
	label.setAttribute("x", 50);
	label.setAttribute("y", 600-i*45-70+3);
	label.setAttribute("font-size", "11px");
 	label.setAttribute("fill", "black");
	label.innerHTML = i*10;
	canvas2.appendChild(label);
    };

    yval = (findmaxy - findminy) / 10;
    var i;
    for (i = 0; i < yval; i++) {
	var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
	tick.setAttribute("stroke", "black");
	tick.setAttribute("x1", i*45 + 70);
	tick.setAttribute("y1", 600-65);
	tick.setAttribute("x2", i*45 + 70);
	tick.setAttribute("y2", 600-75);
	canvas2.appendChild(tick);
	var label = document.createElementNS("http://www.w3.org/2000/svg","text");
	label.setAttribute("x", i*45 + 70-4);
	label.setAttribute("y", 600-50);
	label.setAttribute("font-size", "11px");
	label.setAttribute("fill", "black");
	label.innerHTML = i*10;
	canvas2.appendChild(label);

	
    };

};



draw2();
addListeners();
//canvas2.addEventListener("mouseover", testing, false);
