/*
	Async2
	一個 用於將異步 代碼 轉化 同步的組件 使用了 es6

	package	king.controller
	new		NewAsync2(Generator)

	使用

*/
(function(g){
"use strict";
var king = g.king;

king.controller = king.controller || {};
king.controller.NameAsync2 = king.controller.NameAsync2 || "king.controller.Async2";
king.controller.NewAsync2 = king.controller.NewAsync2 || function(gen){
	/***	設置包名	***/
	var pk = king.controller;
	/***	創建 父類實例	***/
	var newObj = king.NewObject();

	/***	私有數據定義	***/
	
	//Generator
	var _gen = gen(newObj);

	//流程 結束時 回調
	var _callback;
	

	//輔助函數 進入下個 流程
	//data	yield 返回值
	//err	如果爲 true 拋出異常 終止流程  
	var next = function(err,data){
		if(err) {
			_gen.throw(err);
			if(_callback){
				_callback(err);
			}
			return;
		} 

		//執行 next
		var res = _gen.next(data);
		
		if(res.done){
			//通知 所有流程 執行完
			if(_callback){
				_callback(null,res.value);
			}
		} 
	};

	/***	派生子類	***/
	newObj.Extend(pk.NameAsync2,
	{
		//執行 流程
		//callback	可選參數 流程結束 回調
		Do:function(callback){
			_callback = callback;
			next();
		},
		//停止流程 並使 yield 拋出 err 異常
		Throw:function(err){
			if(!err){
				next("kill async");
				return;
			}
			next(err);
		},
		//通知 當前流程 完成 進入下個流程  
		//將 data 作爲 yield 的返回值 返回
		Notify:function(data){
			next(null,data);
		},
	}
	);
	return newObj;
};

})(this);