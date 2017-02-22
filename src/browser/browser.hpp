/**
*	\namespace king::browser
*	\brief	瀏覽器相關
*
*	<script src="king-js/core.min.js"></script>\n
*	<script src="king-js/browser/browser.min.js"></script>\n
*/
namespace king::browser{
	/** 
	*	\brief 如果是 ie 返回 true
	*/
	bool IsIE();

	/** 
	*	\brief 如果是 netscape 返回 true
	*/
	bool IsNetscape();

	/** 
	*	\brief 如果 IE 版本 大於等於 10/Netscape 版本 大於等於 5 返回 true
	*/
	bool IsGood();
};