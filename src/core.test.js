QUnit.module ("king")
QUnit.test( "Object", function( assert ) {
	var obj = king.NewObject();
	assert.equal(king.NameObject,obj.GetClassName(),"GetClassName");
	assert.ok(obj.IsClass(king.NameObject),"IsClass");

	var childName = "test child class";
	obj.Extend(childName,{
		Ok:function(){
			return true;
		},
		No:function(){
			return false;
		},
	});
	assert.ok(obj.Ok(),"Extend Ok");
	assert.notOk(obj.No(),"Extend No");

	assert.equal(childName,obj.GetClassName(),"Extend GetClassName");
	assert.ok(obj.IsClass(childName),"Extend IsClass");
});