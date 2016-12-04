/*
	Async
	一個 用於將異步 代碼 轉化 同步的組件

	package	king.controller
	new		NewAsync()

	使用

*/
king.controller = king.controller || {};
king.controller.NameAsync = king.controller.NameAsync || "king.controller.Async"
king.controller.NewAsync = king.controller.NewAsync || function(){
	/***	設置包名	***/
	var pk = king.controller;
	/***	創建 父類實例	***/
	var newObj = king.NewObject();

	/***	私有數據定義	***/
	//定義 狀態
	var _STATUS_NONE = "none";
	var _STATUS_RUNING = "runing";
	var _STATUS_OK = "ok";
	var _STATUS_ERROR = "error";
	var _status = _STATUS_NONE;

	//保存流程
	var _funcs = [
		/*{
			Func:...,//流程函數
			OnError:...,//錯誤處理函數
		},*/
	];
	var _n = 0;	//當前 流程進度

	//回調通知
	var _funcOk;
	var _funcEnd;
	var _funcError;
	var _funcErrorAll;

	/***	派生子類	***/
	newObj.Extend(pk.NameAsync,
	{
		//返回 流程 狀態
		Status:function(){
			return _status;
		},
		//增加一個 流程
		Sync:function(funcSync,funcError){
			var funcs = _funcs;
			funcs.push({
				Func:funcSync,
				OnError:funcError,
			});
			return this;
		},
		//通知 執行下個流程
		Notify:function(channel){
			if(_status != _STATUS_RUNING){
				this.log("Notify","Async not runing");
				return this;
			}
			if(!channel){
				channel = {};
			}

			var err = channel.Error;
			var ctx = channel.Content;
			if(!ctx){
				ctx = null;
			}
			//流程錯誤
			if(err){
				_status = _STATUS_ERROR;

				//通知 錯誤處理
				var funcError = _funcError;
				var nextError = true;
				if(funcError){
					nextError = funcError(err,ctx);
				}
				//通知 全局 錯誤 處理
				if(nextError && _funcErrorAll){
					_funcErrorAll(err,ctx);
				}
				//通知 流程結束
				if(_funcEnd){
					_funcEnd(err,ctx);
				}
				return;
			}else{
				err = null;
			}

			var funcs = _funcs;
			var len = funcs.length;
			if(len > _n){
				//執行 流程
				var obj = funcs[_n];
				_funcError = obj.OnError;
				obj.Func(this,channel.Content);
				++_n;
			}else{
				//所有流程 執行完成 發送 成功 通知
				_status = _STATUS_OK;
				if(_funcOk){
					_funcOk(ctx);
				}

				if(_funcEnd){
					_funcEnd(err,ctx);
				}
			}

			return this;
		},
		//開始 執行 流程
		Do:function(obj){
			if(_status != _STATUS_NONE){
				this.log("Notify","Async status must be none");
				return this;
			}
			_status = _STATUS_RUNING;

			if(!obj){
				obj = {};
			}
			_funcOk = obj.Ok;
			_funcEnd = obj.End;
			_funcErrorAll = obj.Error;
			this.Notify({});

			return this;
		},
	}
	);
	return newObj;
};