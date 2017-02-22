/**
*	\namespace king::cookie
*	\brief	瀏覽器相關
*
*	<script src="king-js/core.min.js"></script>\n
*	<script src="king-js/cookie/cookie.min.js"></script>\n
*/
namespace king::cookie{
	/** 
	*	\param name cookie 名稱
	*	\param value cookie 值
	*	\param path cookie 路徑 默認當前頁面
	*	\param second cookie 有效時間 單位 毫秒
	*
	*	\brief 始終一個cookie
	*/
	void Set(string name,string value,string path,number second);

	/** 
	*	\brief 返回一個名稱爲 name 的 cookie 值 或 null
	*/
	string Get(string name);

	/** 
	*	\param name cookie 名稱
	*	\param path cookie 路徑 默認 當前路徑
	*	\brief 刪除指定路徑的 cookie
	*/
	void Erase(string name,string path);
};