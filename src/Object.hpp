namespace king{
	/**
	*	\class king::Object
	*
	*	\brief 定義了組件的基本行爲
	*
	*	<script src="king-js/core.min.js"></script>\n
	*	king.NewObject()
	*/
	class Object
	{
	public:
		/** 
		*	\fn string Object::GetClassName()
		*
		*	\brief 返回 類的名稱 字符串
		*/
		string GetClassName();
		
		/** 
		*	\fn void Object::trace(string func,string str)
		*	\param func 當前函數名字符串
		*	\param str 要打印的內容
		*
		*	\brief 使用 console.trace 打印 日誌
		*
		*	在log版本中 調用 console.trace 打印 日誌
		*/
		void trace(string func,string str);

		/** 
		*	\fn void Object::log(string func,string str)
		*	\param func 當前函數名字符串
		*	\param str 要打印的內容
		*
		*	\brief 使用 console.log 打印 日誌
		*
		*	在log版本中 調用 console.log 打印 日誌
		*/
		void log(string func,string str);

		/** 
		*	\fn void Object::info(string func,string str)
		*	\param func 當前函數名字符串
		*	\param str 要打印的內容
		*
		*	\brief 使用 console.info 打印 日誌
		*
		*	在log版本中 調用 console.info 打印 日誌
		*/
		void info(string func,string str);

		/** 
		*	\fn void Object::error(string func,string str)
		*	\param func 當前函數名字符串
		*	\param str 要打印的內容
		*
		*	\brief 使用 console.error 打印 日誌
		*
		*	在log版本中 調用 console.error 打印 日誌
		*/
		void error(string func,string str);

		/** 
		*	\fn void Object::warn(string func,string str)
		*	\param func 當前函數名字符串
		*	\param str 要打印的內容
		*
		*	\brief 使用 console.warn 打印 日誌
		*
		*	在log版本中 調用 console.warn 打印 日誌
		*/
		void warn(string func,string str);

		/**
		*	\fn void Object::Extend(string name,{} obj)
		*	\param name 擴展後的類名
		*	\param obj 一個json對象 其屬性將被當前類獲取
		*
		*	\brief 將當前類 進行擴展
		*/
		void Extend(string name,{} obj);
	};
};