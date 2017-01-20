QUnit.module ("king.strings")
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
