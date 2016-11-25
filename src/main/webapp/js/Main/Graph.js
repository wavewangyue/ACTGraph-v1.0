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

var FocusNow = 0;
var BarNow = 0;
var nodemark = new Array();
var nodes = new Array();
var edges = new Array();
var force;
var svg;
var svg_edges = new Array();
var svg_nodes = new Array();
var color = d3.scale.category20();
var width = window.innerWidth;
var height = window.innerHeight;
var widthplus = width*2;
var heightplus = height*2;
var labels = new Array();
var TheFirstNode = true;
//移动端配置时需要重新修改的变量
var TerminalType = 1;//1:PC 2:Mobile
var R = 50;
var TextSize = 20;
var EdgeWidth = 3;
var EdgeLength = 300;

//start
function containerinit(keyword){
    d3.selectAll("#waiting")
        .style("color",function(d,i){
            return color(i);
        });
    svg = d3.select("body")
        .select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");
    newjson(keyword);
}

//请求新json
function newjson(keyword){

    $(".waitbar").fadeIn();
    var url = getRootPath()+"/graphQA/common.do?keyword="+keyword;
    d3.json("json/t0.json",function(error,root){
    //d3.json(url,function(error,root){
        $(".waitbar").fadeOut();
        if( error ){
            alert("与后台服务器通信出现问题");
        }else{
            if (!root.isFind){
                alert("对不起，没有找到答案");
            }
            if (TerminalType == 1) {
                d3.select("#result").text(function () {
                    if (root.isAnswer) {
                        if (root.isFind) return "问答结果：" + root.answer;
                        else return "未找到答案";
                    }
                    else return "没有进行问答";
                });
            }
            if (root.nodes != "") {
                jsonparse(root,FocusNow);
                d3renew(FocusNow);
                if (TerminalType == 1)
                    infobarinit(root);
                else if (TerminalType == 2)
                    infobarinit_mobile(root);
            }
        }
    }).header("Access-Control-Allow-Origin","*");
}

//json解析为画图做准备
function jsonparse(root,focus){

    var nodes_p = root.nodes;
    var amount_thistime = 0;

    //画自己
    if (TheFirstNode){
        nodes.push(nodes_p[0]);
        nodes[0].isEntity = true;
        labels.push(nodes[0].label);
    }
    if (root.isAnswer){//如果是问答
        var focusjustnow = 0;//记录上一个添加的点
        for (var i = 1;i < nodes_p.length;i++){
            var j;//实体节点是否已经存在
            for (j = 0;j < nodes.length;j++){
                if (nodes_p[i].entity == nodes[j].entity){
                    break;
                }
            }
            if (j == nodes.length){
                nodes.push(nodes_p[i]);
                nodemark.push(false);
                var edge = { "source":focusjustnow , "target": (nodes.length-1), "relation":nodes_p[i].relation};
                edges.push(edge);
                focusjustnow = nodes.length-1;
                if (nodes_p[i].isEntity){
                    var k;//将类别加入
                    for (k = 0;k < labels.length;k++){
                        if (labels[k] == nodes_p[i].label) break;
                    }
                    if (k == labels.length) labels.push(nodes_p[i].label);
                }
            }else{
                var edge = { "source":focusjustnow , "target": j, "relation":nodes_p[i].relation};
                edges.push(edge);
                focusjustnow = j;
            }
        }
    }else if (root.isProperty){//如果是关系搜索
        for (var i = 1;i < nodes_p.length;i++){
            nodes.push(nodes_p[i]);
            nodemark.push(false);
            if (i%2 == 1){
                var edge = { "source":(nodes.length-2) , "target": (nodes.length-1), "relation":nodes_p[i].relation};
                edges.push(edge);
            }
            if (nodes_p[i].isEntity){
                var k;//将类别加入
                for (k = 0;k < labels.length;k++){
                    if (labels[k] == nodes_p[i].label) break;
                }
                if (k == labels.length) labels.push(nodes_p[i].label);
            }
        }
    }else if (root.isLabel){//如果是类别搜索
        for (var i = 1;i < nodes_p.length;i++){
            nodes.push(nodes_p[i]);
            nodemark.push(false);
            if (nodes_p[i].isEntity){
                var k;//将类别加入
                for (k = 0;k < labels.length;k++){
                    if (labels[k] == nodes_p[i].label) break;
                }
                if (k == labels.length) labels.push(nodes_p[i].label);
            }
        }
    }else{//如果是实体搜索
        nodemark[focus] = true;//标记这个节点被查询过了不再查询
        //先画实体
        for (var i = 1;i < nodes_p.length;i++){
            if (nodes_p[i].isEntity == true){
                var j;//实体节点是否已经存在
                for (j = 0;j < nodes.length;j++){
                    if (nodes_p[i].entity == nodes[j].entity){
                        break;
                    }
                }
                if (j == nodes.length){
                    nodes.push(nodes_p[i]);
                    nodemark.push(false);
                    var edge = { "source":focus , "target": (nodes.length-1), "relation":nodes_p[i].relation};
                    edges.push(edge);
                    var k;//将类别加入
                    for (k = 0;k < labels.length;k++){
                        if (labels[k] == nodes_p[i].label) break;
                    }
                    if (k == labels.length) labels.push(nodes_p[i].label);
                    amount_thistime++;
                }else{
                    var edge = { "source":focus , "target": j, "relation":nodes_p[i].relation};
                    edges.push(edge);
                }
            }
            if (amount_thistime >= 10) break;
        }
        //再选几个属性画
        if (amount_thistime < 10){
            for (var i = 1;i < nodes_p.length;i++){
                var str = nodes_p[i].entity;
                if ((nodes_p[i].isEntity == false)&&(str.length <= 5)){
                    nodes.push(nodes_p[i]);
                    nodemark.push(false);
                    var edge = { "source":focus , "target": (nodes.length-1), "relation":nodes_p[i].relation };
                    edges.push(edge);
                    amount_thistime++;
                }
                if (amount_thistime >= 10) break;
            }
        }
    }
}

