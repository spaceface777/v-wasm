#!/usr/bin/env bash

set -e

emcc \
	-std=gnu11 -w -D__linux__ \
	placeholders.c vc/v.c \
	-lm \
	--post-js index.js \
	-s 'EXTRA_EXPORTED_RUNTIME_METHODS=["callMain"]' \
	-s INVOKE_RUN=0 \
	-o public/index.js
