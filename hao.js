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
	language:(navigator.browserLanguage || navigator.language)
}

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
                $.post(urlRoot+'index.php?do=common&act=editUserImg', {avatar: e.target.result,uid:uid,accessToken:accessToken},function(data){
                	if(data["error"] == 0){
	                 	$(".upload-pic").attr("src",$this.result);
	                 		layer.open({
							    content: '图片上传成功',
							    style: 'background-color:#FFF; color:#425580; border:none;',
							    time: 1
							});
	                 }else{
	                 	layer.open({
							    content: data["content"],
							    style: 'background-color:#FFF; color:#425580; border:none;',
							    time: 1
							});
	                 }
	            },'json');  
            }
            reader.readAsDataURL(file);
        }
    }
}