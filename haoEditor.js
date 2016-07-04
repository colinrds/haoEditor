(function($){
	$.fn.haoEditor = function(options){
		
		var vars = {
			bold:"Bold",
			italic:"Italic",
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
			undo:true
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
				if(row == true){
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
						// setLink();
						if(setLink() == false){
							alert("未选中内容");
							return false;
						}
						$(this).next("div").slideToggle("fast");
						break;
					default: 
						cammandOne($(this),command);
						break;
				}
			});

			haoEditor.find(".toolbar .setLink .confirm").click(function(){
				var command = $(this).parents(".toolBox").prev("a").attr("class");
				var href = $(this).parent(".toolbuttons").prev("input");
				$("a[hao-setlink]").attr("href",href.val()).removeAttr("hao-setlink");
				href.val("http://");
			});
			haoEditor.find(".toolbar .setLink .cancel").click(function(){
				$(this).parent(".toolbuttons").prev("input").val("http://");
				var val = $("a[hao-setlink]").html();
				$("a[hao-setlink]").replaceWith(val);
			});

			haoEditor.find(".toolbar .toolbuttons input").click(function() {
				$(this).parents(".toolBox").slideUp("fast");
			});
		}

		// 无需第二参数的指令
		function cammandOne(obj,command){
			command = vars[command];
			operation(command);
		}

		// 有二参数的指令
		function cammandTwo(obj,command){
			command = vars[command];
			var secondParam = obj.parent(".toolbuttons").prev("input").val();
			operation(command,secondParam);
		}

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
	}
})(jQuery);