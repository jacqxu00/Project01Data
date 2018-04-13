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
/*
$.ajax({
    type: "POST",
    url: '/',
    data: jQuery.param({ newWPM: wpm,
        current : "" + document.getElementById('user').innerHTML}) ,
        success: function(data){
            console.log("success");
        },
        error: function(data){
            console.log("oof doesnt work");
        }
});
*/
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

draw();

var draw2 = function(){
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
       lineFC.setAttribute("y1", (fycor[i]-findminy)/(findmaxy-findminy)*450+80);
       lineFC.setAttribute("x2", (cxcor[i]-findminx)/(findmaxx-findminx)*450+70);
       lineFC.setAttribute("y2", (cycor[i]-findminy)/(findmaxy-findminy)*450+80);
       canvas2.appendChild(lineFC);

       var lineGC = document.createElementNS("http://www.w3.org/2000/svg","line");
       lineGC.setAttribute("stroke", "black");
       lineGC.setAttribute("x1", (gxcor[i]-findminx)/(findmaxx-findminx)*450+70);
       lineGC.setAttribute("y1", (gycor[i]-findminy)/(findmaxy-findminy)*450+80);
       lineGC.setAttribute("x2", (cxcor[i]-findminx)/(findmaxx-findminx)*450+70);
       lineGC.setAttribute("y2", (cycor[i]-findminy)/(findmaxy-findminy)*450+80);
       canvas2.appendChild(lineGC);
    };

    var ccoords = d3.selectAll(".center");
    ccoords.data(cxcor);
    ccoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
    ccoords.data(cycor);
    ccoords.attr("cy", function(d){return ((d-findminy)/(findmaxy-findminy)*450+80)});
    ccoords.data(csize);
    ccoords.attr("r", function(d){return (d)});

    var fcoords = d3.selectAll(".forward");
    fcoords.data(fxcor);
    fcoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
    fcoords.data(fycor);
    fcoords.attr("cy", function(d){return ((d-findminy)/(findmaxy-findminy)*450+80)});
    fcoords.data(fsize);
    fcoords.attr("r", function(d){return (d)});

    var gcoords = d3.selectAll(".guard");
    gcoords.data(gxcor);
    gcoords.attr("cx", function(d){return ((d-findminx)/(findmaxx-findminx)*450+70)});
    gcoords.data(gycor);
    gcoords.attr("cy", function(d){return ((d-findminy)/(findmaxy-findminy)*450+80)});
    gcoords.data(gsize);
    gcoords.attr("r", function(d){return (d)});

};

draw2()
/*
["Houston Rockets",82,65,17,9213];
["Toronto Raptors",82,59,23,9156];
["Golden State Warriors",82,58,24,9302];
["Boston Celtics",82,55,27,8529],
["Philadelphia 76ers",82,52,30,9004],
["Cleveland Cavaliers",82,50,32,9091],
["Portland Trail Blazers",82,49,33,8661],
["Utah Jazz",82,48,34,8540],
["Oklahoma City Thunder",82,48,34,8844],
["Indiana Pacers",82,48,34,8656],
["New Orleans Pelicans",82,48,34,9161],
["San Antonio Spurs",82,47,35,8424],
["Minnesota Timberwolves",82,47,35,8980],
["Denver Nuggets",82,46,36,9020],
["Miami Heat",82,44,38,8480],
["Milwaukee Bucks",82,44,38,8731],
["Washington Wizards",82,43,39,8742],
["Los Angeles Clippers",82,42,40,8937],
["Detroit Pistons",82,39,43,8509],
["Charlotte Hornets",82,36,46,8874],
["Los Angeles Lakers",82,35,47,8862],
["New York Knicks",82,29,53,8566],
["Brooklyn Nets",82,28,54,8741],
["Sacramento Kings",82,27,55,8104],
["Chicago Bulls",82,27,55,8441],
["Orlando Magic",82,25,57,8479],
["Dallas Mavericks",82,24,58,8390],
["Atlanta Hawks",82,24,58,8475],
["Memphis Grizzlies",82,22,60,8145],
["Phoenix Suns",82,21,61,8522]]
*/
