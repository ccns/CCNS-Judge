#!/bin/bash

compiler=$1
file=$2
out=$3
timelm=$4

if [ "$compiler" != "" ]; then
  $compiler $file
fi

if [ $? -eq 0 ]; then
  timeout $timelm $out < input > output_ans
  sig=$?
  if [ $sig -eq 124 ]; then
    echo TLE
  elif [ $sig -ne 0 ]; then
    echo RE
  else
    diff output output_ans > diff
    sig=$?
    if [ $sig -eq 0 ]; then
      echo AC
    else
      echo WA
    fi
  fi
else
  echo CE
fi