//开始画图
function d3renew(focus){
    //force布局
    if (TheFirstNode){
        force = d3.layout.force()
            .nodes(nodes)
            .links(edges)
            .size([widthplus,heightplus])
            .linkDistance(EdgeLength)
            .linkStrength(0.5)
            .charge(-1000);
    }else{
        force.nodes(nodes).links(edges);
    }
    force.start();
    //数据添加到画布
    var svg_edges_new;
    var svg_nodes_new;
    if (TheFirstNode){
        svg_edges = svg.selectAll(".gedge")
            .data(edges)
            .enter()
            .append("g")
            .attr("class","gedge")
            .attr("id",function(d,i){
                return "gedge"+i;
            });
        svg_edges_new = svg_edges;
        svg_nodes = svg.selectAll(".gnode")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class","gnode")
            .attr("id",function(d,i){
                return "gnode"+i;
            })
            .call(force.drag);
        svg_nodes_new = svg_nodes;
        svg.append("text").attr("class","typetext")
            .style("font-size",TextSize)
            .attr("dy",-(R+R/2));
    }
    else{
        svg_edges_new = svg_edges.data(edges)
            .enter()
            .append("g")
            .attr("class","gedge")
            .attr("id",function(d,i){
                return "gedge"+i;
            });
        svg.selectAll(".gnode").remove();//节点全部擦掉重新画
        svg_nodes_new = svg.selectAll(".gnode")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class","gnode")
            .attr("id",function(d,i){
                return "gnode"+i;
            })
            .call(force.drag);
    }
    //连线
    svg_edges_new.append("line")
        .attr("class","edgeline")
        .attr("id",function(d,i){
            return "line"+i;
        })
        .style("stroke-width",EdgeWidth);
    //方向
    svg_edges_new.append("line")
        .attr("class","arrow")
        .attr("id",function(d,i){
            return "arrow"+i;
        })
        .style("stroke-width",EdgeWidth)
        .style("stroke",function(d,i){
            if (nodes[d.target.index].isEntity){
                var k;//查询其类别代号
                for (k = 0;k < labels.length;k++){
                    if (labels[k] == nodes[d.target.index].label) break;
                }
                return color(k%20);
            }
            else return "#616161";
        });
    //关系说明文字
    svg_edges_new.append("text")
        .attr("class","edgetext")
        .attr("id",function(d,i){
            return "edgetext"+i;
        })
        .style("font-size",TextSize)
        .attr("dy",-(TextSize))
        .text("");
    svg_edges_new.on("mouseover",function(d,i){
        svg.select("#edgetext"+i)
            .text(d.relation);
        svg.select("#line"+i).transition()
            .duration(100)
            .style("stroke-width",EdgeWidth*3);
        svg.select("#arrow"+i).transition()
            .duration(100)
            .style("stroke-width",EdgeWidth*3);
    }).on("mouseout",function(d,i){
        svg.select("#edgetext"+i)
            .text("");
        svg.select("#line"+i).transition()
            .duration(100)
            .style("stroke-width",EdgeWidth);
        svg.select("#arrow"+i).transition()
            .duration(100)
            .style("stroke-width",EdgeWidth);
    });
    //节点圆要重新画防止被连线遮住
    svg.selectAll(".gnode").append("circle")
        .attr("class","nodecircle")
        .attr("id",function(d,i){
            return "circle"+i;
        })
        .attr("r",R)
        .style("fill",function(d,i){
            if (d.isEntity) {
                var k;//查询其类别代号
                for (k = 0;k < labels.length;k++){
                    if (labels[k] == d.label) break;
                }
                return color(k%20);
            }
            else return "#616161";
        })
        .style("stroke","gold")
        .style("stroke-width",0);
    svg.select("#circle"+focus).style("stroke-width",R/10);
    //节点圆上的文字
    svg_nodes_new.append("text")
        .attr("class","nodetext")
        .attr("id",function(d,i){
            return "text"+i;
        })
        .style("font-size",TextSize)
        .attr("dy", TextSize/4)
        .text(function(d){
            return d.entity;
        });
    //类别说明文字
    svg_nodes_new.on("mouseover",function(d,i){
        svg.select("#circle"+i)
            .transition()
            .duration(100)
            .attr("r",R+R/5);
        svg.select("#text"+i)
            .transition()
            .duration(100)
            .style("fill","#212121");
        svg.select(".typetext")
            .attr("x",d.x)
            .attr("y",d.y)
            .style("fill",function(){
                if (d.isEntity) {
                    var k;//查询其类别代号
                    for (k = 0;k < labels.length;k++){
                        if (labels[k] == nodes[i].label) break;
                    }
                    return color(k%20);
                }
                else return "#616161";
            })
            .text(function(){
                if (d.isEntity) {
                    var k;//查询其类别代号
                    for (k = 0;k < labels.length;k++){
                        if (labels[k] == nodes[i].label) break;
                    }
                    return labels[k];
                }
                else return "属性";
            });
    }).on("mouseout",function(d,i){
        svg.select("#circle"+i)
            .transition()
            .duration(100)
            .attr("r",R);
        svg.select("#text"+i)
            .transition()
            .duration(100)
            .style("fill","white");
        svg.select(".typetext")
            .text("");
    }).on("dblclick",function(d,i){
        svg.transition()
            .duration(500)
            .attr("transform",function(){
                return "translate("+(width/2-d.x)+","+(height/2-d.y)+")";
            });
        svg.select("#circle"+FocusNow)
            .style("stroke-width",0);
        svg.select("#circle"+i)
            .style("stroke-width",4);
        FocusNow = i;
        TheFirstNode = false;
        //如果之前没有查过
        if ((d.isEntity)&&(!nodemark[i])){
            newjson(d.entity);
        }
    });
    var initEnd = false;

    force.on("tick", function(){
        svg.selectAll(".edgeline").attr("x1",function(d){ return d.source.x; })
            .attr("y1",function(d){ return d.source.y; })
            .attr("x2",function(d){ return d.target.x; })
            .attr("y2",function(d){ return d.target.y; });

        svg.selectAll(".arrow").attr("x1",function(d){ return (d.source.x + d.target.x)/2;})
            .attr("y1",function(d){ return (d.source.y + d.target.y)/2; })
            .attr("x2",function(d){ return d.target.x; })
            .attr("y2",function(d){ return d.target.y; });

        svg.selectAll(".edgetext").attr("x",function(d,i){
                return (d.target.x + d.source.x)/2;
            })
            .attr("y",function(d,i){
                return (d.target.y + d.source.y)/2;
            });

        svg.selectAll(".nodecircle").attr("cx",function(d){ return d.x; })
            .attr("cy",function(d){ return d.y; });

        svg.selectAll(".nodetext").attr("x",function(d){ return d.x; })
            .attr("y",function(d){ return d.y; });

        if ((TheFirstNode)&&(!initEnd))
            svg.attr("transform",function(){
                return "translate("+(width/2-nodes[0].x)+","+(height/2-nodes[0].y)+")";
            });
    });

    force.drag()
        .on("dragstart",function(d,i){
            initEnd = true;
            d.fixed = true;
            TheFirstNode = false;
        });

}
//控制右侧信息栏
function infobar(num){
    d3.select("#icon"+num).attr("class","icon_active");
    d3.select("#icontext"+num).attr("class","icontext_active");
    if (BarNow != 0){
        d3.select("#icon"+BarNow).attr("class","icon");
        d3.select("#icontext"+BarNow).attr("class","icontext");
    }
    if (BarNow == num){
        $("#infobar"+num).animate({marginLeft:"100%"});
        BarNow = 0;
    }
    else{
        if (BarNow != 0){
            $("#infobar"+BarNow).css({marginLeft:"100%"});
        }
        $("#infobar"+num).animate({marginLeft:"70%"});
        BarNow = num;
    }
}

