/*
	包提供了  對browser檢測 封裝函數
*/
(function(g){
"use strict";
var king = g.king;
king.browser = king.browser || {
	//返回 瀏覽器 是否是 微軟的 IE 
	IsIE: function(){
		return navigator.appName == "Microsoft Internet Explorer";
	},

	//返回 瀏覽器 是否是 Netscape
	IsNetscape:function(){
		return navigator.appName == "Netscape";
	},

	/*
		如果 IE 版本 大於 9 (不包括9)
		如果 Netscape 版本 大於等於 5
		返回 true
	*/
	IsGood:function(){
		var b_version = navigator.appVersion;
		var version = parseFloat(b_version);

		if(this.IsIE()){
			if(version>=5){
				if(!/MSIE 9/.test(b_version)){
					return true;	
				}
			}
		}else if(this.IsNetscape()){
			if(version>=5){
				return true;
			}
		}
		return false;
	},
};

})(this);