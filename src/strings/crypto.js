/*
	king.strings 
	包提供了 常見的 字符串 處理 函數
	
	package	king.strings
	
	包含一些字符串 加密解密 函數
*/
(function(g){
"use strict";
var king = g.king;

king.strings = king.strings || {};
var pkg = king.strings;

//將字符串中的 html 保留字 轉義
pkg.HtmlEncode = pkg.HtmlEncode || function(str){
	if (!str || str.length == 0){
		return "";
	}
	str = str.replace(/&/g, "&amp;");
	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/ /g, "&nbsp;");
	str = str.replace(/\'/g, "&#39;");
	str = str.replace(/\"/g, "&quot;");
	return str;
};
//將 HtmlEncode 解碼
pkg.HtmlDecode = pkg.HtmlDecode || function(str){
	if (!str || str.length == 0){
		return "";
	}
	str = str.replace(/&amp;/g, "&");
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/&nbsp;/g, " ");
	str = str.replace(/&#39;/g, "\'");
	str = str.replace(/&quot;/g, "\"");
	return str;
};
})(this);