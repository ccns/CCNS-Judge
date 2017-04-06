#!/bin/bash

compiler=$1
file=$2
out=$3

$compiler $file
$out < input
