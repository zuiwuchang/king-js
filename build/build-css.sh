#!/bin/bash
#Program:
# 用於將 revel view 中的 css 用 YUI Compressor 進行壓縮
#e-mail:
# zuiwuchang@gmail.com


function ShowHelp(){
	echo "help				: show help"
	echo "clean		rootpath	: rm all *.min.css"
	echo "build		rootpath	: build *.css to *.min.css"
	echo "build-one	csspath		: build a css file to *.min.css"
	echo "build-css	src dist	: build src to dist"
}

function CleanFilter(){
	if [[ $1 == *.min.css ]]
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
	find $1 -name '*.css' | while read file;do CleanFilter $file;done
	
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
	find $1 -name '*.css' | while read file
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
function BuildOne(){
	if [[ $1 == "" ]]
	then
		ShowHelp
		exit 1
	fi

	if [[ $1 != *.css ]]
	then
		echo "csspath must is *.css"
		exit 1
	fi

	echo "***	build-one begin	***"
	BuildFilter $1
	ok=$?
	if [[ $ok != 0 ]];then
		exit $ok
	fi
	echo "***	build-one success	***"
}
function BuildCss(){
	if [[ $1 == "" ]]
	then
		echo "need srcfile"
		exit 1
	elif [[ $2 == "" ]]
	then
		echo "need distfile"
		exit 1
	fi

	echo "***	build-css begin	***"
	echo "---	build $1	---"
	java -jar $YUI_COMPRESSOR $1 --type css -o $2 --charset utf-8
	ok=$?
	if [[ $ok != 0 ]];then
		exit $ok
	fi
	echo "***	build-css success	***"
}
function BuildFilter(){
	if [[ $1 == *.min.css ]]
	then
		return
	fi

	declare -i len
	len=${#1}
	len=$len-4
	name=${1:0:len}

	echo "---	build $name.css	---"
	java -jar $YUI_COMPRESSOR $name.css --type css -o $name.min.css --charset utf-8
}

ok=0
if [[ $1 == "build" ]];then 
	Build $2
	ok=$?
elif [[ $1 == "build-one" ]];then
	BuildOne $2
	ok=$?
elif [[ $1 == "build-css" ]];then
	BuildCss $2 $3
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