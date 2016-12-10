/*
	Validator 
	一個 數據 驗證器 可用於 驗證 數據 輸入 
	
	package	king.validators
	new		NewValidator
		
	(
		Validator 未實現 任何 數據的 驗證 設置 這些 操作 由 用戶提供的
		ValidatorObject 對象 實現
		Validator 只是 將 多個 ValidatorObject 整合到一起
	)

	ValidatorObject 用戶 實現的 驗證方案
	{
		Id:唯一標識符 用於和 其它 ValidatorObject 區分
		ToVal: func(this) 驗證 輸入數據 失敗 返回 false
		ToWindow:func(this) 將數據 更新到 出口 失敗 返回 false
	}
*/

(function(g){
"use strict";
var king = g.king;

king.validators = king.validators || {};
king.validators.NameValidator = king.validators.NameValidator || "king.validators.Validator";
//創建一個 驗證器
king.validators.NewValidator = king.validators.NewValidator || function(){
	/***	設置包名	***/
	var pk = king.validators;
	/***	創建 父類實例	***/
	var newObj = king.NewObject();

	/***	私有數據定義	***/
	//保存驗證器
	var _validators = {};
	
	/***	派生子類	***/
	newObj.Extend(pk.NameValidator,
	{
		//將 驗證對象 綁定到 驗證器
		Bind:function(validator){
			if(!this.CheckValidator(validator)){
				this.error("Bind","params is not ValidatorObject");
				return false;
			}
			_validators[validator.Id] = validator;
			return true;
		},
		//檢測 是否 是 ValidatorObject 對象
		CheckValidator(obj){
			if(!obj){
				return false;
			}
			if(obj.constructor != Object){
				return false;
			}

			var id = obj.Id;
			var str = typeof(id);

			if(str == "string" && id != ""){
				return true;
			}
			if(str == "number" && !isNaN(id)){
				return true;
			}
			return false;
		},
		//刪除 驗證器
		UnBind:function(id){
			delete obj[id];
		},

		//調用 ValidatorObject 的 ToVal 方法
		//如果 所有 ToVal 都返回 true 返回 true 否則 返回 false
		ToVal:function(){
			for (var key in _validators) {
				var obj = _validators[key];
				var func = obj.ToVal;
				if(typeof(func) == "function"){
					if(!func.bind(obj)()){
						return false;
					}
				}
			}
			return true;
		},
		//調用 ValidatorObject 的 ToWindow 方法
		ToWindow:function(){
			for (var key in _validators) {
				var obj = _validators[key];
				var func = obj.ToWindow;
				if(typeof(func) == "function"){
					if(!func.bind(obj)()){
						return false;
					}
				}
			}
			return true;
		},
	}
	);
	return newObj;
};

})(this);