#!/usr/bin/env bash

set -e

v v/cmd/v -o v.c

emcc -std=gnu11 -w -D__linux__ \
	placeholders.c v.c \
	-lm \
	-s 'EXTRA_EXPORTED_RUNTIME_METHODS=["callMain"]' \
	-s INVOKE_RUN=0 \
	--post-js index.js \
	--preload-file v/vlib@vlib \
	-o public/index.js \
	-O2
