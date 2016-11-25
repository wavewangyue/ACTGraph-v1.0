<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML >
<html>
  <head>
	  <base href="<%=basePath%>">
	  <title>北航知识图谱·ACT</title>
	  <script src="js/ex/d3.min.js"></script>
	  <script src="js/ex/jquery.js"></script>
	  <script src="js/Main/Search.js"></script>
	  <link rel="stylesheet" type="text/css" href="css/ex/bootstrap.css">
	  <link rel="stylesheet" type="text/css" href="css/style.css">

	  <style>
		body{
			background-image:url("img/background1.png");
			background-position: center;
			background-repeat: no-repeat;
			background-attachment: fixed;
		}
	  </style>
  </head>
  
  <body onload="init()">
    <jsp:include page="../include/sidebar.jsp" />
	<div style="text-align:center;">
		<img style="margin-top:15%;" src="img/logoindex.png" />
		<div style="font-family:微软雅黑;">
			<input class="input-medium search-query" id="inputbox" type="text" style="text-align:center;font-size:15px;width:300px;height:60px;margin-top:2%" onkeydown="if(event.keyCode==13) search('<%=basePath%>')"/>
		</div>
	</div>
  </body>
</html>
