/**
 * Created by wave on 16-8-15.
 */
var titles = ["词条总数","具有标签的词条数","具有属性的词条数","标签总数","词条平均标签数","属性总数","词条平均属性个数"];
var items = ["百度百科","互动百科","中文维基"];
var dataset = new Array([9288870 , 5054239, 881354],
    [8866102, 4178837, 27938],
    [8094568, 1361574, 418793],
    [52670, 585139, 22486],
    [2.95, 3.40, 0.05],
    [431877, 47626, 32525],
    [5.52, 1.97, 8.45]);
var color = d3.scale.category10();
var svg = new Array();
var padding = {left:100, right:30, top:20, bottom:30};
var width = window.innerWidth*2/3;
var height = 300;
var rectPadding = 40;

function d3init(){
    //NO.0/////////////////////////////////////////////////
    svg.push(d3.select("body")
        .select("#container0")
        .append("svg")
        .attr("width", width)
        .attr("height", height));
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset[0].length))
        .rangeRoundBands([0, height - padding.top - padding.bottom]);
    var yScale = d3.scale.linear()
        .domain([0,d3.max(dataset[0])])
        .range([0, width - padding.left - padding.right]);
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("bottom");
    svg[0].append("g")
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + (height-padding.bottom) + ")")
        .call(yAxis);
    svg[0].append("line")
        .attr("x1",padding.left)
        .attr("y1",padding.top)
        .attr("x2",padding.left)
        .attr("y2",height - padding.bottom)
        .attr("stroke","gray")
        .attr("stroke-width",2);
    svg[0].selectAll(".mytext_statis")
        .data(items)
        .enter()
        .append("text")
        .attr("class","mytext_statis")
        .attr("transform","translate(0," + padding.top + ")")
        .attr("x", function(){
            return 50;
        } )
        .attr("y",function(d,i){
            return xScale(i) + xScale.rangeBand()/2;
        })
        .text(function(d){
            return d;
        });
    //rect 0 0
    svg[0].selectAll("#MyRect0")
        .data(dataset[0])
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("id","MyRect0")
        .attr("transform","translate(" + padding.left + "," + (padding.top-5) + ")")
        .attr("x",function(d,i){
            return 1;
        } )
        .attr("y",function(d,i){
            return xScale(i) + rectPadding/2;
        })
        .attr("width", 0)
        .attr("height", function(d){
            return rectPadding;
        })
        .attr("fill",function(d,i){
            return "gray";
        })
        .on("mouseover",function(d,i){
            d3.select(this).attr("fill","gold");
            svg[0].append("text")
                .attr("id","number")
                .attr("transform","translate(" + (padding.left-50) + "," + (padding.top-10) + ")")
                .attr("x",yScale(d))
                .attr("y",xScale(i) + xScale.rangeBand()/4)
                .text(d);
        })
        .on("mouseout",function(d,i){
            d3.select(this).attr("fill",color(0));
            svg[0].select("#number").remove();
        });
    //rect 0 1
    svg[0].selectAll("#MyRect1")
        .data(dataset[1])
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("id","MyRect1")
        .attr("transform","translate(" + padding.left + "," + (padding.top-5) + ")")
        .attr("x",function(d,i){
            return 1;
        } )
        .attr("y",function(d,i){
            return xScale(i) + rectPadding/2;
        })
        .attr("width", 0)
        .attr("height", function(d){
            return rectPadding/2;
        })
        .attr("fill",function(d,i){
            return "gray";
        })
        .on("mouseover",function(d,i){
            d3.select(this).attr("fill","gold");
            svg[0].append("text")
                .attr("id","number")
                .attr("transform","translate(" + (padding.left-50) + "," + (padding.top-10) + ")")
                .attr("x",yScale(d))
                .attr("y",xScale(i) + xScale.rangeBand()/4)
                .text(d);
        })
        .on("mouseout",function(d,i){
            d3.select(this).attr("fill",color(1));
            svg[0].select("#number").remove();
        });
    //rect 0 2
    svg[0].selectAll("#MyRect2")
        .data(dataset[2])
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("id","MyRect2")
        .attr("transform","translate(" + padding.left + "," + (padding.top-5+rectPadding/2) + ")")
        .attr("x",function(d,i){
            return 1;
        } )
        .attr("y",function(d,i){
            return xScale(i) + rectPadding/2;
        })
        .attr("width", 0)
        .attr("height", function(d){
            return rectPadding/2;
        })
        .attr("fill",function(d,i){
            return "gray";
        })
        .on("mouseover",function(d,i){
            d3.select(this).attr("fill","gold");
            svg[0].append("text")
                .attr("id","number")
                .attr("transform","translate(" + (padding.left-50) + "," + (padding.top+rectPadding+10) + ")")
                .attr("x",yScale(d))
                .attr("y",xScale(i) + xScale.rangeBand()/4)
                .text(d);
        })
        .on("mouseout",function(d,i){
            d3.select(this).attr("fill",color(2));
            svg[0].select("#number").remove();
        });
    //图例
    for (var i = 0;i < 3;i++){
        svg[0].append("rect")
            .attr("width",10)
            .attr("height",10)
            .attr("x",width-padding.right-100)
            .attr("y",height-padding.bottom-50-i*30)
            .attr("fill",color(i));
        svg[0].append("text")
            .attr("class","tulitext")
            .attr("x",width-padding.right-85)
            .attr("y",height-padding.bottom-40-i*30)
            .text(titles[i]);
    }
    //start
    svg[0].selectAll(".MyRect")
        .transition()
        .duration(1500)
        .attr("width", function(d){
            return yScale(d);
        })
        .attr("fill",function(d,i){
            return color(parseInt(i/3));
        });



    //NO 1/////////////////////////////////////////////////////
    svg.push(d3.select("body")
        .select("#container1")
        .append("svg")
        .attr("width", width)
        .attr("height", height));
    var yScale1 = d3.scale.linear()
        .domain([0,d3.max(dataset[3])])
        .range([0, width - padding.left - padding.right]);
    var yAxis1 = d3.svg.axis()
        .scale(yScale1)
        .orient("bottom");
    var yScale2 = d3.scale.linear()
        .domain([0,d3.max(dataset[4])])
        .range([0, width - padding.left - padding.right]);
    var yAxis2 = d3.svg.axis()
        .scale(yScale2)
        .orient("top");
    svg[1].append("g")
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + (height-padding.bottom) + ")")
        .call(yAxis1);
    svg[1].append("g")
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + (padding.top) + ")")
        .call(yAxis2);
    svg[1].append("line")
        .attr("x1",padding.left)
        .attr("y1",padding.top)
        .attr("x2",padding.left)
        .attr("y2",height - padding.bottom)
        .attr("stroke","gray")
        .attr("stroke-width",2);
    svg[1].selectAll(".mytext_statis")
        .data(items)
        .enter()
        .append("text")
        .attr("class","mytext_statis")
        .attr("transform","translate(0," + padding.top + ")")
        .attr("x", function(){
            return 50;
        } )
        .attr("y",function(d,i){
            return xScale(i) + xScale.rangeBand()/2;
        })
        .text(function(d){
            return d;
        });
    //rect 1 0
    svg[1].selectAll("#MyRect0")
        .data(dataset[3])
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("id","MyRect0")
        .attr("transform","translate(" + padding.left + "," + (padding.top+rectPadding/2) + ")")
        .attr("x",function(d,i){
            return 1;
        } )
        .attr("y",function(d,i){
            return xScale(i) + rectPadding/2;
        })
        .attr("width", 0)
        .attr("height", function(d){
            return rectPadding/2;
        })
        .attr("fill",function(d,i){
            return "gray";
        })
        .on("mouseover",function(d,i){
            d3.select(this).attr("fill","gold");
            svg[1].append("text")
                .attr("id","number")
                .attr("transform","translate(" + (padding.left-50) + "," + (padding.top+rectPadding+15) + ")")
                .attr("x",yScale1(d))
                .attr("y",xScale(i) + xScale.rangeBand()/4)
                .text(d);
        })
        .on("mouseout",function(d,i){
            d3.select(this).attr("fill",color(3));
            svg[1].select("#number").remove();
        });
    //rect 1 1
    svg[1].selectAll("#MyRect1")
        .data(dataset[4])
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("id","MyRect1")
        .attr("transform","translate(" + padding.left + "," + (padding.top) + ")")
        .attr("x",function(d,i){
            return 1;
        } )
        .attr("y",function(d,i){
            return xScale(i) + rectPadding/2;
        })
        .attr("width", 0)
        .attr("height", function(d){
            return rectPadding/2;
        })
        .attr("fill",function(d,i){
            return "gray";
        })
        .on("mouseover",function(d,i){
            d3.select(this).attr("fill","gold");
            svg[1].append("text")
                .attr("id","number")
                .attr("transform","translate(" + (padding.left-20) + "," + (padding.top-5) + ")")
                .attr("x",yScale2(d))
                .attr("y",xScale(i) + xScale.rangeBand()/4)
                .text(d);
        })
        .on("mouseout",function(d,i){
            d3.select(this).attr("fill",color(4));
            svg[1].select("#number").remove();
        });
    //图例
    for (var i = 0;i < 2;i++){
        svg[1].append("rect")
            .attr("width",10)
            .attr("height",10)
            .attr("x",width-padding.right-100)
            .attr("y",height-padding.bottom-50-i*30)
            .attr("fill",color(i+3));
        svg[1].append("text")
            .attr("class","tulitext")
            .attr("x",width-padding.right-85)
            .attr("y",height-padding.bottom-40-i*30)
            .text(titles[i+3]);
    }
    //start
    svg[1].selectAll(".MyRect")
        .transition()
        .duration(1500)
        .attr("width", function(d,i){
            if (i/3 >= 1) return yScale2(d);
            else return yScale1(d);
        })
        .attr("fill",function(d,i){
            return color(parseInt(i/3)+3);
        });






    //NO 2/////////////////////////////////////////////////////
    svg.push(d3.select("body")
        .select("#container2")
        .append("svg")
        .attr("width", width)
        .attr("height", height));
    var yScale3 = d3.scale.linear()
        .domain([0,d3.max(dataset[5])])
        .range([0, width - padding.left - padding.right]);
    var yAxis3 = d3.svg.axis()
        .scale(yScale3)
        .orient("bottom");
    var yScale4 = d3.scale.linear()
        .domain([0,d3.max(dataset[6])])
        .range([0, width - padding.left - padding.right]);
    var yAxis4 = d3.svg.axis()
        .scale(yScale4)
        .orient("top");
    svg[2].append("g")
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + (height-padding.bottom) + ")")
        .call(yAxis3);
    svg[2].append("g")
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + (padding.top) + ")")
        .call(yAxis4);
    svg[2].append("line")
        .attr("x1",padding.left)
        .attr("y1",padding.top)
        .attr("x2",padding.left)
        .attr("y2",height - padding.bottom)
        .attr("stroke","gray")
        .attr("stroke-width",2);
    svg[2].selectAll(".mytext_statis")
        .data(items)
        .enter()
        .append("text")
        .attr("class","mytext_statis")
        .attr("transform","translate(0," + padding.top + ")")
        .attr("x", function(){
            return 50;
        } )
        .attr("y",function(d,i){
            return xScale(i) + xScale.rangeBand()/2;
        })
        .text(function(d){
            return d;
        });
    //rect 2 0
    svg[2].selectAll("#MyRect0")
        .data(dataset[5])
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("id","MyRect0")
        .attr("transform","translate(" + padding.left + "," + (padding.top+rectPadding/2) + ")")
        .attr("x",function(d,i){
            return 1;
        } )
        .attr("y",function(d,i){
            return xScale(i) + rectPadding/2;
        })
        .attr("width", 0)
        .attr("height", function(d){
            return rectPadding/2;
        })
        .attr("fill",function(d,i){
            return "gray";
        })
        .on("mouseover",function(d,i){
            d3.select(this).attr("fill","gold");
            svg[2].append("text")
                .attr("id","number")
                .attr("transform","translate(" + (padding.left-50) + "," + (padding.top+rectPadding+15) + ")")
                .attr("x",yScale3(d))
                .attr("y",xScale(i) + xScale.rangeBand()/4)
                .text(d);
        })
        .on("mouseout",function(d,i){
            d3.select(this).attr("fill",color(5));
            svg[2].select("#number").remove();
        });
    //rect 2 1
    svg[2].selectAll("#MyRect1")
        .data(dataset[6])
        .enter()
        .append("rect")
        .attr("class","MyRect")
        .attr("id","MyRect1")
        .attr("transform","translate(" + padding.left + "," + (padding.top) + ")")
        .attr("x",function(d,i){
            return 1;
        } )
        .attr("y",function(d,i){
            return xScale(i) + rectPadding/2;
        })
        .attr("width", 0)
        .attr("height", function(d){
            return rectPadding/2;
        })
        .attr("fill",function(d,i){
            return "gray";
        })
        .on("mouseover",function(d,i){
            d3.select(this).attr("fill","gold");
            svg[2].append("text")
                .attr("id","number")
                .attr("transform","translate(" + (padding.left-20) + "," + (padding.top-5) + ")")
                .attr("x",yScale4(d))
                .attr("y",xScale(i) + xScale.rangeBand()/4)
                .text(d);
        })
        .on("mouseout",function(d,i){
            d3.select(this).attr("fill",color(6));
            svg[2].select("#number").remove();
        });
    //start
    svg[2].selectAll(".MyRect")
        .transition()
        .duration(1500)
        .attr("width", function(d,i){
            if (i/3 >= 1) return yScale4(d);
            else return yScale3(d);
        })
        .attr("fill",function(d,i){
            return color(parseInt(i/3)+5);
        });
    //图例
    for (var i = 0;i < 2;i++){
        svg[2].append("rect")
            .attr("width",10)
            .attr("height",10)
            .attr("x",width-padding.right-100)
            .attr("y",height-padding.bottom-height/3-10-i*30)
            .attr("fill",color(i+5));
        svg[2].append("text")
            .attr("class","tulitext")
            .attr("x",width-padding.right-85)
            .attr("y",height-padding.bottom-height/3-i*30)
            .text(titles[i+5]);
    }
}
function init(){
    barinit(2,true,1);
    d3init();
}