#!/usr/bin/env bash

set -e

emcc \
	-std=gnu11 -w -D__linux__ \
	placeholders.c vc/v.c \
	-lm \
	--post-js index.js \
	-s 'EXTRA_EXPORTED_RUNTIME_METHODS=["addOnPostRun"]' \
	-o public/index.js
