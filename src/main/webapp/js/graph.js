/**
 * Created by wave on 16-12-8.
 */
var myChart;
var nodes = [];
var links = [];
var categories = [];
var answerpath = [];
var nodeSize = 50;
var dnodeSize = 8;
var fontSize = 15;

function init(){

}

//获取根目录路径
function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPath=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPath+projectName);
}

function talkboxshow(){
    $(".tip").fadeToggle();
    $(".talkbar").fadeToggle();
}

function talk(){
    var question = document.getElementById("talkinput").value;
    while (question.charAt(0) == " ") question = question.substring(1);
    if (question!="") {
        $("#talkinput").remove();
        var newbubble = "<div class='talkbubble' style='color:lightblue'>"+question+"</div>";
        $(".talkbar").append(newbubble);
        var url = getRootPath()+"/easyQA/talk.do?question="+question;
        $.getJSON(url, function(result){
            //$.getJSON("json/demo.json", function(result){
            var answer;
            if (result.nodes){
                if (result.answer) answer = result.answer;
                else answer = "对不起，我没有找到";
                $('#inputbox').fadeOut();
                $('#panel').fadeIn();
                myChart = echarts.init(document.getElementById('panel'),'dark');
                refresh(question, result);
            }else{
                answer = result;
            }
            var newbubble = "<div class='talkbubble' style='color:#F08080'>"+answer+"</div>";
            $(".talkbar").append(newbubble);
            var newinput = "<input id='talkinput' type='text' onkeydown='if(event.keyCode==13) talk()'/>";
            $(".talkbar").append(newinput);
            $("#talkinput").focus();
        });
    }
}

//主界面搜索框事件
function search(){
    var keyword = document.getElementById("input").value;
    while (keyword.charAt(0) == " ") keyword = keyword.substring(1);
    if (keyword!="") {
        $('#interface').fadeOut();
        $('#panel').fadeIn();
        graphinit();
        getNewData(keyword);
    }
}

//初始化mychart以及点击事件
function graphinit(){
    myChart = echarts.init(document.getElementById('panel'),'dark');
    myChart.on('click', function (event) {
        if (event.dataType == 'node'){
            var keyId = event.data.keyId;
            var name = event.name;
            var title = $("#entityInfoModalTitle");
            var table = $("#entityInfoModalTable");
            title.text("正在查询...");
            $("tr").remove();
            var url = getRootPath()+"/graphQA/entity.do?keyId="+keyId;
            $.getJSON(url, function(result){
                title.text(name);
                for (var key in result){
                    table.append("<tr><td style='font-weight: bold'>"+key+"</td><td>"+result[key]+"</td></tr>");
                }
            });
            $('#entityInfoModal').modal();
        }
    });
}

function getNewData(keyword){

    myChart.showLoading({
        text: '',
        color: 'GreenYellow',
        maskColor: 'rgba(255, 255, 255, 0.3)',
        zlevel: 0
    });
    var url = getRootPath()+"/graphQA/answering.do?keyword="+keyword;
    //$.getJSON("json/demo.json", function(result){
    $.getJSON(url, function(result){
        refresh(keyword,result);
    });
}

//刷新绘图页面
function refresh(keyword,result){

    answerpath = result.answerpath;
    var category_names = [];
    myChart.hideLoading();
    result.nodes.forEach(function(node){
        if ($.inArray(node.category,categories) < 0){
            category_names.push(node.category);
            categories.push({
                name: node.category
            });
        }
        node.symbol = 'circle';
        node.symbolSize = nodeSize-node.value*dnodeSize;
        node.x = null;
        node.y = null;
        node.itemStyle = null;
        node.label = {
            normal: {
                show: true,
                position: 'right'
            }
        };
        nodes.push(node);
    });
    result.links.forEach(function(edge){
        links.push(edge);
    });
    //点亮寻找的答案轨迹
    nodes.forEach(function(node){
        if ($.inArray(node.id,answerpath) >= 0)
            node.itemStyle = {
                normal: {
                    borderColor:'GreenYellow',
                    borderWidth:5
                }
            };
    });
    links.forEach(function(link){
        if (($.inArray(link.source,answerpath)>=0)&&($.inArray(link.target,answerpath)>=0))
            link.lineStyle = {
                normal: {
                    color: 'GreenYellow',
                    width: 5,
                }
            };
    });
    //开始绘制图像
    var option = {
        title: {
            text: keyword,
            bottom: '5%',
            right: '5%',
            textStyle:{
                color:"GreenYellow",
                fontSize: fontSize*1.5
            }
        },
        tooltip: {
            formatter: function (params) {
                return params.data.name;
            }
        },
        legend:[{
            data: categories,
            bottom: '5%',
            left: '5%',
            orient: 'vertical',
            itemGap: 20,
            selectedMode:false,
            textStyle:{
                color:'lightgray'
            }
        }],
        series:[{
            type: 'graph',
            layout: 'force',
            data: nodes,
            links: links,
            categories: categories,
            lineStyle: {
                normal: {
                    color: 'source',
                    width: 2,
                    curveness: 0.2
                }
            },
            force: {
                repulsion: 800,
                layoutAnimation: false
            },
            roam: true,
            focusNodeAdjacency: true,
            animationDuration: 1500
        }],
        textStyle: {
            fontFamily: '微软雅黑',
            fontSize: fontSize
        },
    };
    myChart.setOption(option);
}