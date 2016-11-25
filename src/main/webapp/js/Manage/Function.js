/**
 * Created by wave on 16-8-15.
 */
var color = d3.scale.category20();
var color10 = d3.scale.category10();
var width = window.innerWidth*2/3;
var height = 500;
var svg = new Array();
var padding = {left:10, right:0, top:30, bottom:0};
var data = new Array();
var datashow = new Array();
var flags = new Array();
var PageNow = 0;
var PageNow2 = 0;
var types = new Array();
var typelabel= new Array();
var ppts = new Array();
var r;
var allLabels;
var allLabelsName = new Array();
var LabelNow = 0;

function d3init(basePath){
    //属性聚合/////////////////////////////////////////////////////////////
    var numx = 10;
    var numy = 10;
    svg.push(d3.select("body")
        .select("#container0")
        .append("svg")
        .attr("width", width)
        .attr("height", height));
    d3.json(basePath+"json/mapdic.json",function(error,root){
        if( error ){
            alert("找不到JSON文件");
        }
        data = root.data;
        //页数选择区
        for (var i = 0;i < 11;i++){
            var g0 = svg[0].append("g")
                .attr("class","Myg0");
            g0.append("rect")
                .attr("class","pagerect")
                .attr("id","page"+i)
                .attr("width",15)
                .attr("height",15)
                .attr("x",width-350+i*30)
                .attr("y",1)
                .attr("fill",function(){
                    if (i == 0) return "#414141";
                    else return "white";
                });
        }
        svg[0].selectAll(".pagerect")
            .on("mouseover",function(){
                d3.select(this).attr("fill","#818181");
            })
            .on("mouseout",function(d,i){
                d3.select(this).attr("fill",function(){
                    if (i != PageNow) return "white";
                    else return "#414141";
                });
            })
            .on("click",function(d,i){
                for (var j = 0;j < numx*numy;j++){
                    if (data[j+i*numx*numy] != null)
                        datashow[j] = data[j+i*numx*numy];
                    else{
                        var p = {left:" ", right:" "};
                        datashow[j] = p;
                    }
                }
                svg[0].selectAll(".mytext_function")
                    .text(function(d,x){
                        if (!flags[x]) return datashow[x].left;
                        else return datashow[x].right;
                    });
                svg[0].selectAll(".pagerect").attr("fill","white");
                d3.select(this).attr("fill","#414141");
                PageNow = i;
            });
        //矩阵区
        for (var i = 0;i < numx;i++){
            for (var j = 0;j < numy;j++){
                if (Math.random() > 0.5) flags.push(false);
                else flags.push(true);
                datashow.push(data[i*numx+j]);
                var g = svg[0].append("g")
                    .attr("class","Myg");
                g.append("rect")
                    .attr("class","Myrect")
                    .attr("id","rect"+(i*numx+j))
                    .attr("width",(width-padding.left-padding.right)/numx)
                    .attr("height",(height-padding.top-padding.bottom)/numy)
                    .attr("x",padding.left+((width-padding.left-padding.right)/numx)*i)
                    .attr("y",padding.top+((height-padding.top-padding.bottom)/numy)*j)
                    .attr("fill",function(){
                        if (!flags[i*numx+j]) return "white";
                        else return "#212121";
                    });
                g.append("text")
                    .attr("class","mytext_function")
                    .attr("id","text"+(i*numx+j))
                    .attr("x",padding.left+((width-padding.left-padding.right)/numx)*(i+0.5))
                    .attr("y",padding.top+((height-padding.top-padding.bottom)/numy)*(j+0.5)+5)
                    .attr("fill",function(){
                        if (!flags[i*numx+j]) return "#616161";
                        else return "white";
                    })
                    .text(function(){
                        if (!flags[i*numx+j]) return datashow[i*numx+j].left;
                        else return datashow[i*numx+j].right;
                    });
            }
            svg[0].selectAll(".Myg")
                .on("click",function(d,i){
                    if (!flags[i]){
                        svg[0].select("#rect"+i).transition()
                            .duration(200)
                            .attr("fill","#212121");
                        svg[0].select("#text"+i).transition()
                            .duration(200)
                            .attr("fill","white")
                            .text(datashow[i].right);
                        flags[i] = true;
                    }else{
                        svg[0].select("#rect"+i).transition()
                            .duration(200)
                            .attr("fill","white");
                        svg[0].select("#text"+i).transition()
                            .duration(200)
                            .attr("fill","#616161")
                            .text(datashow[i].left);
                        flags[i] = false;
                    }
                });
        }
    });
    //属性划类/////////////////////////////////////////////////////
    svg.push(d3.select("body")
        .select("#container1")
        .append("svg")
        .attr("width", width)
        .attr("height", height));
    d3.json(basePath+"json/keydic.json",function(error,root){
        if( error ){
            alert("找不到JSON文件");
        }
        var n = 0;
        for (key in root){
            types.push(key);
            for (var i = 0;i < root[key].length;i++){
                ppts.push(root[key][i]);
                typelabel.push(n);
            }
            n++;
        }
        for (var i = 0;i < n;i++){
            svg[1].append("rect")
                .attr("class","pagerect")
                .attr("width",15)
                .attr("height",15)
                .attr("x",width-200+(i%5)*30)
                .attr("y",parseInt(i/5)*30+20)
                .attr("fill",function(){
                    if (i == 0) return "#414141";
                    else return "white";
                });
        }
        svg[1].selectAll(".pagerect")
            .on("mouseover",function(){
                d3.select(this).attr("fill","#818181");
            })
            .on("mouseout",function(d,i){
                d3.select(this).attr("fill",function(){
                    if (i != PageNow2) return "white";
                    else return "#414141";
                });
            })
            .on("click",function(d,i){
                svg[1].selectAll(".pagerect").attr("fill","white");
                d3.select(this).attr("fill","#414141");
                PageNow2 = i;
                svg[1].select(".bigcircle").transition()
                    .duration(500)
                    .attr("fill",color(i%20));
                svg[1].select("#type")
                    .text(types[i]);
                $(".Myppts").fadeOut(500,function(){
                    svg[1].selectAll(".Myppts").remove();
                    for (var x = 0;x < ppts.length;x++){
                        if (typelabel[x] == i){
                            svg[1].append("text")
                                .attr("class","Myppts")
                                .attr("transform","translate("+((width-200)/2-r/Math.sqrt(2))+","+((height/2-10)-r/Math.sqrt(2))+")")
                                .attr("x",Math.random()*r*Math.sqrt(2))
                                .attr("y",Math.random()*r*Math.sqrt(2))
                                .style("font-size",Math.random()*20+15)
                                .attr("fill",color(x%20))
                                .text(ppts[x]);
                        }
                    }
                    $(".Myppts").hide();
                    $(".Myppts").fadeIn();
                });
            });
        svg[1].append("circle")
            .attr("class","bigcircle")
            .attr("r",height/2-20)
            .attr("transform","translate("+(width-200)/2+","+(height/2-10)+")")
            .attr("fill",color(PageNow2%20));
        svg[1].append("text")
            .attr("class","mytext_function")
            .style("font-size","20px")
            .attr("id","type")
            .attr("x",(width-200)/2)
            .attr("y",40)
            .attr("fill","white")
            .text(types[0]);
        //添加文字
        r = height/2-50;
        for (var x = 0;x < ppts.length;x++){
            if (typelabel[x] == PageNow2){
                svg[1].append("text")
                    .attr("class","Myppts")
                    .attr("transform","translate("+((width-200)/2-r/Math.sqrt(2))+","+((height/2-10)-r/Math.sqrt(2))+")")
                    .attr("x",Math.random()*r*Math.sqrt(2))
                    .attr("y",Math.random()*r*Math.sqrt(2))
                    .style("font-size",Math.random()*20+15)
                    .attr("fill",color(x%20))
                    .text(ppts[x]);
            }
        }
    });
    //类别体系///////////////////////////////////////////////////////////////////
    svg.push(d3.select("body")
        .select("#container2")
        .append("svg")
        .attr("width", width)
        .attr("height", height));
    d3.json(basePath+"json/allLabelPro.json",function(error,root){
        if( error ){
            alert("找不到JSON文件");
        }
        allLabels = root;
        svg[2].append("line")
            .attr("stroke","#414141")
            .attr("stroke-width",3)
            .attr("x1",padding.left+60)
            .attr("y1",padding.top+(height-padding.top-padding.bottom)/2)
            .attr("x2",width/2+60)
            .attr("y2",padding.top+(height-padding.top-padding.bottom)/2);
        svg[2].append("rect")
            .attr("width",(width-padding.left-padding.right)/2-50)
            .attr("height",(height-padding.top-padding.bottom))
            .attr("x",padding.left+50)
            .attr("y",padding.top)
            .attr("rx",20)
            .attr("fill","#414141");
        svg[2].append("rect")
            .attr("width",(width-padding.left-padding.right)/2-50)
            .attr("height",(height-padding.top-padding.bottom))
            .attr("x",width/2+50)
            .attr("y",padding.top)
            .attr("rx",20)
            .attr("fill","white")
            .attr("stroke","#414141")
            .attr("stroke-width",3);
        for (key in allLabels){
            svg[2].append("text")
                .attr("class","Mylabel")
                .text(key);
            allLabelsName.push(key);
        }
        svg[2].selectAll(".Mylabel")
            .attr("fill",function(d,i){
                if (i == 0) return "gold";
                else return "white";
            })
            .attr("x",function(d,i){
                return padding.left+50+((width-padding.left-padding.right)/2-50)/2+(i%3-1)*100;
            })
            .attr("y",function(d,i){
                return padding.top+40+parseInt(i/3)*40;
            })
            .on("mouseover",function(){
                d3.select(this).attr("fill","#818181");
            })
            .on("mouseout",function(d,i){
                d3.select(this).attr("fill",function(){
                    if (i == LabelNow) return "gold";
                    else return "white";
                });
            })
            .on("click",function(d,i){
                svg[2].selectAll(".Mylabel").attr("fill","white");
                d3.select(this).attr("fill","gold");
                LabelNow = i;
                $(".Myprop").fadeOut(200,function(){
                    svg[2].selectAll(".Myprop").remove();
                    var datatemp0 = allLabels[allLabelsName[i]];
                    svg[2].selectAll(".Myprop")
                        .data(datatemp0)
                        .enter()
                        .append("text")
                        .attr("class","Myprop")
                        .text(function(d){
                            return d[0];
                        })
                        .attr("fill",function(d,x){
                            return color10(x%10);
                        })
                        .attr("x",width/2+50+((width-padding.left-padding.right)/2-50)/2)
                        .attr("y",20);
                    svg[2].selectAll(".Myprop")
                        .transition()
                        .duration(200)
                        .delay(function(d,x){
                            return x*100;
                        })
                        .attr("x",function(d,x){
                            return width/2+50+((width-padding.left-padding.right)/2-50)/2+(x%2-0.5)*((width-padding.left-padding.right)/2-50)/4;
                        })
                        .attr("y",function(d,x){
                            return padding.top+40+parseInt(x/2)*40;
                        });
                });
            });
        var datatemp = allLabels[allLabelsName[0]];
        svg[2].selectAll(".Myprop")
            .data(datatemp)
            .enter()
            .append("text")
            .attr("class","Myprop")
            .text(function(d){
                return d[0];
            })
            .attr("fill",function(d,i){
                return color10(i%10);
            })
            .attr("x",width/2+50+((width-padding.left-padding.right)/2-50)/2)
            .attr("y",20);
        svg[2].selectAll(".Myprop")
            .transition()
            .duration(200)
            .delay(function(d,i){
                return i*100;
            })
            .attr("x",function(d,i){
                return width/2+50+((width-padding.left-padding.right)/2-50)/2+(i%2-0.5)*((width-padding.left-padding.right)/2-50)/4;
            })
            .attr("y",function(d,i){
                return padding.top+40+parseInt(i/2)*40;
            });

    });
}
function init(basePath){
    barinit(2,true,2);
    d3init(basePath);
}