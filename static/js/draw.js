var canvas = document.getElementById("canvas");
var canvas2 = document.getElementById("canvas2");

/*
var teamnames = ["a","b","c","d"];
var xcoords = [0,30,60,70];
var ycoords = [0,75,27,47];
var teamsizes = [10,6,4,9];
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
*/

var findmin = function(a,b,c){
    return Math.min(Math.min(...a),Math.min(...b),Math.min(...c));
};

var findmax = function(a,b,c){
    return Math.max(Math.max(...a),Math.max(...b),Math.max(...c));
};

//var lowx, highx, lowy, highy, sizelow, sizehigh, findminx, findmaxx, findminy, findmaxy, findminz, findmaxz;

var ajaxCall = function(xStatQuery, yStatQuery){
    $.ajax({
        type: "POST",
        url: '/query', //main.py put to a page that does the quaerry functions. link
        headers: {"Content-Type": "application/json"},
        data: {xStat: xStatQuery, yStat: yStatQuery},
        success: function(response) {
            //response returns a 2d array
            console.log("success");
            console.log(response);
            var xstat = response.map(function(elt) { return elt[1]; });
            lowx = Math.min.apply(null, xstat);
            highx = Math.max.apply(null, xstat);
            var ystat = response.map(function(elt) { return elt[2]; });
            lowy = Math.min.apply(null, ystat);
            highy = Math.max.apply(null, ystat);
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
            draw(response);
            draw2(response);
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

ajaxCall("BMI", "weight");

var draw = function(data){
  var i ;
  for (i = 0; i < data.length; i++){
     var coord = document.createElementNS("http://www.w3.org/2000/svg","circle");
     coord.setAttribute("fill", "blue");
     coord.setAttribute("class", "allPositions");
     canvas.appendChild(coord);
     coords.data(data[i][1]);
     coords.attr("cx", function(d){return ((d-lowx)/(highx-lowx)*450+70)});
     coords.data(data[i][2]);
     coords.attr("cy", function(d){return (600-((d-lowy)/(highy-lowy)*450)-70)});
     coords.data(data[i][3]);
     coords.attr("r", function(d){return (d)});
  }

  xval = Math.ceil((highx - lowx) / 10);
  //console.log("xval = "+xval);
  var i;
  for (i = 0; i <= xval; i++) {
    var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
    tick.setAttribute("stroke", "black");

    tick.setAttribute("x1", (i*10-lowx)/(highx-lowx)*450+70);
    tick.setAttribute("y1", 600-65);
    tick.setAttribute("x2", (i*10-lowx)/(highx-lowx)*450+70);
    tick.setAttribute("y2", 600-75);
    canvas.appendChild(tick);
    var label = document.createElementNS("http://www.w3.org/2000/svg","text");
    label.setAttribute("x", (i*10-lowx)/(highx-lowx)*450+70-4);
    label.setAttribute("y", 600-50);
    label.setAttribute("font-size", "11px");
    label.setAttribute("fill", "black");
    label.innerHTML = i*10;
    canvas.appendChild(label);

    yval = Math.ceil((highy - lowy) / 10);
    //console.log("yval = "+yval);
    var i;
    for (i = 0; i <= yval; i++) {
      var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
      tick.setAttribute("stroke", "black");
      tick.setAttribute("x1", 75);
      tick.setAttribute("y1", 600-((i*10-lowy)/(highy-lowy)*450)-70);
      tick.setAttribute("x2", 65);
      tick.setAttribute("y2", 600-((i*10-lowy)/(highy-lowy)*450)-70);
      canvas.appendChild(tick);
      var label = document.createElementNS("http://www.w3.org/2000/svg","text");
      label.setAttribute("x", 50);
      label.setAttribute("y", 600-((i*10-lowy)/(highy-lowy)*450)-70+3);
      label.setAttribute("font-size", "11px");
      label.setAttribute("fill", "black");
      label.innerHTML = i*10;
      canvas.appendChild(label);
    }};
    /*
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

    xval = Math.ceil((highx - lowx) / 10);
    //console.log("xval = "+xval);
    var i;
    for (i = 0; i <= xval; i++) {
      var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
      tick.setAttribute("stroke", "black");

      tick.setAttribute("x1", (i*10-lowx)/(highx-lowx)*450+70);
      tick.setAttribute("y1", 600-65);
      tick.setAttribute("x2", (i*10-lowx)/(highx-lowx)*450+70);
      tick.setAttribute("y2", 600-75);
      canvas.appendChild(tick);
      var label = document.createElementNS("http://www.w3.org/2000/svg","text");
      label.setAttribute("x", (i*10-lowx)/(highx-lowx)*450+70-4);
      label.setAttribute("y", 600-50);
      label.setAttribute("font-size", "11px");
      label.setAttribute("fill", "black");
      label.innerHTML = i*10;
      canvas.appendChild(label);
    };

    yval = Math.ceil((highy - lowy) / 10);
    //console.log("yval = "+yval);
    var i;
    for (i = 0; i <= yval; i++) {
      var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
      tick.setAttribute("stroke", "black");
      tick.setAttribute("x1", 75);
      tick.setAttribute("y1", 600-((i*10-lowy)/(highy-lowy)*450)-70);
      tick.setAttribute("x2", 65);
      tick.setAttribute("y2", 600-((i*10-lowy)/(highy-lowy)*450)-70);
      canvas.appendChild(tick);
      var label = document.createElementNS("http://www.w3.org/2000/svg","text");
      label.setAttribute("x", 50);
      label.setAttribute("y", 600-((i*10-lowy)/(highy-lowy)*450)-70+3);
      label.setAttribute("font-size", "11px");
      label.setAttribute("fill", "black");
      label.innerHTML = i*10;
      canvas.appendChild(label);
    };
    */

};

var draw2 = function(data){
  for (i = 0; i < data.length; i++){
     var ccoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
     ccoord.setAttribute("fill", "blue");
     ccoord.setAttribute("class","center");
     canvas2.appendChild(ccoord);
     ccoords.data(data[i][4]);
     ccoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
     ccoords.data(data[i][5]);
     ccoords.attr("cy", function(d){return (600-((d-findminy)/(findmaxy-findminy)*450+70))});
     ccoords.data(data[i][6]);
     ccoords.attr("r", function(d){return (d)});

     var fcoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
     fcoord.setAttribute("fill", "red");
     fcoord.setAttribute("class", "forward");
     canvas2.appendChild(fcoord);
     fcoords.data(data[i][7]);
     fcoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
     fcoords.data(data[i][8]);
     fcoords.attr("cy", function(d){return (600-((d-findminy)/(findmaxy-findminy)*450+70))});
     fcoords.data(data[i][9]);
     fcoords.attr("r", function(d){return (d)});

     var gcoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
     gcoord.setAttribute("fill", "green");
     gcoord.setAttribute("class", "guard");
     canvas2.appendChild(gcoord);
     gcoords.data(data[i][10]);
     gcoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
     gcoords.data(data[i][11]);
     gcoords.attr("cy", function(d){return (600-((d-findminy)/(findmaxy-findminy)*450+70))});
     gcoords.data(data[i][12]);
     gcoords.attr("r", function(d){return (d)});

     var lineFC = document.createElementNS("http://www.w3.org/2000/svg","line");
     lineFC.setAttribute("stroke", "black");
     lineFC.setAttribute("x1", (fxcor[i]-findminx)/(findmaxx-findminx)*450+70);
     lineFC.setAttribute("y1", 600-((fycor[i]-findminy)/(findmaxy-findminy)*450+70));
     lineFC.setAttribute("x2", (cxcor[i]-findminx)/(findmaxx-findminx)*450+70);
     lineFC.setAttribute("y2", 600-((cycor[i]-findminy)/(findmaxy-findminy)*450+70));
     canvas2.appendChild(lineFC);

     var lineGC = document.createElementNS("http://www.w3.org/2000/svg","line");
     lineGC.setAttribute("stroke", "black");
     lineGC.setAttribute("x1", (gxcor[i]-findminx)/(findmaxx-findminx)*450+70);
     lineGC.setAttribute("y1", 600-((gycor[i]-findminy)/(findmaxy-findminy)*450+70));
     lineGC.setAttribute("x2", (cxcor[i]-findminx)/(findmaxx-findminx)*450+70);
     lineGC.setAttribute("y2", 600-((cycor[i]-findminy)/(findmaxy-findminy)*450+70));
     canvas2.appendChild(lineGC);
  };

  xval = Math.ceil((findmaxx - findminx) / 10);
  var i;
  for (i = 0; i <= xval; i++) {
    var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
    tick.setAttribute("stroke", "black");
    tick.setAttribute("x1", (i*10-findminx)/(findmaxx-findminx)*450+70);
    tick.setAttribute("y1", 600-65);
    tick.setAttribute("x2", (i*10-findminx)/(findmaxx-findminx)*450+70);
    tick.setAttribute("y2", 600-75);
    canvas2.appendChild(tick);
    var label = document.createElementNS("http://www.w3.org/2000/svg","text");
    label.setAttribute("x", (i*10-findminx)/(findmaxx-findminx)*450+70-4);
    label.setAttribute("y", 600-50);
    label.setAttribute("font-size", "11px");
    label.setAttribute("fill", "black");
    label.innerHTML = i*10;
    canvas2.appendChild(label);
  };

  yval = Math.ceil((findmaxy - findminy) / 10);
  var i;
  for (i = 0; i <= yval; i++) {
    var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
    tick.setAttribute("stroke", "black");
    tick.setAttribute("x1", 75);
    tick.setAttribute("y1", 600-((i*10-findminy)/(findmaxy-findminy)*450)-70);
    tick.setAttribute("x2", 65);
    tick.setAttribute("y2", 600-((i*10-findminy)/(findmaxy-findminy)*450)-70);
    canvas2.appendChild(tick);
    var label = document.createElementNS("http://www.w3.org/2000/svg","text");
    label.setAttribute("x", 50);
    label.setAttribute("y", 600-((i*10-findminy)/(findmaxy-findminy)*450)-70+3);
    label.setAttribute("font-size", "11px");
    label.setAttribute("fill", "black");
    label.innerHTML = i*10;
    canvas2.appendChild(label);
  };
    /*
    for (i = 0; i < cxcor.length; i++){
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
       var lineFC = document.createElementNS("http://www.w3.org/2000/svg","line");
       lineFC.setAttribute("stroke", "black");
       lineFC.setAttribute("x1", (fxcor[i]-findminx)/(findmaxx-findminx)*450+70);
       lineFC.setAttribute("y1", 600-((fycor[i]-findminy)/(findmaxy-findminy)*450+70));
       lineFC.setAttribute("x2", (cxcor[i]-findminx)/(findmaxx-findminx)*450+70);
       lineFC.setAttribute("y2", 600-((cycor[i]-findminy)/(findmaxy-findminy)*450+70));
       canvas2.appendChild(lineFC);
       var lineGC = document.createElementNS("http://www.w3.org/2000/svg","line");
       lineGC.setAttribute("stroke", "black");
       lineGC.setAttribute("x1", (gxcor[i]-findminx)/(findmaxx-findminx)*450+70);
       lineGC.setAttribute("y1", 600-((gycor[i]-findminy)/(findmaxy-findminy)*450+70));
       lineGC.setAttribute("x2", (cxcor[i]-findminx)/(findmaxx-findminx)*450+70);
       lineGC.setAttribute("y2", 600-((cycor[i]-findminy)/(findmaxy-findminy)*450+70));
       canvas2.appendChild(lineGC);
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
    xval = Math.ceil((findmaxx - findminx) / 10);
    var i;
    for (i = 0; i <= xval; i++) {
      var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
      tick.setAttribute("stroke", "black");
      tick.setAttribute("x1", (i*10-findminx)/(findmaxx-findminx)*450+70);
      tick.setAttribute("y1", 600-65);
      tick.setAttribute("x2", (i*10-findminx)/(findmaxx-findminx)*450+70);
      tick.setAttribute("y2", 600-75);
      canvas2.appendChild(tick);
      var label = document.createElementNS("http://www.w3.org/2000/svg","text");
      label.setAttribute("x", (i*10-findminx)/(findmaxx-findminx)*450+70-4);
      label.setAttribute("y", 600-50);
      label.setAttribute("font-size", "11px");
      label.setAttribute("fill", "black");
      label.innerHTML = i*10;
      canvas2.appendChild(label);
    };
    yval = Math.ceil((findmaxy - findminy) / 10);
    var i;
    for (i = 0; i <= yval; i++) {
      var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
      tick.setAttribute("stroke", "black");
      tick.setAttribute("x1", 75);
      tick.setAttribute("y1", 600-((i*10-findminy)/(findmaxy-findminy)*450)-70);
      tick.setAttribute("x2", 65);
      tick.setAttribute("y2", 600-((i*10-findminy)/(findmaxy-findminy)*450)-70);
      canvas2.appendChild(tick);
      var label = document.createElementNS("http://www.w3.org/2000/svg","text");
      label.setAttribute("x", 50);
      label.setAttribute("y", 600-((i*10-findminy)/(findmaxy-findminy)*450)-70+3);
      label.setAttribute("font-size", "11px");
      label.setAttribute("fill", "black");
      label.innerHTML = i*10;
      canvas2.appendChild(label);
    };
    */
};
