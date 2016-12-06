QUnit.module ("king.cookie")
QUnit.test( "cookie", function( assert ) {
	var cookie = king.cookie;

	cookie.Set("king-cookie-test","123"/*,path,second*/);
	assert.ok(cookie.Get("king-cookie-test") == "123" ,"Set And Get");

	cookie.Erase("king-cookie-test");
	assert.ok(cookie.Get("king-cookie-test") == null,"Erase");

	assert.ok(cookie.Get("king-cookie-test-null") == null,"null Get not found");
	
});