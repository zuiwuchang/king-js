/*
	核心功能實現
	必須在其它組件 之前 加載

	******
	Object
	所有 組件的 基類

	package	king
	new		NewObject()
*/
var king = king || {};
//所有組件的 基類 提供了 基本方法
king.NameObject = king.NameObject || "king.Object"
king.NewObject = king.NewObject || function(){
	//類名
	var className = king.NameObject;
	
	return {
		//返回 類名
		GetClassName:function(){
			return className;
		},

		//日誌打印
		isLog:false,
		trace:function(func,str){
		},
		log:function(func,str){
		},
		info:function(func,str){
		},
		error:function(func,str){
		},
		warn:function(func,str){
		},
		//擴展 子類
		Extend:function(name,obj){
			className = name;

			if(obj && obj.constructor == Object) {
				for(var key in obj){
					this[key] = obj[key];
				}
			}
		},
		//返回是否是 指定類的 實例
		IsClass:function(name){
			return className == name;
		},
	};
};
