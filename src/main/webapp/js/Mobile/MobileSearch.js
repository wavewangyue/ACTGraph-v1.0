/**
 * Created by wave on 16-8-15.
 */
function search(basePath){
    var keyword="";
    keyword = document.getElementById("inputbox").value;
    while (keyword.charAt(0) == " ") keyword = keyword.substring(1);
    if (keyword!="") window.location.href = basePath + "jsp/Mobile/MobileGraph.jsp?keyword=" + keyword;
}