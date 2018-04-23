var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");

var findmin = function(a,b,c){
    return Math.min(Math.min(...a),Math.min(...b),Math.min(...c));
};

var findmax = function(a,b,c){
    return Math.max(Math.max(...a),Math.max(...b),Math.max(...c));
};

//var currentx = "BMI";
//var currenty = "Weight";

var lowx, highx, lowy, highy, sizelow, sizehigh, findminx, findmaxx, findminy, findmaxy, findminz, findmaxz;
var bigCircle;
var thing1;
var thing2;
var thing3;
var line1;
var line2;
var bigCircleX;
var bigCircleY;
var bigCircleSize;
var bigCircleName;
var thing1x;
var thing1y;
var thing1size;
var thing1name;
var thing2x;
var thing2y;
var thing2size;
var thing2name;
var thing3x;
var thing3y;
var thing3size;
var thing3name;
var ajaxCall = function(xStatQuery, yStatQuery){
    //currentx = xStatQuery;
    //currenty = yStatQuery;
    var xaxes = document.getElementsByClassName("x");
    var xi;
    for (xi = 0; xi < xaxes.length; xi++) {
	xaxes[xi].innerHTML = xStatQuery;
    };
    var yaxes = document.getElementsByClassName("y");
    var yi;
    for (yi = 0; yi < yaxes.length; yi++) {
	yaxes[yi].innerHTML = yStatQuery;
    };

    var head = document.getElementById("header");
    head.innerHTML = "NBA Teams: Average "+xStatQuery+" vs Average "+yStatQuery

    $.ajax({
        type: "POST",
        url: '/query', //main.py put to a page that does the quaerry functions. link
        headers: {"Content-Type": "application/json"},
        data: {xStat: xStatQuery, yStat: yStatQuery},
        success: function(response) {
            //response returns a 2d array
            console.log("success. starting ajax call");
            //console.log(response);
            var svgContainer1 = document.getElementById("canvas1");
            svgContainer1.innerHTML = "";
            var svgContainer2 = document.getElementById("canvas2");
            svgContainer2.innerHTML = "";

            var xSelect = document.getElementById("x");
            var ySelect = document.getElementById("y");
            xSelect.addEventListener("change", function(){ajaxCall(xfunction(), yfunction())}, false);
            ySelect.addEventListener("change", function(){ajaxCall(xfunction(), yfunction())}, false);
            var xstat = response.map(function(elt) { return elt[1]; });
            lowx = Math.min.apply(null, xstat);
            highx = Math.max.apply(null, xstat);
            var xrange = highx - lowx;
            lowx = Math.floor(lowx - Math.ceil(xrange / 10));
            highx = Math.floor(highx + Math.ceil(xrange / 10));
            var ystat = response.map(function(elt) { return elt[2]; });
            lowy = Math.min.apply(null, ystat);
            highy = Math.max.apply(null, ystat);
            var yrange = highy - lowy;
            //lowy = Math.floor(lowy - Math.ceil(yrange / 10));
            highy = Math.floor(highy + Math.ceil(yrange / 10));
            var sizes = response.map(function(elt) { return elt[3]; });
            sizelow = Math.min.apply(null, sizes);
            sizehigh = Math.max.apply(null, sizes);

            var cxcor = response.map(function(elt) { return elt[4]; });
            var cxlow = Math.min.apply(null, cxcor);
            var cxhigh = Math.max.apply(null, cxcor);
            var cycor = response.map(function(elt) { return elt[5]; });
            var cylow = Math.min.apply(null, cycor);
            var cyhigh = Math.max.apply(null, cycor);
            var csizes = response.map(function(elt) { return elt[6]; });
            var czlow = Math.min.apply(null, csizes);
            var czhigh = Math.max.apply(null, csizes);
            var fxcor = response.map(function(elt) { return elt[7]; });
            var fxlow = Math.min.apply(null, fxcor);
            var fxhigh = Math.max.apply(null, fxcor);
            var fycor = response.map(function(elt) { return elt[8]; });
            var fylow = Math.min.apply(null, fycor);
            var fyhigh = Math.max.apply(null, fycor);
            var fsizes = response.map(function(elt) { return elt[9]; });
            var fzlow = Math.min.apply(null, fsizes);
            var fzhigh = Math.max.apply(null, fsizes);
            var gxcor = response.map(function(elt) { return elt[10]; });
            var gxlow = Math.min.apply(null, gxcor);
            var gxhigh = Math.max.apply(null, gxcor);
            var gycor = response.map(function(elt) { return elt[11]; });
            var gylow = Math.min.apply(null, gycor);
            var gyhigh = Math.max.apply(null, gycor);
            var gsizes = response.map(function(elt) { return elt[12]; });
            var gzlow = Math.min.apply(null, gsizes);
            var gzhigh = Math.max.apply(null, gsizes);
            findminx = findmin(cxcor, fxcor, gxcor);
            findminy = findmin(cycor, fycor, gycor);
            findminz = findmin(csizes, fsizes, gsizes);
            findmaxx = findmax(cxcor, fxcor, gxcor);
            findmaxy = findmax(cycor, fycor, gycor);
            findmaxz = findmax(csizes, fsizes, gsizes);
            var xrange2 = findmaxx - findminx;
            findminx = findminx - Math.ceil(xrange2 / 10);
            findmaxx = findmaxx + Math.ceil(xrange2 / 10);
            var yrange2 = findmaxy - findminy;
            //findminy = findminy - Math.ceil(yrange2 / 10);
            findmaxy = findmaxy + Math.ceil(yrange2 / 10);
            draw(response);
            draw2(response);
            console.log("successful ajax call completed")
        },
        error: function(response, error) {
            console.log("ERROR")
            console.log(response);
            console.log(error);
        }
    });};

