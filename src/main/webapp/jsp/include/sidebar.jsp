<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
  </head>
  <script src="js/include/sidebar.js"></script>

    <div class="bar" >
   		<img style="width:40%;margin-top:50%;margin-right:10%;" src="img/logoact.png" />
   		<div class="unit" id="unit1" style="margin-top:50%;margin-right:15%" onclick="newwindow('<%=basePath%>',0)">
   			<p>查询</p>
   			<p style="font-size:15px">Query</p>
   		</div>
   		<div class="unit" id="unit2" style="margin-top:20%;margin-right:15%" onclick="secondbar()">
   			<p>后台管理</p>
   			<p style="font-size:15px">Management</p>
   		</div>
   		<div class="bartext" style="margin-top:40%;margin-right:15%"><Strong>Copyright</Strong></div>
   		<div class="bartext" style="margin-top:10%;margin-right:15%;font-size:12px">The Institute of Advanced Computing Technology</div>
   		<div class="bartext" style="margin-top:10%;margin-right:15%;font-size:12px">BeiHang University</div>
    </div>
    <div class="secondbar">
		<div class="unit" id="secondunit1" style="margin-top:50%;margin-right:15%" onclick="newwindow('<%=basePath%>',1)">
   			<p>统计</p>
   			<p style="font-size:15px">Statistics</p>
   		</div>
   		<div class="unit" id="secondunit2" style="margin-top:50%;margin-right:15%" onclick="newwindow('<%=basePath%>',2)">
   			<p>功能</p>
   			<p style="font-size:15px">Function</p>
   		</div>
   		<div class="unit" id="secondunit3" style="margin-top:50%;margin-right:15%" onclick="newwindow('<%=basePath%>',3)">
   			<p>规则</p>
   			<p style="font-size:15px">Rules</p>
   		</div>
	</div>
    <div class="iconunit" style="margin-top:2%;margin-left:6%">
    	<p class="icontext" id="icontext0">Menu</p>
    	<img class="icon" id="icon0" src="img/icon/bar.png" />
	</div>
</html>
