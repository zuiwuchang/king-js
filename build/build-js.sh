#!/bin/bash
#Program:
# 用於將 revel view 中的 js 用 Google Closure Compiler 進行優化
#e-mail:
# zuiwuchang@gmail.com

#compatible win32 mingw ...
if [[ $ClosureCompiler == "" ]]
then
	if [[ $CLOSURECOMPILER == "" ]]
	then
		echo '$ClosureCompiler not set'
		exit 1
	fi
	ClosureCompiler=$CLOSURECOMPILER
fi



function ShowHelp(){
	echo "help		: show help"
	echo "clean rootpath	: rm all *.min.js"
	echo "build rootpath	: build *.js to *.min.js this is default"
}

function CleanFilter(){
	if [[ $1 == *.min.js ]]
	then
		echo "---	rm $1	---"
		rm $1

		ok=$?
		if [[ $ok != 0 ]];then
			exit $ok
		fi
	fi
}
function Clean(){
	if [[ $1 == "" ]]
	then
		ShowHelp
		exit 1
	fi

	echo "***	clean begin	***"
	find $1 -name '*.js' | while read file;do CleanFilter $file;done
	
	ok=$?
	if [[ $ok != 0 ]]
	then
		exit $ok
	fi

	echo "***	clean success	***"
}

function Build(){
	if [[ $1 == "" ]]
	then
		ShowHelp
		exit 1
	fi

	echo "***	build begin	***"
	find $1 -name '*.js' | while read file
	do 
		BuildFilter $file
		ok=$?
		if [[ $ok != 0 ]];then
			exit $ok
		fi
	done
	
	ok=$?
	if [[ $ok != 0 ]];then
		exit $ok
	fi

	echo "***	build success	***"
}
function BuildFilter(){
	if [[ $1 == *.min.js ]]
	then
		return
	fi
	if [[ $1 == *.test.js ]]
	then
		return
	fi

	declare -i len
	len=${#1}
	len=$len-3
	name=${1:0:len}

	echo "---	build $name.js	---"
	java -jar $ClosureCompiler --js $name.js --js_output_file $name.min.js 
}

ok=0
if [[ $1 == "build" ]];then 
	Build $2
	ok=$?
elif [[ $1 == "clean" ]];then
	Clean $2
	ok=$?
elif [[ $1 == "help" ]];then
	ShowHelp
	ok=$?
else
	ShowHelp
	ok=$?
fi

exit $ok