//ajaxCall("BMI", "Weight");
var totalList = [];
var draw = function(data){
    lowx = Math.floor(lowx)
    lowy = Math.floor(lowy);
    highx = Math.floor(highx);
    highy = Math.floor(highy);
    if (lowx < 0){
	lowx = 0;
    }
    if (lowy < 0){
	lowy = 0;
    }
    if (highx < 0){
	highx = 0;
    }
    if (highy < 0){
	highy= 0;
    }
    var svgContainer1 = document.getElementById("canvas1");
    svgContainer1.innerHTML += `<text x="300" y="580" font-family="sans-serif" font-size="20px" fill="black" class="x">`+ xfunction() + `</text>
  <text font-family="sans-serif" font-size="20px" fill="black" transform="translate(30,320)rotate(270)" class="y">` + yfunction() + `</text>
  <line x1="70" y1="530" x2="570" y2="530" style="stroke:black;stroke-width:2" />
  <line x1="70" y1="530" x2="70" y2="30" style="stroke:black;stroke-width:2" />
  <line x1="72.5" y1="530" x2="74" y2="535" style="stroke:black;stroke-width:1" />
  <line x1="74" y1="535" x2="77" y2="525" style="stroke:black;stroke-width:1" />
  <line x1="77" y1="525" x2="80" y2="535" style="stroke:black;stroke-width:1" />
  <line x1="80" y1="535" x2="83" y2="525" style="stroke:black;stroke-width:1" />
  <line x1="83" y1="525" x2="85.5" y2="530" style="stroke:black;stroke-width:1" />`
  totalList = [];
  bigList = [];
  littleList = [];
  
    //#console.log("xcunftion = " + xfunction());
    //svgContainer1.getElementsByClassName("x").innerHTML = xfunction();
    //console.log(svgContainer1.getElementsByClassName("x").innerHTML);
    var i ;
    for (i = 0; i < data.length; i++){
	//for (i = Math.floor(lowx); i < data.length; i++){
	//console.log(i)
	var coord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	coord.setAttribute("fill", "purple");
	coord.setAttribute("fill-opacity", 0.4);
	coord.setAttribute("class", "allPositions");
	coord.setAttribute("cx", (data[i][1]-lowx)/(highx-lowx)*450+70);
	coord.setAttribute("cy", (600-((data[i][2]-lowy)/(highy-lowy)*450+70)));
	coord.setAttribute("r", data[i][3]);
	canvas1.appendChild(coord);
	totalList.push(coord);
    };

    var xrange = highx - lowx;
    var xscale;
    if (xrange < 20) {
	xscale = 1;
    } else if (xrange < 100) {
	xscale = 5;
    } else {
	xscale = 10;
    };

    var xval = Math.ceil((xrange)/xscale);
    var i;
    for (i = 1; i <= xval; i++) {
	var val = Math.floor(lowx / xscale) * xscale + i * xscale;
	var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
	tick.setAttribute("stroke", "black");
	tick.setAttribute("x1", (val-lowx)/(xrange)*450+70);
	tick.setAttribute("y1", 600-65);
	tick.setAttribute("x2", (val-lowx)/(xrange)*450+70);
	tick.setAttribute("y2", 600-75);
	canvas1.appendChild(tick);
	var label = document.createElementNS("http://www.w3.org/2000/svg","text");
	label.setAttribute("x", (val-lowx)/(xrange)*450+70-4);
	label.setAttribute("y", 600-50);
	label.setAttribute("font-size", "11px");
	label.setAttribute("fill", "black");
	label.innerHTML = val;
	canvas1.appendChild(label);
    };

    var yrange = highy - lowy;
    var yscale;
    if (yrange < 20) {
	yscale = 1;
    } else if (yrange < 100) {
	yscale = 5;
    } else {
	yscale = 10;
    };

    var yval = Math.ceil((yrange)/yscale);
    var i;
    for (i = 0; i <= yval; i++) {
	var val = Math.floor(lowy / yscale) * yscale + i * yscale;
	var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
	tick.setAttribute("stroke", "black");
	tick.setAttribute("x1", 75);
	tick.setAttribute("y1", 600-((val-lowy)/(yrange)*450)-70);
	tick.setAttribute("x2", 65);
	tick.setAttribute("y2", 600-((val-lowy)/(yrange)*450)-70);
	canvas1.appendChild(tick);
	var label = document.createElementNS("http://www.w3.org/2000/svg","text");
	label.setAttribute("x", 45);
	label.setAttribute("y", 600-((val-lowy)/(yrange)*450)-70+3);
	label.setAttribute("font-size", "11px");
	label.setAttribute("fill", "black");
	label.innerHTML = val;
	canvas1.appendChild(label);
	};
	console.log("totalList= " + totalList.length);
    for (i = 0; i < totalList.length; i++){
		//console.log(data);
	bigCircle = totalList[i];
	bigCircleX = Math.round(data[i][1]);
	bigCircleY = Math.round(data[i][2]);
	bigCircleSize = data[i][3];
	bigCircleName = data[i][0];
	var box;
	var text;
	var text1;
	var text2;
	var text3;
	if (typeof window.addEventListener === 'function'){
	    (function (bigCircle,bigCircleX, bigCircleY,bigCircleSize,bigCircleName){
		bigCircle.addEventListener("mouseover", function(){
		    box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		    box.setAttribute("x", (d3.select(bigCircle).attr("cx") + 79));
		    box.setAttribute("y", (d3.select(bigCircle).attr("cy") - 60));
		    box.setAttribute("class", "infobox");
		    box.setAttribute("height", "50");
		    box.setAttribute("width", "100");
		    box.setAttribute("stroke", "black")
		    box.setAttribute("fill", "white");
		    text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text.setAttribute("x", (d3.select(bigCircle).attr("cx") + 80));
		    text.setAttribute("y", (d3.select(bigCircle).attr("cy") - 50));
		    text.setAttribute("font-size", "11px");
		    text.setAttribute("fill", "black");
		    text.innerHTML = bigCircleName;
		    text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text1.setAttribute("x", (d3.select(bigCircle).attr("cx") + 80));
		    text1.setAttribute("y", (d3.select(bigCircle).attr("cy") - 40));
		    text1.setAttribute("font-size", "11px");
		    text1.setAttribute("fill", "black");
		    text1.innerHTML = "Team Size: " + bigCircleSize;
		    text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text2.setAttribute("x", (d3.select(bigCircle).attr("cx") + 80));
		    text2.setAttribute("y", (d3.select(bigCircle).attr("cy") - 30));
		    text2.setAttribute("font-size", "11px");
		    text2.setAttribute("fill", "black");
		    text2.innerHTML = "X-axis data: " + bigCircleX;
		    text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text3.setAttribute("x", (d3.select(bigCircle).attr("cx") + 80));
		    text3.setAttribute("y", (d3.select(bigCircle).attr("cy") - 20));
		    text3.setAttribute("font-size", "11px");
		    text3.setAttribute("fill", "black");
		    text3.innerHTML =  "Y-axis data: " + bigCircleY;
		    bigCircle.setAttribute("fill-opacity", 1);
		    canvas1.appendChild(box);
		    canvas1.appendChild(text);
		    canvas1.appendChild(text1);
		    canvas1.appendChild(text2);
		    canvas1.appendChild(text3);
		});
		bigCircle.addEventListener("mouseout", function(){
		    canvas1.removeChild(box);
		    canvas1.removeChild(text);
		    canvas1.removeChild(text1);
		    canvas1.removeChild(text2);
		    canvas1.removeChild(text3);
		    console.log("work");
		    bigCircle.setAttribute("fill-opacity", 0.4);
		});
	    })(bigCircle,bigCircleX,bigCircleY,bigCircleSize,bigCircleName);
	}
    }

};

