QUnit.module ("king.controller")
QUnit.test( "Async2", function( assert ) {
	king.controller.NewAsync2(function*(co){
		try{
			var sum = 0;
			assert.equal(sum,0,"sum == 0");

			sum += yield setTimeout(function(){
				co.Notify(1);
			},100);
			assert.equal(sum,1,"sum == 1");

			sum += yield setTimeout(function(){
				co.Notify(2);
			},100);
			assert.equal(sum,3,"sum == 3");

			sum += yield setTimeout(function(){
				co.Notify(3);
			},100);
			assert.equal(sum,6,"sum == 6");

			sum += yield setTimeout(function(){
				//co.Throw();
				co.Throw("throw test");
			},100);

			assert.ok(false,"not throw");
		}catch(e){
			assert.equal(e,"throw test","catch throw test");
		}

		return 1;
	}).Do(function(e,data){
		assert.equal(e,"throw test","Do throw test");
		assert.equal(data,undefined,"Do data undefined");
	});
});

QUnit.test( "Async2 (成功 返回數據)", function( assert ) {
	king.controller.NewAsync2(function*(co){
		try{
			var sum = 0;
			assert.equal(sum,0,"sum == 0");

			sum += yield setTimeout(function(){
				co.Notify(1);
			},100);
			assert.equal(sum,1,"sum == 1");

			sum += yield setTimeout(function(){
				co.Notify(2);
			},100);
			assert.equal(sum,3,"sum == 3");

			sum += yield setTimeout(function(){
				co.Notify(3);
			},100);
			assert.equal(sum,6,"sum == 6");

			
		}catch(e){
			assert.equal(e,"throw test","catch throw test");
		}

		return 1;
	}).Do(function(e,data){
		assert.equal(e,undefined,"Do throw test");
		assert.equal(data,1,"Do data 1");
	});
});
