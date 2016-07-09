# haoEditor v1.0 轻量级富文本，配置方便，使用简单
===
## 1.说明
```
基于jQuery，兼容IE7+、Chrome、Firefox等主流浏览器
```
## 2.使用
```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>haoEditor</title>
	<link rel="stylesheet" type="text/css" href="css/haoEditor.css">
	<script src="jquery.min.js" type="text/javascript"></script>
	<script src="haoEditor.js" type="text/javascript"></script>
</head>
<body>
	<textarea name="textarea" id="test-hao"></textarea>
	<!-- <div id="test-hao"></div> -->
</body>
<script type="text/javascript">
	$(function(){
		$("#test-hao").haoEditor();
	})
</script>
</html> 
```
## 3.配置
```
$("#test-hao").haoEditor({
	//是否加粗
	bold:true,
	//是否斜体
	italic:true,
	//下划线
	underline:true,
	//添加超链接
	add_link:true,
	//移除超链接
	un_link:true,
	//添加图片
	add_img:true,
	//增加缩进
	indent:true,
	//较少缩进
	outdent:true,
	//文字居左
	text_left:true,
	//文字居中
	text_center:true,
	//文字居右
	text_right:true,
	//是否无序列排列
	list:true,
	//是否有序排列
	order:true,
	//回退操作
	undo:true,
	//是否能显示源代码
	textarea:true
});

通过配置 textarea:true 可以使用代码进行文本编辑
```