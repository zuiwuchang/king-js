QUnit.module ("king.strings")
QUnit.test( "IsIPv4", function( assert ) {
	var strings = king.strings;
	assert.ok(strings.IsIPv4("127.0.0.1"),"true 127.0.0.1");
	assert.ok(strings.IsIPv4("0.0.0.0"),"true 0.0.0.0");
	assert.ok(strings.IsIPv4("255.255.255.255"),"true 255.255.255.255");

	assert.notOk(strings.IsIPv4("127.0.0.256"),"false 127.0.0.256");
	assert.notOk(strings.IsIPv4("127.a.0.1"),"false 127.a.0.1");
	assert.notOk(strings.IsIPv4("127.00.0.1"),"false 127.00.0.1");
	assert.notOk(strings.IsIPv4("127.0.0.0.1"),"false 127.0.0.0.1");

	assert.notOk(strings.IsIPv4(1),"false 1");
	assert.notOk(strings.IsIPv4(),"false undefined");
	
});

QUnit.test( "MatchGMail", function( assert ) {
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


	var strings = king.strings;

	var str = "king.zuiwuchang@gmail.com"
	assert.equal(strings.MatchGMail(str),matchOk,"matchOk " + str);
	str = "zuiwuchang@--kl._.1.com"
	assert.equal(strings.MatchGMail(str),matchOk,"matchOk " + str);

	str = "zuiwuchang@"
	assert.equal(strings.MatchGMail(str),matchSplitLess,"matchSplitLess " + str);
	str = "zuiwuch@ang@"
	assert.equal(strings.MatchGMail(str),matchSplitMore,"matchSplitMore " + str);
	str = ".zuiwuch@ang"
	assert.equal(strings.MatchGMail(str),matchUserBegin,"matchUserBegin " + str);
	str = "1234567890123456789012345678901@ang"
	assert.equal(strings.MatchGMail(str),matchUserLenMore,"matchUserLenMore " + str);
	str = "king@ang"
	assert.equal(strings.MatchGMail(str),matchUserLenLess,"matchUserLenLess " + str);
	str = "k.i.n.g@ang"
	assert.equal(strings.MatchGMail(str),matchUserLenLess,"matchUserLenLess " + str);
	str = "zuiwuch.@ang"
	assert.equal(strings.MatchGMail(str),matchUserEnd,"matchUserEnd " + str);
	str = "zuiwu..ch@ang"
	assert.equal(strings.MatchGMail(str),matchUserPointLink,"matchUserPointLink " + str);

	str = "zuiwuchang@kl..1.com"
	assert.equal(strings.MatchGMail(str),matchNameError,"matchNameError " + str);
	
	str = "zuiwuchang@.kl.1.com"
	assert.equal(strings.MatchGMail(str),matchNameError,"matchNameError " + str);
});
QUnit.test( "crypto html", function( assert ) {
	var strings = king.strings;
	assert.equal(strings.HtmlEncode(""),"",'HtmlEncode("")');
	assert.equal(strings.HtmlDecode(""),"",'HtmlDecode("")');

	var old = "include <iostream>\n\'-\"";
	var ok = "include&nbsp;&lt;iostream&gt;\n&#39;-&quot;"
	var en = strings.HtmlEncode(old);
	assert.equal(en,ok,"HtmlEncode " + old);
	var dec = strings.HtmlDecode(en);
	assert.equal(en,ok,"HtmlDecode " + en);
});