var datacolor = ["black"]
var addListeners = function(){
    for (i = 0; i < totalList.length; i++){
	bigCircle = totalList[i];
  var bigCircleX = data[i][1];
  var bigCircleY = data[i][2];
  var bigCircleSize = data[i][3];
	if (typeof window.addEventListener === 'function'){
	    (function (bigCircle){
		bigCircle.addEventListener("mouseover", function(){
		    console.log("work");
		    bigCircle.setAttribute("fill-opacity", 1);
		});
		bigCircle.addEventListener("mouseout", function(){
		    console.log("work");
		    bigCircle.setAttribute("fill-opacity", 0.4);
		});
	    })(bigCircle);
	}
    }
    for (ia = 0; ia < bigList.length; ia++){
	var name1 = ".fc" + ia;
	var name2 = ".gc" + ia;
	thing1 = bigList[ia][0];
	thing2 = bigList[ia][1];
	thing3 = bigList[ia][2];
	line1 = d3.selectAll(name1);
	line2 = d3.selectAll(name2);
	//console.log(line1);
	if (typeof window.addEventListener === 'function'){
	    (function (line1,line2,thing1,thing2,thing3){
		thing1.addEventListener("mouseover", function(){
		    console.log("work");
		    thing1.setAttribute("fill-opacity", 1);
		    thing2.setAttribute("fill-opacity", 1);
		    thing3.setAttribute("fill-opacity", 1);
		});
		thing2.addEventListener("mouseover", function(){
		    thing1.setAttribute("fill-opacity", 1);
		    thing2.setAttribute("fill-opacity", 1);
		    thing3.setAttribute("fill-opacity", 1);
		});
		thing3.addEventListener("mouseover", function(){
		    thing1.setAttribute("fill-opacity", 1);
		    thing2.setAttribute("fill-opacity", 1);
		    thing3.setAttribute("fill-opacity", 1);
		});
		thing1.addEventListener("mouseout", function(){
		    console.log("work");
		    thing1.setAttribute("fill-opacity", 0.4);
		    thing2.setAttribute("fill-opacity", 0.4);
		    thing3.setAttribute("fill-opacity", 0.4);
		});
		thing2.addEventListener("mouseout", function(){
		    thing1.setAttribute("fill-opacity", 0.4);
		    thing2.setAttribute("fill-opacity", 0.4);
		    thing3.setAttribute("fill-opacity", 0.4);
		});
		thing3.addEventListener("mouseout", function(){
		    thing1.setAttribute("fill-opacity", 0.4);
		    thing2.setAttribute("fill-opacity", 0.4);
		    thing3.setAttribute("fill-opacity", 0.4);
		});
	    })(line1,line2,thing1,thing2,thing3);
	}
    }
}


