QUnit.module ("king.validators")
QUnit.test( "Validator", function( assert ) {
	var v1 = king.validators.NewValidator();
	assert.notOk(v1.Bind({}),"false Bind{}");
	assert.notOk(v1.Bind({Id:""}),"false Bind{Id:''}");
	assert.notOk(v1.Bind([]),"false Bind[]");

	
	var wVals = [1,2,3];
	var vVals = [0,0,0];
	var id = 0;
	assert.ok(v1.Bind({
		Id:id++,
		ToVal:function(){
			if(wVals[0] < 10){
				return false;
			}
			vVals[0] = wVals[0];
			return true;
		}
	}),"true Bind{Id,ToVal}");
	assert.ok(v1.Bind({
		Id:id++,
		ToVal:function(){
			if(wVals[1] < 10){
				return false;
			}
			vVals[1] = wVals[1];
			return true;
		}
	}),"true Bind{Id,ToVal}");
	assert.ok(v1.Bind({
		Id:id++,
		ToVal:function(){
			if(wVals[2] < 10){
				return false;
			}
			vVals[2] = wVals[2];
			return true;
		}
	}),"true Bind{Id,ToVal}");

	assert.notOk(v1.ToVal(),"false ToVal");
	for (var i = 0; i < vVals.length; i++) {
		assert.ok(vVals[i] == 0,"");
	}

	for (var i = 0; i < wVals.length; i++) {
		wVals[i] += 100;
	}
	assert.ok(v1.ToVal(),"true ToVal");
	for (var i = 0; i < vVals.length; i++) {
		assert.ok(vVals[i] == wVals[i],"");
	}
});