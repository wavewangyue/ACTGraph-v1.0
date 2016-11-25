/**
 * Created by wave on 16-8-15.
 */
var barison = true;
var secondison = false;

function barinit(barlabel,showlabel,secondlabel){
    barison = showlabel;
    d3.select("#unit"+barlabel).attr("class","unit_active");
    d3.select("#icon0").attr("class","icon_active");
    d3.select("#icontext0").attr("class","icontext_active");
    if (!showlabel){
        $(".bar").animate({marginLeft:"-15%"});
        $(".secondbar").animate({marginLeft:"-10%"});
        d3.select("#icon0").attr("class","icon");
        d3.select("#icontext0").attr("class","icontext");
    }
    d3.select("#icon0")
        .on("click",function(){
            if (barison){
                $(".bar").animate({marginLeft:"-15%"});
                $(".secondbar").animate({marginLeft:"-10%"});
                barison = false;
                secondison = false;
                d3.select(this).attr("class","icon");
                d3.select("#icontext0").attr("class","icontext");
            }else{
                $(".bar").animate({marginLeft:"0%"});
                $(".secondbar").animate({marginLeft:"5%"});
                barison = true;
                d3.select(this).attr("class","icon_active");
                d3.select("#icontext0").attr("class","icontext_active");
            }
        });
    if (secondlabel != 0){
        d3.select("#secondunit"+secondlabel).attr("class","unit_active");
    }
}

function secondbar(){
    if (secondison){
        $(".secondbar").animate({marginLeft:"5%"});
        secondison = false;
    }
    else{
        $(".secondbar").animate({marginLeft:"15%"});
        secondison = true;
    }
}

function newwindow(basePath,num){
    var windowlist= new Array("jsp/Main/Search.jsp",
        "jsp/Manage/Statis.jsp",
        "jsp/Manage/Function.jsp",
        "jsp/Manage/Rule.jsp");
    window.location.href = basePath + windowlist[num];
}