//为右侧信息栏写入内容
function infobarinit(root){
    var Node = root.nodes;
    d3.select("#infotable").selectAll("tr").remove();
    for (var i = 0;i < Node.length;i++){
        var row = d3.select("#infotable").append("tr");
        row.append("td").attr("class","infotext").style("font-weight","bold").text(function(){
            if (Node[i].relation == -1) return "名称";
            else return Node[i].relation;
        });
        row.append("td").attr("class","infotext").text(Node[i].entity);
    }
}

//右侧信息栏的查询功能
function search(basePath){
    var keyword="";
    keyword = document.getElementById("inputbox").value;
    while (keyword.charAt(0) == " ") keyword = keyword.substring(1);
    if (keyword!="") window.location.href = basePath + "jsp/Main/Graph.jsp?keyword=" + keyword;
}

//右侧信息栏的对话功能
function talk(){
    var InputLine="";
    InputLine = document.getElementById("talkinputbox").value;
    while (InputLine.charAt(0) == " ") InputLine = InputLine.substring(1);
    if (InputLine!=""){
        d3.select("#talkinputbox").remove();
        d3.select("#infobar4").append("div")
            .attr("class","textbubble")
            .style("background-color","#F08080")
            .style("margin-left","35%")
            .text(InputLine)
            .transition()
            .duration(500)
            .style("margin-top","8%");
        var url = getRootPath()+"/easyQA/talk.do?question="+InputLine;
        d3.json(url,function(error,data){//向对话机服务请求答案
            if( error ){
                alert("对话机服务出现问题");
            }else{
                d3.select("#infobar4").append("div")
                    .attr("class", "textbubble")
                    .style("background-color", "#4169E1")
                    .style("margin-left", "5%")
                    .html(data)
                    .transition()
                    .duration(500)
                    .style("margin-top", "8%");
                d3.select("#infobar4").append("input")
                    .attr("class", "input-medium search-query")
                    .attr("id", "talkinputbox")
                    .attr("type", "text")
                    .on("keypress", function () {
                        if (d3.event.charCode == 13) talk();
                    });
                $("#talkinputbox").focus();
            }
        });
    }
}
function init(keyword){
    barinit(1,false,0);
    containerinit(keyword);
}