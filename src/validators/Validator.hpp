namespace king::validators{
	/** 
	*	\fn List king::validators::NewValidator()
	*
	*	\brief 創建一個 基礎的 數據驗證器
	*/
	Validator NewValidator();

	/**
	*	\class king::validators::Validator
	*
	*	\brief 一個 基礎的 數據驗證器
	*
	*	<script src="king-js/core.min.js"></script>\n
	*	<script src="king-js/validators/Validator.min.js"></script>\n
	*	king.validators.NewValidator()
	*/
	class Validator
	{
	public:
		/** 
		*
		*	\brief 驗證對象 接口
		*/
		class ValidatorInterface
		{
		public:
			/** 
			*	\brief 驗證對象 唯一標識
			*/
			number Id;

			/** 
			*	\brief 將 窗口值 設置到 變量 失敗返回 false
			*/
			bool ToVal();

			/** 
			*	\brief 將 變量值  設置到 窗口 失敗返回 false
			*/
			bool ToWindow();
		};
		/** 
		*
		*	\brief 註冊一個 驗證對象到 驗證器
		*/
		bool Bind(ValidatorInterface interface);

		/** 
		*
		*	\brief 刪除一個已經註冊的 驗證對象
		*/
		void UnBind(number id);

		/** 
		*	\brief 將 窗口值 設置到 變量 失敗返回 false
		*/
		bool ToVal();

		/** 
		*	\brief 將 變量值  設置到 窗口 失敗返回 false
		*/
		bool ToWindow();
	};
};