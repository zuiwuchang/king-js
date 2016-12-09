/*
	List 
	一個 類似 golang container/list 的 雙向鍊錶

	package	king.container
	new		NewList


	//List 節點
	Element = {
		Prev:prev,
		Next:next,
		Value:val,
	};
*/
king.container = king.container || {};
king.container.NameList = king.container.NameList || "king.container.List";
king.container.NewList = king.container.NewList || function(){
	/***	設置包名	***/
	var pk = king.container;
	/***	創建 父類實例	***/
	var newObj = king.NewObject();

	/***	私有數據定義	***/
	var privateObj = {
		Size:0,		//鏈表大小
		Back:null,	//尾節點
		Front:null,	//頭節點
	};
	//創建 新節點
	var newElement = function(prev,next,val){
		return {
			Prev:prev,
			Next:next,
			Value:val,
		}
	};
	/***	派生子類	***/
	newObj.Extend(pk.NameList,
	{
		//返回 鍊錶 大小
		Len:function(){
			return privateObj.Size;
		},
		//返回鍊錶是否為空
		Empty:function(){
			return privateObj.Size == 0;
		},
		//在尾部 壓入元素
		PushBack:function(v){
			var _ctx = privateObj;

			var node = _ctx.Back;
			if(node){
				var back = newElement(node,null,v);
				node.Next = back;
				_ctx.Back = back;
			}else{
				node = newElement(null,null,v);
				_ctx.Back = node;
				_ctx.Front = node;
			}
			++_ctx.Size;
		},
		//在頭部 壓入元素
		PushFront:function(v){
			var _ctx = privateObj;

			var node = _ctx.Front;
			if(node){
				var front = newElement(null,node,v);
				node.Prev = front;
				_ctx.Front = front;
			}else{
				node = newElement(null,null,v);
				_ctx.Back = node;
				_ctx.Front = node;
			}
			++_ctx.Size;
		},
		//彈出尾部元素(如果存在的話)
		PopBack:function(){
			var _ctx = privateObj;

			var back = _ctx.Back;
			//empty
			if(!back){
				return;
			}

			//one element
			if(_ctx.Size == 1){
				_ctx.Size = 0;
				_ctx.Back = null;
				_ctx.Front = null;
				return;
			}

			//greater than 1
			--_ctx.Size;
			var element = back.Prev;
			element.Next = null;
			_ctx.Back = element
		},
		//彈出頭部元素(如果存在的話)
		PopFront:function(){
			var _ctx = privateObj;

			var front = _ctx.Front;
			//empty
			if(!front){
				return;
			}

			//one element
			if(_ctx.Size == 1){
				_ctx.Size = 0;
				_ctx.Back = null;
				_ctx.Front = null;
				return;
			}

			//greater than 1
			--_ctx.Size;
			var element = front.Next;
			element.Prev = null;
			_ctx.Front = element
		},

		//返回 尾部元素 Element
		Back:function(){
			return privateObj.Back;
		},
		//返回 頭部元素 Element
		Front:function(){
			return privateObj.Front;
		},
		//刪除 指定 元素
		Remove:function(element){
			if(!element){
				return;
			}

			var _ctx = privateObj;

			--_ctx.Size;
			var prev = element.Prev;
			var next = element.Next;
			
			if(prev){
				prev.Next = next;
			}else{
				_ctx.Front = next;
			}

			if(next){
				next.Prev = prev;
			}else{
				_ctx.Back = prev;
			}
		},

		//刪除所有 元素
		Reset:function(){
			var _ctx = privateObj;

			_ctx.Size = 0;
			_ctx.Back = null;
			_ctx.Front = null;
		},
		//在指定元素後 添加元素
		InsertAfter:function(val,element){
			if(!element){
				this.PushBack(val);
				return;
			}
			var _ctx = privateObj;

			++_ctx.Size;
			
			var next = element.Next;
			var new_element = newElement(element,next,val);
			if(next){
				next.Prev = new_element;
			}else{
				_ctx.Back = new_element;
			}
			element.Next = new_element;
		},
		//在指定元素前 添加元素
		InsertBefore:function(val,element){
			if(!element){
				this.PushFront(val);
				return;
			}
			var _ctx = privateObj;

			++_ctx.Size;

			var prev = element.Prev;
			var new_element = newElement(prev,element,val);
			
			if(prev){
				prev.Next = new_element;
			}else{
				_ctx.Front = new_element;
			}
			element.Prev = new_element;
		},
		//對所有 元素 進行回調(返回 true 停止 遍歷)
		Do:function(call){
			if(!call || typeof(call) != "function"){
				this.error("Do","Do(call) \tcall must be a function(element)");
				return;
			};

			for(var iter = privateObj.Front;iter!=null;iter=iter.Next){
				if(call(iter)){
					return;
				}
			}
		},
		//對所有 元素 逆向進行回調
		DoReverse:function(call){
			if(!call || typeof(call) != "function"){
				this.error("DoReverse","DoReverse(call) \tcall must be a function(element)");
				return;
			};
			for (var iter = privateObj.Back;iter!=null;iter=iter.Prev) {
				if(call(iter)){
					return;
				}
			}
		},
	}
	);
	return newObj;
};
