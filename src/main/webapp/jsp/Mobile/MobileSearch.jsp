<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
  <head>
	  <base href="<%=basePath%>">
	  <title>更多精彩关注微信公众号：北航知识图谱</title>
	  <script src="js/Mobile/MobileSearch.js"></script>
	  <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  
  <body>
	<div style="text-align:center;">
		<img style="width:90%;margin-top:10%;pointer-events:none;" src="img/logoindex.png" />
		<p style="margin-top:10%;font-size:3.5em;font-family:微软雅黑;color:dimgray;font-weight:bold">言<span style="color:palevioletred">你</span>所<span style="color:orange">想 </span>见<span style="color:dodgerblue">我</span>所<span style="color:darkslategrey">知</span></p>
		<p style="margin-top:1%;font-size:3.5em;font-family:微软雅黑;color:dimgray;font-weight:bold"><span style="color:darkgreen">Glitzier</span> knowledge <span style="color:mediumpurple">Deeper</span> search</p>
		<input id="inputbox" type="text" style="text-align:center;font-size:3.5em;width:40%;height:2.5em;border-radius:1em;margin-top:2%" onkeydown="if(event.keyCode==13) search('<%=basePath%>')"/>
		<p style="margin-top:15%;font-size:3em;font-family:微软雅黑;color:dimgray;font-weight:bold">更多精彩关注微信公众号</p>
		<p style="margin-top:1%;font-size:3em;font-family:微软雅黑;color:saddlebrown;font-weight:bold">北航知识图谱</p>
		<img style="width:50%;margin-top:1%" src="img/qrcode.jpg" />
		<p style="margin-top:5%;font-size:2em;font-family:微软雅黑;color:dimgray">KnowledgeGraph of BUAA</p>
		<p style="margin-top:1%;font-size:2em;font-family:微软雅黑;color:dimgray">On Mobile</p>
		<p style="margin-top:1%;font-size:2em;font-family:微软雅黑;color:dimgray">Copyright</p>
		<p style="margin-top:1%;font-size:2em;font-family:微软雅黑;color:dimgray">The Institute of Advanced Computing Technology</p>
	</div>
  </body>
</html>
