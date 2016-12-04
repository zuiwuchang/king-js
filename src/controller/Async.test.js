QUnit.module ("king.controller")
QUnit.test( "Async", function( assert ) {
	//創建 實例
	var async = king.controller.NewAsync();
	//返回 狀態
	assert.equal(async.Status(),"none","Status");

	//註冊流程
	var sum = 0;
	async.Sync(function(){
		//邏輯 處理
		assert.equal(sum,0,"sync step 0");
		console.log(sum++);

		//異步功能模擬
		setTimeout(function(){
			//喚醒 下個流程
			async.Notify();
		},1000);
	}).Sync(function(){
		//邏輯 處理
		assert.equal(sum,1,"sync step 1");
		console.log(sum++);

		//異步功能模擬
		setTimeout(function(){
			//喚醒 下個流程
			async.Notify();
		},1000);
	}).Sync(function(){
		//邏輯 處理
		assert.equal(sum,2,"sync step 2");
		console.log(sum++);

		//異步功能模擬
		setTimeout(function(){
			//喚醒 下個流程
			async.Notify();
		},1000);
	}).Do({ //執行流程
		Ok:function(){
			assert.equal(sum,3,"sync ok");

		},
		//Error (err,ctx)
		//End (err,ctx)
	});
});
QUnit.test( "Async (流程 傳遞參數)", function( assert ) {
	var async = king.controller.NewAsync();
	assert.equal(async.Status(),"none","Status");
	async.Sync(function(){
		var ctx = {};
		ctx.sum = 0;
		assert.equal(ctx.sum,0,"sync step 0");
		console.log(ctx.sum++);

		setTimeout(function(){
			async.Notify({
				Content:ctx,//傳遞參數 到下個流程
			});
		},1000);
	}).Sync(function(async,ctx){
		assert.equal(ctx.sum,1,"sync step 1");
		console.log(ctx.sum++);
		setTimeout(function(){
			async.Notify({
				Content:ctx,//傳遞參數 到下個流程
			});
		},1000);
	}).Do({
		Ok:function(ctx){
			assert.equal(ctx.sum,2,"sync ok");
		},
		End:function(err,ctx){
			assert.equal(ctx.sum,2,"sync end");
			assert.equal(err,null,"sync end not error");
		},
	});
});
QUnit.test( "Async (流程中斷 傳遞錯誤)", function( assert ) {
	var async = king.controller.NewAsync();
	assert.equal(async.Status(),"none","Status");
	var sum = 0;
	async.Sync(function(){
		console.log("sync 0");
		++sum;
		setTimeout(function(){
			async.Notify({
				Error:"錯誤測試",
			});
		},1000);
	},function(err){//可選的 當前流程 錯誤處理
		//返回 true 使 全局的 錯誤處理依然被調用
		assert.equal(err,"錯誤測試","sync step 0 error");
		return true;
	}).Sync(function(async,ctx){
		assert.equal(ctx.sum,1,"sync step 1");
		console.log(sum++);
		setTimeout(function(){
			async.Notify();
		},1000);
	}).Do({
		Error:function(err,ctx){
			assert.equal(err,"錯誤測試","Do Error");
			assert.equal(ctx,null,"Do Error ctx null");
		},
		End:function(err,ctx){
			assert.equal(err,"錯誤測試","Do End");
			assert.equal(ctx,null,"Do End ctx null");
		},
	});
});