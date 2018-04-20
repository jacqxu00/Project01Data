var canvas = document.getElementById("canvas");
var canvas2 = document.getElementById("canvas2");

var findmin = function(a,b,c){
    return Math.min(Math.min(...a),Math.min(...b),Math.min(...c));
};

var findmax = function(a,b,c){
    return Math.max(Math.max(...a),Math.max(...b),Math.max(...c));
};

var lowx, highx, lowy, highy, sizelow, sizehigh, findminx, findmaxx, findminy, findmaxy, findminz, findmaxz;

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
            var xrange = highx - lowx;
            lowx = lowx - Math.ceil(xrange / 10);
            //highx = highx + Math.ceil(xrange / 10);
            var ystat = response.map(function(elt) { return elt[2]; });
            lowy = Math.min.apply(null, ystat);
            highy = Math.max.apply(null, ystat);
            var yrange = highy - lowy;
            lowy = lowy - Math.ceil(yrange / 10);
            //highy = highy + Math.ceil(yrange / 10);
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
            findminy = findminy - Math.ceil(yrange2 / 10);
            findmaxy = findmaxy + Math.ceil(yrange2 / 10);
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
  for (i = lowx; i < data.length; i++){
     var coord = document.createElementNS("http://www.w3.org/2000/svg","circle");
     coord.setAttribute("fill", "purple");
     coord.setAttribute("class", "allPositions");
     coord.setAttribute("cx", (data[i][1]-lowx)/(highx-lowx)*450+70);
     coord.setAttribute("cy", (600-((data[i][2]-lowy)/(highy-lowy)*450+70)));
     coord.setAttribute("r", data[i][3]);
     canvas.appendChild(coord);
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
    canvas.appendChild(tick);
    var label = document.createElementNS("http://www.w3.org/2000/svg","text");
    label.setAttribute("x", (val-lowx)/(xrange)*450+70-4);
    label.setAttribute("y", 600-50);
    label.setAttribute("font-size", "11px");
    label.setAttribute("fill", "black");
    label.innerHTML = val;
    canvas.appendChild(label);
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
  for (i = 1; i <= yval; i++) {
    var val = Math.floor(lowy / yscale) * yscale + i * yscale;
    var tick = document.createElementNS("http://www.w3.org/2000/svg","line");
    tick.setAttribute("stroke", "black");
    tick.setAttribute("x1", 75);
    tick.setAttribute("y1", 600-((val-lowy)/(yrange)*450)-70);
    tick.setAttribute("x2", 65);
    tick.setAttribute("y2", 600-((val-lowy)/(yrange)*450)-70);
    canvas.appendChild(tick);
    var label = document.createElementNS("http://www.w3.org/2000/svg","text");
    label.setAttribute("x", 45);
    label.setAttribute("y", 600-((val-lowy)/(yrange)*450)-70+3);
    label.setAttribute("font-size", "11px");
    label.setAttribute("fill", "black");
    label.innerHTML = val;
    canvas.appendChild(label);
  };
};

var draw2 = function(data){
  for (i = 0; i < data.length; i++){
     var ccoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
     ccoord.setAttribute("fill", "blue");
     ccoord.setAttribute("class","center");
     ccoord.setAttribute("cx", (data[i][4]-findminx)/(findmaxx-findminx)*450+70);
     ccoord.setAttribute("cy", (600-((data[i][5]-findminy)/(findmaxy-findminy)*450+70)));
     ccoord.setAttribute("r", data[i][6]);
     canvas2.appendChild(ccoord);

     var fcoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
     fcoord.setAttribute("fill", "red");
     fcoord.setAttribute("class", "forward");
     fcoord.setAttribute("cx", (data[i][7]-findminx)/(findmaxx-findminx)*450+70);
     fcoord.setAttribute("cy", (600-((data[i][8]-findminy)/(findmaxy-findminy)*450+70)));
     fcoord.setAttribute("r", data[i][9]);
     canvas2.appendChild(fcoord);

     var gcoord = document.createElementNS("http://www.w3.org/2000/svg","circle");
     gcoord.setAttribute("fill", "green");
     gcoord.setAttribute("class", "guard");
     gcoord.setAttribute("cx", (data[i][10]-findminx)/(findmaxx-findminx)*450+70);
     gcoord.setAttribute("cy", (600-((data[i][11]-findminy)/(findmaxy-findminy)*450+70)));
     gcoord.setAttribute("r", data[i][12]);
     canvas2.appendChild(gcoord);

     var lineFC = document.createElementNS("http://www.w3.org/2000/svg","line");
     lineFC.setAttribute("stroke", "black");
     lineFC.setAttribute("x1", (data[i][7]-findminx)/(findmaxx-findminx)*450+70);
     lineFC.setAttribute("y1", 600-((data[i][8]-findminy)/(findmaxy-findminy)*450+70));
     lineFC.setAttribute("x2", (data[i][4]-findminx)/(findmaxx-findminx)*450+70);
     lineFC.setAttribute("y2", 600-((data[i][5]-findminy)/(findmaxy-findminy)*450+70));
     canvas2.appendChild(lineFC);

     var lineGC = document.createElementNS("http://www.w3.org/2000/svg","line");
     lineGC.setAttribute("stroke", "black");
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
  for (i = 1; i <= yval; i++) {
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
};
