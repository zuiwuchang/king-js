# king-js
孤實現的 js 組件

#如何使用
1 將lib/king-js 複製到項目

2 將 core.min.js 或 core.nolog.min.js 加入項目 core 必須在其它king組件之前被加載
  king組件 默認會打印 一些 信息到 console.log 以方便 調試 錯誤 如果需要關閉這一功能 則可以使用 core.nolog 替代 core
  
3 將 需要的 組件 js 加入 到項目

#編譯
build/build-all.sh 是一個 自動 編譯 的 bash 腳本 直接運行即可

build-all.sh 使用 google 提供的 closure-compiler.jar 編譯js 故需要 os自行安裝 好 java環境
(並且 需要將 closure-compiler.jar 設置到 環境變量 $CLOSURE_COMPILER

king@king-XXX-XXX ~ $ echo $CLOSURE_COMPILER

/opt/java/jar/closure-compiler-v20161201.jar
)

#api文檔
孤是一個懶惰的人 都沒有api文檔 然 孤會在 api的 實現源碼 中爲 api 標明功能

其次 所有組件 都有一個 組件名-test.js 的單元測試檔案 其中對組件的 所有api都進行了 調用可作參考
