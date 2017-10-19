#!/bin/bash

compiler=$1
file=$2
out=$3

if [ "$compiler" = "" ]; then
  $out < input
else
  $compiler $file
  $out < input
fi

