/*
	king.strings 
	包提供了 常見的 字符串 處理 函數
	
	package	king.strings
	
*/
(function(g){
"use strict";
var king = g.king;

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
};

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
};

//如果符合 google gmail 格式 返回 0 否則 返回錯誤代碼
/*
	用戶名@主機名

	用戶名
		字符[a-zA-Z0-9]長度爲 [6,30] 
		以 [a-zA-Z0-9] 開始 結束
		中間只能是 [a-zA-Z0-9\.] 且 . 和 . 不能相連

	域名
		以 .[a-zA-Z]{2,} 結尾
		不能以 . 開頭 且 . 不能相連
		由 [a-zA-Z0-9\-_\.]組成
*/
king.strings.MatchGmail = king.strings.IsEmail || function(str){
	//匹配 成功
	var matchOk = 0;
	
	//匹配 用戶名@主機名
	var matchSplitLess = 10;	//沒有以 @ 分隔 用戶名 主機名
	var matchSplitMore = 11;	//出現 多個 @

	//匹配用戶名
	var USER_MIN_LEN = 6;
	var USER_MAX_LEN = 30;
	var matchUserLenLess = 20;	//用戶名太短
	var matchUserLenMore = 21;	//用戶名太長
	var matchUserBegin = 22;	//驗證用戶名 開始
	var matchUserEnd = 23;		//驗證用戶名 結尾
	var matchUserPointLink = 24;	//多個 . 相連

	//匹配主機名
	var matchNameError = 30;

	//matchSplite
	var strs = str.split("@");
	var len = strs.length;
	if(len < 2){
		return matchSplitLess;
	}else if(len > 2){
		return matchSplitMore;
	}else if(strs[0] == "" || strs[1] == ""){
		return matchSplitLess;
	}

	//matchUser
	var matchUser = function(user){
		if(user.length < USER_MIN_LEN){
			return matchUserLenLess;
		}else if(user.length > USER_MAX_LEN){
			return matchUserLenMore;
		}
		if(!/^[a-zA-Z0-9]/.test(user)){
			return matchUserBegin;
		}
		if(!/[a-zA-Z0-9]$/.test(user)){
			return matchUserEnd;
		}
		if(user.indexOf("..") != -1){
			return matchUserPointLink;
		}
		//字符長度
		var len = user.length;
		for (var i = 0; i < user.length; i++) {
			if(user[i] == "."){
				--len;
			}
		}
		if(len<USER_MIN_LEN){
			return matchUserLenLess;
		}
		return matchOk;
	};
	var rs = matchUser(strs[0]);
	if(rs != matchOk){
		return rs;
	}
	var matchHostName = function(name){
		if(!/^[a-zA-Z0-9\-_][a-zA-Z0-9\-_\.]*\.[a-zA-Z0-9]{2,}$/.test(name)){
			return matchNameError;
		}
		if(name.indexOf("..") != -1){
			return matchNameError;
		}
		return matchOk;
	};
	return matchHostName(strs[1]);
};

})(this);