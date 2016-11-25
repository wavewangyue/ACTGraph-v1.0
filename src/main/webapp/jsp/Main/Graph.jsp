<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String keyword = request.getParameter("keyword");
if (keyword != null) keyword = new String(keyword.getBytes("iso-8859-1"),"UTF-8");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	  <base href="<%=basePath%>">
	  <title>北航知识图谱·ACT</title>
	  <meta http-equiv="Access-Control-Allow-Origin" content="*">
	  <script src="js/ex/d3.min.js"></script>
	  <script src="js/ex/jquery.js"></script>
	  <script src="js/Main/Graph.js"></script>
	  <link rel="stylesheet" type="text/css" href="css/ex/bootstrap.css">
	  <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  
  <body onload="init('<%=keyword%>')" style="overflow:hidden">
    <jsp:include page="../include/sidebar.jsp" />
    <div class="iconunit" style="margin-top:2%;margin-left:75%">
    	<p class="icontext" id="icontext1">Query</p>
    	<img class="icon" id="icon1" src="img/icon/search.png" onclick="infobar(1)"/>
	</div>
	<div class="iconunit" style="margin-top:2%;margin-left:80%">
    	<p class="icontext" id="icontext2">Info</p>
    	<img class="icon" id="icon2" src="img/icon/info.png" onclick="infobar(2)"/>
	</div>
	<div class="iconunit" style="margin-top:2%;margin-left:85%">
    	<p class="icontext" id="icontext3">Answer</p>
    	<img class="icon" id="icon3" src="img/icon/answer.png" onclick="infobar(3)"/>
	</div>
	<div class="iconunit" style="margin-top:2%;margin-left:90%">
    	<p class="icontext" id="icontext4">Talk</p>
    	<img class="icon" id="icon4" src="img/icon/talk.png" onclick="infobar(4)"/>
	</div>
	<div class="infobar" id="infobar1">
		<input class="input-medium search-query" id="inputbox" type="text" style="text-align:center;font-size:15px;width:80%;height:60px;margin-top:200px;box-shadow:0px 0px 5px #FFF" onkeydown="if(event.keyCode==13) search('<%=basePath%>')"/>
	</div>
	<div class="infobar" id="infobar2" >
		<table class="table table-bordered" style="margin-top:35%;margin-left:5%;width:90%;background-color:white;box-shadow:0px 0px 10px #FFF">
			<tbody id="infotable"></tbody>
		</table>		
	</div>
	<div class="infobar" id="infobar3">
		<p id = "result" style="margin-top:200px;font-weight:bold;font-size:20px;color:white">
			没有进行问答
		</p>
	</div>
	<div class="infobar" id="infobar4">
		<div class="textbubble" style="background-color:#4169E1;margin-top:40%;margin-left:5%">
			我可以帮你什么吗？
		</div>
		<input class="input-medium search-query" id="talkinputbox" type="text" onkeydown="if(event.keyCode==13) talk()"/>
	</div>
	<div class="waitbar" style="font-size:20px">
		<p style="text-align:center" >
			<span id="waiting">正</span><span id="waiting">在</span><span id="waiting">查</span><span id="waiting">询</span><span id="waiting">请</span><span id="waiting">稍</span><span id="waiting">候</span>
		</p>
	</div>
	<div id="container" style="z-index:0"></div>
  </body>
</html>
