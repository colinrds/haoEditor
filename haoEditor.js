(function($){
	$.fn.haoEditor = function(options){
		
		var vars = {
			bold:"Bold",
			italic:"Italic",
			underline:"Underline",
			add_link:"CreateLink",
			un_link:"Unlink",
			add_img:"",
			indent:"Indent",
			outdent:"Outdent",
			text_left:"JustifyLeft",
			text_center:"JustifyCenter",
			text_right:"JustifyRight",
			list:"InsertUnorderedList",
			order:"InsertOrderedList",
			font_size:"FontSize",
			font_color:"ForeColor",
			undo:"Undo"
		}
		
		var support = $.extend({
			bold:true,
			italic:true,
			underline:true,
			add_link:true,
			un_link:true,
			add_img:true,
			indent:true,
			outdent:true,
			text_left:true,
			text_center:true,
			text_right:true,
			list:true,
			order:true,
			font_size:false,
			font_color:false,
			undo:true,
			textarea:true
		},options);
		var fontSize = [["Size1","1"],["Size2","2"],["Size3","3"],["Size4","4"],["Size4","4"],["Size5","5"],["Size6","6"],["Size7","7"]];
		this.wrap('<div class="haoEditor"></div>');
		var haoEditor = this.parents(".haoEditor");
		init();

		function init(){
			setToolBar();
			setEditArea();
			bindEvent();
		};

		function setToolBar(){
			var toolbar = $("<div class='toolbar'></div>");
			haoEditor.prepend(toolbar);
			$.each(support,function(key, row) {
				if(row){
					var tool_div = $("<div><a href='javascript:void(0);' class="+ key +"></a></div>")
					switch (key) {
						case "font_size":
								var font_div = $("<div class='toolBox'></div>");
								$.each(fontSize,function(index, font) {
									font_div.append("<a hao-param="+font[1]+"><font size="+font[1]+">"+ font[0] +"</font></a>")
								});
								tool_div.append(font_div);
							break;
						case "add_link":
								var link_div = $("<div class='toolBox setLink'></div>");
								link_div.append("<input type='text' class='data' placeholder='请输入链接地址' value='http://'>");
								link_div.append("<div class='toolbuttons'><input class='confirm' type='button' value='确定'><input class='cancel' type='button' value='取消'></div>");
								tool_div.append(link_div);
							break;
						case "add_img":
							if(typeof(support[key]) == "boolean"){
								var img_div = $("<div class='toolBox setImg'></div>");
								img_div.append("<input type='text' class='data' placeholder='请输入图片地址''>");
								img_div.append("<div class='toolbuttons'><input class='confirm' type='button' value='确定'><input class='cancel' type='button' value='取消'></div>");
								tool_div.append(img_div);
							}else{
								
							}
					}
					toolbar.append(tool_div);
				}
			});
		};

		function setEditArea(){
			haoEditor.append("<div contenteditable='true'></div>")
		}
		
		function bindEvent(){
			haoEditor.find(".toolbar>div>a").click(function(){
				var command = $(this).attr("class");
				switch (command) {
					case "font_size":
							$(this).next("div").slideToggle("fast");
						break;
					case "add_link":
							if(haoEditor.find('a[hao-setlink]').length > 0){
								haoEditor.find(".toolbar .setLink .cancel").click();
							}else{
								if(setLink() == false){
									alert("未选中内容");
									return false;
								}
								$(this).next("div").slideToggle("fast");
							}

						break;
					case "add_img":
							if(haoEditor.find('img[hao-setimg]').length > 0){
								haoEditor.find(".toolbar .setImg .cancel").click();
							}else{
								setImage();
								$(this).next("div").slideToggle("fast");
							}
						break;
					case "textarea":
							showContent();
						break;
					default: 
							command = vars[command];
							if(!command) return false;
							operation(command);
						break;
				}
			});

			//设置链接确定按钮
			haoEditor.find(".toolbar .setLink .confirm").click(function(){
				var command = $(this).parents(".toolBox").prev("a").attr("class");
				var href = $(this).parent(".toolbuttons").prev("input");
				$("a[hao-setlink]").attr("href",href.val()).removeAttr("hao-setlink");
				href.val("http://");
			});

			//设置链接取消按钮
			haoEditor.find(".toolbar .setLink .cancel").click(function(){
				$(this).parent(".toolbuttons").prev("input").val("http://");
				var val = $("a[hao-setlink]").html();
				$("a[hao-setlink]").replaceWith(val);
			});

			//设置图片确定按钮
			haoEditor.find(".toolbar .setImg .confirm").click(function() {
				var command = $(this).parents(".toolBox").prev("a").attr("class");
				var src = $(this).parent(".toolbuttons").prev("input");
				$("img[hao-setimg]").attr("src",src.val()).removeAttr("hao-setimg");
				src.val("");
			});

			//设置图片取消按钮
			haoEditor.find(".toolbar .setImg .cancel").click(function(){
				$(this).parent(".toolbuttons").prev("input").val("");
				var val = $("img[hao-setimg]").html();
				$("img[hao-setimg]").replaceWith(val);
			});

			haoEditor.find(".toolbar .toolbuttons input").click(function() {
				$(this).parents(".toolBox").slideUp("fast");
			});
		}

		area = haoEditor.find("div[contenteditable='true']");

		// 执行命令
		function operation(command,secondParam){
			document.execCommand(command, false, secondParam);
		}

		// 获得选中对象
		function getSelection(){
			var selection = document.getSelection ? document.getSelection() : document.selection;
			return selection;
		}

		function setLink(){
			var selection = getSelection();
			if(selection.type == "None") return false;
			var range = document.getSelection ? selection.getRangeAt(0) : selection.createRange();
			if(document.getSelection){
				if(range.toString() == ""){
					return false;
				}
			}else{
				if(range.htmlText == ""){
					return false;
				}
			}
			var content = document.getSelection ? range.extractContents() : range.htmlText;
			if(document.getSelection){
				var link = $("<a hao-setLink></a>");
				link.append(content);
				range.insertNode(link[0]);
			}
			else{
				var link = "<a hao-setLink>"+content+"</a>"
				range.pasteHTML(link);
			}
		}

		function setImage(){
			area.focus();
			var selection = getSelection();
			var range = document.getSelection ? selection.getRangeAt(0) : selection.createRange();
			if(document.getSelection){
				var content = $("<img hao-setImg>");
				range.insertNode(content[0]);
			}else{

			}
		}
		
		function showContent(){
			var padding = area.css("padding");
			var height = area.height();
			var width = area.width();
			var content = area.html();
			if(haoEditor.find('textarea').length == 0){
				haoEditor.append($("<textarea>"));
			}
			var text_area = haoEditor.find('textarea');
			text_area.css({
				width: width,
				height: height,
				padding: padding
			});
			if(area.is(':hidden')){
				var new_content = text_area.val();
				area.html(new_content);
			}else{
				text_area.val(content);
			}
			text_area.toggle();
			area.toggle();
		}
	}
})(jQuery);