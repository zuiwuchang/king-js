/*
	king.strings 
	包提供了 常見的 字符串 處理 函數
	
	package	king.strings
	
*/
king.strings = king.strings || {};

//將日期 Date 轉化爲指定格式的 字符串
king.strings.FormatDate = king.strings.FormatDate || function(d,fmt){
	var o = {
		"M+": d.getMonth() + 1, //月
		"d+": d.getDate(), //日
		"h+": d.getHours(), //小時 
		"m+": d.getMinutes(), //分 
		"s+": d.getSeconds(), //秒 
		"q+": Math.floor((d.getMonth() + 3) / 3), //季度 
		"S": d.getMilliseconds() //毫秒 
	};

	if(/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,
			(d.getFullYear() + "").substr(4 - RegExp.$1.length)
			);
	}
	for(var k in o){
		if(new RegExp("(" + k + ")").test(fmt)){
			fmt = fmt.replace(RegExp.$1,
				(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

//驗證 是否是 ipv4
king.strings.IsIPv4 = king.strings.IsIPv4 || function(ip){
	if(!ip){
		return false;
	}
	if(typeof(ip) != "string"){
		return false;
	}

	var isRange = function(str){
		if(str.length == 2 && str[0] == "0"){
			return false;
		}else if(str.length == 3){
			if(str[0] == "0"){
				return false;
			}
			return parseInt(str) < 256;
		}
		return true;
	};
	if(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ip)){
		var arrs = [RegExp.$1,RegExp.$2,RegExp.$3,RegExp.$4];
		return isRange(arrs[0]) && isRange(arrs[1]) && isRange(arrs[2]) && isRange(arrs[3]);
	}
	return false;
}