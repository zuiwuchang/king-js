namespace king::controller{
	/** 
	*	\fn List king::controller::NewAsync2(function*())
	*
	*	\brief 創建一個 Async2
	*/
	Async2 NewAsync2(function*());

	/**
	*	\class king::controller::Async2
	*
	*	\brief 一個 用於將異步 代碼 轉化 同步的組件 使用了 es6
	*
	*	<script src="king-js/core.min.js"></script>\n
	*	<script src="king-js/controller/Async2.min.js"></script>\n
	*	king.controller.NewAsync2(function*())
	*
	*
	*
	*	\code
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
	*	\endcode
	*/
	class Async2
	{
	public:

		/** 
		*	\param callback 一個 func(err,data)  簽名的函數 用於接收 流程結束回調\n
		*		err 如果 流程因爲 Throw 而提前結束 err 保存 thorw 的錯誤\n
		*		data 如果流程 正常結束 data 保存 Generator 函數返回值
		*
		*	\brief 開始執行 異步流程
		*
		*	\attention 無論 流程是否 Throw callback 都會被調用
		*/
		void Do(func(err,data));

		/** 
		*	\brief 停止流程 並使 yield 拋出 err 異常
		*
		*	\param err	可選的 錯誤描述
		*/
		void Throw(err);

		/** 
		*	\brief 通知 當前流程 完成 進入下個流程  
		*
		*	\param data	作爲 yield 的返回值 返回
		*/
		void Notify(data);
	};
};