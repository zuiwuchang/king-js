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