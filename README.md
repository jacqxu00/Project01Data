# Team tacocat
## Jackie Xu, Andrew Wong, Bermet Kalmakova, Gordon Lei
**DATA PROJECT: NBA Statistics**
## Source + Description of Data Sets
We will be using data from these data sets: 
* [My Sports Feed](https://www.mysportsfeeds.com/)
    * API that can return JSON of team data (their standings, active players, roster, etc.)
## But Why? - Relevance/significance
* This project could be used to aid in creating your brackets and help you predict which team will win. 
## Explanation, in broad strokes if necessary, of how you aim to make this data come alive.
* The data will follow and a graph similar to the [NYTimes graph](https://www.nytimes.com/interactive/2016/04/29/upshot/money-race-and-success-how-your-school-district-compares.html)
    * Basically this an adjusted scatter plot. 
* There will be 2 graphs at a time, one for data based on the whole team and another that depicts player's personal data based on their positions.
    * The position graph will basically split the team data into the individual player statistics. 
    * Data points will be separated by whatever characteristics you choose for the axises. However, data point that represent people with the same positions will have the same colors.

<object data="https://github.com/jacqxu00/Project01Data/blob/master/DIAGRAM.pdf" type="application/pdf" width="750px" height="750px">
    <embed src="https://github.com/jacqxu00/Project01Data/blob/master/DIAGRAM.pdf" type="application/pdf">
        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="https://github.com/jacqxu00/Project01Data/blob/master/DIAGRAM.pdf">Download PDF</a>.</p>
    </embed>
</object> 

## What will be shown, absent user interaction?
* Graphs will follow the format of the NYTimes graph.
* X axis will be some measure of their body type (height, weight, bmi, etc.)
* Y axis will be some statistic that the user can choose. (points scored, matches played, etc.)
* Size of the circle will be size of teams or size of positions.
* Circles for the position graph (the second graph) for each team will be connected to connect the team positions of that team with each other.
## How will user interact with your visualization?
* Players can hover the data points to pull up a bootstrap popover containing the more specific information pertaining to what you are looking for. 
* User can choose what descriptions the  x-axis and y-axis will tell the reader.
## What questions will your visualization allow user to explore? What questions will it provoke?
* Our visualization will allow users to explore different correlations between players' different physical aspects.
## Explanation of D3 feature utilization.
*  D3 will be used to visually "animate the graph".
    * d3 chords can be used to connect the circles (basically can help us create the overall structure of the graphs and their data points)
    * d3 can help change opacity and brightness of colors in case we want to make intensities of colors represent something.
    * d3 has a "zoom behavior" that can help facilitate looking at large amounts of data points. 