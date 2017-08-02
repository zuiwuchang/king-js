#!/bin/bash
#Program:
# this program is king-js build scripts
#e-mail:
# zuiwuchang@gmail.com



echo "***	build begin	***"
declare -i pos
declare -a srcs
pos=0
function AddSource(){
	srcs[$pos]=$1
	pos=pos+1
}
function BuildOne(){
	echo "---	build $1	---"
	java -jar $CLOSURE_COMPILER --js ../src/$1.js --js_output_file ../lib/king-js/$1.min.js

	if test $? -ne 0; then
		exit $?
	fi
}
function Build(){
	for((i=0;i<pos;i=i+1))
	do
	BuildOne ${srcs[i]}
	done

	echo "***	build success	***"
}

AddSource "controller/Async2"
Build