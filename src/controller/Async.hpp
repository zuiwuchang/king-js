namespace king::controller{
	/** 
	*	\fn List king::controller::NewAsync()
	*
	*	\brief 創建一個 Async
	*/
	Async NewAsync();

	/**
	*	\class king::controller::Async
	*
	*	\brief 一個 用於將異步 代碼 轉化 同步寫法的組件
	*
	*	<script src="king-js/core.min.js"></script>\n
	*	<script src="king-js/controller/Async.min.js"></script>\n
	*	king.controller.NewAsync()
	*/
	class Async
	{
	public:
		/** 
		*	\return "none"\n "runing"\n "ok"\n "error"
		*
		*	\brief 返回 流程狀態
		*/
		string Status();

		/** 
		*	\param sync 流程回調函數 void (*)(Async,any ctx) 
		*	\param error 錯誤處理 回調函數 void (*)(any err,any ctx)
		*	\return this
		*
		*	\brief 增加一個 異步流程
		*
		*	\attention 如果定義了 錯誤回調 則只有當錯誤回調返回 真時 全局的 錯誤處理才會被調用
		*/
		Async Sync(func sync,func error);

		/** 
		*	\param channel 一個 json 對象
		*	\return this
		*
		*	\brief 通知執行下個流程
		*
		*	\attention channel.Content 作爲 ctx 參數 傳入到 下個流程 會 錯誤/完成 通知
		*	channel.Error 一旦爲 真 則流程 轉到 錯誤處理 則作爲 err 參數
		*/
		Async Notify({} channel);

		/** 
		*	\param obj 一個 json 對象
		*	\return this
		*
		*	\brief 開始執行 異步流程
		*
		*	\attention obj.Ok 是一個 void (*)(ctx) 函數 用於接收 流程完成通知\n
		*	obj.Error 是一個 void (*)(err,ctx) 函數 用於接收全局的 流程錯誤通知\n
		*	obj.End 是一個 void (*)(err,ctx) 函數 用於接收 流程結束通知\n\n
		*	obj.End 在 obj.Ok obj.Error 之後 執行\n\n
		*	obj.End 無論流程 成功否 都會被調用
		*/
		Async Do({} obj);
	};
};