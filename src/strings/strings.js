/*
	strings 提供了 常見的 字符串 處理 函數
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