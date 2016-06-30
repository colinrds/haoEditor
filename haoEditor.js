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
			font_size:true,
			font_color:true,
			add_link:true,
			undo:true
		},options);

		var fontSize = [["Header1","1"],["Header2","2"],["Header3","3"],["Header4","4"],["Header4","4"],["Header5","5"],["Header6","6"],["Header7","7"]];
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
							var font_div = $("<div class='hao_formats'></div>");
								$.each(fontSize,function(index, font) {
									font_div.append("<a hao-formatsval="+font[1]+">"+ font[0] +"</a>")
								});
								tool_div.append(font_div);
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
			$(".toolbar a").click(function(){
				var cammand = $(this).attr("class");
				cammand = vars[cammand][0];
				console.log(cammand);

				document.execCommand(cammand, false, false);
			});
		}
	}
})(jQuery);

// $(function(){
// 	var vars = {
// 		bold:"Bold",
// 		italic:"Italic",
// 		text_left:"JustifyLeft",
// 		text_right:"JustifyRight",
// 		text_center:"JustifyCenter",
// 		font_size:"FontSize",
// 		font_color:"ForeColor",
// 		add_link:"CreateLink",
// 		undo:"Undo"
// 	}
// 	var support = {
// 		bold:true,
// 		bold:true,
// 		italic:true,
// 		text_left:true,
// 		text_right:true,
// 		text_center:true,
// 		font_size:true,
// 		font_color:true,
// 		add_link:true,
// 		undo:true
// 	}
// 	$(".toolbar a").click(function(){
// 		var cammand = $(this)[0].className;
// 		cammand = vars[cammand];
// 		document.execCommand(cammand, false, false);
// 	});
// });