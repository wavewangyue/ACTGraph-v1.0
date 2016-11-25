/**
 * Created by wave on 16-8-15.
 */

//获取根目录路径
function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}

//判断终端类型
function suitjump(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var IsPC = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            IsPC = false;
            break;
        }
    }
    var path = getRootPath();
    if (IsPC) window.location.href = path+"/jsp/Main/Search.jsp";
    else window.location.href = path+"/jsp/Mobile/MobileSearch.jsp";
}

var width = window.innerWidth*0.95;
var height = window.innerHeight*0.95;
var backcolor = "dimgray";
var colorset = new Array(d3.rgb(255,255,255),
    d3.rgb(255,120,120),
    d3.rgb(255,120,70),
    d3.rgb(255,200,100),
    d3.rgb(100,200,100),
    d3.rgb(100,200,255),
    d3.rgb(200,150,255));
function d3init(){
    //svg
    var time = 0;
    var delay = 300;

    var svg = d3.select("body")
        .select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    d3.select("body")
        .style("background-color",backcolor);
    //title
    svg.append("text")
        .attr("class","MyText")
        .attr("x",width/2)
        .attr("y",height/5)
        .text("欢迎使用北航知识图谱系统");
    svg.append("text")
        .attr("class","MyText")
        .attr("x",width/2)
        .attr("y",height/5+50)
        .style("font-size","20px")
        .text("KnowledgeGraph System of BUAA");
    svg.append("text")
        .attr("class","MyText")
        .attr("x",width/2)
        .attr("y",height/2+250)
        .style("font-size","15px")
        .style("font-weight","normal")
        .text("Copyright·ACT/BUAA");
    //arcs
    var pie = d3.layout.pie();
    var arc = new Array();
    var arcs = new Array();
    var piedata = pie([1,1,1,1,1,1]);
    var piedata1 = pie([1,1,1,1]);
    var piedata2 = pie([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
    var piedata3 = pie([1,1,1,1,1,1,1,1,1,1]);
    arc[0] = d3.svg.arc()
        .innerRadius(75)
        .outerRadius(90);
    arc[1] = d3.svg.arc()
        .innerRadius(60)
        .outerRadius(70);
    arc[2] = d3.svg.arc()
        .innerRadius(95)
        .outerRadius(100);
    arc[3] = d3.svg.arc()
        .innerRadius(105)
        .outerRadius(125);
    arc[4] = d3.svg.arc()
        .innerRadius(125)
        .outerRadius(145);
    arc[5] = d3.svg.arc()
        .innerRadius(140)
        .outerRadius(150);
    arc[6] = d3.svg.arc()
        .innerRadius(150)
        .outerRadius(165);
    arc[7] = d3.svg.arc()
        .innerRadius(170)
        .outerRadius(176);
    arc[8] = d3.svg.arc()
        .innerRadius(175)
        .outerRadius(185);
    arcs[0] = svg.selectAll(".g0")
        .data(piedata)
        .enter()
        .append("g")
        .attr("class","g0")
        .attr("transform","translate("+(width/2)+","+(height/2)+")")
        .append("path")
        .attr("fill",function(d,i){
            return colorset[i+1];
        })
        .attr("d",function(d){
            return arc[0](d);
        });
    arcs[1] = svg.selectAll(".g1")
        .data(piedata)
        .enter()
        .append("g")
        .attr("class","g1")
        .attr("transform","translate("+width/2+","+(height/2)+")")
        .append("path")
        .attr("fill",function(d,i){
            if (i%2 != 0) return "transparent";
            else return colorset[i+1];
        })
        .attr("d",function(d){
            return arc[1](d);
        });
    arcs[2] = svg.selectAll(".g2")
        .data(piedata)
        .enter()
        .append("g")
        .attr("class","g2")
        .attr("transform","translate("+width/2+","+(height/2)+")")
        .append("path")
        .attr("fill",function(d,i){
            if (i%2 == 0) return "transparent";
            else return colorset[i+1];
        })
        .attr("d",function(d){
            return arc[2](d);
        });
    arcs[3] = svg.selectAll(".g3")
        .data(piedata1)
        .enter()
        .append("g")
        .attr("class","g3")
        .attr("transform","translate("+width/2+","+(height/2)+")")
        .append("path")
        .attr("fill",function(d,i){
            if (i%2 == 0) return "transparent";
            else return "white";
        })
        .attr("d",function(d){
            return arc[3](d);
        });
    arcs[4] = svg.selectAll(".g4")
        .data(piedata1)
        .enter()
        .append("g")
        .attr("class","g4")
        .attr("transform","translate("+width/2+","+(height/2)+")")
        .append("path")
        .attr("fill",function(d,i){
            if (i%2 != 0) return "transparent";
            else return d3.rgb("white").darker();
        })
        .attr("d",function(d){
            return arc[4](d);
        });
    arcs[5] = svg.selectAll(".g5")
        .data(piedata1)
        .enter()
        .append("g")
        .attr("class","g5")
        .attr("transform","translate("+width/2+","+(height/2)+")")
        .append("path")
        .attr("fill",function(d,i){
            return d3.rgb("white").darker();
        })
        .attr("d",function(d){
            return arc[5](d);
        });
    arcs[6] = svg.selectAll(".g6")
        .data(piedata2)
        .enter()
        .append("g")
        .attr("class","g6")
        .attr("transform","translate("+width/2+","+(height/2)+")")
        .append("path")
        .attr("fill",function(d,i){
            if (i%2 != 0) return "transparent";
            else return colorset[(i/2)%6+1];
        })
        .attr("d",function(d){
            return arc[6](d);
        });
    arcs[7] = svg.selectAll(".g7")
        .data(piedata1)
        .enter()
        .append("g")
        .attr("class","g7")
        .attr("transform","translate("+width/2+","+(height/2)+")")
        .append("path")
        .attr("fill",function(d,i){
            return d3.rgb("white").darker();
        })
        .attr("d",function(d){
            return arc[7](d);
        });
    arcs[8] = svg.selectAll(".g8")
        .data(piedata3)
        .enter()
        .append("g")
        .attr("class","g8")
        .attr("transform","translate("+width/2+","+(height/2)+")")
        .append("path")
        .attr("fill",function(d,i){
            if (i%2 == 0) return colorset[i/2%6+1];
            else return "transparent";
        })
        .attr("d",function(d){
            return arc[8](d);
        });
    //launcher
    svg.append("text")
        .attr("x",width/2)
        .attr("y",height/2)
        .attr("dy",10)
        .style("font-size","25px")
        .style("font-family","微软雅黑")
        .style("font-weight","bold")
        .style("fill","white")
        .style("text-anchor","middle")
        .style("cursor","pointer")
        .text("LAUNCH")
        .on("mouseover",function(){
            d3.select(this)
                .style("fill","silver");
        })
        .on("mouseout",function(){
            d3.select(this)
                .style("fill","white");
        })
        .on("click",function(){
            suitjump();
        });
    //flash
    d3.timer(function(){
        time++;
        if (time == delay*7) time = 0;
        if (time%delay == 0){
            svg.selectAll(".MyText")
                .transition()
                .duration(1000)
                .style("fill",colorset[time/delay]);
            arcs[3].transition()
                .duration(1000)
                .style("fill",function(d,i){
                    if (i%2 == 0) return "transparent";
                    return colorset[time/delay];
                });
            arcs[4].transition()
                .duration(1000)
                .style("fill",function(d,i){
                    if (i%2 != 0) return "transparent";
                    return colorset[time/delay].darker();
                });
            arcs[5].transition()
                .duration(1000)
                .style("fill",function(d,i){
                    return colorset[time/delay].darker();
                });
            arcs[7].transition()
                .duration(1000)
                .style("fill",function(d,i){
                    return colorset[time/delay];
                });
        }
        arcs[0].attr("transform","rotate(-"+time+")");
        arcs[1].attr("transform","rotate("+time/2+")");
        arcs[2].attr("transform","rotate("+time*2+")");
        arcs[6].attr("transform","rotate(-"+time/4+")");
    });
}

function init(){
    d3init();
}