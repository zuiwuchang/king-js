/*
	king.cookie 
	包提供了  對cookie操作的 封裝函數
	
	package	king.cookie
	
*/
king.cookie = king.cookie || {
	Set:function(name,value,path,second){
		var str = name + "="+ escape (value);
		if(path){
			str += ";path=" + path;
		}
		if(second){
			var date = new Date(); 
			date.setTime(date.getTime() + second * 1000);
			str += ";expires=" + date.toGMTString();
		}
		document.cookie = str;
	},
	Get:function(name){
		var array = document.cookie.split("; ");
		for(index in array){
			var key_value = array[index].split("=");
			if(key_value[0]==name){
				return unescape(key_value[1]);
			}
		}
		return null;
	},
	Erase:function(name){
		var date = new Date(); 
		date.setTime(date.getTime() -1);
		document.cookie = name + "=time out;expires=" + date.toGMTString();
	},
};
