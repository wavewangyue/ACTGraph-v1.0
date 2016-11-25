/**
 * Created by wave on 16-8-15.
 */
function minit(keyword){
    d3ParaSet();
    containerinit(keyword)
}

//重新设定一些全局参数，以便适应移动端的显示
function d3ParaSet(){
    TerminalType = 2;
    R = 120;
    TextSize = 60;
    EdgeWidth = 10;
    EdgeLength = 500;
}

function answerinit(answer){
    var row = d3.select(".minfobox").append("div")
        .style("margin","0")
        .style("padding","0")
        .style("background-color","black");
    row.append("p").attr("class","infotext1_mobile")
        .text("问答结果");
    row.append("p").attr("class","infotext2_mobile")
        .text(answer);
}

//更新信息栏
function infobarinit_mobile(root){
    d3.select(".minfobox").selectAll("div").remove();
    //先将问答的答案写入信息栏
    if (root.isAnswer){
        if (root.isFind) answerinit(root.answer);
        else answerinit("没有找到答案");
    }
    //再将其他信息写入信息栏
    var Node = root.nodes;
    for (var i = 0;i < Node.length;i++){
        var box = d3.select(".minfobox").append("div")
            .style("margin","0")
            .style("padding","0")
            .style("background-color",function(){return color(i%20);});
        box.append("p").attr("class","infotext1_mobile")
            .text(function(){
                if (Node[i].relation == -1) return "实体名称";
                else return Node[i].relation;
            });
        box.append("p").attr("class","infotext2_mobile")
            .text(Node[i].entity);
    }
}