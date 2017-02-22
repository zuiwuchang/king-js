namespace king::container{
	/** 
	*	\brief 創建一個 雙向鏈表 List
	*/
	List NewList();

	/**
	*	\class king::container::List
	*
	*	\brief 一個雙向 鏈表
	*
	*	<script src="king-js/core.min.js"></script>\n
	*	<script src="king-js/container/List.min.js"></script>\n
	*	king.container.NewList()
	*/
	class List
	{
	public:
		/** 
		*	\brief 鏈表 節點定義
		*/
		struct Element
		{
			/** 
			*	\brief 上一節點 或 null
			*/
			Element Prev;
			/** 
			*	\brief 下一節點 或 null
			*/
			Element Next;

			/** 
			*	\brief 節點數據
			*/
			any Value;
		}

		/** 
		*	\brief 返回鏈表 當前大小
		*/
		number Len();

		/** 
		*	\brief 返回鏈表 是否爲空
		*/
		bool Empty();

		/** 
		*	\param val 可以是任意值 其將被使用 = 添加到鏈表
		*
		*	\brief 在鏈表尾添加一個元素val
		*/
		void PushBack(any val);

		/** 
		*	\param val 可以是任意值 其將被使用 = 添加到鏈表
		*
		*	\brief 在鏈表頭 之前 添加一個元素val
		*/
		void PushFront(any val);

		/** 
		*	\brief 刪除鏈表 尾元素(如果存在的話)
		*/
		void PopBack();

		/** 
		*	\brief 刪除鏈表 頭元素(如果存在的話)
		*/
		void PopFront();

		/** 
		*	\brief 返回 尾部元素 Element  或 null
		*/
		Element Back();

		/** 
		*	\brief 返回 頭部元素 Element 或 null
		*/
		Element Front();

		/** 
		*	\brief 從鏈表中 刪除元素 element
		*/
		void Remove(Element element);

		/** 
		*	\brief 從鏈表中 刪除所有元素
		*/
		void Reset();

		/** 
		*	\param val 可以是任意值 其將被使用 = 添加到鏈表
		*	\param element 已經存在于鏈表中的一個 節點 
		*
		*	\brief 在 element 之後添加新節點 存儲 val
		*/
		void InsertAfter(any val,Element element);

		/** 
		*	\param val 可以是任意值 其將被使用 = 添加到鏈表
		*	\param element 已經存在于鏈表中的一個 節點 
		*
		*	\brief 在 element 之茜添加新節點 存儲 val
		*/
		void InsertBefore(any val,Element element);

		/** 
		*	\param call 回調函數 bool (*)(Element element)
		*
		*	\brief 對鏈表中所有元素 順序調用 call(element)
		*
		*	\attention 如果 call 返回值 爲真 則將停止遍歷
		*/
		void Do(func call);

		/** 
		*	\param call 回調函數 bool (*)(Element element)
		*
		*	\brief 對鏈表中所有元素 逆序調用 call(element)
		*
		*	\attention 如果 call 返回值 爲真 則將停止遍歷
		*/
		void DoReverse(func call);
	};
};