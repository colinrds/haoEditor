var browser={
	versions:function(){
		var u = navigator.userAgent;
		return { //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase();
}


//
function to_top(){

}


// 上传图片
function handleFiles(files) {
    if (files.length) {
    	var file = files[0];
        var reader = new FileReader();
        if (/text\/\w+/.test(file.type)) {
            reader.readAsText(file);
        }else if(/image\/\w+/.test(file.type)){
            reader.onload=function(e){
            	var $this = this;
                $.post(urlRoot+'index.php?do=common&act=editUserImg', {avatar: e.target.result,uid:uid,accessToken:accessToken},function(data)
	                 $(".upload-pic").attr("src",$this.result);
	            },'json');  
            }
            reader.readAsDataURL(file);
        }
    }
}


// 格式化时间
function formatDate(format,time){
	var date = time ? new Date(time) : new Date();
	var ff = "";
	var week = ["日","一","二","三","四","五","六"];
	if(format){
		ff = format;
		ff = ff.replace("yyyy", date.getFullYear());
		ff = ff.replace("MM", returnTime(date.getMonth() + 1));
		ff = ff.replace("dd", returnTime(date.getDate()));
		ff = ff.replace("hh", returnTime(date.getHours()));
		ff = ff.replace("mm", returnTime(date.getMinutes()));
		ff = ff.replace("ss", returnTime(date.getSeconds()));
		ff = ff.replace("ww", '周' + week[date.getDay()]);
		ff = ff.replace("WW", '星期' + week[date.getDay()]);
	}
	function returnTime(date){
		return date < 10 ? "0" + date :　date;
	}
	return ff;
}


//获得地址栏参数
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 