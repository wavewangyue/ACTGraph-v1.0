/**
 * Created by wave on 16-8-15.
 */
function init(basePath){
    barinit(2,true,3);
    $(".rulebar").hide();
}

function findnewrule(){
    var keyword="";
    keyword = document.getElementById("inputbox").value;
    while (keyword.charAt(0) == " ") keyword = keyword.substring(1);
    if (keyword!=""){
        $(".rulebar").fadeIn();
        //d3.json("json/t2.json",function(error,root){
        d3.json("http://10.1.1.5:8080/commonaction.label?title="+keyword,function(error,root){
            if( error ){
                alert("没有找到结果");
            }
            var nodes = root.nodes;
            d3.select("#newrule").text("发现规则："+nodes[0].label+"-->"+keyword+"-->"+nodes[1].label);
        });
    }
}