var bigList = [];
var littleList = [];

var draw2 = function(data){
    lowx = Math.floor(lowx);
    lowy = Math.floor(lowy);
    highx = Math.floor(highx);
    highy = Math.floor(highy);
    if (lowx < 0){
	lowx = 0;
    }
    if (lowy < 0){
	lowy = 0;
    }
    if (highx < 0){
	highx = 0;
    }
    if (highy < 0){
	highy= 0;
    }

    var svgContainer2 = document.getElementById("canvas2");
    svgContainer2.innerHTML += `<text x="300" y="580" font-family="sans-serif" font-size="20px" fill="black" class="x">`+ xfunction() + `</text>
  <text font-family="sans-serif" font-size="20px" fill="black" transform="translate(30,320)rotate(270)" class="y">` + yfunction() + `</text>
  <line x1="70" y1="530" x2="570" y2="530" style="stroke:black;stroke-width:2" />
  <line x1="70" y1="530" x2="70" y2="30" style="stroke:black;stroke-width:2" />
  <line x1="72.5" y1="530" x2="74" y2="535" style="stroke:black;stroke-width:1" />
  <line x1="74" y1="535" x2="77" y2="525" style="stroke:black;stroke-width:1" />
  <line x1="77" y1="525" x2="80" y2="535" style="stroke:black;stroke-width:1" />
  <line x1="80" y1="535" x2="83" y2="525" style="stroke:black;stroke-width:1" />
  <line x1="83" y1="525" x2="85.5" y2="530" style="stroke:black;stroke-width:1" />`
  totalList = [];
  bigList = [];
  littleList = [];
  
    for (i = 0; i < data.length; i++){
	var littleList = [];
	var ccoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	ccoord.setAttribute("fill", "blue");
	ccoord.setAttribute("fill-opacity", 0.4);
	ccoord.setAttribute("class","center");
	ccoord.setAttribute("cx", (data[i][4]-findminx)/(findmaxx-findminx)*450+70);
	ccoord.setAttribute("cy", (600-((data[i][5]-findminy)/(findmaxy-findminy)*450+70)));
	ccoord.setAttribute("r", data[i][6] * 2);
	canvas2.appendChild(ccoord);

	var fcoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	fcoord.setAttribute("fill", "red");
	fcoord.setAttribute("fill-opacity", 0.4);
	fcoord.setAttribute("class", "forward");
	fcoord.setAttribute("cx", (data[i][7]-findminx)/(findmaxx-findminx)*450+70);
	fcoord.setAttribute("cy", (600-((data[i][8]-findminy)/(findmaxy-findminy)*450+70)));
	fcoord.setAttribute("r", data[i][9] * 2);
	canvas2.appendChild(fcoord);


	var gcoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
	gcoord.setAttribute("fill", "green");
	gcoord.setAttribute("fill-opacity", 0.4);
	gcoord.setAttribute("class", "guard");
	gcoord.setAttribute("cx", (data[i][10]-findminx)/(findmaxx-findminx)*450+70);
	gcoord.setAttribute("cy", (600-((data[i][11]-findminy)/(findmaxy-findminy)*450+70)));
	gcoord.setAttribute("r", data[i][12] * 2);
	canvas2.appendChild(gcoord);

	littleList.push(fcoord);
	littleList.push(ccoord);
	littleList.push(gcoord);

	bigList.push(littleList);

	var namefc = "fc" + i;
	var namegc = "gc" + i;
	var lineFC = document.createElementNS("http://www.w3.org/2000/svg","line");
	lineFC.setAttribute("stroke", "gray");
	lineFC.setAttribute("class", namefc);
	lineFC.setAttribute("x1", (data[i][7]-findminx)/(findmaxx-findminx)*450+70);
	lineFC.setAttribute("y1", 600-((data[i][8]-findminy)/(findmaxy-findminy)*450+70));
	lineFC.setAttribute("x2", (data[i][4]-findminx)/(findmaxx-findminx)*450+70);
	lineFC.setAttribute("y2", 600-((data[i][5]-findminy)/(findmaxy-findminy)*450+70));
	canvas2.appendChild(lineFC);

	var lineGC = document.createElementNS("http://www.w3.org/2000/svg","line");
	lineGC.setAttribute("stroke", "gray");
	lineGC.setAttribute("class", namegc);
	lineGC.setAttribute("x1", (data[i][10]-findminx)/(findmaxx-findminx)*450+70);
	lineGC.setAttribute("y1", 600-((data[i][11]-findminy)/(findmaxy-findminy)*450+70));
	lineGC.setAttribute("x2", (data[i][4]-findminx)/(findmaxx-findminx)*450+70);
	lineGC.setAttribute("y2", 600-((data[i][5]-findminy)/(findmaxy-findminy)*450+70));
	canvas2.appendChild(lineGC);
    };

    var xrange = findmaxx - findminx;
    var xscale;
    if (xrange < 20) {
	xscale = 1;
    } else if (xrange < 100) {
	xscale = 5;
    } else {
	xscale = 10;
    };

    var xval = Math.ceil((xrange)/xscale);
    var i;
    for (i = 1; i <= xval; i++) {
	var val = Math.floor(findminx / xscale) * xscale + i * xscale;
	var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
	tick.setAttribute("stroke", "black");
	tick.setAttribute("x1", (val-findminx)/(xrange)*450+70);
	tick.setAttribute("y1", 600-65);
	tick.setAttribute("x2", (val-findminx)/(xrange)*450+70);
	tick.setAttribute("y2", 600-75);
	canvas2.appendChild(tick);
	var label = document.createElementNS("http://www.w3.org/2000/svg","text");
	label.setAttribute("x", (val-findminx)/(xrange)*450+70-4);
	label.setAttribute("y", 600-50);
	label.setAttribute("font-size", "11px");
	label.setAttribute("fill", "black");
	label.innerHTML = val;
	canvas2.appendChild(label);
    };

    var yrange = findmaxy - findminy;
    var yscale;
    if (yrange < 20) {
	yscale = 1;
    } else if (yrange < 100) {
	yscale = 5;
    } else {
	yscale = 10;
    };

    var yval = Math.ceil((yrange)/yscale);
    var i;
    for (i = 0; i <= yval; i++) {
	var val = Math.floor(findminy / yscale) * yscale + i * yscale;
	var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
	tick.setAttribute("stroke", "black");
	tick.setAttribute("x1", 75);
	tick.setAttribute("y1", 600-((val-findminy)/(yrange)*450)-70);
	tick.setAttribute("x2", 65);
	tick.setAttribute("y2", 600-((val-findminy)/(yrange)*450)-70);
	canvas2.appendChild(tick);
	var label = document.createElementNS("http://www.w3.org/2000/svg","text");
	label.setAttribute("x", 45);
	label.setAttribute("y", 600-((val-findminy)/(yrange)*450)-70+3);
	label.setAttribute("font-size", "11px");
	label.setAttribute("fill", "black");
	label.innerHTML = val;
	canvas2.appendChild(label);
    };


    for (ia = 0; ia < bigList.length; ia++){
	var name1 = ".fc" + ia;
	var name2 = ".gc" + ia;
	thing1 = bigList[ia][0];
	thing2 = bigList[ia][1];
	thing3 = bigList[ia][2];
	line1 = d3.selectAll(name1);
	line2 = d3.selectAll(name2);
	thing1x = Math.round(data[ia][7]);
	thing1y = Math.round(data[ia][8]);
	thing1size = data[ia][9]/2;
	thing2x = Math.round(data[ia][4]);
	thing2y = Math.round(data[ia][5]);
	thing2size = data[ia][6]/2;
	thing3x = Math.round(data[ia][10]);
	thing3y = Math.round(data[ia][11]);
	thing3size = data[ia][11]/2;
	thingname = data[ia][0]
	//console.log(line1);
	var box;
	var text;
	var text1;
	var text2;
	var text3;
	if (typeof window.addEventListener === 'function'){
	    (function (line1,line2,thing1,thing2,thing3,thingname,thing1x,thing1y,thing1size,thing2x,thing2y,thing2size,thing3x,thing3y,thing3size){
		thing1.addEventListener("mouseover", function(){
		    box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		    box.setAttribute("x", (d3.select(thing1).attr("cx") + 79));
		    box.setAttribute("y", (d3.select(thing1).attr("cy") - 60));
		    box.setAttribute("class", "infobox");
		    box.setAttribute("height", "50");
		    box.setAttribute("width", "120");
		    box.setAttribute("stroke", "black")
		    box.setAttribute("fill", "white");
		    text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text.setAttribute("x", (d3.select(thing1).attr("cx") + 80));
		    text.setAttribute("y", (d3.select(thing1).attr("cy") - 50));
		    text.setAttribute("font-size", "11px");
		    text.setAttribute("fill", "red");
		    text.innerHTML = thingname + " Forwards";
		    text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text1.setAttribute("x", (d3.select(thing1).attr("cx") + 80));
		    text1.setAttribute("y", (d3.select(thing1).attr("cy") - 40));
		    text1.setAttribute("font-size", "11px");
		    text1.setAttribute("fill", "black");
		    text1.innerHTML = "Size: " + thing1size;
		    text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text2.setAttribute("x", (d3.select(thing1).attr("cx") + 80));
		    text2.setAttribute("y", (d3.select(thing1).attr("cy") - 30));
		    text2.setAttribute("font-size", "11px");
		    text2.setAttribute("fill", "black");
		    text2.innerHTML = "X-axis data: " + thing1x;
		    text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text3.setAttribute("x", (d3.select(thing1).attr("cx") + 80));
		    text3.setAttribute("y", (d3.select(thing1).attr("cy") - 20));
		    text3.setAttribute("font-size", "11px");
		    text3.setAttribute("fill", "black");
		    text3.innerHTML =  "Y-axis data: " + thing1y;
		    canvas2.appendChild(box);
		    canvas2.appendChild(text);
		    canvas2.appendChild(text1);
		    canvas2.appendChild(text2);
		    canvas2.appendChild(text3)
		    thing1.setAttribute("fill-opacity", 1);
		    thing2.setAttribute("fill-opacity", 1);
		    thing3.setAttribute("fill-opacity", 1);
		});
		thing2.addEventListener("mouseover", function(){
		    box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		    box.setAttribute("x", (d3.select(thing2).attr("cx") + 79));
		    box.setAttribute("y", (d3.select(thing2).attr("cy") - 60));
		    box.setAttribute("class", "infobox");
		    box.setAttribute("height", "50");
		    box.setAttribute("width", "120");
		    box.setAttribute("stroke", "black")
		    box.setAttribute("fill", "white");
		    text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text.setAttribute("x", (d3.select(thing2).attr("cx") + 80));
		    text.setAttribute("y", (d3.select(thing2).attr("cy") - 50));
		    text.setAttribute("font-size", "11px");
		    text.setAttribute("fill", "blue");
		    text.innerHTML = thingname + " Centers" ;
		    text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text1.setAttribute("x", (d3.select(thing2).attr("cx") + 80));
		    text1.setAttribute("y", (d3.select(thing2).attr("cy") - 40));
		    text1.setAttribute("font-size", "11px");
		    text1.setAttribute("fill", "black");
		    text1.innerHTML = "Size: " + thing2size;
		    text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text2.setAttribute("x", (d3.select(thing2).attr("cx") + 80));
		    text2.setAttribute("y", (d3.select(thing2).attr("cy") - 30));
		    text2.setAttribute("font-size", "11px");
		    text2.setAttribute("fill", "black");
		    text2.innerHTML = "X-axis data: " + thing2x;
		    text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text3.setAttribute("x", (d3.select(thing2).attr("cx") + 80));
		    text3.setAttribute("y", (d3.select(thing2).attr("cy") - 20));
		    text3.setAttribute("font-size", "11px");
		    text3.setAttribute("fill", "black");
		    text3.innerHTML =  "Y-axis data: " + thing2x;
		    canvas2.appendChild(box);
		    canvas2.appendChild(text);
		    canvas2.appendChild(text1);
		    canvas2.appendChild(text2);
		    canvas2.appendChild(text3);
		    thing1.setAttribute("fill-opacity", 1);
		    thing2.setAttribute("fill-opacity", 1);
		    thing3.setAttribute("fill-opacity", 1);
		});
		thing3.addEventListener("mouseover", function(){
		    box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		    box.setAttribute("x", (d3.select(thing3).attr("cx") + 79));
		    box.setAttribute("y", (d3.select(thing3).attr("cy") - 60));
		    box.setAttribute("class", "infobox");
		    box.setAttribute("height", "50");
		    box.setAttribute("width", "120");
		    box.setAttribute("stroke", "black")
		    box.setAttribute("fill", "white");
		    text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text.setAttribute("x", (d3.select(thing3).attr("cx") + 80));
		    text.setAttribute("y", (d3.select(thing3).attr("cy") - 50));
		    text.setAttribute("font-size", "11px");
		    text.setAttribute("fill", "green");
		    text.innerHTML = thingname + " Guards";
		    text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text1.setAttribute("x", (d3.select(thing3).attr("cx") + 80));
		    text1.setAttribute("y", (d3.select(thing3).attr("cy") - 40));
		    text1.setAttribute("font-size", "11px");
		    text1.setAttribute("fill", "black");
		    text1.innerHTML = "Size: " + thing3size;
		    text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text2.setAttribute("x", (d3.select(thing3).attr("cx") + 80));
		    text2.setAttribute("y", (d3.select(thing3).attr("cy") - 30));
		    text2.setAttribute("font-size", "11px");
		    text2.setAttribute("fill", "black");
		    text2.innerHTML = "X-axis data: " + thing3x;
		    text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text3.setAttribute("x", (d3.select(thing3).attr("cx") + 80));
		    text3.setAttribute("y", (d3.select(thing3).attr("cy") - 20));
		    text3.setAttribute("font-size", "11px");
		    text3.setAttribute("fill", "black");
		    text3.innerHTML =  "Y-axis data: " + thing3y;
		    thing1.setAttribute("fill-opacity", 1);
		    thing2.setAttribute("fill-opacity", 1);
		    thing3.setAttribute("fill-opacity", 1);
		    canvas2.appendChild(box);
		    canvas2.appendChild(text);
		    canvas2.appendChild(text1);
		    canvas2.appendChild(text2);
		    canvas2.appendChild(text3);
		});
		thing1.addEventListener("mouseout", function(){
		    console.log("work");
		    thing1.setAttribute("fill-opacity", 0.4);
		    thing2.setAttribute("fill-opacity", 0.4);
		    thing3.setAttribute("fill-opacity", 0.4);
		    canvas2.removeChild(box);
		    canvas2.removeChild(text);
		    canvas2.removeChild(text1);
		    canvas2.removeChild(text2);
		    canvas2.removeChild(text3);
		});
		thing2.addEventListener("mouseout", function(){
		    thing1.setAttribute("fill-opacity", 0.4);
		    thing2.setAttribute("fill-opacity", 0.4);
		    thing3.setAttribute("fill-opacity", 0.4);
		    canvas2.removeChild(box);
		    canvas2.removeChild(text);
		    canvas2.removeChild(text1);
		    canvas2.removeChild(text2);
		    canvas2.removeChild(text3);
		});
		thing3.addEventListener("mouseout", function(){
		    thing1.setAttribute("fill-opacity", 0.4);
		    thing2.setAttribute("fill-opacity", 0.4);
		    thing3.setAttribute("fill-opacity", 0.4);
		    canvas2.removeChild(box);
		    canvas2.removeChild(text);
		    canvas2.removeChild(text1);
		    canvas2.removeChild(text2);
		    canvas2.removeChild(text3);
		});
	    })(line1,line2,thing1,thing2,thing3,thingname,thing1x,thing1y,thing1size,thing2x,thing2y,thing2size,thing3x,thing3y,thing3size);
	}
    }
};

var xfunction = function() {
    var x = document.getElementById("x").value;
    //console.log("x :" +x);
    return x;
};
var yfunction = function() {
    var y = document.getElementById("y").value;
    //console.log("y :" +y);
    return y;
};

var xSelect = document.getElementById("x");
var ySelect = document.getElementById("y");

xSelect.addEventListener("change", function(){ajaxCall(xfunction(), yfunction())}, false);
ySelect.addEventListener("change", function(){ajaxCall(xfunction(), yfunction())}, false);


console.log("x :" +xfunction());
console.log("y :" +yfunction());
ajaxCall(xfunction(), yfunction());
