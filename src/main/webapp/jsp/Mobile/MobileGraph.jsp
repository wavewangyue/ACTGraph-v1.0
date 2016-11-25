<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String keyword = request.getParameter("keyword");
	if (keyword != null) keyword = new String(keyword.getBytes("iso-8859-1"),"UTF-8");
%>

<!DOCTYPE HTML >
<html>
  <head>
	  <base href="<%=basePath%>">
	  <title>北航知识图谱·ACT</title>
	  <script src="js/ex/d3.min.js"></script>
	  <script src="js/ex/jquery.js"></script>
	  <script src="js/Main/Graph.js"></script>
	  <script src="js/Mobile/MobileGraph.js"></script>
	  <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  
  <body onload="minit('<%=keyword%>')">
	<div class="waitbar" style="margin-top:50%;font-size:5em">
		<p style="text-align:center"><span id="waiting">正</span><span id="waiting">在</span><span id="waiting">查</span><span id="waiting">询</span><span id="waiting">请</span><span id="waiting">稍</span><span id="waiting">候</span></p>
	</div>
	<div id="container"></div>
	<div class="minfobox"></div>
  </body>
</html>
