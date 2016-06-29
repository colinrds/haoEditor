// (function($){
// 	$.fn.haoEditer = function(options){
		
// 	}
// })(jQuery);

$(function(){
	var vars = {
		bold:"Bold",
		italic:"Italic",
		text_left:"JustifyLeft",
		text_right:"JustifyRight",
		text_center:"JustifyCenter",
		h1:["FontSize","1"];
		h2:[]
	}
	$(".toolbar a").click(function(){
		var cammand = $(this)[0].className;
		cammand = vars[cammand];
		document.execCommand(cammand, false, false);
	});
});