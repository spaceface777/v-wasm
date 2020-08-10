import os

const (
	v_dir     = 'C:\\Users\\Raulete\\Desktop\\v' // './v'
	tmp_dir   = 'tmp_vlib'
	emcc_opts = '-std=gnu11 -w -D__linux__ -lm -s ENVIRONMENT=web -s EXTRA_EXPORTED_RUNTIME_METHODS=["callMain"] -s INVOKE_RUN=0 -s ALLOW_MEMORY_GROWTH=1 --no-heap-copy --preload-file "$tmp_dir@vlib" -O3 placeholders.c'
)

fn should_remove(file string) bool {
	if !file.ends_with('.v') || file.ends_with('.c.v') || file.ends_with('_c.v') || file.ends_with('_test.v') {
		return true
	}
	return false
}

fn clean_vlib() {
	println('Cleaning vlib...')
	os.rmdir_all(tmp_dir)

	os.mkdir(tmp_dir)
	os.cp_all('$v_dir/vlib', tmp_dir, true)
	os.walk(tmp_dir, fn (file string) {
		dir := os.base_dir(file)
		if should_remove(file) { os.rm(file) }
		if os.is_dir_empty(dir) { os.rmdir(dir)	}
	})
	os.rmdir_all('$tmp_dir/v/tests')
}

fn compile_vc() {
	println('Compiling v.c...')
	os.system('v $v_dir/cmd/v -os linux -o v.c')
	println('Compiling vfmt.c...')
	os.system('v $v_dir/cmd/tools/vfmt.v -os linux -o vfmt.c')
}

fn build_wasm(in_file, out_file string) {
	println('Compiling $in_file to wasm...')
	os.system('emcc $emcc_opts $in_file --post-js $out_file -o public/$out_file')
}

const ( fmt_path  = 'public/fmt' )
fn cleanup() {
	println('Cleaning up...')
	f := os.read_file('${fmt_path}.js') or { panic(err) }
	os.write_file('${fmt_path}.js', f.replace('fmt.data', 'index.data'))
	os.rm('${fmt_path}.data')
	os.rmdir_all(tmp_dir)
}

fn main() {
	clean_vlib()
	compile_vc()
	build_wasm('v.c', 'index.js')
	build_wasm('vfmt.c', 'fmt.js')
	cleanup()
}
