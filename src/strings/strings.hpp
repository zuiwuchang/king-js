/**
*	\namespace king::strings
*	\brief	常見的 字符串 處理 函數
*
*	<script src="king-js/core.min.js"></script>\n
*	<script src="king-js/strings/strings.min.js"></script>
*/
namespace king::strings{
	/** 
	*	\param d 一個 Date 型別的 日期時間 對象
	*	\param fmt 格式化字符串\n
	*	y 年\n
	*	M 月\n
	*	d 日\n
	*	h 時\n
	*	m 分\n
	*	s 秒\n
	*	\return 格式化後的 字符串
	*
	*	\brief 將日期時間 以 fmt 格式化到 字符串 
	*/
	string FormatDate(Date d,string fmt);

	/**
	*	\brief 返回 str 是否是一個 ipv4 字符串
	*/
	bool IsIPv4(string str);

	/**
	*	\return 0 匹配成功\n
	*	10	沒有以 @ 分隔 用戶名 主機名\n
	*	11	出現 多個 @\n
	*	20	用戶名太短\n
	*	21	用戶名太長\n
	*	22	驗證用戶名 開始\n
	*	23	驗證用戶名 結尾\n
	*	24	多個 . 相連\n
	*	30	主機名錯誤\n
	*
	*	\brief 返回 str 是否是一個 gmail 郵件地址
	*/
	number MatchGMail(string str);

	/** 
	*	\brief 將字符串中的 html 保留字 轉義
	*/
	string HtmlEncode(string str);

	/** 
	*	\brief 將 HtmlEncode 解碼
	*/
	string HtmlDecode(string str);
};