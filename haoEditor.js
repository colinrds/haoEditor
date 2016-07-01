(function($){
	$.fn.haoEditor = function(options){
		
		var vars = {
			bold:["Bold","B"],
			italic:["Italic","I"],
			text_left:["JustifyLeft","left"],
			text_right:["JustifyRight","right"],
			text_center:["JustifyCenter","center"],
			font_size:["FontSize","size"],
			font_color:["ForeColor","color"],
			add_link:["CreateLink","link"],
			undo:["Undo","cancel"]
		}
		
		var support = $.extend({
			bold:true,
			italic:true,
			text_left:true,
			text_right:true,
			text_center:true,
			font_size:false,
			font_color:false,
			add_link:true,
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
					var tool_div = $("<div><a href='javascript:void(0);' class="+ key +">"+ vars[key][1] +"</a></div>")
					switch (key) {
						case "font_size":
							var font_div = $("<div class='toolBox'></div>");
								$.each(fontSize,function(index, font) {
									font_div.append("<a hao-param="+font[1]+"><font size="+font[1]+">"+ font[0] +"</font></a>")
								});
								tool_div.append(font_div);
							break;
						case "add_link":
							var link_div = $("<div class='toolBox'></div>");
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
			$(".haoEditor .toolbar>div>a").click(function(){
				var command = $(this).attr("class");
				switch (command) {
					case "font_size":
						$(this).next("div").slideToggle("fast");
						break;
					case "add_link":
						$(this).next("div").slideToggle("fast");
						break;
					default: 
						cammandOne($(this),command);
						break;
				}
			});

			$(".haoEditor .toolbar>div .confirm").click(function(){
				var command = $(this).parents(".toolBox").prev("a").attr("class");
				// cammandTwo($(this),command);
				setLink();
			});

			$(".haoEditor .toolbar .toolbuttons input").click(function() {
				$(this).parents(".toolBox").slideUp("fast");
			});
		}

		// 无需第二参数的指令
		function cammandOne(obj,command){
			command = vars[command][0];
			operation(command);
		}

		// 有二参数的指令
		function cammandTwo(obj,command){
			command = vars[command][0];
			var secondParam = obj.parent(".toolbuttons").prev("input").val();
			operation(command,secondParam);
		}
		function operation(command,secondParam){
			document.execCommand(command, false, secondParam);
		}

		// 获得选中对象
		function getSelection(){
			var selection = "";
			// Chrome
			if(document.getSelection){
				selection = document.getSelection();
			}
			//IE
			else{
				selection = document.selection;
			}
			
			return selection;
		}
		function setLink(){

		}
	}
})(jQuery);