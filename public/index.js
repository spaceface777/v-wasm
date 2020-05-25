/**
 * @license
 * Copyright 2010 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module !== 'undefined' ? Module : {};


// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
    Module.finishedDataFileDownloads = 0;
  }
  Module.expectedDataFileDownloads++;
  (function() {
   var loadPackage = function(metadata) {
  
      var PACKAGE_PATH;
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof location !== 'undefined') {
        // worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      } else {
        throw 'using preloaded data can only be done on a web page or in a web worker';
      }
      var PACKAGE_NAME = 'public/index.data';
      var REMOTE_PACKAGE_BASE = 'index.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
    
      var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];
      var PACKAGE_UUID = metadata['package_uuid'];
    
      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };
    
        var fetchedCallback = null;
        var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

        if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
          if (fetchedCallback) {
            fetchedCallback(data);
            fetchedCallback = null;
          } else {
            fetched = data;
          }
        }, handleError);
      
    function runWithFS() {
  
      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
  Module['FS_createPath']('/', 'vlib', true, true);
Module['FS_createPath']('/vlib', 'benchmark', true, true);
Module['FS_createPath']('/vlib', 'bitfield', true, true);
Module['FS_createPath']('/vlib', 'builtin', true, true);
Module['FS_createPath']('/vlib/builtin', 'bare', true, true);
Module['FS_createPath']('/vlib/builtin/bare', '.checks', true, true);
Module['FS_createPath']('/vlib/builtin/bare/.checks', 'consts', true, true);
Module['FS_createPath']('/vlib/builtin/bare/.checks', 'forkedtest', true, true);
Module['FS_createPath']('/vlib/builtin/bare/.checks', 'linuxsys', true, true);
Module['FS_createPath']('/vlib/builtin/bare/.checks', 'string', true, true);
Module['FS_createPath']('/vlib/builtin/bare/.checks', 'structs', true, true);
Module['FS_createPath']('/vlib/builtin', 'js', true, true);
Module['FS_createPath']('/vlib', 'cli', true, true);
Module['FS_createPath']('/vlib', 'clipboard', true, true);
Module['FS_createPath']('/vlib', 'crypto', true, true);
Module['FS_createPath']('/vlib/crypto', 'aes', true, true);
Module['FS_createPath']('/vlib/crypto', 'cipher', true, true);
Module['FS_createPath']('/vlib/crypto', 'internal', true, true);
Module['FS_createPath']('/vlib/crypto/internal', 'subtle', true, true);
Module['FS_createPath']('/vlib/crypto', 'md5', true, true);
Module['FS_createPath']('/vlib/crypto', 'rand', true, true);
Module['FS_createPath']('/vlib/crypto', 'rc4', true, true);
Module['FS_createPath']('/vlib/crypto', 'sha1', true, true);
Module['FS_createPath']('/vlib/crypto', 'sha256', true, true);
Module['FS_createPath']('/vlib/crypto', 'sha512', true, true);
Module['FS_createPath']('/vlib', 'darwin', true, true);
Module['FS_createPath']('/vlib', 'dl', true, true);
Module['FS_createPath']('/vlib', 'encoding', true, true);
Module['FS_createPath']('/vlib/encoding', 'base64', true, true);
Module['FS_createPath']('/vlib/encoding', 'binary', true, true);
Module['FS_createPath']('/vlib/encoding', 'csv', true, true);
Module['FS_createPath']('/vlib/encoding', 'utf8', true, true);
Module['FS_createPath']('/vlib', 'eventbus', true, true);
Module['FS_createPath']('/vlib', 'flag', true, true);
Module['FS_createPath']('/vlib', 'fontstash', true, true);
Module['FS_createPath']('/vlib', 'freetype', true, true);
Module['FS_createPath']('/vlib', 'gg', true, true);
Module['FS_createPath']('/vlib', 'gg2', true, true);
Module['FS_createPath']('/vlib', 'gl', true, true);
Module['FS_createPath']('/vlib', 'glfw', true, true);
Module['FS_createPath']('/vlib', 'glm', true, true);
Module['FS_createPath']('/vlib', 'gx', true, true);
Module['FS_createPath']('/vlib', 'hash', true, true);
Module['FS_createPath']('/vlib/hash', 'crc32', true, true);
Module['FS_createPath']('/vlib/hash', 'fnv1a', true, true);
Module['FS_createPath']('/vlib/hash', 'wyhash', true, true);
Module['FS_createPath']('/vlib', 'json', true, true);
Module['FS_createPath']('/vlib', 'live', true, true);
Module['FS_createPath']('/vlib/live', 'executable', true, true);
Module['FS_createPath']('/vlib/live', 'shared', true, true);
Module['FS_createPath']('/vlib', 'log', true, true);
Module['FS_createPath']('/vlib', 'math', true, true);
Module['FS_createPath']('/vlib/math', 'big', true, true);
Module['FS_createPath']('/vlib/math', 'bits', true, true);
Module['FS_createPath']('/vlib/math', 'complex', true, true);
Module['FS_createPath']('/vlib/math', 'factorial', true, true);
Module['FS_createPath']('/vlib/math', 'fractions', true, true);
Module['FS_createPath']('/vlib/math', 'stats', true, true);
Module['FS_createPath']('/vlib', 'mysql', true, true);
Module['FS_createPath']('/vlib', 'net', true, true);
Module['FS_createPath']('/vlib/net', 'ftp', true, true);
Module['FS_createPath']('/vlib/net', 'http', true, true);
Module['FS_createPath']('/vlib/net/http', 'chunked', true, true);
Module['FS_createPath']('/vlib/net', 'urllib', true, true);
Module['FS_createPath']('/vlib/net', 'websocket', true, true);
Module['FS_createPath']('/vlib/net/websocket', 'examples', true, true);
Module['FS_createPath']('/vlib/net/websocket', 'logger', true, true);
Module['FS_createPath']('/vlib', 'orm', true, true);
Module['FS_createPath']('/vlib', 'os', true, true);
Module['FS_createPath']('/vlib/os', 'bare', true, true);
Module['FS_createPath']('/vlib/os', 'cmdline', true, true);
Module['FS_createPath']('/vlib', 'os2', true, true);
Module['FS_createPath']('/vlib', 'pg', true, true);
Module['FS_createPath']('/vlib', 'picoev', true, true);
Module['FS_createPath']('/vlib', 'picohttpparser', true, true);
Module['FS_createPath']('/vlib', 'rand', true, true);
Module['FS_createPath']('/vlib', 'readline', true, true);
Module['FS_createPath']('/vlib', 'regex', true, true);
Module['FS_createPath']('/vlib', 'runtime', true, true);
Module['FS_createPath']('/vlib', 'sokol', true, true);
Module['FS_createPath']('/vlib/sokol', 'c', true, true);
Module['FS_createPath']('/vlib/sokol', 'f', true, true);
Module['FS_createPath']('/vlib/sokol', 'gfx', true, true);
Module['FS_createPath']('/vlib/sokol', 'sapp', true, true);
Module['FS_createPath']('/vlib/sokol', 'sfons', true, true);
Module['FS_createPath']('/vlib/sokol', 'sgl', true, true);
Module['FS_createPath']('/vlib', 'sqlite', true, true);
Module['FS_createPath']('/vlib', 'stbi', true, true);
Module['FS_createPath']('/vlib', 'strconv', true, true);
Module['FS_createPath']('/vlib/strconv', 'atofq', true, true);
Module['FS_createPath']('/vlib/strconv', 'ftoa', true, true);
Module['FS_createPath']('/vlib', 'strings', true, true);
Module['FS_createPath']('/vlib', 'sync', true, true);
Module['FS_createPath']('/vlib', 'szip', true, true);
Module['FS_createPath']('/vlib', 'term', true, true);
Module['FS_createPath']('/vlib', 'time', true, true);
Module['FS_createPath']('/vlib/time', 'misc', true, true);
Module['FS_createPath']('/vlib', 'v', true, true);
Module['FS_createPath']('/vlib/v', 'ast', true, true);
Module['FS_createPath']('/vlib/v', 'builder', true, true);
Module['FS_createPath']('/vlib/v', 'cflag', true, true);
Module['FS_createPath']('/vlib/v', 'checker', true, true);
Module['FS_createPath']('/vlib/v/checker', 'tests', true, true);
Module['FS_createPath']('/vlib/v/checker/tests', 'globals', true, true);
Module['FS_createPath']('/vlib/v/checker/tests', 'run', true, true);
Module['FS_createPath']('/vlib/v', 'depgraph', true, true);
Module['FS_createPath']('/vlib/v', 'doc', true, true);
Module['FS_createPath']('/vlib/v', 'errors', true, true);
Module['FS_createPath']('/vlib/v', 'eval', true, true);
Module['FS_createPath']('/vlib/v', 'fmt', true, true);
Module['FS_createPath']('/vlib/v/fmt', 'tests', true, true);
Module['FS_createPath']('/vlib/v', 'gen', true, true);
Module['FS_createPath']('/vlib/v/gen', 'js', true, true);
Module['FS_createPath']('/vlib/v/gen/js', 'tests', true, true);
Module['FS_createPath']('/vlib/v/gen/js/tests', 'hello', true, true);
Module['FS_createPath']('/vlib/v/gen/js/tests/hello', 'Hello1', true, true);
Module['FS_createPath']('/vlib/v/gen', 'tests', true, true);
Module['FS_createPath']('/vlib/v/gen/tests', 'localmod', true, true);
Module['FS_createPath']('/vlib/v/gen', 'x64', true, true);
Module['FS_createPath']('/vlib/v/gen/x64', 'tests', true, true);
Module['FS_createPath']('/vlib/v', 'parser', true, true);
Module['FS_createPath']('/vlib/v', 'pref', true, true);
Module['FS_createPath']('/vlib/v', 'scanner', true, true);
Module['FS_createPath']('/vlib/v', 'table', true, true);
Module['FS_createPath']('/vlib/v', 'tests', true, true);
Module['FS_createPath']('/vlib/v/tests', 'bench', true, true);
Module['FS_createPath']('/vlib/v/tests', 'inout', true, true);
Module['FS_createPath']('/vlib/v/tests', 'local', true, true);
Module['FS_createPath']('/vlib/v/tests', 'modules', true, true);
Module['FS_createPath']('/vlib/v/tests/modules', 'acommentedmodule', true, true);
Module['FS_createPath']('/vlib/v/tests/modules', 'amodule', true, true);
Module['FS_createPath']('/vlib/v/tests/modules', 'simplemodule', true, true);
Module['FS_createPath']('/vlib/v/tests', 'prod', true, true);
Module['FS_createPath']('/vlib/v/tests', 'project_with_c_code', true, true);
Module['FS_createPath']('/vlib/v/tests/project_with_c_code', 'mod1', true, true);
Module['FS_createPath']('/vlib/v/tests/project_with_c_code/mod1', 'c', true, true);
Module['FS_createPath']('/vlib/v/tests', 'project_with_modules_having_submodules', true, true);
Module['FS_createPath']('/vlib/v/tests/project_with_modules_having_submodules', 'bin', true, true);
Module['FS_createPath']('/vlib/v/tests/project_with_modules_having_submodules', 'mod1', true, true);
Module['FS_createPath']('/vlib/v/tests/project_with_modules_having_submodules/mod1', 'mod11', true, true);
Module['FS_createPath']('/vlib/v/tests/project_with_modules_having_submodules/mod1', 'mod12', true, true);
Module['FS_createPath']('/vlib/v/tests/project_with_modules_having_submodules/mod1', 'mod13', true, true);
Module['FS_createPath']('/vlib/v/tests/project_with_modules_having_submodules/mod1', 'mod14', true, true);
Module['FS_createPath']('/vlib/v/tests/project_with_modules_having_submodules/mod1', 'submodule', true, true);
Module['FS_createPath']('/vlib/v/tests/project_with_modules_having_submodules', 'tests', true, true);
Module['FS_createPath']('/vlib/v/tests', 'repl', true, true);
Module['FS_createPath']('/vlib/v/tests/repl', 'chained_fields', true, true);
Module['FS_createPath']('/vlib/v/tests/repl', 'conditional_blocks', true, true);
Module['FS_createPath']('/vlib/v/tests/repl', 'immutable_len_fields', true, true);
Module['FS_createPath']('/vlib/v/tests/repl', 'runner', true, true);
Module['FS_createPath']('/vlib/v/tests', 'valgrind', true, true);
Module['FS_createPath']('/vlib/v', 'token', true, true);
Module['FS_createPath']('/vlib/v', 'util', true, true);
Module['FS_createPath']('/vlib/v', 'vmod', true, true);
Module['FS_createPath']('/vlib', 'vweb', true, true);
Module['FS_createPath']('/vlib/vweb', 'assets', true, true);
Module['FS_createPath']('/vlib/vweb', 'tmpl', true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
  
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['removeRunDependency']('fp ' + that.name);
  
          this.requests[this.name] = null;
        }
      };
  
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio']).open('GET', files[i]['filename']);
          }
  
    
      function processPackageData(arrayBuffer) {
        Module.finishedDataFileDownloads++;
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        
          // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
          // (we may be allocating before malloc is ready, during startup).
          var ptr = Module['getMemory'](byteArray.length);
          Module['HEAPU8'].set(byteArray, ptr);
          DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
    
            var files = metadata['files'];
            for (var i = 0; i < files.length; ++i) {
              DataRequest.prototype.requests[files[i].filename].onload();
            }
                Module['removeRunDependency']('datafile_public/index.data');

      };
      Module['addRunDependency']('datafile_public/index.data');
    
      if (!Module.preloadResults) Module.preloadResults = {};
    
        Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
        if (fetched) {
          processPackageData(fetched);
          fetched = null;
        } else {
          fetchedCallback = processPackageData;
        }
      
    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }
  
   }
   loadPackage({"files": [{"start": 0, "audio": 0, "end": 5564, "filename": "/vlib/benchmark/benchmark.v"}, {"start": 5564, "audio": 0, "end": 18326, "filename": "/vlib/bitfield/bitfield.v"}, {"start": 18326, "audio": 0, "end": 24963, "filename": "/vlib/bitfield/bitfield_test.v"}, {"start": 24963, "audio": 0, "end": 38088, "filename": "/vlib/builtin/array.v"}, {"start": 38088, "audio": 0, "end": 51969, "filename": "/vlib/builtin/array_test.v"}, {"start": 51969, "audio": 0, "end": 56391, "filename": "/vlib/builtin/builtin.v"}, {"start": 56391, "audio": 0, "end": 59839, "filename": "/vlib/builtin/builtin_nix.c.v"}, {"start": 59839, "audio": 0, "end": 64520, "filename": "/vlib/builtin/builtin_windows.c.v"}, {"start": 64520, "audio": 0, "end": 64656, "filename": "/vlib/builtin/byte_test.v"}, {"start": 64656, "audio": 0, "end": 69591, "filename": "/vlib/builtin/cfns.c.v"}, {"start": 69591, "audio": 0, "end": 72768, "filename": "/vlib/builtin/float.v"}, {"start": 72768, "audio": 0, "end": 74069, "filename": "/vlib/builtin/float_test.v"}, {"start": 74069, "audio": 0, "end": 80711, "filename": "/vlib/builtin/int.v"}, {"start": 80711, "audio": 0, "end": 85714, "filename": "/vlib/builtin/int_test.v"}, {"start": 85714, "audio": 0, "end": 85971, "filename": "/vlib/builtin/isnil_test.v"}, {"start": 85971, "audio": 0, "end": 98814, "filename": "/vlib/builtin/map.v"}, {"start": 98814, "audio": 0, "end": 102617, "filename": "/vlib/builtin/map_test.v"}, {"start": 102617, "audio": 0, "end": 103829, "filename": "/vlib/builtin/option.v"}, {"start": 103829, "audio": 0, "end": 113803, "filename": "/vlib/builtin/sorted_map.v"}, {"start": 113803, "audio": 0, "end": 140925, "filename": "/vlib/builtin/string.v"}, {"start": 140925, "audio": 0, "end": 145036, "filename": "/vlib/builtin/string_int_test.v"}, {"start": 145036, "audio": 0, "end": 149382, "filename": "/vlib/builtin/string_strip_margin_test.v"}, {"start": 149382, "audio": 0, "end": 165760, "filename": "/vlib/builtin/string_test.v"}, {"start": 165760, "audio": 0, "end": 171363, "filename": "/vlib/builtin/utf8.v"}, {"start": 171363, "audio": 0, "end": 171496, "filename": "/vlib/builtin/utf8_test.v"}, {"start": 171496, "audio": 0, "end": 172764, "filename": "/vlib/builtin/bare/array_bare.v"}, {"start": 172764, "audio": 0, "end": 173764, "filename": "/vlib/builtin/bare/builtin_bare.v"}, {"start": 173764, "audio": 0, "end": 204159, "filename": "/vlib/builtin/bare/linuxsys_bare.v"}, {"start": 204159, "audio": 0, "end": 205304, "filename": "/vlib/builtin/bare/mm_bare.v"}, {"start": 205304, "audio": 0, "end": 207514, "filename": "/vlib/builtin/bare/string_bare.v"}, {"start": 207514, "audio": 0, "end": 208075, "filename": "/vlib/builtin/bare/syscallwrapper_test.v"}, {"start": 208075, "audio": 0, "end": 208149, "filename": "/vlib/builtin/bare/.checks/.gitignore"}, {"start": 208149, "audio": 0, "end": 208647, "filename": "/vlib/builtin/bare/.checks/checks.v"}, {"start": 208647, "audio": 0, "end": 208695, "filename": "/vlib/builtin/bare/.checks/readme.md"}, {"start": 208695, "audio": 0, "end": 208721, "filename": "/vlib/builtin/bare/.checks/sample_text1.txt"}, {"start": 208721, "audio": 0, "end": 209096, "filename": "/vlib/builtin/bare/.checks/consts/consts.v"}, {"start": 209096, "audio": 0, "end": 210169, "filename": "/vlib/builtin/bare/.checks/forkedtest/forkedtest.v"}, {"start": 210169, "audio": 0, "end": 216626, "filename": "/vlib/builtin/bare/.checks/linuxsys/linuxsys.v"}, {"start": 216626, "audio": 0, "end": 218073, "filename": "/vlib/builtin/bare/.checks/string/string.v"}, {"start": 218073, "audio": 0, "end": 219073, "filename": "/vlib/builtin/bare/.checks/structs/structs.v"}, {"start": 219073, "audio": 0, "end": 219430, "filename": "/vlib/builtin/js/builtin.v"}, {"start": 219430, "audio": 0, "end": 223927, "filename": "/vlib/cli/command.v"}, {"start": 223927, "audio": 0, "end": 227798, "filename": "/vlib/cli/command_test.v"}, {"start": 227798, "audio": 0, "end": 230878, "filename": "/vlib/cli/flag.v"}, {"start": 230878, "audio": 0, "end": 231985, "filename": "/vlib/cli/flag_test.v"}, {"start": 231985, "audio": 0, "end": 234807, "filename": "/vlib/cli/help.v"}, {"start": 234807, "audio": 0, "end": 235236, "filename": "/vlib/cli/version.v"}, {"start": 235236, "audio": 0, "end": 235931, "filename": "/vlib/clipboard/clipboard.v"}, {"start": 235931, "audio": 0, "end": 237632, "filename": "/vlib/clipboard/clipboard_darwin.c.v"}, {"start": 237632, "audio": 0, "end": 249703, "filename": "/vlib/clipboard/clipboard_linux.c.v"}, {"start": 249703, "audio": 0, "end": 250665, "filename": "/vlib/clipboard/clipboard_solaris.c.v"}, {"start": 250665, "audio": 0, "end": 251169, "filename": "/vlib/clipboard/clipboard_test.v"}, {"start": 251169, "audio": 0, "end": 255675, "filename": "/vlib/clipboard/clipboard_windows.c.v"}, {"start": 255675, "audio": 0, "end": 255893, "filename": "/vlib/crypto/crypto.v"}, {"start": 255893, "audio": 0, "end": 257433, "filename": "/vlib/crypto/readme.txt"}, {"start": 257433, "audio": 0, "end": 259355, "filename": "/vlib/crypto/aes/aes.v"}, {"start": 259355, "audio": 0, "end": 262875, "filename": "/vlib/crypto/aes/aes_cbc.v"}, {"start": 262875, "audio": 0, "end": 263907, "filename": "/vlib/crypto/aes/aes_test.v"}, {"start": 263907, "audio": 0, "end": 270816, "filename": "/vlib/crypto/aes/block_generic.v"}, {"start": 270816, "audio": 0, "end": 301013, "filename": "/vlib/crypto/aes/const.v"}, {"start": 301013, "audio": 0, "end": 301513, "filename": "/vlib/crypto/aes/cypher_generic.v"}, {"start": 301513, "audio": 0, "end": 302469, "filename": "/vlib/crypto/cipher/xor_generic.v"}, {"start": 302469, "audio": 0, "end": 303717, "filename": "/vlib/crypto/internal/subtle/aliasing.v"}, {"start": 303717, "audio": 0, "end": 307086, "filename": "/vlib/crypto/md5/md5.v"}, {"start": 307086, "audio": 0, "end": 313011, "filename": "/vlib/crypto/md5/md5block_generic.v"}, {"start": 313011, "audio": 0, "end": 313323, "filename": "/vlib/crypto/md5/md5_test.v"}, {"start": 313323, "audio": 0, "end": 313836, "filename": "/vlib/crypto/rand/rand.v"}, {"start": 313836, "audio": 0, "end": 314345, "filename": "/vlib/crypto/rand/rand_darwin.c.v"}, {"start": 314345, "audio": 0, "end": 315399, "filename": "/vlib/crypto/rand/rand_linux.c.v"}, {"start": 315399, "audio": 0, "end": 316532, "filename": "/vlib/crypto/rand/rand_solaris.c.v"}, {"start": 316532, "audio": 0, "end": 317457, "filename": "/vlib/crypto/rand/rand_test.v"}, {"start": 317457, "audio": 0, "end": 318162, "filename": "/vlib/crypto/rand/rand_windows.c.v"}, {"start": 318162, "audio": 0, "end": 319228, "filename": "/vlib/crypto/rand/utils.v"}, {"start": 319228, "audio": 0, "end": 321168, "filename": "/vlib/crypto/rc4/rc4.v"}, {"start": 321168, "audio": 0, "end": 321661, "filename": "/vlib/crypto/rc4/rc4_test.v"}, {"start": 321661, "audio": 0, "end": 324747, "filename": "/vlib/crypto/sha1/sha1.v"}, {"start": 324747, "audio": 0, "end": 327339, "filename": "/vlib/crypto/sha1/sha1block_generic.v"}, {"start": 327339, "audio": 0, "end": 327663, "filename": "/vlib/crypto/sha1/sha1_test.v"}, {"start": 327663, "audio": 0, "end": 332325, "filename": "/vlib/crypto/sha256/sha256.v"}, {"start": 332325, "audio": 0, "end": 335148, "filename": "/vlib/crypto/sha256/sha256block_generic.v"}, {"start": 335148, "audio": 0, "end": 335504, "filename": "/vlib/crypto/sha256/sha256_test.v"}, {"start": 335504, "audio": 0, "end": 342967, "filename": "/vlib/crypto/sha512/sha512.v"}, {"start": 342967, "audio": 0, "end": 347193, "filename": "/vlib/crypto/sha512/sha512block_generic.v"}, {"start": 347193, "audio": 0, "end": 347614, "filename": "/vlib/crypto/sha512/sha512_test.v"}, {"start": 347614, "audio": 0, "end": 349051, "filename": "/vlib/darwin/darwin.v"}, {"start": 349051, "audio": 0, "end": 349089, "filename": "/vlib/dl/dl.v"}, {"start": 349089, "audio": 0, "end": 349731, "filename": "/vlib/dl/dl_nix.c.v"}, {"start": 349731, "audio": 0, "end": 350721, "filename": "/vlib/dl/dl_test.v"}, {"start": 350721, "audio": 0, "end": 351423, "filename": "/vlib/dl/dl_windows.c.v"}, {"start": 351423, "audio": 0, "end": 356159, "filename": "/vlib/encoding/base64/base64.v"}, {"start": 356159, "audio": 0, "end": 356859, "filename": "/vlib/encoding/base64/base64_memory_test.v"}, {"start": 356859, "audio": 0, "end": 358956, "filename": "/vlib/encoding/base64/base64_test.v"}, {"start": 358956, "audio": 0, "end": 361414, "filename": "/vlib/encoding/binary/binary.v"}, {"start": 361414, "audio": 0, "end": 365069, "filename": "/vlib/encoding/csv/reader.v"}, {"start": 365069, "audio": 0, "end": 368951, "filename": "/vlib/encoding/csv/reader_test.v"}, {"start": 368951, "audio": 0, "end": 370526, "filename": "/vlib/encoding/csv/writer.v"}, {"start": 370526, "audio": 0, "end": 370975, "filename": "/vlib/encoding/csv/writer_test.v"}, {"start": 370975, "audio": 0, "end": 465079, "filename": "/vlib/encoding/utf8/utf8_util.v"}, {"start": 465079, "audio": 0, "end": 466614, "filename": "/vlib/encoding/utf8/utf8_util_test.v"}, {"start": 466614, "audio": 0, "end": 469177, "filename": "/vlib/eventbus/eventbus.v"}, {"start": 469177, "audio": 0, "end": 469888, "filename": "/vlib/eventbus/eventbus_test.v"}, {"start": 469888, "audio": 0, "end": 473052, "filename": "/vlib/eventbus/README.md"}, {"start": 473052, "audio": 0, "end": 487107, "filename": "/vlib/flag/flag.v"}, {"start": 487107, "audio": 0, "end": 497011, "filename": "/vlib/flag/flag_test.v"}, {"start": 497011, "audio": 0, "end": 500608, "filename": "/vlib/fontstash/fontstash.v"}, {"start": 500608, "audio": 0, "end": 502631, "filename": "/vlib/fontstash/fontstash_funcs.v"}, {"start": 502631, "audio": 0, "end": 504378, "filename": "/vlib/fontstash/fontstash_structs.v"}, {"start": 504378, "audio": 0, "end": 516068, "filename": "/vlib/freetype/freetype.v"}, {"start": 516068, "audio": 0, "end": 529448, "filename": "/vlib/gg/gg.v"}, {"start": 529448, "audio": 0, "end": 529522, "filename": "/vlib/gg/README.md"}, {"start": 529522, "audio": 0, "end": 530599, "filename": "/vlib/gg/utils.v"}, {"start": 530599, "audio": 0, "end": 535454, "filename": "/vlib/gg2/gg.v"}, {"start": 535454, "audio": 0, "end": 540502, "filename": "/vlib/gl/1shader.v"}, {"start": 540502, "audio": 0, "end": 547149, "filename": "/vlib/gl/gl.v"}, {"start": 547149, "audio": 0, "end": 554912, "filename": "/vlib/glfw/glfw.v"}, {"start": 554912, "audio": 0, "end": 564999, "filename": "/vlib/glm/glm.v"}, {"start": 564999, "audio": 0, "end": 567942, "filename": "/vlib/glm/glm_test.v"}, {"start": 567942, "audio": 0, "end": 569890, "filename": "/vlib/gx/gx.v"}, {"start": 569890, "audio": 0, "end": 570206, "filename": "/vlib/gx/gx_test.v"}, {"start": 570206, "audio": 0, "end": 570658, "filename": "/vlib/hash/hash.v"}, {"start": 570658, "audio": 0, "end": 571801, "filename": "/vlib/hash/crc32/crc32.v"}, {"start": 571801, "audio": 0, "end": 572121, "filename": "/vlib/hash/crc32/crc32_test.v"}, {"start": 572121, "audio": 0, "end": 572952, "filename": "/vlib/hash/fnv1a/fnv1a.v"}, {"start": 572952, "audio": 0, "end": 573165, "filename": "/vlib/hash/fnv1a/fnv1a_test.v"}, {"start": 573165, "audio": 0, "end": 573516, "filename": "/vlib/hash/wyhash/rand.v"}, {"start": 573516, "audio": 0, "end": 577005, "filename": "/vlib/hash/wyhash/wyhash.v"}, {"start": 577005, "audio": 0, "end": 577878, "filename": "/vlib/hash/wyhash/wyhash_test.v"}, {"start": 577878, "audio": 0, "end": 581418, "filename": "/vlib/json/json_primitives.v"}, {"start": 581418, "audio": 0, "end": 583488, "filename": "/vlib/json/json_test.v"}, {"start": 583488, "audio": 0, "end": 586465, "filename": "/vlib/live/common.v"}, {"start": 586465, "audio": 0, "end": 590905, "filename": "/vlib/live/executable/reloader.v"}, {"start": 590905, "audio": 0, "end": 590932, "filename": "/vlib/live/shared/live_sharedlib.v"}, {"start": 590932, "audio": 0, "end": 593274, "filename": "/vlib/log/log.v"}, {"start": 593274, "audio": 0, "end": 595222, "filename": "/vlib/math/bits.v"}, {"start": 595222, "audio": 0, "end": 597342, "filename": "/vlib/math/const.v"}, {"start": 597342, "audio": 0, "end": 602271, "filename": "/vlib/math/math.c.v"}, {"start": 602271, "audio": 0, "end": 608037, "filename": "/vlib/math/math.js.v"}, {"start": 608037, "audio": 0, "end": 610980, "filename": "/vlib/math/math.v"}, {"start": 610980, "audio": 0, "end": 612510, "filename": "/vlib/math/math_test.v"}, {"start": 612510, "audio": 0, "end": 613686, "filename": "/vlib/math/unsafe.v"}, {"start": 613686, "audio": 0, "end": 618315, "filename": "/vlib/math/big/big.v"}, {"start": 618315, "audio": 0, "end": 620578, "filename": "/vlib/math/big/big_test.v"}, {"start": 620578, "audio": 0, "end": 635691, "filename": "/vlib/math/bits/bits.v"}, {"start": 635691, "audio": 0, "end": 642181, "filename": "/vlib/math/bits/bits_tables.v"}, {"start": 642181, "audio": 0, "end": 648726, "filename": "/vlib/math/bits/bits_test.v"}, {"start": 648726, "audio": 0, "end": 659234, "filename": "/vlib/math/complex/complex.v"}, {"start": 659234, "audio": 0, "end": 688080, "filename": "/vlib/math/complex/complex_test.v"}, {"start": 688080, "audio": 0, "end": 689978, "filename": "/vlib/math/factorial/factorial.v"}, {"start": 689978, "audio": 0, "end": 709315, "filename": "/vlib/math/factorial/factorial_tables.v"}, {"start": 709315, "audio": 0, "end": 709661, "filename": "/vlib/math/factorial/factorial_test.v"}, {"start": 709661, "audio": 0, "end": 713390, "filename": "/vlib/math/fractions/approximations.v"}, {"start": 713390, "audio": 0, "end": 718222, "filename": "/vlib/math/fractions/approximations_test.v"}, {"start": 718222, "audio": 0, "end": 725185, "filename": "/vlib/math/fractions/fraction.v"}, {"start": 725185, "audio": 0, "end": 731331, "filename": "/vlib/math/fractions/fraction_test.v"}, {"start": 731331, "audio": 0, "end": 736610, "filename": "/vlib/math/stats/stats.v"}, {"start": 736610, "audio": 0, "end": 746842, "filename": "/vlib/math/stats/stats_test.v"}, {"start": 746842, "audio": 0, "end": 748113, "filename": "/vlib/mysql/consts.v"}, {"start": 748113, "audio": 0, "end": 749436, "filename": "/vlib/mysql/enums.v"}, {"start": 749436, "audio": 0, "end": 753493, "filename": "/vlib/mysql/mysql.v"}, {"start": 753493, "audio": 0, "end": 756539, "filename": "/vlib/mysql/result.v"}, {"start": 756539, "audio": 0, "end": 756793, "filename": "/vlib/mysql/utils.v"}, {"start": 756793, "audio": 0, "end": 759369, "filename": "/vlib/mysql/_cdefs.c.v"}, {"start": 759369, "audio": 0, "end": 759589, "filename": "/vlib/net/init_nix.c.v"}, {"start": 759589, "audio": 0, "end": 760097, "filename": "/vlib/net/init_windows.c.v"}, {"start": 760097, "audio": 0, "end": 760497, "filename": "/vlib/net/net.v"}, {"start": 760497, "audio": 0, "end": 768805, "filename": "/vlib/net/socket.v"}, {"start": 768805, "audio": 0, "end": 770554, "filename": "/vlib/net/socket_test.v"}, {"start": 770554, "audio": 0, "end": 770926, "filename": "/vlib/net/socket_udp_test.v"}, {"start": 770926, "audio": 0, "end": 775866, "filename": "/vlib/net/ftp/ftp.v"}, {"start": 775866, "audio": 0, "end": 776662, "filename": "/vlib/net/ftp/ftp_test.v"}, {"start": 776662, "audio": 0, "end": 779633, "filename": "/vlib/net/http/backend_nix.c.v"}, {"start": 779633, "audio": 0, "end": 780373, "filename": "/vlib/net/http/backend_windows.c.v"}, {"start": 780373, "audio": 0, "end": 790086, "filename": "/vlib/net/http/cookie.v"}, {"start": 790086, "audio": 0, "end": 799391, "filename": "/vlib/net/http/cookie_test.v"}, {"start": 799391, "audio": 0, "end": 799811, "filename": "/vlib/net/http/download.v"}, {"start": 799811, "audio": 0, "end": 800969, "filename": "/vlib/net/http/download_nix.c.v"}, {"start": 800969, "audio": 0, "end": 801655, "filename": "/vlib/net/http/download_windows.c.v"}, {"start": 801655, "audio": 0, "end": 811029, "filename": "/vlib/net/http/http.v"}, {"start": 811029, "audio": 0, "end": 813253, "filename": "/vlib/net/http/http_httpbin_test.v"}, {"start": 813253, "audio": 0, "end": 814500, "filename": "/vlib/net/http/http_test.v"}, {"start": 814500, "audio": 0, "end": 815849, "filename": "/vlib/net/http/chunked/dechunk.v"}, {"start": 815849, "audio": 0, "end": 847038, "filename": "/vlib/net/urllib/urllib.v"}, {"start": 847038, "audio": 0, "end": 848252, "filename": "/vlib/net/urllib/urllib_test.v"}, {"start": 848252, "audio": 0, "end": 850199, "filename": "/vlib/net/urllib/values.v"}, {"start": 850199, "audio": 0, "end": 850682, "filename": "/vlib/net/websocket/events.v"}, {"start": 850682, "audio": 0, "end": 852645, "filename": "/vlib/net/websocket/handshake.v"}, {"start": 852645, "audio": 0, "end": 853153, "filename": "/vlib/net/websocket/io.v"}, {"start": 853153, "audio": 0, "end": 853888, "filename": "/vlib/net/websocket/README.md"}, {"start": 853888, "audio": 0, "end": 854843, "filename": "/vlib/net/websocket/ssl.v"}, {"start": 854843, "audio": 0, "end": 856719, "filename": "/vlib/net/websocket/utf8.v"}, {"start": 856719, "audio": 0, "end": 858169, "filename": "/vlib/net/websocket/utils.v"}, {"start": 858169, "audio": 0, "end": 873093, "filename": "/vlib/net/websocket/ws.v"}, {"start": 873093, "audio": 0, "end": 875693, "filename": "/vlib/net/websocket/examples/client.v"}, {"start": 875693, "audio": 0, "end": 881476, "filename": "/vlib/net/websocket/examples/utf8.h"}, {"start": 881476, "audio": 0, "end": 882378, "filename": "/vlib/net/websocket/logger/logger.v"}, {"start": 882378, "audio": 0, "end": 883729, "filename": "/vlib/orm/orm_test.v"}, {"start": 883729, "audio": 0, "end": 884185, "filename": "/vlib/os/const.v"}, {"start": 884185, "audio": 0, "end": 884825, "filename": "/vlib/os/const_nix.c.v"}, {"start": 884825, "audio": 0, "end": 887949, "filename": "/vlib/os/const_windows.c.v"}, {"start": 887949, "audio": 0, "end": 890102, "filename": "/vlib/os/environment.v"}, {"start": 890102, "audio": 0, "end": 891017, "filename": "/vlib/os/environment_test.v"}, {"start": 891017, "audio": 0, "end": 893313, "filename": "/vlib/os/inode.v"}, {"start": 893313, "audio": 0, "end": 894359, "filename": "/vlib/os/inode_test.v"}, {"start": 894359, "audio": 0, "end": 924227, "filename": "/vlib/os/os.v"}, {"start": 924227, "audio": 0, "end": 924547, "filename": "/vlib/os/os_darwin.c.v"}, {"start": 924547, "audio": 0, "end": 925510, "filename": "/vlib/os/os_linux.c.v"}, {"start": 925510, "audio": 0, "end": 928356, "filename": "/vlib/os/os_nix.c.v"}, {"start": 928356, "audio": 0, "end": 935975, "filename": "/vlib/os/os_test.v"}, {"start": 935975, "audio": 0, "end": 944944, "filename": "/vlib/os/os_windows.c.v"}, {"start": 944944, "audio": 0, "end": 945088, "filename": "/vlib/os/bare/bare_example_linux.v"}, {"start": 945088, "audio": 0, "end": 946782, "filename": "/vlib/os/cmdline/cmdline.v"}, {"start": 946782, "audio": 0, "end": 947601, "filename": "/vlib/os/cmdline/cmdline_test.v"}, {"start": 947601, "audio": 0, "end": 947636, "filename": "/vlib/os2/keep_vfmt_happy.v"}, {"start": 947636, "audio": 0, "end": 948217, "filename": "/vlib/os2/os2_darwin.c.v"}, {"start": 948217, "audio": 0, "end": 948345, "filename": "/vlib/os2/os2_test.v"}, {"start": 948345, "audio": 0, "end": 952166, "filename": "/vlib/pg/pg.v"}, {"start": 952166, "audio": 0, "end": 952922, "filename": "/vlib/pg/readme.md"}, {"start": 952922, "audio": 0, "end": 958055, "filename": "/vlib/picoev/picoev.v"}, {"start": 958055, "audio": 0, "end": 958503, "filename": "/vlib/picohttpparser/misc.v"}, {"start": 958503, "audio": 0, "end": 959177, "filename": "/vlib/picohttpparser/picohttpparser.v"}, {"start": 959177, "audio": 0, "end": 960513, "filename": "/vlib/picohttpparser/request.v"}, {"start": 960513, "audio": 0, "end": 962519, "filename": "/vlib/picohttpparser/response.v"}, {"start": 962519, "audio": 0, "end": 964347, "filename": "/vlib/rand/pcg32.v"}, {"start": 964347, "audio": 0, "end": 965105, "filename": "/vlib/rand/pcg32_test.v"}, {"start": 965105, "audio": 0, "end": 965603, "filename": "/vlib/rand/rand.v"}, {"start": 965603, "audio": 0, "end": 966582, "filename": "/vlib/rand/random_numbers_test.v"}, {"start": 966582, "audio": 0, "end": 967637, "filename": "/vlib/rand/splitmix64.v"}, {"start": 967637, "audio": 0, "end": 968325, "filename": "/vlib/rand/splitmix64_test.v"}, {"start": 968325, "audio": 0, "end": 969944, "filename": "/vlib/readline/readline.js.v"}, {"start": 969944, "audio": 0, "end": 970844, "filename": "/vlib/readline/readline.v"}, {"start": 970844, "audio": 0, "end": 972532, "filename": "/vlib/readline/readline_darwin.c.v"}, {"start": 972532, "audio": 0, "end": 984716, "filename": "/vlib/readline/readline_linux.c.v"}, {"start": 984716, "audio": 0, "end": 986404, "filename": "/vlib/readline/readline_solaris.c.v"}, {"start": 986404, "audio": 0, "end": 988028, "filename": "/vlib/readline/readline_windows.c.v"}, {"start": 988028, "audio": 0, "end": 1008141, "filename": "/vlib/regex/README.md"}, {"start": 1008141, "audio": 0, "end": 1064188, "filename": "/vlib/regex/regex.v"}, {"start": 1064188, "audio": 0, "end": 1074118, "filename": "/vlib/regex/regex_test.v"}, {"start": 1074118, "audio": 0, "end": 1075038, "filename": "/vlib/runtime/runtime.v"}, {"start": 1075038, "audio": 0, "end": 1075053, "filename": "/vlib/runtime/runtime_darwin.c.v"}, {"start": 1075053, "audio": 0, "end": 1075068, "filename": "/vlib/runtime/runtime_linux.c.v"}, {"start": 1075068, "audio": 0, "end": 1075410, "filename": "/vlib/runtime/runtime_nix.c.v"}, {"start": 1075410, "audio": 0, "end": 1076103, "filename": "/vlib/runtime/runtime_test.v"}, {"start": 1076103, "audio": 0, "end": 1076379, "filename": "/vlib/runtime/runtime_windows.c.v"}, {"start": 1076379, "audio": 0, "end": 1076484, "filename": "/vlib/sokol/sokol.v"}, {"start": 1076484, "audio": 0, "end": 1077265, "filename": "/vlib/sokol/c/declaration.c.v"}, {"start": 1077265, "audio": 0, "end": 1077877, "filename": "/vlib/sokol/f/f.v"}, {"start": 1077877, "audio": 0, "end": 1082102, "filename": "/vlib/sokol/gfx/enums.v"}, {"start": 1082102, "audio": 0, "end": 1087493, "filename": "/vlib/sokol/gfx/gfx.v"}, {"start": 1087493, "audio": 0, "end": 1090546, "filename": "/vlib/sokol/gfx/gfx_funcs.v"}, {"start": 1090546, "audio": 0, "end": 1102160, "filename": "/vlib/sokol/gfx/gfx_structs.v"}, {"start": 1102160, "audio": 0, "end": 1102568, "filename": "/vlib/sokol/gfx/gfx_utils.v"}, {"start": 1102568, "audio": 0, "end": 1106536, "filename": "/vlib/sokol/sapp/enums.v"}, {"start": 1106536, "audio": 0, "end": 1111000, "filename": "/vlib/sokol/sapp/sapp.v"}, {"start": 1111000, "audio": 0, "end": 1114122, "filename": "/vlib/sokol/sapp/sapp_funcs.v"}, {"start": 1114122, "audio": 0, "end": 1117113, "filename": "/vlib/sokol/sapp/sapp_structs.v"}, {"start": 1117113, "audio": 0, "end": 1117597, "filename": "/vlib/sokol/sfons/sfons.v"}, {"start": 1117597, "audio": 0, "end": 1117802, "filename": "/vlib/sokol/sfons/sfons_funcs.v"}, {"start": 1117802, "audio": 0, "end": 1124400, "filename": "/vlib/sokol/sgl/sgl.v"}, {"start": 1124400, "audio": 0, "end": 1128067, "filename": "/vlib/sokol/sgl/sgl_funcs.v"}, {"start": 1128067, "audio": 0, "end": 1128653, "filename": "/vlib/sokol/sgl/sgl_structs.v"}, {"start": 1128653, "audio": 0, "end": 1128857, "filename": "/vlib/sqlite/readme.md"}, {"start": 1128857, "audio": 0, "end": 1131234, "filename": "/vlib/sqlite/sqlite.v"}, {"start": 1131234, "audio": 0, "end": 1132019, "filename": "/vlib/sqlite/sqlite_test.v"}, {"start": 1132019, "audio": 0, "end": 1133718, "filename": "/vlib/stbi/stbi.v"}, {"start": 1133718, "audio": 0, "end": 1145708, "filename": "/vlib/strconv/atof.v"}, {"start": 1145708, "audio": 0, "end": 1147102, "filename": "/vlib/strconv/atof_test.v"}, {"start": 1147102, "audio": 0, "end": 1154413, "filename": "/vlib/strconv/atoi.v"}, {"start": 1154413, "audio": 0, "end": 1155414, "filename": "/vlib/strconv/atoi_test.v"}, {"start": 1155414, "audio": 0, "end": 1163343, "filename": "/vlib/strconv/format.md"}, {"start": 1163343, "audio": 0, "end": 1180253, "filename": "/vlib/strconv/format.v"}, {"start": 1180253, "audio": 0, "end": 1183602, "filename": "/vlib/strconv/format_test.v"}, {"start": 1183602, "audio": 0, "end": 1202521, "filename": "/vlib/strconv/atofq/atofq.v"}, {"start": 1202521, "audio": 0, "end": 1205601, "filename": "/vlib/strconv/ftoa/f32_f64_to_string_test.v"}, {"start": 1205601, "audio": 0, "end": 1214956, "filename": "/vlib/strconv/ftoa/f32_str.v"}, {"start": 1214956, "audio": 0, "end": 1226128, "filename": "/vlib/strconv/ftoa/f64_str.v"}, {"start": 1226128, "audio": 0, "end": 1227159, "filename": "/vlib/strconv/ftoa/ftoa.v"}, {"start": 1227159, "audio": 0, "end": 1266761, "filename": "/vlib/strconv/ftoa/tables.v"}, {"start": 1266761, "audio": 0, "end": 1274413, "filename": "/vlib/strconv/ftoa/utilities.v"}, {"start": 1274413, "audio": 0, "end": 1276631, "filename": "/vlib/strings/builder.c.v"}, {"start": 1276631, "audio": 0, "end": 1277576, "filename": "/vlib/strings/builder.js.v"}, {"start": 1277576, "audio": 0, "end": 1278476, "filename": "/vlib/strings/builder_test.v"}, {"start": 1278476, "audio": 0, "end": 1280285, "filename": "/vlib/strings/similarity.v"}, {"start": 1280285, "audio": 0, "end": 1280848, "filename": "/vlib/strings/similarity_test.v"}, {"start": 1280848, "audio": 0, "end": 1281672, "filename": "/vlib/strings/strings.c.v"}, {"start": 1281672, "audio": 0, "end": 1281995, "filename": "/vlib/strings/strings.js.v"}, {"start": 1281995, "audio": 0, "end": 1282379, "filename": "/vlib/strings/strings_test.v"}, {"start": 1282379, "audio": 0, "end": 1290355, "filename": "/vlib/sync/pool.v"}, {"start": 1290355, "audio": 0, "end": 1292147, "filename": "/vlib/sync/pool_test.v"}, {"start": 1292147, "audio": 0, "end": 1292778, "filename": "/vlib/sync/sync_nix.c.v"}, {"start": 1292778, "audio": 0, "end": 1294763, "filename": "/vlib/sync/sync_windows.c.v"}, {"start": 1294763, "audio": 0, "end": 1295715, "filename": "/vlib/sync/waitgroup.v"}, {"start": 1295715, "audio": 0, "end": 1303542, "filename": "/vlib/szip/szip.v"}, {"start": 1303542, "audio": 0, "end": 1307426, "filename": "/vlib/term/colors.v"}, {"start": 1307426, "audio": 0, "end": 1309574, "filename": "/vlib/term/control.v"}, {"start": 1309574, "audio": 0, "end": 1309857, "filename": "/vlib/term/term.js.v"}, {"start": 1309857, "audio": 0, "end": 1312402, "filename": "/vlib/term/term.v"}, {"start": 1312402, "audio": 0, "end": 1312934, "filename": "/vlib/term/term_nix.c.v"}, {"start": 1312934, "audio": 0, "end": 1314681, "filename": "/vlib/term/term_test.v"}, {"start": 1314681, "audio": 0, "end": 1315577, "filename": "/vlib/term/term_windows.c.v"}, {"start": 1315577, "audio": 0, "end": 1320152, "filename": "/vlib/time/format.v"}, {"start": 1320152, "audio": 0, "end": 1322864, "filename": "/vlib/time/format_test.v"}, {"start": 1322864, "audio": 0, "end": 1324132, "filename": "/vlib/time/parse.v"}, {"start": 1324132, "audio": 0, "end": 1325168, "filename": "/vlib/time/parse_test.v"}, {"start": 1325168, "audio": 0, "end": 1326346, "filename": "/vlib/time/stopwatch.v"}, {"start": 1326346, "audio": 0, "end": 1327474, "filename": "/vlib/time/stopwatch_test.v"}, {"start": 1327474, "audio": 0, "end": 1335116, "filename": "/vlib/time/time.v"}, {"start": 1335116, "audio": 0, "end": 1336236, "filename": "/vlib/time/time_darwin.c.v"}, {"start": 1336236, "audio": 0, "end": 1336293, "filename": "/vlib/time/time_linux.c.v"}, {"start": 1336293, "audio": 0, "end": 1337378, "filename": "/vlib/time/time_nix.c.v"}, {"start": 1337378, "audio": 0, "end": 1340416, "filename": "/vlib/time/time_test.v"}, {"start": 1340416, "audio": 0, "end": 1341573, "filename": "/vlib/time/time_windows.c.v"}, {"start": 1341573, "audio": 0, "end": 1344361, "filename": "/vlib/time/unix.v"}, {"start": 1344361, "audio": 0, "end": 1344574, "filename": "/vlib/time/misc/misc.v"}, {"start": 1344574, "audio": 0, "end": 1344988, "filename": "/vlib/time/misc/misc_test.v"}, {"start": 1344988, "audio": 0, "end": 1360842, "filename": "/vlib/v/ast/ast.v"}, {"start": 1360842, "audio": 0, "end": 1364073, "filename": "/vlib/v/ast/scope.v"}, {"start": 1364073, "audio": 0, "end": 1368351, "filename": "/vlib/v/ast/str.v"}, {"start": 1368351, "audio": 0, "end": 1376125, "filename": "/vlib/v/builder/builder.v"}, {"start": 1376125, "audio": 0, "end": 1377920, "filename": "/vlib/v/builder/c.v"}, {"start": 1377920, "audio": 0, "end": 1396796, "filename": "/vlib/v/builder/cc.v"}, {"start": 1396796, "audio": 0, "end": 1397835, "filename": "/vlib/v/builder/cflags.v"}, {"start": 1397835, "audio": 0, "end": 1405084, "filename": "/vlib/v/builder/compile.v"}, {"start": 1405084, "audio": 0, "end": 1406389, "filename": "/vlib/v/builder/js.v"}, {"start": 1406389, "audio": 0, "end": 1418561, "filename": "/vlib/v/builder/msvc.v"}, {"start": 1418561, "audio": 0, "end": 1419549, "filename": "/vlib/v/builder/x64.v"}, {"start": 1419549, "audio": 0, "end": 1421567, "filename": "/vlib/v/cflag/cflags.v"}, {"start": 1421567, "audio": 0, "end": 1496506, "filename": "/vlib/v/checker/checker.v"}, {"start": 1496506, "audio": 0, "end": 1498448, "filename": "/vlib/v/checker/checker_test.v"}, {"start": 1498448, "audio": 0, "end": 1502581, "filename": "/vlib/v/checker/check_types.v"}, {"start": 1502581, "audio": 0, "end": 1502600, "filename": "/vlib/v/checker/tests/.gitignore"}, {"start": 1502600, "audio": 0, "end": 1502787, "filename": "/vlib/v/checker/tests/add_op_wrong_left_type_err_a.out"}, {"start": 1502787, "audio": 0, "end": 1502825, "filename": "/vlib/v/checker/tests/add_op_wrong_left_type_err_a.vv"}, {"start": 1502825, "audio": 0, "end": 1503008, "filename": "/vlib/v/checker/tests/add_op_wrong_left_type_err_b.out"}, {"start": 1503008, "audio": 0, "end": 1503039, "filename": "/vlib/v/checker/tests/add_op_wrong_left_type_err_b.vv"}, {"start": 1503039, "audio": 0, "end": 1503248, "filename": "/vlib/v/checker/tests/add_op_wrong_left_type_err_c.out"}, {"start": 1503248, "audio": 0, "end": 1503294, "filename": "/vlib/v/checker/tests/add_op_wrong_left_type_err_c.vv"}, {"start": 1503294, "audio": 0, "end": 1503488, "filename": "/vlib/v/checker/tests/add_op_wrong_right_type_err_a.out"}, {"start": 1503488, "audio": 0, "end": 1503526, "filename": "/vlib/v/checker/tests/add_op_wrong_right_type_err_a.vv"}, {"start": 1503526, "audio": 0, "end": 1503716, "filename": "/vlib/v/checker/tests/add_op_wrong_right_type_err_b.out"}, {"start": 1503716, "audio": 0, "end": 1503747, "filename": "/vlib/v/checker/tests/add_op_wrong_right_type_err_b.vv"}, {"start": 1503747, "audio": 0, "end": 1503963, "filename": "/vlib/v/checker/tests/add_op_wrong_right_type_err_c.out"}, {"start": 1503963, "audio": 0, "end": 1504009, "filename": "/vlib/v/checker/tests/add_op_wrong_right_type_err_c.vv"}, {"start": 1504009, "audio": 0, "end": 1504166, "filename": "/vlib/v/checker/tests/alias_type_exists.out"}, {"start": 1504166, "audio": 0, "end": 1504199, "filename": "/vlib/v/checker/tests/alias_type_exists.vv"}, {"start": 1504199, "audio": 0, "end": 1504427, "filename": "/vlib/v/checker/tests/ambiguous_function_call_a.out"}, {"start": 1504427, "audio": 0, "end": 1504484, "filename": "/vlib/v/checker/tests/ambiguous_function_call_a.vv"}, {"start": 1504484, "audio": 0, "end": 1504719, "filename": "/vlib/v/checker/tests/ambiguous_function_call_b.out"}, {"start": 1504719, "audio": 0, "end": 1504774, "filename": "/vlib/v/checker/tests/ambiguous_function_call_b.vv"}, {"start": 1504774, "audio": 0, "end": 1504985, "filename": "/vlib/v/checker/tests/assign_expr_type_err_a.out"}, {"start": 1504985, "audio": 0, "end": 1505025, "filename": "/vlib/v/checker/tests/assign_expr_type_err_a.vv"}, {"start": 1505025, "audio": 0, "end": 1505254, "filename": "/vlib/v/checker/tests/assign_expr_type_err_b.out"}, {"start": 1505254, "audio": 0, "end": 1505298, "filename": "/vlib/v/checker/tests/assign_expr_type_err_b.vv"}, {"start": 1505298, "audio": 0, "end": 1505515, "filename": "/vlib/v/checker/tests/assign_expr_type_err_c.out"}, {"start": 1505515, "audio": 0, "end": 1505559, "filename": "/vlib/v/checker/tests/assign_expr_type_err_c.vv"}, {"start": 1505559, "audio": 0, "end": 1505781, "filename": "/vlib/v/checker/tests/assign_expr_type_err_d.out"}, {"start": 1505781, "audio": 0, "end": 1505823, "filename": "/vlib/v/checker/tests/assign_expr_type_err_d.vv"}, {"start": 1505823, "audio": 0, "end": 1506041, "filename": "/vlib/v/checker/tests/assign_expr_type_err_e.out"}, {"start": 1506041, "audio": 0, "end": 1506086, "filename": "/vlib/v/checker/tests/assign_expr_type_err_e.vv"}, {"start": 1506086, "audio": 0, "end": 1506309, "filename": "/vlib/v/checker/tests/assign_expr_type_err_f.out"}, {"start": 1506309, "audio": 0, "end": 1506351, "filename": "/vlib/v/checker/tests/assign_expr_type_err_f.vv"}, {"start": 1506351, "audio": 0, "end": 1506566, "filename": "/vlib/v/checker/tests/assign_expr_type_err_g.out"}, {"start": 1506566, "audio": 0, "end": 1506610, "filename": "/vlib/v/checker/tests/assign_expr_type_err_g.vv"}, {"start": 1506610, "audio": 0, "end": 1506838, "filename": "/vlib/v/checker/tests/assign_expr_type_err_h.out"}, {"start": 1506838, "audio": 0, "end": 1506885, "filename": "/vlib/v/checker/tests/assign_expr_type_err_h.vv"}, {"start": 1506885, "audio": 0, "end": 1507115, "filename": "/vlib/v/checker/tests/assign_expr_type_err_i.out"}, {"start": 1507115, "audio": 0, "end": 1507161, "filename": "/vlib/v/checker/tests/assign_expr_type_err_i.vv"}, {"start": 1507161, "audio": 0, "end": 1507336, "filename": "/vlib/v/checker/tests/assign_expr_undefined_err_a.out"}, {"start": 1507336, "audio": 0, "end": 1507370, "filename": "/vlib/v/checker/tests/assign_expr_undefined_err_a.vv"}, {"start": 1507370, "audio": 0, "end": 1507562, "filename": "/vlib/v/checker/tests/assign_expr_undefined_err_b.out"}, {"start": 1507562, "audio": 0, "end": 1507609, "filename": "/vlib/v/checker/tests/assign_expr_undefined_err_b.vv"}, {"start": 1507609, "audio": 0, "end": 1507809, "filename": "/vlib/v/checker/tests/assign_expr_undefined_err_c.out"}, {"start": 1507809, "audio": 0, "end": 1507864, "filename": "/vlib/v/checker/tests/assign_expr_undefined_err_c.vv"}, {"start": 1507864, "audio": 0, "end": 1508044, "filename": "/vlib/v/checker/tests/assign_expr_undefined_err_d.out"}, {"start": 1508044, "audio": 0, "end": 1508081, "filename": "/vlib/v/checker/tests/assign_expr_undefined_err_d.vv"}, {"start": 1508081, "audio": 0, "end": 1508323, "filename": "/vlib/v/checker/tests/assign_multi_immutable_err.out"}, {"start": 1508323, "audio": 0, "end": 1508387, "filename": "/vlib/v/checker/tests/assign_multi_immutable_err.vv"}, {"start": 1508387, "audio": 0, "end": 1508576, "filename": "/vlib/v/checker/tests/bin_lit_without_digit_err.out"}, {"start": 1508576, "audio": 0, "end": 1508608, "filename": "/vlib/v/checker/tests/bin_lit_without_digit_err.vv"}, {"start": 1508608, "audio": 0, "end": 1508802, "filename": "/vlib/v/checker/tests/bin_lit_wrong_digit_err.out"}, {"start": 1508802, "audio": 0, "end": 1508836, "filename": "/vlib/v/checker/tests/bin_lit_wrong_digit_err.vv"}, {"start": 1508836, "audio": 0, "end": 1509017, "filename": "/vlib/v/checker/tests/bit_op_wrong_left_type_err.out"}, {"start": 1509017, "audio": 0, "end": 1509039, "filename": "/vlib/v/checker/tests/bit_op_wrong_left_type_err.vv"}, {"start": 1509039, "audio": 0, "end": 1509226, "filename": "/vlib/v/checker/tests/bit_op_wrong_right_type_err.out"}, {"start": 1509226, "audio": 0, "end": 1509248, "filename": "/vlib/v/checker/tests/bit_op_wrong_right_type_err.vv"}, {"start": 1509248, "audio": 0, "end": 1509571, "filename": "/vlib/v/checker/tests/cannot_assign_array.out"}, {"start": 1509571, "audio": 0, "end": 1509710, "filename": "/vlib/v/checker/tests/cannot_assign_array.vv"}, {"start": 1509710, "audio": 0, "end": 1509930, "filename": "/vlib/v/checker/tests/cast_string_err.out"}, {"start": 1509930, "audio": 0, "end": 1509971, "filename": "/vlib/v/checker/tests/cast_string_err.vv"}, {"start": 1509971, "audio": 0, "end": 1510204, "filename": "/vlib/v/checker/tests/const_define_in_function_err.out"}, {"start": 1510204, "audio": 0, "end": 1510245, "filename": "/vlib/v/checker/tests/const_define_in_function_err.vv"}, {"start": 1510245, "audio": 0, "end": 1510409, "filename": "/vlib/v/checker/tests/const_field_add_err.out"}, {"start": 1510409, "audio": 0, "end": 1510449, "filename": "/vlib/v/checker/tests/const_field_add_err.vv"}, {"start": 1510449, "audio": 0, "end": 1510610, "filename": "/vlib/v/checker/tests/const_field_dec_err.out"}, {"start": 1510610, "audio": 0, "end": 1510647, "filename": "/vlib/v/checker/tests/const_field_dec_err.vv"}, {"start": 1510647, "audio": 0, "end": 1510808, "filename": "/vlib/v/checker/tests/const_field_inc_err.out"}, {"start": 1510808, "audio": 0, "end": 1510845, "filename": "/vlib/v/checker/tests/const_field_inc_err.vv"}, {"start": 1510845, "audio": 0, "end": 1511047, "filename": "/vlib/v/checker/tests/const_field_name_duplicate_err.out"}, {"start": 1511047, "audio": 0, "end": 1511103, "filename": "/vlib/v/checker/tests/const_field_name_duplicate_err.vv"}, {"start": 1511103, "audio": 0, "end": 1511340, "filename": "/vlib/v/checker/tests/const_field_name_snake_case.out"}, {"start": 1511340, "audio": 0, "end": 1511386, "filename": "/vlib/v/checker/tests/const_field_name_snake_case.vv"}, {"start": 1511386, "audio": 0, "end": 1511550, "filename": "/vlib/v/checker/tests/const_field_sub_err.out"}, {"start": 1511550, "audio": 0, "end": 1511590, "filename": "/vlib/v/checker/tests/const_field_sub_err.vv"}, {"start": 1511590, "audio": 0, "end": 1511783, "filename": "/vlib/v/checker/tests/dec_lit_wrong_digit_err.out"}, {"start": 1511783, "audio": 0, "end": 1511823, "filename": "/vlib/v/checker/tests/dec_lit_wrong_digit_err.vv"}, {"start": 1511823, "audio": 0, "end": 1511995, "filename": "/vlib/v/checker/tests/division_by_zero_float_err.out"}, {"start": 1511995, "audio": 0, "end": 1512027, "filename": "/vlib/v/checker/tests/division_by_zero_float_err.vv"}, {"start": 1512027, "audio": 0, "end": 1512189, "filename": "/vlib/v/checker/tests/division_by_zero_int_err.out"}, {"start": 1512189, "audio": 0, "end": 1512217, "filename": "/vlib/v/checker/tests/division_by_zero_int_err.vv"}, {"start": 1512217, "audio": 0, "end": 1512404, "filename": "/vlib/v/checker/tests/div_op_wrong_left_type_err_a.out"}, {"start": 1512404, "audio": 0, "end": 1512442, "filename": "/vlib/v/checker/tests/div_op_wrong_left_type_err_a.vv"}, {"start": 1512442, "audio": 0, "end": 1512625, "filename": "/vlib/v/checker/tests/div_op_wrong_left_type_err_b.out"}, {"start": 1512625, "audio": 0, "end": 1512656, "filename": "/vlib/v/checker/tests/div_op_wrong_left_type_err_b.vv"}, {"start": 1512656, "audio": 0, "end": 1512865, "filename": "/vlib/v/checker/tests/div_op_wrong_left_type_err_c.out"}, {"start": 1512865, "audio": 0, "end": 1512911, "filename": "/vlib/v/checker/tests/div_op_wrong_left_type_err_c.vv"}, {"start": 1512911, "audio": 0, "end": 1513105, "filename": "/vlib/v/checker/tests/div_op_wrong_right_type_err_a.out"}, {"start": 1513105, "audio": 0, "end": 1513143, "filename": "/vlib/v/checker/tests/div_op_wrong_right_type_err_a.vv"}, {"start": 1513143, "audio": 0, "end": 1513333, "filename": "/vlib/v/checker/tests/div_op_wrong_right_type_err_b.out"}, {"start": 1513333, "audio": 0, "end": 1513364, "filename": "/vlib/v/checker/tests/div_op_wrong_right_type_err_b.vv"}, {"start": 1513364, "audio": 0, "end": 1513580, "filename": "/vlib/v/checker/tests/div_op_wrong_right_type_err_c.out"}, {"start": 1513580, "audio": 0, "end": 1513626, "filename": "/vlib/v/checker/tests/div_op_wrong_right_type_err_c.vv"}, {"start": 1513626, "audio": 0, "end": 1514071, "filename": "/vlib/v/checker/tests/enum_err.out"}, {"start": 1514071, "audio": 0, "end": 1514177, "filename": "/vlib/v/checker/tests/enum_err.vv"}, {"start": 1514177, "audio": 0, "end": 1514368, "filename": "/vlib/v/checker/tests/enum_field_name_duplicate_err.out"}, {"start": 1514368, "audio": 0, "end": 1514452, "filename": "/vlib/v/checker/tests/enum_field_name_duplicate_err.vv"}, {"start": 1514452, "audio": 0, "end": 1514642, "filename": "/vlib/v/checker/tests/float_lit_exp_not_integer_err.out"}, {"start": 1514642, "audio": 0, "end": 1514676, "filename": "/vlib/v/checker/tests/float_lit_exp_not_integer_err.vv"}, {"start": 1514676, "audio": 0, "end": 1514849, "filename": "/vlib/v/checker/tests/float_lit_exp_without_digit_err.out"}, {"start": 1514849, "audio": 0, "end": 1514879, "filename": "/vlib/v/checker/tests/float_lit_exp_without_digit_err.vv"}, {"start": 1514879, "audio": 0, "end": 1515073, "filename": "/vlib/v/checker/tests/float_lit_too_many_points_err.out"}, {"start": 1515073, "audio": 0, "end": 1515110, "filename": "/vlib/v/checker/tests/float_lit_too_many_points_err.vv"}, {"start": 1515110, "audio": 0, "end": 1515585, "filename": "/vlib/v/checker/tests/float_modulo_err.out"}, {"start": 1515585, "audio": 0, "end": 1515655, "filename": "/vlib/v/checker/tests/float_modulo_err.vv"}, {"start": 1515655, "audio": 0, "end": 1516096, "filename": "/vlib/v/checker/tests/fn_type_exists.out"}, {"start": 1516096, "audio": 0, "end": 1516186, "filename": "/vlib/v/checker/tests/fn_type_exists.vv"}, {"start": 1516186, "audio": 0, "end": 1516384, "filename": "/vlib/v/checker/tests/for-in-index-type.out"}, {"start": 1516384, "audio": 0, "end": 1516428, "filename": "/vlib/v/checker/tests/for-in-index-type.vv"}, {"start": 1516428, "audio": 0, "end": 1516760, "filename": "/vlib/v/checker/tests/for_in_map_one_variable_err.out"}, {"start": 1516760, "audio": 0, "end": 1516831, "filename": "/vlib/v/checker/tests/for_in_map_one_variable_err.vv"}, {"start": 1516831, "audio": 0, "end": 1517043, "filename": "/vlib/v/checker/tests/for_in_range_not_match_type.out"}, {"start": 1517043, "audio": 0, "end": 1517094, "filename": "/vlib/v/checker/tests/for_in_range_not_match_type.vv"}, {"start": 1517094, "audio": 0, "end": 1517308, "filename": "/vlib/v/checker/tests/for_in_range_string_type.out"}, {"start": 1517308, "audio": 0, "end": 1517359, "filename": "/vlib/v/checker/tests/for_in_range_string_type.vv"}, {"start": 1517359, "audio": 0, "end": 1517539, "filename": "/vlib/v/checker/tests/globals_error.out"}, {"start": 1517539, "audio": 0, "end": 1517549, "filename": "/vlib/v/checker/tests/globals_error.run.out"}, {"start": 1517549, "audio": 0, "end": 1517651, "filename": "/vlib/v/checker/tests/globals_error.vv"}, {"start": 1517651, "audio": 0, "end": 1517806, "filename": "/vlib/v/checker/tests/go_expr.out"}, {"start": 1517806, "audio": 0, "end": 1517826, "filename": "/vlib/v/checker/tests/go_expr.vv"}, {"start": 1517826, "audio": 0, "end": 1518018, "filename": "/vlib/v/checker/tests/hex_lit_without_digit_err.out"}, {"start": 1518018, "audio": 0, "end": 1518048, "filename": "/vlib/v/checker/tests/hex_lit_without_digit_err.vv"}, {"start": 1518048, "audio": 0, "end": 1518249, "filename": "/vlib/v/checker/tests/hex_lit_wrong_digit_err.out"}, {"start": 1518249, "audio": 0, "end": 1518285, "filename": "/vlib/v/checker/tests/hex_lit_wrong_digit_err.vv"}, {"start": 1518285, "audio": 0, "end": 1518809, "filename": "/vlib/v/checker/tests/if_expr_last_stmt.out"}, {"start": 1518809, "audio": 0, "end": 1518893, "filename": "/vlib/v/checker/tests/if_expr_last_stmt.vv"}, {"start": 1518893, "audio": 0, "end": 1519106, "filename": "/vlib/v/checker/tests/if_expr_mismatch.out"}, {"start": 1519106, "audio": 0, "end": 1519167, "filename": "/vlib/v/checker/tests/if_expr_mismatch.vv"}, {"start": 1519167, "audio": 0, "end": 1519341, "filename": "/vlib/v/checker/tests/if_expr_no_else.out"}, {"start": 1519341, "audio": 0, "end": 1519378, "filename": "/vlib/v/checker/tests/if_expr_no_else.vv"}, {"start": 1519378, "audio": 0, "end": 1519571, "filename": "/vlib/v/checker/tests/immutable_array_field_assign.out"}, {"start": 1519571, "audio": 0, "end": 1519645, "filename": "/vlib/v/checker/tests/immutable_array_field_assign.vv"}, {"start": 1519645, "audio": 0, "end": 1519838, "filename": "/vlib/v/checker/tests/immutable_array_field_shift.out"}, {"start": 1519838, "audio": 0, "end": 1519936, "filename": "/vlib/v/checker/tests/immutable_array_field_shift.vv"}, {"start": 1519936, "audio": 0, "end": 1520155, "filename": "/vlib/v/checker/tests/immutable_array_struct_assign.out"}, {"start": 1520155, "audio": 0, "end": 1520224, "filename": "/vlib/v/checker/tests/immutable_array_struct_assign.vv"}, {"start": 1520224, "audio": 0, "end": 1520444, "filename": "/vlib/v/checker/tests/immutable_array_struct_shift.out"}, {"start": 1520444, "audio": 0, "end": 1520515, "filename": "/vlib/v/checker/tests/immutable_array_struct_shift.vv"}, {"start": 1520515, "audio": 0, "end": 1520722, "filename": "/vlib/v/checker/tests/immutable_array_var.out"}, {"start": 1520722, "audio": 0, "end": 1520757, "filename": "/vlib/v/checker/tests/immutable_array_var.vv"}, {"start": 1520757, "audio": 0, "end": 1520942, "filename": "/vlib/v/checker/tests/immutable_field.out"}, {"start": 1520942, "audio": 0, "end": 1521004, "filename": "/vlib/v/checker/tests/immutable_field.vv"}, {"start": 1521004, "audio": 0, "end": 1521403, "filename": "/vlib/v/checker/tests/immutable_field_postfix.out"}, {"start": 1521403, "audio": 0, "end": 1521466, "filename": "/vlib/v/checker/tests/immutable_field_postfix.vv"}, {"start": 1521466, "audio": 0, "end": 1521939, "filename": "/vlib/v/checker/tests/immutable_map_postfix.out"}, {"start": 1521939, "audio": 0, "end": 1522000, "filename": "/vlib/v/checker/tests/immutable_map_postfix.vv"}, {"start": 1522000, "audio": 0, "end": 1522433, "filename": "/vlib/v/checker/tests/immutable_struct_postfix.out"}, {"start": 1522433, "audio": 0, "end": 1522497, "filename": "/vlib/v/checker/tests/immutable_struct_postfix.vv"}, {"start": 1522497, "audio": 0, "end": 1522692, "filename": "/vlib/v/checker/tests/immutable_var.out"}, {"start": 1522692, "audio": 0, "end": 1522721, "filename": "/vlib/v/checker/tests/immutable_var.vv"}, {"start": 1522721, "audio": 0, "end": 1523136, "filename": "/vlib/v/checker/tests/immutable_var_postfix.out"}, {"start": 1523136, "audio": 0, "end": 1523168, "filename": "/vlib/v/checker/tests/immutable_var_postfix.vv"}, {"start": 1523168, "audio": 0, "end": 1523383, "filename": "/vlib/v/checker/tests/import_duplicate_err.out"}, {"start": 1523383, "audio": 0, "end": 1523454, "filename": "/vlib/v/checker/tests/import_duplicate_err.vv"}, {"start": 1523454, "audio": 0, "end": 1523706, "filename": "/vlib/v/checker/tests/import_middle_err.out"}, {"start": 1523706, "audio": 0, "end": 1523802, "filename": "/vlib/v/checker/tests/import_middle_err.vv"}, {"start": 1523802, "audio": 0, "end": 1524026, "filename": "/vlib/v/checker/tests/import_multiple_modules_err.out"}, {"start": 1524026, "audio": 0, "end": 1524090, "filename": "/vlib/v/checker/tests/import_multiple_modules_err.vv"}, {"start": 1524090, "audio": 0, "end": 1524150, "filename": "/vlib/v/checker/tests/import_not_found_err.out"}, {"start": 1524150, "audio": 0, "end": 1524204, "filename": "/vlib/v/checker/tests/import_not_found_err.vv"}, {"start": 1524204, "audio": 0, "end": 1524408, "filename": "/vlib/v/checker/tests/import_not_same_line_err.out"}, {"start": 1524408, "audio": 0, "end": 1524456, "filename": "/vlib/v/checker/tests/import_not_same_line_err.vv"}, {"start": 1524456, "audio": 0, "end": 1524652, "filename": "/vlib/v/checker/tests/import_syntax_err.out"}, {"start": 1524652, "audio": 0, "end": 1524703, "filename": "/vlib/v/checker/tests/import_syntax_err.vv"}, {"start": 1524703, "audio": 0, "end": 1524905, "filename": "/vlib/v/checker/tests/import_unused_warning.out"}, {"start": 1524905, "audio": 0, "end": 1524956, "filename": "/vlib/v/checker/tests/import_unused_warning.vv"}, {"start": 1524956, "audio": 0, "end": 1525118, "filename": "/vlib/v/checker/tests/incorrect_name_alias_type.out"}, {"start": 1525118, "audio": 0, "end": 1525137, "filename": "/vlib/v/checker/tests/incorrect_name_alias_type.vv"}, {"start": 1525137, "audio": 0, "end": 1525137, "filename": "/vlib/v/checker/tests/incorrect_name_const.out"}, {"start": 1525137, "audio": 0, "end": 1525162, "filename": "/vlib/v/checker/tests/incorrect_name_const.vv"}, {"start": 1525162, "audio": 0, "end": 1525346, "filename": "/vlib/v/checker/tests/incorrect_name_enum.out"}, {"start": 1525346, "audio": 0, "end": 1525382, "filename": "/vlib/v/checker/tests/incorrect_name_enum.vv"}, {"start": 1525382, "audio": 0, "end": 1525613, "filename": "/vlib/v/checker/tests/incorrect_name_enum_field.out"}, {"start": 1525613, "audio": 0, "end": 1525655, "filename": "/vlib/v/checker/tests/incorrect_name_enum_field.vv"}, {"start": 1525655, "audio": 0, "end": 1525818, "filename": "/vlib/v/checker/tests/incorrect_name_fn_type.out"}, {"start": 1525818, "audio": 0, "end": 1525840, "filename": "/vlib/v/checker/tests/incorrect_name_fn_type.vv"}, {"start": 1525840, "audio": 0, "end": 1525988, "filename": "/vlib/v/checker/tests/incorrect_name_function.out"}, {"start": 1525988, "audio": 0, "end": 1526003, "filename": "/vlib/v/checker/tests/incorrect_name_function.vv"}, {"start": 1526003, "audio": 0, "end": 1526177, "filename": "/vlib/v/checker/tests/incorrect_name_interface.out"}, {"start": 1526177, "audio": 0, "end": 1526203, "filename": "/vlib/v/checker/tests/incorrect_name_interface.vv"}, {"start": 1526203, "audio": 0, "end": 1526400, "filename": "/vlib/v/checker/tests/incorrect_name_interface_method.out"}, {"start": 1526400, "audio": 0, "end": 1526439, "filename": "/vlib/v/checker/tests/incorrect_name_interface_method.vv"}, {"start": 1526439, "audio": 0, "end": 1526572, "filename": "/vlib/v/checker/tests/incorrect_name_module.out"}, {"start": 1526572, "audio": 0, "end": 1526582, "filename": "/vlib/v/checker/tests/incorrect_name_module.vv"}, {"start": 1526582, "audio": 0, "end": 1526730, "filename": "/vlib/v/checker/tests/incorrect_name_struct.out"}, {"start": 1526730, "audio": 0, "end": 1526744, "filename": "/vlib/v/checker/tests/incorrect_name_struct.vv"}, {"start": 1526744, "audio": 0, "end": 1526917, "filename": "/vlib/v/checker/tests/incorrect_name_struct_field.out"}, {"start": 1526917, "audio": 0, "end": 1526943, "filename": "/vlib/v/checker/tests/incorrect_name_struct_field.vv"}, {"start": 1526943, "audio": 0, "end": 1527118, "filename": "/vlib/v/checker/tests/incorrect_name_sum_type.out"}, {"start": 1527118, "audio": 0, "end": 1527154, "filename": "/vlib/v/checker/tests/incorrect_name_sum_type.vv"}, {"start": 1527154, "audio": 0, "end": 1527351, "filename": "/vlib/v/checker/tests/incorrect_name_variable.out"}, {"start": 1527351, "audio": 0, "end": 1527387, "filename": "/vlib/v/checker/tests/incorrect_name_variable.vv"}, {"start": 1527387, "audio": 0, "end": 1527550, "filename": "/vlib/v/checker/tests/int_modulo_by_zero_err.out"}, {"start": 1527550, "audio": 0, "end": 1527583, "filename": "/vlib/v/checker/tests/int_modulo_by_zero_err.vv"}, {"start": 1527583, "audio": 0, "end": 1530462, "filename": "/vlib/v/checker/tests/in_mismatch_type.out"}, {"start": 1530462, "audio": 0, "end": 1530978, "filename": "/vlib/v/checker/tests/in_mismatch_type.vv"}, {"start": 1530978, "audio": 0, "end": 1531289, "filename": "/vlib/v/checker/tests/is_type_not_exist.out"}, {"start": 1531289, "audio": 0, "end": 1531476, "filename": "/vlib/v/checker/tests/is_type_not_exist.vv"}, {"start": 1531476, "audio": 0, "end": 1531673, "filename": "/vlib/v/checker/tests/left_shift_err.out"}, {"start": 1531673, "audio": 0, "end": 1531718, "filename": "/vlib/v/checker/tests/left_shift_err.vv"}, {"start": 1531718, "audio": 0, "end": 1531897, "filename": "/vlib/v/checker/tests/main_args_err.out"}, {"start": 1531897, "audio": 0, "end": 1531931, "filename": "/vlib/v/checker/tests/main_args_err.vv"}, {"start": 1531931, "audio": 0, "end": 1532107, "filename": "/vlib/v/checker/tests/main_called_err.out"}, {"start": 1532107, "audio": 0, "end": 1532129, "filename": "/vlib/v/checker/tests/main_called_err.vv"}, {"start": 1532129, "audio": 0, "end": 1532302, "filename": "/vlib/v/checker/tests/main_return_err.out"}, {"start": 1532302, "audio": 0, "end": 1532333, "filename": "/vlib/v/checker/tests/main_return_err.vv"}, {"start": 1532333, "audio": 0, "end": 1532583, "filename": "/vlib/v/checker/tests/map_init_key_duplicate_err.out"}, {"start": 1532583, "audio": 0, "end": 1532665, "filename": "/vlib/v/checker/tests/map_init_key_duplicate_err.vv"}, {"start": 1532665, "audio": 0, "end": 1534153, "filename": "/vlib/v/checker/tests/match_duplicate_branch.out"}, {"start": 1534153, "audio": 0, "end": 1534905, "filename": "/vlib/v/checker/tests/match_duplicate_branch.vv"}, {"start": 1534905, "audio": 0, "end": 1535180, "filename": "/vlib/v/checker/tests/match_else_last_expr.out"}, {"start": 1535180, "audio": 0, "end": 1535277, "filename": "/vlib/v/checker/tests/match_else_last_expr.vv"}, {"start": 1535277, "audio": 0, "end": 1536258, "filename": "/vlib/v/checker/tests/match_expr_else.out"}, {"start": 1536258, "audio": 0, "end": 1536605, "filename": "/vlib/v/checker/tests/match_expr_else.vv"}, {"start": 1536605, "audio": 0, "end": 1536831, "filename": "/vlib/v/checker/tests/match_undefined_cond.out"}, {"start": 1536831, "audio": 0, "end": 1536936, "filename": "/vlib/v/checker/tests/match_undefined_cond.vv"}, {"start": 1536936, "audio": 0, "end": 1537125, "filename": "/vlib/v/checker/tests/minus_op_wrong_left_type_err_a.out"}, {"start": 1537125, "audio": 0, "end": 1537163, "filename": "/vlib/v/checker/tests/minus_op_wrong_left_type_err_a.vv"}, {"start": 1537163, "audio": 0, "end": 1537348, "filename": "/vlib/v/checker/tests/minus_op_wrong_left_type_err_b.out"}, {"start": 1537348, "audio": 0, "end": 1537379, "filename": "/vlib/v/checker/tests/minus_op_wrong_left_type_err_b.vv"}, {"start": 1537379, "audio": 0, "end": 1537590, "filename": "/vlib/v/checker/tests/minus_op_wrong_left_type_err_c.out"}, {"start": 1537590, "audio": 0, "end": 1537636, "filename": "/vlib/v/checker/tests/minus_op_wrong_left_type_err_c.vv"}, {"start": 1537636, "audio": 0, "end": 1537832, "filename": "/vlib/v/checker/tests/minus_op_wrong_right_type_err_a.out"}, {"start": 1537832, "audio": 0, "end": 1537870, "filename": "/vlib/v/checker/tests/minus_op_wrong_right_type_err_a.vv"}, {"start": 1537870, "audio": 0, "end": 1538062, "filename": "/vlib/v/checker/tests/minus_op_wrong_right_type_err_b.out"}, {"start": 1538062, "audio": 0, "end": 1538093, "filename": "/vlib/v/checker/tests/minus_op_wrong_right_type_err_b.vv"}, {"start": 1538093, "audio": 0, "end": 1538311, "filename": "/vlib/v/checker/tests/minus_op_wrong_right_type_err_c.out"}, {"start": 1538311, "audio": 0, "end": 1538357, "filename": "/vlib/v/checker/tests/minus_op_wrong_right_type_err_c.vv"}, {"start": 1538357, "audio": 0, "end": 1538565, "filename": "/vlib/v/checker/tests/module_multiple_names_err.out"}, {"start": 1538565, "audio": 0, "end": 1538619, "filename": "/vlib/v/checker/tests/module_multiple_names_err.vv"}, {"start": 1538619, "audio": 0, "end": 1538826, "filename": "/vlib/v/checker/tests/module_not_at_same_line_err.out"}, {"start": 1538826, "audio": 0, "end": 1538877, "filename": "/vlib/v/checker/tests/module_not_at_same_line_err.vv"}, {"start": 1538877, "audio": 0, "end": 1539060, "filename": "/vlib/v/checker/tests/module_syntax_err.out"}, {"start": 1539060, "audio": 0, "end": 1539114, "filename": "/vlib/v/checker/tests/module_syntax_err.vv"}, {"start": 1539114, "audio": 0, "end": 1539282, "filename": "/vlib/v/checker/tests/mod_op_wrong_left_type_err_a.out"}, {"start": 1539282, "audio": 0, "end": 1539305, "filename": "/vlib/v/checker/tests/mod_op_wrong_left_type_err_a.vv"}, {"start": 1539305, "audio": 0, "end": 1539487, "filename": "/vlib/v/checker/tests/mod_op_wrong_left_type_err_b.out"}, {"start": 1539487, "audio": 0, "end": 1539514, "filename": "/vlib/v/checker/tests/mod_op_wrong_left_type_err_b.vv"}, {"start": 1539514, "audio": 0, "end": 1539698, "filename": "/vlib/v/checker/tests/mod_op_wrong_left_type_err_c.out"}, {"start": 1539698, "audio": 0, "end": 1539740, "filename": "/vlib/v/checker/tests/mod_op_wrong_left_type_err_c.vv"}, {"start": 1539740, "audio": 0, "end": 1539948, "filename": "/vlib/v/checker/tests/mod_op_wrong_left_type_err_d.out"}, {"start": 1539948, "audio": 0, "end": 1539990, "filename": "/vlib/v/checker/tests/mod_op_wrong_left_type_err_d.vv"}, {"start": 1539990, "audio": 0, "end": 1540163, "filename": "/vlib/v/checker/tests/mod_op_wrong_right_type_err_a.out"}, {"start": 1540163, "audio": 0, "end": 1540186, "filename": "/vlib/v/checker/tests/mod_op_wrong_right_type_err_a.vv"}, {"start": 1540186, "audio": 0, "end": 1540373, "filename": "/vlib/v/checker/tests/mod_op_wrong_right_type_err_b.out"}, {"start": 1540373, "audio": 0, "end": 1540400, "filename": "/vlib/v/checker/tests/mod_op_wrong_right_type_err_b.vv"}, {"start": 1540400, "audio": 0, "end": 1540589, "filename": "/vlib/v/checker/tests/mod_op_wrong_right_type_err_c.out"}, {"start": 1540589, "audio": 0, "end": 1540631, "filename": "/vlib/v/checker/tests/mod_op_wrong_right_type_err_c.vv"}, {"start": 1540631, "audio": 0, "end": 1540844, "filename": "/vlib/v/checker/tests/mod_op_wrong_right_type_err_d.out"}, {"start": 1540844, "audio": 0, "end": 1540886, "filename": "/vlib/v/checker/tests/mod_op_wrong_right_type_err_d.vv"}, {"start": 1540886, "audio": 0, "end": 1541053, "filename": "/vlib/v/checker/tests/multiple_fn_attributes.out"}, {"start": 1541053, "audio": 0, "end": 1541102, "filename": "/vlib/v/checker/tests/multiple_fn_attributes.vv"}, {"start": 1541102, "audio": 0, "end": 1541319, "filename": "/vlib/v/checker/tests/multi_const_field_name_duplicate_err.out"}, {"start": 1541319, "audio": 0, "end": 1541379, "filename": "/vlib/v/checker/tests/multi_const_field_name_duplicate_err.vv"}, {"start": 1541379, "audio": 0, "end": 1541526, "filename": "/vlib/v/checker/tests/multi_names_err.out"}, {"start": 1541526, "audio": 0, "end": 1541554, "filename": "/vlib/v/checker/tests/multi_names_err.vv"}, {"start": 1541554, "audio": 0, "end": 1541741, "filename": "/vlib/v/checker/tests/mul_op_wrong_left_type_err_a.out"}, {"start": 1541741, "audio": 0, "end": 1541779, "filename": "/vlib/v/checker/tests/mul_op_wrong_left_type_err_a.vv"}, {"start": 1541779, "audio": 0, "end": 1541962, "filename": "/vlib/v/checker/tests/mul_op_wrong_left_type_err_b.out"}, {"start": 1541962, "audio": 0, "end": 1541993, "filename": "/vlib/v/checker/tests/mul_op_wrong_left_type_err_b.vv"}, {"start": 1541993, "audio": 0, "end": 1542202, "filename": "/vlib/v/checker/tests/mul_op_wrong_left_type_err_c.out"}, {"start": 1542202, "audio": 0, "end": 1542248, "filename": "/vlib/v/checker/tests/mul_op_wrong_left_type_err_c.vv"}, {"start": 1542248, "audio": 0, "end": 1542442, "filename": "/vlib/v/checker/tests/mul_op_wrong_right_type_err_a.out"}, {"start": 1542442, "audio": 0, "end": 1542480, "filename": "/vlib/v/checker/tests/mul_op_wrong_right_type_err_a.vv"}, {"start": 1542480, "audio": 0, "end": 1542670, "filename": "/vlib/v/checker/tests/mul_op_wrong_right_type_err_b.out"}, {"start": 1542670, "audio": 0, "end": 1542701, "filename": "/vlib/v/checker/tests/mul_op_wrong_right_type_err_b.vv"}, {"start": 1542701, "audio": 0, "end": 1542917, "filename": "/vlib/v/checker/tests/mul_op_wrong_right_type_err_c.out"}, {"start": 1542917, "audio": 0, "end": 1542963, "filename": "/vlib/v/checker/tests/mul_op_wrong_right_type_err_c.vv"}, {"start": 1542963, "audio": 0, "end": 1543190, "filename": "/vlib/v/checker/tests/mut_receiver_warning.out"}, {"start": 1543190, "audio": 0, "end": 1543303, "filename": "/vlib/v/checker/tests/mut_receiver_warning.vv"}, {"start": 1543303, "audio": 0, "end": 1543503, "filename": "/vlib/v/checker/tests/no_interface_instantiation_a.out"}, {"start": 1543503, "audio": 0, "end": 1543558, "filename": "/vlib/v/checker/tests/no_interface_instantiation_a.vv"}, {"start": 1543558, "audio": 0, "end": 1543747, "filename": "/vlib/v/checker/tests/no_interface_instantiation_b.out"}, {"start": 1543747, "audio": 0, "end": 1543821, "filename": "/vlib/v/checker/tests/no_interface_instantiation_b.vv"}, {"start": 1543821, "audio": 0, "end": 1544042, "filename": "/vlib/v/checker/tests/no_interface_instantiation_c.out"}, {"start": 1544042, "audio": 0, "end": 1544149, "filename": "/vlib/v/checker/tests/no_interface_instantiation_c.vv"}, {"start": 1544149, "audio": 0, "end": 1544328, "filename": "/vlib/v/checker/tests/no_interface_receiver.out"}, {"start": 1544328, "audio": 0, "end": 1544382, "filename": "/vlib/v/checker/tests/no_interface_receiver.vv"}, {"start": 1544382, "audio": 0, "end": 1544546, "filename": "/vlib/v/checker/tests/no_main_mod.out"}, {"start": 1544546, "audio": 0, "end": 1544555, "filename": "/vlib/v/checker/tests/no_main_mod.vv"}, {"start": 1544555, "audio": 0, "end": 1544713, "filename": "/vlib/v/checker/tests/no_main_println_err.out"}, {"start": 1544713, "audio": 0, "end": 1544727, "filename": "/vlib/v/checker/tests/no_main_println_err.vv"}, {"start": 1544727, "audio": 0, "end": 1546294, "filename": "/vlib/v/checker/tests/no_pub_in_main.out"}, {"start": 1546294, "audio": 0, "end": 1546571, "filename": "/vlib/v/checker/tests/no_pub_in_main.vv"}, {"start": 1546571, "audio": 0, "end": 1546757, "filename": "/vlib/v/checker/tests/oct_lit_without_digit_err.out"}, {"start": 1546757, "audio": 0, "end": 1546787, "filename": "/vlib/v/checker/tests/oct_lit_without_digit_err.vv"}, {"start": 1546787, "audio": 0, "end": 1546980, "filename": "/vlib/v/checker/tests/oct_lit_wrong_digit_err.out"}, {"start": 1546980, "audio": 0, "end": 1547014, "filename": "/vlib/v/checker/tests/oct_lit_wrong_digit_err.vv"}, {"start": 1547014, "audio": 0, "end": 1547287, "filename": "/vlib/v/checker/tests/reference_field_must_be_initialized.out"}, {"start": 1547287, "audio": 0, "end": 1547410, "filename": "/vlib/v/checker/tests/reference_field_must_be_initialized.vv"}, {"start": 1547410, "audio": 0, "end": 1547603, "filename": "/vlib/v/checker/tests/return_type.out"}, {"start": 1547603, "audio": 0, "end": 1547648, "filename": "/vlib/v/checker/tests/return_type.vv"}, {"start": 1547648, "audio": 0, "end": 1547832, "filename": "/vlib/v/checker/tests/shift_op_wrong_left_type_err.out"}, {"start": 1547832, "audio": 0, "end": 1547855, "filename": "/vlib/v/checker/tests/shift_op_wrong_left_type_err.vv"}, {"start": 1547855, "audio": 0, "end": 1548045, "filename": "/vlib/v/checker/tests/shift_op_wrong_right_type_err.out"}, {"start": 1548045, "audio": 0, "end": 1548068, "filename": "/vlib/v/checker/tests/shift_op_wrong_right_type_err.vv"}, {"start": 1548068, "audio": 0, "end": 1548274, "filename": "/vlib/v/checker/tests/short_struct_too_many.out"}, {"start": 1548274, "audio": 0, "end": 1548346, "filename": "/vlib/v/checker/tests/short_struct_too_many.vv"}, {"start": 1548346, "audio": 0, "end": 1548531, "filename": "/vlib/v/checker/tests/struct_field_name_duplicate_err.out"}, {"start": 1548531, "audio": 0, "end": 1548561, "filename": "/vlib/v/checker/tests/struct_field_name_duplicate_err.vv"}, {"start": 1548561, "audio": 0, "end": 1548737, "filename": "/vlib/v/checker/tests/struct_pub_field.out"}, {"start": 1548737, "audio": 0, "end": 1548800, "filename": "/vlib/v/checker/tests/struct_pub_field.vv"}, {"start": 1548800, "audio": 0, "end": 1549052, "filename": "/vlib/v/checker/tests/struct_unknown_field.out"}, {"start": 1549052, "audio": 0, "end": 1549156, "filename": "/vlib/v/checker/tests/struct_unknown_field.vv"}, {"start": 1549156, "audio": 0, "end": 1549346, "filename": "/vlib/v/checker/tests/sum_type_exists.out"}, {"start": 1549346, "audio": 0, "end": 1549407, "filename": "/vlib/v/checker/tests/sum_type_exists.vv"}, {"start": 1549407, "audio": 0, "end": 1549644, "filename": "/vlib/v/checker/tests/trailing_comma_struct_attr.out"}, {"start": 1549644, "audio": 0, "end": 1549707, "filename": "/vlib/v/checker/tests/trailing_comma_struct_attr.vv"}, {"start": 1549707, "audio": 0, "end": 1549940, "filename": "/vlib/v/checker/tests/unexpected_or.out"}, {"start": 1549940, "audio": 0, "end": 1550013, "filename": "/vlib/v/checker/tests/unexpected_or.vv"}, {"start": 1550013, "audio": 0, "end": 1550271, "filename": "/vlib/v/checker/tests/unexpected_or_propagate.out"}, {"start": 1550271, "audio": 0, "end": 1550384, "filename": "/vlib/v/checker/tests/unexpected_or_propagate.vv"}, {"start": 1550384, "audio": 0, "end": 1550573, "filename": "/vlib/v/checker/tests/unimplemented_interface_a.out"}, {"start": 1550573, "audio": 0, "end": 1550672, "filename": "/vlib/v/checker/tests/unimplemented_interface_a.vv"}, {"start": 1550672, "audio": 0, "end": 1550921, "filename": "/vlib/v/checker/tests/unimplemented_interface_b.out"}, {"start": 1550921, "audio": 0, "end": 1551050, "filename": "/vlib/v/checker/tests/unimplemented_interface_b.vv"}, {"start": 1551050, "audio": 0, "end": 1551285, "filename": "/vlib/v/checker/tests/unimplemented_interface_c.out"}, {"start": 1551285, "audio": 0, "end": 1551407, "filename": "/vlib/v/checker/tests/unimplemented_interface_c.vv"}, {"start": 1551407, "audio": 0, "end": 1551652, "filename": "/vlib/v/checker/tests/unimplemented_interface_d.out"}, {"start": 1551652, "audio": 0, "end": 1551776, "filename": "/vlib/v/checker/tests/unimplemented_interface_d.vv"}, {"start": 1551776, "audio": 0, "end": 1552021, "filename": "/vlib/v/checker/tests/unimplemented_interface_e.out"}, {"start": 1552021, "audio": 0, "end": 1552154, "filename": "/vlib/v/checker/tests/unimplemented_interface_e.vv"}, {"start": 1552154, "audio": 0, "end": 1552443, "filename": "/vlib/v/checker/tests/unimplemented_interface_f.out"}, {"start": 1552443, "audio": 0, "end": 1552579, "filename": "/vlib/v/checker/tests/unimplemented_interface_f.vv"}, {"start": 1552579, "audio": 0, "end": 1552887, "filename": "/vlib/v/checker/tests/unimplemented_interface_g.out"}, {"start": 1552887, "audio": 0, "end": 1553058, "filename": "/vlib/v/checker/tests/unimplemented_interface_g.vv.disabled"}, {"start": 1553058, "audio": 0, "end": 1553246, "filename": "/vlib/v/checker/tests/unknown_field.out"}, {"start": 1553246, "audio": 0, "end": 1553318, "filename": "/vlib/v/checker/tests/unknown_field.vv"}, {"start": 1553318, "audio": 0, "end": 1553513, "filename": "/vlib/v/checker/tests/unknown_method.out"}, {"start": 1553513, "audio": 0, "end": 1553587, "filename": "/vlib/v/checker/tests/unknown_method.vv"}, {"start": 1553587, "audio": 0, "end": 1554554, "filename": "/vlib/v/checker/tests/unnecessary_parenthesis.out"}, {"start": 1554554, "audio": 0, "end": 1554715, "filename": "/vlib/v/checker/tests/unnecessary_parenthesis.vv"}, {"start": 1554715, "audio": 0, "end": 1554932, "filename": "/vlib/v/checker/tests/unreachable_code.out"}, {"start": 1554932, "audio": 0, "end": 1555025, "filename": "/vlib/v/checker/tests/unreachable_code.vv"}, {"start": 1555025, "audio": 0, "end": 1555179, "filename": "/vlib/v/checker/tests/var_eval_not_used.out"}, {"start": 1555179, "audio": 0, "end": 1555214, "filename": "/vlib/v/checker/tests/var_eval_not_used.vv"}, {"start": 1555214, "audio": 0, "end": 1555402, "filename": "/vlib/v/checker/tests/var_eval_not_used_scope.out"}, {"start": 1555402, "audio": 0, "end": 1555444, "filename": "/vlib/v/checker/tests/var_eval_not_used_scope.vv"}, {"start": 1555444, "audio": 0, "end": 1555663, "filename": "/vlib/v/checker/tests/void_fn_as_value.out"}, {"start": 1555663, "audio": 0, "end": 1555752, "filename": "/vlib/v/checker/tests/void_fn_as_value.vv"}, {"start": 1555752, "audio": 0, "end": 1556017, "filename": "/vlib/v/checker/tests/void_function_assign_to_string.out"}, {"start": 1556017, "audio": 0, "end": 1556102, "filename": "/vlib/v/checker/tests/void_function_assign_to_string.vv"}, {"start": 1556102, "audio": 0, "end": 1556367, "filename": "/vlib/v/checker/tests/wrong_propagate_ret_type.out"}, {"start": 1556367, "audio": 0, "end": 1556454, "filename": "/vlib/v/checker/tests/wrong_propagate_ret_type.vv"}, {"start": 1556454, "audio": 0, "end": 1556636, "filename": "/vlib/v/checker/tests/globals/incorrect_name_global.out"}, {"start": 1556636, "audio": 0, "end": 1556652, "filename": "/vlib/v/checker/tests/globals/incorrect_name_global.vv"}, {"start": 1556652, "audio": 0, "end": 1557488, "filename": "/vlib/v/checker/tests/run/assign_expr_unresolved_variables_err_chain.run.out"}, {"start": 1557488, "audio": 0, "end": 1557526, "filename": "/vlib/v/checker/tests/run/assign_expr_unresolved_variables_err_chain.vv"}, {"start": 1557526, "audio": 0, "end": 1560518, "filename": "/vlib/v/depgraph/depgraph.v"}, {"start": 1560518, "audio": 0, "end": 1563706, "filename": "/vlib/v/doc/doc.v"}, {"start": 1563706, "audio": 0, "end": 1563897, "filename": "/vlib/v/doc/doc_test.v"}, {"start": 1563897, "audio": 0, "end": 1564219, "filename": "/vlib/v/errors/errors.v"}, {"start": 1564219, "audio": 0, "end": 1566010, "filename": "/vlib/v/eval/eval.v"}, {"start": 1566010, "audio": 0, "end": 1590614, "filename": "/vlib/v/fmt/fmt.v"}, {"start": 1590614, "audio": 0, "end": 1592729, "filename": "/vlib/v/fmt/fmt_keep_test.v"}, {"start": 1592729, "audio": 0, "end": 1594824, "filename": "/vlib/v/fmt/fmt_test.v"}, {"start": 1594824, "audio": 0, "end": 1596754, "filename": "/vlib/v/fmt/fmt_vlib_test.v"}, {"start": 1596754, "audio": 0, "end": 1597306, "filename": "/vlib/v/fmt/tests/anon_fn_expected.vv"}, {"start": 1597306, "audio": 0, "end": 1597886, "filename": "/vlib/v/fmt/tests/anon_fn_input.vv"}, {"start": 1597886, "audio": 0, "end": 1598230, "filename": "/vlib/v/fmt/tests/array_newlines_keep.vv"}, {"start": 1598230, "audio": 0, "end": 1598422, "filename": "/vlib/v/fmt/tests/array_slices_expected.vv"}, {"start": 1598422, "audio": 0, "end": 1598656, "filename": "/vlib/v/fmt/tests/array_slices_input.vv"}, {"start": 1598656, "audio": 0, "end": 1598749, "filename": "/vlib/v/fmt/tests/asserts_keep.vv"}, {"start": 1598749, "audio": 0, "end": 1598840, "filename": "/vlib/v/fmt/tests/blocks_expected.vv"}, {"start": 1598840, "audio": 0, "end": 1598923, "filename": "/vlib/v/fmt/tests/blocks_input.vv"}, {"start": 1598923, "audio": 0, "end": 1599005, "filename": "/vlib/v/fmt/tests/cast_expected.vv"}, {"start": 1599005, "audio": 0, "end": 1599091, "filename": "/vlib/v/fmt/tests/cast_input.vv"}, {"start": 1599091, "audio": 0, "end": 1599120, "filename": "/vlib/v/fmt/tests/char_literal_backtick_keep.vv"}, {"start": 1599120, "audio": 0, "end": 1599363, "filename": "/vlib/v/fmt/tests/concat_expr_expected.vv"}, {"start": 1599363, "audio": 0, "end": 1599613, "filename": "/vlib/v/fmt/tests/concat_expr_input.vv"}, {"start": 1599613, "audio": 0, "end": 1600059, "filename": "/vlib/v/fmt/tests/conditional_compilation_keep.vv"}, {"start": 1600059, "audio": 0, "end": 1600207, "filename": "/vlib/v/fmt/tests/conditions_expected.vv"}, {"start": 1600207, "audio": 0, "end": 1600351, "filename": "/vlib/v/fmt/tests/conditions_input.vv"}, {"start": 1600351, "audio": 0, "end": 1601038, "filename": "/vlib/v/fmt/tests/consts_expected.vv"}, {"start": 1601038, "audio": 0, "end": 1601651, "filename": "/vlib/v/fmt/tests/consts_input.vv"}, {"start": 1601651, "audio": 0, "end": 1601714, "filename": "/vlib/v/fmt/tests/enums_expected.vv"}, {"start": 1601714, "audio": 0, "end": 1601776, "filename": "/vlib/v/fmt/tests/enums_input.vv"}, {"start": 1601776, "audio": 0, "end": 1602730, "filename": "/vlib/v/fmt/tests/functions_expected.vv"}, {"start": 1602730, "audio": 0, "end": 1603679, "filename": "/vlib/v/fmt/tests/functions_input.vv"}, {"start": 1603679, "audio": 0, "end": 1603718, "filename": "/vlib/v/fmt/tests/goto_expected.vv"}, {"start": 1603718, "audio": 0, "end": 1603756, "filename": "/vlib/v/fmt/tests/goto_input.vv"}, {"start": 1603756, "audio": 0, "end": 1603957, "filename": "/vlib/v/fmt/tests/go_stmt_expected.vv"}, {"start": 1603957, "audio": 0, "end": 1604171, "filename": "/vlib/v/fmt/tests/go_stmt_input.vv"}, {"start": 1604171, "audio": 0, "end": 1604263, "filename": "/vlib/v/fmt/tests/import_multiple_expected.vv"}, {"start": 1604263, "audio": 0, "end": 1604355, "filename": "/vlib/v/fmt/tests/import_multiple_input.vv"}, {"start": 1604355, "audio": 0, "end": 1604527, "filename": "/vlib/v/fmt/tests/import_multiple_with_alias_expected.vv"}, {"start": 1604527, "audio": 0, "end": 1604699, "filename": "/vlib/v/fmt/tests/import_multiple_with_alias_input.vv"}, {"start": 1604699, "audio": 0, "end": 1604746, "filename": "/vlib/v/fmt/tests/import_single_expected.vv"}, {"start": 1604746, "audio": 0, "end": 1604793, "filename": "/vlib/v/fmt/tests/import_single_input.vv"}, {"start": 1604793, "audio": 0, "end": 1604905, "filename": "/vlib/v/fmt/tests/import_with_alias_keep.vv"}, {"start": 1604905, "audio": 0, "end": 1605195, "filename": "/vlib/v/fmt/tests/integer_literal_keep.vv"}, {"start": 1605195, "audio": 0, "end": 1605417, "filename": "/vlib/v/fmt/tests/loops_expected.vv"}, {"start": 1605417, "audio": 0, "end": 1605637, "filename": "/vlib/v/fmt/tests/loops_input.vv"}, {"start": 1605637, "audio": 0, "end": 1605740, "filename": "/vlib/v/fmt/tests/maps_expected.vv"}, {"start": 1605740, "audio": 0, "end": 1605872, "filename": "/vlib/v/fmt/tests/maps_input.vv"}, {"start": 1605872, "audio": 0, "end": 1606063, "filename": "/vlib/v/fmt/tests/maps_keep.vv"}, {"start": 1606063, "audio": 0, "end": 1606392, "filename": "/vlib/v/fmt/tests/match_expected.vv"}, {"start": 1606392, "audio": 0, "end": 1606736, "filename": "/vlib/v/fmt/tests/match_input.vv"}, {"start": 1606736, "audio": 0, "end": 1606784, "filename": "/vlib/v/fmt/tests/missing_import_expected.vv"}, {"start": 1606784, "audio": 0, "end": 1606819, "filename": "/vlib/v/fmt/tests/missing_import_input.vv"}, {"start": 1606819, "audio": 0, "end": 1606927, "filename": "/vlib/v/fmt/tests/module_struct_keep.vv"}, {"start": 1606927, "audio": 0, "end": 1607237, "filename": "/vlib/v/fmt/tests/multiline_comment_keep.vv"}, {"start": 1607237, "audio": 0, "end": 1607287, "filename": "/vlib/v/fmt/tests/optional_keep.vv"}, {"start": 1607287, "audio": 0, "end": 1607338, "filename": "/vlib/v/fmt/tests/optional_propagate_keep.vv"}, {"start": 1607338, "audio": 0, "end": 1607503, "filename": "/vlib/v/fmt/tests/or_expected.vv"}, {"start": 1607503, "audio": 0, "end": 1607662, "filename": "/vlib/v/fmt/tests/or_input.vv"}, {"start": 1607662, "audio": 0, "end": 1607886, "filename": "/vlib/v/fmt/tests/string_interpolation_literal_keep.vv"}, {"start": 1607886, "audio": 0, "end": 1608260, "filename": "/vlib/v/fmt/tests/string_quotes_expected.vv"}, {"start": 1608260, "audio": 0, "end": 1608634, "filename": "/vlib/v/fmt/tests/string_quotes_input.vv"}, {"start": 1608634, "audio": 0, "end": 1608948, "filename": "/vlib/v/fmt/tests/structs_expected.vv"}, {"start": 1608948, "audio": 0, "end": 1609245, "filename": "/vlib/v/fmt/tests/structs_input.vv"}, {"start": 1609245, "audio": 0, "end": 1609336, "filename": "/vlib/v/fmt/tests/struct_init_keep.vv"}, {"start": 1609336, "audio": 0, "end": 1609575, "filename": "/vlib/v/fmt/tests/struct_keep.vv"}, {"start": 1609575, "audio": 0, "end": 1609616, "filename": "/vlib/v/fmt/tests/typeof_keep.vv"}, {"start": 1609616, "audio": 0, "end": 1610036, "filename": "/vlib/v/fmt/tests/types_expected.vv"}, {"start": 1610036, "audio": 0, "end": 1610508, "filename": "/vlib/v/fmt/tests/types_input.vv"}, {"start": 1610508, "audio": 0, "end": 1610650, "filename": "/vlib/v/fmt/tests/type_ptr_keep.vv"}, {"start": 1610650, "audio": 0, "end": 1726018, "filename": "/vlib/v/gen/cgen.v"}, {"start": 1726018, "audio": 0, "end": 1727823, "filename": "/vlib/v/gen/cgen_test.v"}, {"start": 1727823, "audio": 0, "end": 1739519, "filename": "/vlib/v/gen/cheaders.v"}, {"start": 1739519, "audio": 0, "end": 1741120, "filename": "/vlib/v/gen/comptime.v"}, {"start": 1741120, "audio": 0, "end": 1761107, "filename": "/vlib/v/gen/fn.v"}, {"start": 1761107, "audio": 0, "end": 1765661, "filename": "/vlib/v/gen/json.v"}, {"start": 1765661, "audio": 0, "end": 1768724, "filename": "/vlib/v/gen/live.v"}, {"start": 1768724, "audio": 0, "end": 1770706, "filename": "/vlib/v/gen/profile.v"}, {"start": 1770706, "audio": 0, "end": 1774086, "filename": "/vlib/v/gen/str.v"}, {"start": 1774086, "audio": 0, "end": 1802560, "filename": "/vlib/v/gen/js/js.v"}, {"start": 1802560, "audio": 0, "end": 1804743, "filename": "/vlib/v/gen/js/jsdoc.v"}, {"start": 1804743, "audio": 0, "end": 1806560, "filename": "/vlib/v/gen/js/tests/array.js"}, {"start": 1806560, "audio": 0, "end": 1807193, "filename": "/vlib/v/gen/js/tests/array.v"}, {"start": 1807193, "audio": 0, "end": 1812844, "filename": "/vlib/v/gen/js/tests/js.js"}, {"start": 1812844, "audio": 0, "end": 1814758, "filename": "/vlib/v/gen/js/tests/js.v"}, {"start": 1814758, "audio": 0, "end": 1815404, "filename": "/vlib/v/gen/js/tests/simple.js"}, {"start": 1815404, "audio": 0, "end": 1815455, "filename": "/vlib/v/gen/js/tests/simple.v"}, {"start": 1815455, "audio": 0, "end": 1816958, "filename": "/vlib/v/gen/js/tests/struct.js"}, {"start": 1816958, "audio": 0, "end": 1817257, "filename": "/vlib/v/gen/js/tests/struct.v"}, {"start": 1817257, "audio": 0, "end": 1817590, "filename": "/vlib/v/gen/js/tests/hello/hello.v"}, {"start": 1817590, "audio": 0, "end": 1817700, "filename": "/vlib/v/gen/js/tests/hello/Hello1/hello1.v"}, {"start": 1817700, "audio": 0, "end": 1822651, "filename": "/vlib/v/gen/tests/1.c"}, {"start": 1822651, "audio": 0, "end": 1825886, "filename": "/vlib/v/gen/tests/1.vv"}, {"start": 1825886, "audio": 0, "end": 1827070, "filename": "/vlib/v/gen/tests/2.c"}, {"start": 1827070, "audio": 0, "end": 1827853, "filename": "/vlib/v/gen/tests/2.vv"}, {"start": 1827853, "audio": 0, "end": 1829854, "filename": "/vlib/v/gen/tests/3.c"}, {"start": 1829854, "audio": 0, "end": 1830682, "filename": "/vlib/v/gen/tests/3.vv"}, {"start": 1830682, "audio": 0, "end": 1833894, "filename": "/vlib/v/gen/tests/4.c"}, {"start": 1833894, "audio": 0, "end": 1835100, "filename": "/vlib/v/gen/tests/4.vv"}, {"start": 1835100, "audio": 0, "end": 1835146, "filename": "/vlib/v/gen/tests/if_expr.vv"}, {"start": 1835146, "audio": 0, "end": 1835268, "filename": "/vlib/v/gen/tests/localmod/localmod.v"}, {"start": 1835268, "audio": 0, "end": 1838245, "filename": "/vlib/v/gen/x64/elf.v"}, {"start": 1838245, "audio": 0, "end": 1840708, "filename": "/vlib/v/gen/x64/elf_obj.v"}, {"start": 1840708, "audio": 0, "end": 1856145, "filename": "/vlib/v/gen/x64/gen.v"}, {"start": 1856145, "audio": 0, "end": 1856895, "filename": "/vlib/v/gen/x64/tests/general.vv"}, {"start": 1856895, "audio": 0, "end": 1857008, "filename": "/vlib/v/gen/x64/tests/general.vv.out"}, {"start": 1857008, "audio": 0, "end": 1857049, "filename": "/vlib/v/gen/x64/tests/hello.vv"}, {"start": 1857049, "audio": 0, "end": 1857065, "filename": "/vlib/v/gen/x64/tests/hello.vv.out"}, {"start": 1857065, "audio": 0, "end": 1857237, "filename": "/vlib/v/gen/x64/tests/simple_fn_calls.vv"}, {"start": 1857237, "audio": 0, "end": 1857270, "filename": "/vlib/v/gen/x64/tests/simple_fn_calls.vv.out"}, {"start": 1857270, "audio": 0, "end": 1859185, "filename": "/vlib/v/gen/x64/tests/x64_test.v"}, {"start": 1859185, "audio": 0, "end": 1861957, "filename": "/vlib/v/parser/assign.v"}, {"start": 1861957, "audio": 0, "end": 1866908, "filename": "/vlib/v/parser/comptime.v"}, {"start": 1866908, "audio": 0, "end": 1870353, "filename": "/vlib/v/parser/containers.v"}, {"start": 1870353, "audio": 0, "end": 1881457, "filename": "/vlib/v/parser/fn.v"}, {"start": 1881457, "audio": 0, "end": 1885029, "filename": "/vlib/v/parser/for.v"}, {"start": 1885029, "audio": 0, "end": 1889616, "filename": "/vlib/v/parser/if.v"}, {"start": 1889616, "audio": 0, "end": 1890819, "filename": "/vlib/v/parser/module.v"}, {"start": 1890819, "audio": 0, "end": 1923271, "filename": "/vlib/v/parser/parser.v"}, {"start": 1923271, "audio": 0, "end": 1927175, "filename": "/vlib/v/parser/parser_test.v"}, {"start": 1927175, "audio": 0, "end": 1932672, "filename": "/vlib/v/parser/parse_type.v"}, {"start": 1932672, "audio": 0, "end": 1937514, "filename": "/vlib/v/parser/pratt.v"}, {"start": 1937514, "audio": 0, "end": 1945593, "filename": "/vlib/v/parser/struct.v"}, {"start": 1945593, "audio": 0, "end": 1948107, "filename": "/vlib/v/pref/default.v"}, {"start": 1948107, "audio": 0, "end": 1949958, "filename": "/vlib/v/pref/os.v"}, {"start": 1949958, "audio": 0, "end": 1959607, "filename": "/vlib/v/pref/pref.v"}, {"start": 1959607, "audio": 0, "end": 1961428, "filename": "/vlib/v/pref/should_compile.v"}, {"start": 1961428, "audio": 0, "end": 1987419, "filename": "/vlib/v/scanner/scanner.v"}, {"start": 1987419, "audio": 0, "end": 1988506, "filename": "/vlib/v/scanner/scanner_test.v"}, {"start": 1988506, "audio": 0, "end": 2004168, "filename": "/vlib/v/table/atypes.v"}, {"start": 2004168, "audio": 0, "end": 2006359, "filename": "/vlib/v/table/cflags.v"}, {"start": 2006359, "audio": 0, "end": 2008340, "filename": "/vlib/v/table/cflags_test.v"}, {"start": 2008340, "audio": 0, "end": 2018694, "filename": "/vlib/v/table/table.v"}, {"start": 2018694, "audio": 0, "end": 2019988, "filename": "/vlib/v/tests/array_equality_test.v"}, {"start": 2019988, "audio": 0, "end": 2024811, "filename": "/vlib/v/tests/array_init_test.v"}, {"start": 2024811, "audio": 0, "end": 2025679, "filename": "/vlib/v/tests/array_to_string_test.v"}, {"start": 2025679, "audio": 0, "end": 2026000, "filename": "/vlib/v/tests/asm_test.v"}, {"start": 2026000, "audio": 0, "end": 2026325, "filename": "/vlib/v/tests/attribute_test.v"}, {"start": 2026325, "audio": 0, "end": 2026452, "filename": "/vlib/v/tests/backtrace_test.v"}, {"start": 2026452, "audio": 0, "end": 2030086, "filename": "/vlib/v/tests/blank_ident_test.v"}, {"start": 2030086, "audio": 0, "end": 2032049, "filename": "/vlib/v/tests/complex_assign_test.v"}, {"start": 2032049, "audio": 0, "end": 2032385, "filename": "/vlib/v/tests/comptime_bittness_and_endianess_test.v"}, {"start": 2032385, "audio": 0, "end": 2032538, "filename": "/vlib/v/tests/const_embed_test.v"}, {"start": 2032538, "audio": 0, "end": 2032668, "filename": "/vlib/v/tests/const_test.v"}, {"start": 2032668, "audio": 0, "end": 2032837, "filename": "/vlib/v/tests/cstrings_test.v"}, {"start": 2032837, "audio": 0, "end": 2033542, "filename": "/vlib/v/tests/defer_test.v"}, {"start": 2033542, "audio": 0, "end": 2033861, "filename": "/vlib/v/tests/differently_named_structs_test.v"}, {"start": 2033861, "audio": 0, "end": 2034435, "filename": "/vlib/v/tests/enum_bitfield_test.v"}, {"start": 2034435, "audio": 0, "end": 2035106, "filename": "/vlib/v/tests/enum_default_value_in_struct_test.v"}, {"start": 2035106, "audio": 0, "end": 2035543, "filename": "/vlib/v/tests/enum_hex_test.v"}, {"start": 2035543, "audio": 0, "end": 2037238, "filename": "/vlib/v/tests/enum_test.v"}, {"start": 2037238, "audio": 0, "end": 2037988, "filename": "/vlib/v/tests/fixed_array_init_test.v"}, {"start": 2037988, "audio": 0, "end": 2038573, "filename": "/vlib/v/tests/fixed_array_test.v"}, {"start": 2038573, "audio": 0, "end": 2039292, "filename": "/vlib/v/tests/fixed_array_to_string_test.v"}, {"start": 2039292, "audio": 0, "end": 2039673, "filename": "/vlib/v/tests/fn_expecting_ref_but_returning_struct_test.v"}, {"start": 2039673, "audio": 0, "end": 2040196, "filename": "/vlib/v/tests/fn_expecting_ref_but_returning_struct_time_module_test.v"}, {"start": 2040196, "audio": 0, "end": 2042493, "filename": "/vlib/v/tests/fn_high_test.v"}, {"start": 2042493, "audio": 0, "end": 2044029, "filename": "/vlib/v/tests/fn_multiple_returns_test.v"}, {"start": 2044029, "audio": 0, "end": 2046027, "filename": "/vlib/v/tests/fn_test.v"}, {"start": 2046027, "audio": 0, "end": 2047810, "filename": "/vlib/v/tests/fn_variadic_test.v"}, {"start": 2047810, "audio": 0, "end": 2048581, "filename": "/vlib/v/tests/for_loops_test.v"}, {"start": 2048581, "audio": 0, "end": 2050982, "filename": "/vlib/v/tests/generic_test.v"}, {"start": 2050982, "audio": 0, "end": 2051075, "filename": "/vlib/v/tests/goto_test.v"}, {"start": 2051075, "audio": 0, "end": 2052756, "filename": "/vlib/v/tests/if_expression_test.v"}, {"start": 2052756, "audio": 0, "end": 2053833, "filename": "/vlib/v/tests/interfaces_map_test.v"}, {"start": 2053833, "audio": 0, "end": 2058294, "filename": "/vlib/v/tests/interface_test.v"}, {"start": 2058294, "audio": 0, "end": 2062646, "filename": "/vlib/v/tests/in_expression_test.v"}, {"start": 2062646, "audio": 0, "end": 2068547, "filename": "/vlib/v/tests/live_test.v"}, {"start": 2068547, "audio": 0, "end": 2068633, "filename": "/vlib/v/tests/local_test.v"}, {"start": 2068633, "audio": 0, "end": 2069486, "filename": "/vlib/v/tests/map_to_string_test.v"}, {"start": 2069486, "audio": 0, "end": 2070577, "filename": "/vlib/v/tests/match_expression_for_types_test.v"}, {"start": 2070577, "audio": 0, "end": 2071571, "filename": "/vlib/v/tests/match_test.v"}, {"start": 2071571, "audio": 0, "end": 2072056, "filename": "/vlib/v/tests/module_test.v"}, {"start": 2072056, "audio": 0, "end": 2072151, "filename": "/vlib/v/tests/multiple_assign_test.v"}, {"start": 2072151, "audio": 0, "end": 2072463, "filename": "/vlib/v/tests/multiret_with_ptrtype_test.v"}, {"start": 2072463, "audio": 0, "end": 2073261, "filename": "/vlib/v/tests/mut_test.v"}, {"start": 2073261, "audio": 0, "end": 2073673, "filename": "/vlib/v/tests/nameof_test.v"}, {"start": 2073673, "audio": 0, "end": 2074139, "filename": "/vlib/v/tests/nested_map_test.v"}, {"start": 2074139, "audio": 0, "end": 2074811, "filename": "/vlib/v/tests/num_lit_call_method_test.v"}, {"start": 2074811, "audio": 0, "end": 2075764, "filename": "/vlib/v/tests/operator_overloading_with_string_interpolation_test.v"}, {"start": 2075764, "audio": 0, "end": 2077837, "filename": "/vlib/v/tests/option_default_values_test.v"}, {"start": 2077837, "audio": 0, "end": 2078209, "filename": "/vlib/v/tests/option_if_assign_and_fallthrough_test.v"}, {"start": 2078209, "audio": 0, "end": 2078664, "filename": "/vlib/v/tests/option_print_errors_test.v"}, {"start": 2078664, "audio": 0, "end": 2082622, "filename": "/vlib/v/tests/option_test.v"}, {"start": 2082622, "audio": 0, "end": 2082725, "filename": "/vlib/v/tests/pointers_str_test.v"}, {"start": 2082725, "audio": 0, "end": 2083169, "filename": "/vlib/v/tests/pointers_test.v"}, {"start": 2083169, "audio": 0, "end": 2083203, "filename": "/vlib/v/tests/print_test.v"}, {"start": 2083203, "audio": 0, "end": 2083956, "filename": "/vlib/v/tests/prod_test.v"}, {"start": 2083956, "audio": 0, "end": 2084212, "filename": "/vlib/v/tests/repeated_multiret_values_test.v"}, {"start": 2084212, "audio": 0, "end": 2084688, "filename": "/vlib/v/tests/return_voidptr_test.v"}, {"start": 2084688, "audio": 0, "end": 2085147, "filename": "/vlib/v/tests/reusable_mut_multiret_values_test.v"}, {"start": 2085147, "audio": 0, "end": 2086482, "filename": "/vlib/v/tests/shift_test.v"}, {"start": 2086482, "audio": 0, "end": 2086696, "filename": "/vlib/v/tests/short_struct_param_syntax_test.v"}, {"start": 2086696, "audio": 0, "end": 2087389, "filename": "/vlib/v/tests/static_arrays_using_const_for_size_test.v"}, {"start": 2087389, "audio": 0, "end": 2089717, "filename": "/vlib/v/tests/string_interpolation_array_test.v"}, {"start": 2089717, "audio": 0, "end": 2091596, "filename": "/vlib/v/tests/string_interpolation_of_array_of_structs_test.v"}, {"start": 2091596, "audio": 0, "end": 2092882, "filename": "/vlib/v/tests/string_interpolation_struct_test.v"}, {"start": 2092882, "audio": 0, "end": 2097702, "filename": "/vlib/v/tests/string_interpolation_test.v"}, {"start": 2097702, "audio": 0, "end": 2098667, "filename": "/vlib/v/tests/string_interpolation_variadic_test.v"}, {"start": 2098667, "audio": 0, "end": 2099034, "filename": "/vlib/v/tests/string_struct_interpolation_test.v"}, {"start": 2099034, "audio": 0, "end": 2099620, "filename": "/vlib/v/tests/struct_chained_fields_correct_test.v"}, {"start": 2099620, "audio": 0, "end": 2104809, "filename": "/vlib/v/tests/struct_test.v"}, {"start": 2104809, "audio": 0, "end": 2108239, "filename": "/vlib/v/tests/str_gen_test.v"}, {"start": 2108239, "audio": 0, "end": 2109119, "filename": "/vlib/v/tests/sumtype_calls_test.v"}, {"start": 2109119, "audio": 0, "end": 2110487, "filename": "/vlib/v/tests/sum_type_test.v"}, {"start": 2110487, "audio": 0, "end": 2111931, "filename": "/vlib/v/tests/typeof_simple_types_test.v"}, {"start": 2111931, "audio": 0, "end": 2114103, "filename": "/vlib/v/tests/typeof_test.v"}, {"start": 2114103, "audio": 0, "end": 2114476, "filename": "/vlib/v/tests/type_alias_str_method_override_test.v"}, {"start": 2114476, "audio": 0, "end": 2114902, "filename": "/vlib/v/tests/type_alias_test.v"}, {"start": 2114902, "audio": 0, "end": 2115556, "filename": "/vlib/v/tests/vargs_auto_str_method_and_println_test.v"}, {"start": 2115556, "audio": 0, "end": 2116514, "filename": "/vlib/v/tests/vmod_parser_test.v"}, {"start": 2116514, "audio": 0, "end": 2116714, "filename": "/vlib/v/tests/voidptr_to_u64_cast_a_test.v"}, {"start": 2116714, "audio": 0, "end": 2116925, "filename": "/vlib/v/tests/voidptr_to_u64_cast_b_test.v"}, {"start": 2116925, "audio": 0, "end": 2117182, "filename": "/vlib/v/tests/working_with_an_empty_struct_test.v"}, {"start": 2117182, "audio": 0, "end": 2117474, "filename": "/vlib/v/tests/bench/val_vs_ptr.c"}, {"start": 2117474, "audio": 0, "end": 2117496, "filename": "/vlib/v/tests/inout/.gitignore"}, {"start": 2117496, "audio": 0, "end": 2117621, "filename": "/vlib/v/tests/inout/bad_st_as.out"}, {"start": 2117621, "audio": 0, "end": 2117905, "filename": "/vlib/v/tests/inout/bad_st_as.vv"}, {"start": 2117905, "audio": 0, "end": 2120546, "filename": "/vlib/v/tests/inout/compiler_test.v"}, {"start": 2120546, "audio": 0, "end": 2120604, "filename": "/vlib/v/tests/inout/enum_print.out"}, {"start": 2120604, "audio": 0, "end": 2120907, "filename": "/vlib/v/tests/inout/enum_print.vv"}, {"start": 2120907, "audio": 0, "end": 2120918, "filename": "/vlib/v/tests/inout/hello.out"}, {"start": 2120918, "audio": 0, "end": 2120967, "filename": "/vlib/v/tests/inout/hello.vv"}, {"start": 2120967, "audio": 0, "end": 2121125, "filename": "/vlib/v/tests/inout/hello_devs.out"}, {"start": 2121125, "audio": 0, "end": 2121309, "filename": "/vlib/v/tests/inout/hello_devs.vv"}, {"start": 2121309, "audio": 0, "end": 2121429, "filename": "/vlib/v/tests/inout/nested_structs.out"}, {"start": 2121429, "audio": 0, "end": 2121602, "filename": "/vlib/v/tests/inout/nested_structs.vv"}, {"start": 2121602, "audio": 0, "end": 2121664, "filename": "/vlib/v/tests/inout/os.out"}, {"start": 2121664, "audio": 0, "end": 2121872, "filename": "/vlib/v/tests/inout/os.vv"}, {"start": 2121872, "audio": 0, "end": 2122046, "filename": "/vlib/v/tests/inout/panic_with_cg.out"}, {"start": 2122046, "audio": 0, "end": 2122129, "filename": "/vlib/v/tests/inout/panic_with_cg.vv"}, {"start": 2122129, "audio": 0, "end": 2122143, "filename": "/vlib/v/tests/inout/string_interp.out"}, {"start": 2122143, "audio": 0, "end": 2122224, "filename": "/vlib/v/tests/inout/string_interp.vv"}, {"start": 2122224, "audio": 0, "end": 2122281, "filename": "/vlib/v/tests/local/local.v"}, {"start": 2122281, "audio": 0, "end": 2122313, "filename": "/vlib/v/tests/modules/acommentedmodule/commentedfile.v"}, {"start": 2122313, "audio": 0, "end": 2122848, "filename": "/vlib/v/tests/modules/amodule/another_internal_module_test.v"}, {"start": 2122848, "audio": 0, "end": 2123118, "filename": "/vlib/v/tests/modules/amodule/internal_module_test.v"}, {"start": 2123118, "audio": 0, "end": 2123326, "filename": "/vlib/v/tests/modules/amodule/module.v"}, {"start": 2123326, "audio": 0, "end": 2123573, "filename": "/vlib/v/tests/modules/simplemodule/importing_test.v"}, {"start": 2123573, "audio": 0, "end": 2123691, "filename": "/vlib/v/tests/modules/simplemodule/simplemodule.v"}, {"start": 2123691, "audio": 0, "end": 2123715, "filename": "/vlib/v/tests/prod/.gitignore"}, {"start": 2123715, "audio": 0, "end": 2123897, "filename": "/vlib/v/tests/prod/assoc.prod.v"}, {"start": 2123897, "audio": 0, "end": 2123922, "filename": "/vlib/v/tests/prod/assoc.prod.v.expected.txt"}, {"start": 2123922, "audio": 0, "end": 2123964, "filename": "/vlib/v/tests/project_with_c_code/.gitignore"}, {"start": 2123964, "audio": 0, "end": 2124113, "filename": "/vlib/v/tests/project_with_c_code/.v.mod.stop"}, {"start": 2124113, "audio": 0, "end": 2124191, "filename": "/vlib/v/tests/project_with_c_code/main.v"}, {"start": 2124191, "audio": 0, "end": 2124286, "filename": "/vlib/v/tests/project_with_c_code/main_test.v"}, {"start": 2124286, "audio": 0, "end": 2124388, "filename": "/vlib/v/tests/project_with_c_code/mod1/v.mod"}, {"start": 2124388, "audio": 0, "end": 2124558, "filename": "/vlib/v/tests/project_with_c_code/mod1/wrapper.v"}, {"start": 2124558, "audio": 0, "end": 2124625, "filename": "/vlib/v/tests/project_with_c_code/mod1/c/header.h"}, {"start": 2124625, "audio": 0, "end": 2124696, "filename": "/vlib/v/tests/project_with_c_code/mod1/c/implementation.c"}, {"start": 2124696, "audio": 0, "end": 2124730, "filename": "/vlib/v/tests/project_with_modules_having_submodules/.gitignore"}, {"start": 2124730, "audio": 0, "end": 2125392, "filename": "/vlib/v/tests/project_with_modules_having_submodules/README.md"}, {"start": 2125392, "audio": 0, "end": 2125614, "filename": "/vlib/v/tests/project_with_modules_having_submodules/v.mod"}, {"start": 2125614, "audio": 0, "end": 2125940, "filename": "/vlib/v/tests/project_with_modules_having_submodules/bin/a_program_under_bin_can_find_mod1_test.v"}, {"start": 2125940, "audio": 0, "end": 2126363, "filename": "/vlib/v/tests/project_with_modules_having_submodules/bin/main.vsh"}, {"start": 2126363, "audio": 0, "end": 2126405, "filename": "/vlib/v/tests/project_with_modules_having_submodules/mod1/m.v"}, {"start": 2126405, "audio": 0, "end": 2126519, "filename": "/vlib/v/tests/project_with_modules_having_submodules/mod1/v.mod"}, {"start": 2126519, "audio": 0, "end": 2126563, "filename": "/vlib/v/tests/project_with_modules_having_submodules/mod1/mod11/m.v"}, {"start": 2126563, "audio": 0, "end": 2126607, "filename": "/vlib/v/tests/project_with_modules_having_submodules/mod1/mod12/m.v"}, {"start": 2126607, "audio": 0, "end": 2126651, "filename": "/vlib/v/tests/project_with_modules_having_submodules/mod1/mod13/m.v"}, {"start": 2126651, "audio": 0, "end": 2126727, "filename": "/vlib/v/tests/project_with_modules_having_submodules/mod1/mod14/m.v"}, {"start": 2126727, "audio": 0, "end": 2127046, "filename": "/vlib/v/tests/project_with_modules_having_submodules/mod1/submodule/m.v"}, {"start": 2127046, "audio": 0, "end": 2127226, "filename": "/vlib/v/tests/project_with_modules_having_submodules/tests/submodule_test.v"}, {"start": 2127226, "audio": 0, "end": 2127253, "filename": "/vlib/v/tests/repl/.gitattributes"}, {"start": 2127253, "audio": 0, "end": 2127298, "filename": "/vlib/v/tests/repl/.gitignore"}, {"start": 2127298, "audio": 0, "end": 2127380, "filename": "/vlib/v/tests/repl/array.repl"}, {"start": 2127380, "audio": 0, "end": 2127416, "filename": "/vlib/v/tests/repl/array_init.repl"}, {"start": 2127416, "audio": 0, "end": 2127518, "filename": "/vlib/v/tests/repl/bad_in_type.repl.skip"}, {"start": 2127518, "audio": 0, "end": 2127597, "filename": "/vlib/v/tests/repl/comment.repl"}, {"start": 2127597, "audio": 0, "end": 2127656, "filename": "/vlib/v/tests/repl/default_printing.repl"}, {"start": 2127656, "audio": 0, "end": 2127719, "filename": "/vlib/v/tests/repl/empty_struct.repl.skip"}, {"start": 2127719, "audio": 0, "end": 2127989, "filename": "/vlib/v/tests/repl/entire_commented_module.repl"}, {"start": 2127989, "audio": 0, "end": 2128096, "filename": "/vlib/v/tests/repl/error.repl"}, {"start": 2128096, "audio": 0, "end": 2128137, "filename": "/vlib/v/tests/repl/error_nosave.repl.skip"}, {"start": 2128137, "audio": 0, "end": 2128239, "filename": "/vlib/v/tests/repl/function.repl.skip"}, {"start": 2128239, "audio": 0, "end": 2128301, "filename": "/vlib/v/tests/repl/import.repl"}, {"start": 2128301, "audio": 0, "end": 2128387, "filename": "/vlib/v/tests/repl/import_middle.repl"}, {"start": 2128387, "audio": 0, "end": 2128523, "filename": "/vlib/v/tests/repl/multiple_decl.repl"}, {"start": 2128523, "audio": 0, "end": 2128633, "filename": "/vlib/v/tests/repl/multiple_println.repl"}, {"start": 2128633, "audio": 0, "end": 2128675, "filename": "/vlib/v/tests/repl/naked_strings.repl"}, {"start": 2128675, "audio": 0, "end": 2128690, "filename": "/vlib/v/tests/repl/newlines.repl"}, {"start": 2128690, "audio": 0, "end": 2128723, "filename": "/vlib/v/tests/repl/nomain.repl"}, {"start": 2128723, "audio": 0, "end": 2128736, "filename": "/vlib/v/tests/repl/nothing.repl"}, {"start": 2128736, "audio": 0, "end": 2128761, "filename": "/vlib/v/tests/repl/open_close_string_check.repl"}, {"start": 2128761, "audio": 0, "end": 2128880, "filename": "/vlib/v/tests/repl/option.repl.skip"}, {"start": 2128880, "audio": 0, "end": 2128926, "filename": "/vlib/v/tests/repl/postfix_operators.repl"}, {"start": 2128926, "audio": 0, "end": 2129070, "filename": "/vlib/v/tests/repl/println.repl"}, {"start": 2129070, "audio": 0, "end": 2129714, "filename": "/vlib/v/tests/repl/README.md"}, {"start": 2129714, "audio": 0, "end": 2132269, "filename": "/vlib/v/tests/repl/repl_test.v"}, {"start": 2132269, "audio": 0, "end": 2132813, "filename": "/vlib/v/tests/repl/run.v"}, {"start": 2132813, "audio": 0, "end": 2132846, "filename": "/vlib/v/tests/repl/var_decl.repl"}, {"start": 2132846, "audio": 0, "end": 2133266, "filename": "/vlib/v/tests/repl/chained_fields/bd.repl.skip"}, {"start": 2133266, "audio": 0, "end": 2133685, "filename": "/vlib/v/tests/repl/chained_fields/c.repl.skip"}, {"start": 2133685, "audio": 0, "end": 2133855, "filename": "/vlib/v/tests/repl/chained_fields/c2.repl.skip"}, {"start": 2133855, "audio": 0, "end": 2133993, "filename": "/vlib/v/tests/repl/chained_fields/d.repl.skip"}, {"start": 2133993, "audio": 0, "end": 2134445, "filename": "/vlib/v/tests/repl/chained_fields/ef.repl.skip"}, {"start": 2134445, "audio": 0, "end": 2134506, "filename": "/vlib/v/tests/repl/conditional_blocks/for.repl"}, {"start": 2134506, "audio": 0, "end": 2134552, "filename": "/vlib/v/tests/repl/conditional_blocks/if.repl"}, {"start": 2134552, "audio": 0, "end": 2134625, "filename": "/vlib/v/tests/repl/conditional_blocks/if_else.repl"}, {"start": 2134625, "audio": 0, "end": 2134839, "filename": "/vlib/v/tests/repl/immutable_len_fields/fields.1.repl.skip"}, {"start": 2134839, "audio": 0, "end": 2135046, "filename": "/vlib/v/tests/repl/immutable_len_fields/fields.2.repl.skip"}, {"start": 2135046, "audio": 0, "end": 2135265, "filename": "/vlib/v/tests/repl/immutable_len_fields/fields.3.repl.skip"}, {"start": 2135265, "audio": 0, "end": 2139082, "filename": "/vlib/v/tests/repl/runner/runner.v"}, {"start": 2139082, "audio": 0, "end": 2139821, "filename": "/vlib/v/tests/valgrind/1.vv"}, {"start": 2139821, "audio": 0, "end": 2141959, "filename": "/vlib/v/tests/valgrind/valgrind_test.v"}, {"start": 2141959, "audio": 0, "end": 2142711, "filename": "/vlib/v/token/position.v"}, {"start": 2142711, "audio": 0, "end": 2151401, "filename": "/vlib/v/token/token.v"}, {"start": 2151401, "audio": 0, "end": 2156655, "filename": "/vlib/v/util/errors.v"}, {"start": 2156655, "audio": 0, "end": 2157511, "filename": "/vlib/v/util/scanning.v"}, {"start": 2157511, "audio": 0, "end": 2164577, "filename": "/vlib/v/util/util.v"}, {"start": 2164577, "audio": 0, "end": 2169749, "filename": "/vlib/v/vmod/parser.v"}, {"start": 2169749, "audio": 0, "end": 2174129, "filename": "/vlib/v/vmod/vmod.v"}, {"start": 2174129, "audio": 0, "end": 2175792, "filename": "/vlib/vweb/README.md"}, {"start": 2175792, "audio": 0, "end": 2185050, "filename": "/vlib/vweb/vweb.v"}, {"start": 2185050, "audio": 0, "end": 2190102, "filename": "/vlib/vweb/assets/assets.v"}, {"start": 2190102, "audio": 0, "end": 2196156, "filename": "/vlib/vweb/assets/assets_test.v"}, {"start": 2196156, "audio": 0, "end": 2198201, "filename": "/vlib/vweb/tmpl/tmpl.v"}], "remote_package_size": 2198201, "package_uuid": "c7af7a06-5cb9-400e-90d2-b22bb55732ab"});
  
  })();
  


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = function(status, toThrow) {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === 'object';
ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)');
}



// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

var nodeFS;
var nodePath;

if (ENVIRONMENT_IS_NODE) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = require('path').dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }


/**
 * @license
 * Copyright 2019 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

  read_ = function shell_read(filename, binary) {
    if (!nodeFS) nodeFS = require('fs');
    if (!nodePath) nodePath = require('path');
    filename = nodePath['normalize'](filename);
    return nodeFS['readFileSync'](filename, binary ? null : 'utf8');
  };

  readBinary = function readBinary(filename) {
    var ret = read_(filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };




  if (process['argv'].length > 1) {
    thisProgram = process['argv'][1].replace(/\\/g, '/');
  }

  arguments_ = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  process['on']('unhandledRejection', abort);

  quit_ = function(status) {
    process['exit'](status);
  };

  Module['inspect'] = function () { return '[Emscripten Module object]'; };



} else
if (ENVIRONMENT_IS_SHELL) {


  if (typeof read != 'undefined') {
    read_ = function shell_read(f) {
      return read(f);
    };
  }

  readBinary = function readBinary(f) {
    var data;
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit === 'function') {
    quit_ = function(status) {
      quit(status);
    };
  }

  if (typeof print !== 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console === 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr !== 'undefined' ? printErr : print);
  }


} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }


  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {


/**
 * @license
 * Copyright 2019 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

  read_ = function shell_read(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
  };

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = function readBinary(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = function readAsync(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };




  }

  setWindowTitle = function(title) { document.title = title };
} else
{
  throw new Error('environment detection error');
}


// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.warn.bind(console);

// Merge back in the overrides
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.
if (Module['arguments']) arguments_ = Module['arguments'];if (!Object.getOwnPropertyDescriptor(Module, 'arguments')) Object.defineProperty(Module, 'arguments', { configurable: true, get: function() { abort('Module.arguments has been replaced with plain arguments_') } });
if (Module['thisProgram']) thisProgram = Module['thisProgram'];if (!Object.getOwnPropertyDescriptor(Module, 'thisProgram')) Object.defineProperty(Module, 'thisProgram', { configurable: true, get: function() { abort('Module.thisProgram has been replaced with plain thisProgram') } });
if (Module['quit']) quit_ = Module['quit'];if (!Object.getOwnPropertyDescriptor(Module, 'quit')) Object.defineProperty(Module, 'quit', { configurable: true, get: function() { abort('Module.quit has been replaced with plain quit_') } });

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] === 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] === 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] === 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] === 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] === 'undefined', 'Module.read option was removed (modify read_ in JS)');
assert(typeof Module['readAsync'] === 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] === 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] === 'undefined', 'Module.setWindowTitle option was removed (modify setWindowTitle in JS)');
assert(typeof Module['TOTAL_MEMORY'] === 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
if (!Object.getOwnPropertyDescriptor(Module, 'read')) Object.defineProperty(Module, 'read', { configurable: true, get: function() { abort('Module.read has been replaced with plain read_') } });
if (!Object.getOwnPropertyDescriptor(Module, 'readAsync')) Object.defineProperty(Module, 'readAsync', { configurable: true, get: function() { abort('Module.readAsync has been replaced with plain readAsync') } });
if (!Object.getOwnPropertyDescriptor(Module, 'readBinary')) Object.defineProperty(Module, 'readBinary', { configurable: true, get: function() { abort('Module.readBinary has been replaced with plain readBinary') } });
if (!Object.getOwnPropertyDescriptor(Module, 'setWindowTitle')) Object.defineProperty(Module, 'setWindowTitle', { configurable: true, get: function() { abort('Module.setWindowTitle has been replaced with plain setWindowTitle') } });
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';




/**
 * @license
 * Copyright 2017 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// {{PREAMBLE_ADDITIONS}}

var STACK_ALIGN = 16;

// stack management, and other functionality that is provided by the compiled code,
// should not be used before it is ready

/** @suppress{duplicate} */
var stackSave;
/** @suppress{duplicate} */
var stackRestore;
/** @suppress{duplicate} */
var stackAlloc;

stackSave = stackRestore = stackAlloc = function() {
  abort('cannot use the stack before compiled code is ready to run, and has provided stack access');
};

function staticAlloc(size) {
  abort('staticAlloc is no longer available at runtime; instead, perform static allocations at compile time (using makeStaticAlloc)');
}

function dynamicAlloc(size) {
  assert(DYNAMICTOP_PTR);
  var ret = HEAP32[DYNAMICTOP_PTR>>2];
  var end = (ret + size + 15) & -16;
  assert(end <= HEAP8.length, 'failure to dynamicAlloc - memory growth etc. is not supported there, call malloc/sbrk directly');
  HEAP32[DYNAMICTOP_PTR>>2] = end;
  return ret;
}

function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
  return Math.ceil(size / factor) * factor;
}

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length-1] === '*') {
        return 4; // A pointer
      } else if (type[0] === 'i') {
        var bits = Number(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}





/**
 * @license
 * Copyright 2020 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */


// Wraps a JS function as a wasm function with a given signature.
function convertJsFunctionToWasm(func, sig) {

  // If the type reflection proposal is available, use the new
  // "WebAssembly.Function" constructor.
  // Otherwise, construct a minimal wasm module importing the JS function and
  // re-exporting it.
  if (typeof WebAssembly.Function === "function") {
    var typeNames = {
      'i': 'i32',
      'j': 'i64',
      'f': 'f32',
      'd': 'f64'
    };
    var type = {
      parameters: [],
      results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
    };
    for (var i = 1; i < sig.length; ++i) {
      type.parameters.push(typeNames[sig[i]]);
    }
    return new WebAssembly.Function(type, func);
  }

  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    'e': {
      'f': func
    }
  });
  var wrappedFunc = instance.exports['f'];
  return wrappedFunc;
}

var freeTableIndexes = [];

// Weak map of functions in the table to their indexes, created on first use.
var functionsInTableMap;

// Add a wasm function to the table.
function addFunctionWasm(func, sig) {
  var table = wasmTable;

  // Check if the function is already in the table, to ensure each function
  // gets a unique index. First, create the map if this is the first use.
  if (!functionsInTableMap) {
    functionsInTableMap = new WeakMap();
    for (var i = 0; i < table.length; i++) {
      var item = table.get(i);
      // Ignore null values.
      if (item) {
        functionsInTableMap.set(item, i);
      }
    }
  }
  if (functionsInTableMap.has(func)) {
    return functionsInTableMap.get(func);
  }

  // It's not in the table, add it now.


  var ret;
  // Reuse a free index if there is one, otherwise grow.
  if (freeTableIndexes.length) {
    ret = freeTableIndexes.pop();
  } else {
    ret = table.length;
    // Grow the table
    try {
      table.grow(1);
    } catch (err) {
      if (!(err instanceof RangeError)) {
        throw err;
      }
      throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
    }
  }

  // Set the new value.
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    table.set(ret, func);
  } catch (err) {
    if (!(err instanceof TypeError)) {
      throw err;
    }
    assert(typeof sig !== 'undefined', 'Missing signature argument to addFunction');
    var wrapped = convertJsFunctionToWasm(func, sig);
    table.set(ret, wrapped);
  }

  functionsInTableMap.set(func, ret);

  return ret;
}

function removeFunctionWasm(index) {
  functionsInTableMap.delete(wasmTable.get(index));
  freeTableIndexes.push(index);
}

// 'sig' parameter is required for the llvm backend but only when func is not
// already a WebAssembly function.
function addFunction(func, sig) {
  assert(typeof func !== 'undefined');

  return addFunctionWasm(func, sig);
}

function removeFunction(index) {
  removeFunctionWasm(index);
}



var funcWrappers = {};

function getFuncWrapper(func, sig) {
  if (!func) return; // on null pointer, return undefined
  assert(sig);
  if (!funcWrappers[sig]) {
    funcWrappers[sig] = {};
  }
  var sigCache = funcWrappers[sig];
  if (!sigCache[func]) {
    // optimize away arguments usage in common cases
    if (sig.length === 1) {
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func);
      };
    } else if (sig.length === 2) {
      sigCache[func] = function dynCall_wrapper(arg) {
        return dynCall(sig, func, [arg]);
      };
    } else {
      // general case
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func, Array.prototype.slice.call(arguments));
      };
    }
  }
  return sigCache[func];
}


/**
 * @license
 * Copyright 2020 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */




function makeBigInt(low, high, unsigned) {
  return unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0));
}

/** @param {Array=} args */
function dynCall(sig, ptr, args) {
  if (args && args.length) {
    // j (64-bit integer) must be passed in as two numbers [low 32, high 32].
    assert(args.length === sig.substring(1).replace(/j/g, '--').length);
    assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
    return Module['dynCall_' + sig].apply(null, [ptr].concat(args));
  } else {
    assert(sig.length == 1);
    assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
    return Module['dynCall_' + sig].call(null, ptr);
  }
}

var tempRet0 = 0;

var setTempRet0 = function(value) {
  tempRet0 = value;
};

var getTempRet0 = function() {
  return tempRet0;
};

function getCompilerSetting(name) {
  throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for getCompilerSetting or emscripten_get_compiler_setting to work';
}

// The address globals begin at. Very low in memory, for code size and optimization opportunities.
// Above 0 is static memory, starting with globals.
// Then the stack.
// Then 'dynamic' memory for sbrk.
var GLOBAL_BASE = 1024;



/**
 * @license
 * Copyright 2010 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html


var wasmBinary;if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];if (!Object.getOwnPropertyDescriptor(Module, 'wasmBinary')) Object.defineProperty(Module, 'wasmBinary', { configurable: true, get: function() { abort('Module.wasmBinary has been replaced with plain wasmBinary') } });
var noExitRuntime;if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];if (!Object.getOwnPropertyDescriptor(Module, 'noExitRuntime')) Object.defineProperty(Module, 'noExitRuntime', { configurable: true, get: function() { abort('Module.noExitRuntime has been replaced with plain noExitRuntime') } });


if (typeof WebAssembly !== 'object') {
  abort('No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.');
}


/**
 * @license
 * Copyright 2019 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
// In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)

/** @param {number} ptr
    @param {number} value
    @param {string} type
    @param {number|boolean=} noSafe */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

/** @param {number} ptr
    @param {string} type
    @param {number|boolean=} noSafe */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}






// Wasm globals

var wasmMemory;

// In fastcomp asm.js, we don't need a wasm Table at all.
// In the wasm backend, we polyfill the WebAssembly object,
// so this creates a (non-native-wasm) table for us.
var wasmTable = new WebAssembly.Table({
  'initial': 14,
  'maximum': 14 + 0,
  'element': 'anyfunc'
});


//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS = 0;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
/** @param {string|null=} returnType
    @param {Array=} argTypes
    @param {Arguments|Array=} args
    @param {Object=} opts */
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  assert(returnType !== 'array', 'Return type should not be "array".');
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);

  ret = convertReturnValue(ret);
  if (stack !== 0) stackRestore(stack);
  return ret;
}

/** @param {string=} returnType
    @param {Array=} argTypes
    @param {Object=} opts */
function cwrap(ident, returnType, argTypes, opts) {
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_DYNAMIC = 2; // Cannot be freed except through sbrk
var ALLOC_NONE = 3; // Do not allocate

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc,
    stackAlloc,
    dynamicAlloc][allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var stop;
    ptr = ret;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(/** @type {!Uint8Array} */ (slab), ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!runtimeInitialized) return dynamicAlloc(size);
  return _malloc(size);
}


/**
 * @license
 * Copyright 2019 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

/**
 * @param {number} idx
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ArrayToString(heap, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
  while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

  if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(heap.subarray(idx, endPtr));
  } else {
    var str = '';
    // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = heap[idx++];
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      var u1 = heap[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      var u2 = heap[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte 0x' + u0.toString(16) + ' encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!');
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
      }

      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
  return str;
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 * @param {number} ptr
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   heap: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array.
//                    This count should include the null terminator,
//                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) {
      var u1 = str.charCodeAt(++i);
      u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
    }
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 0xC0 | (u >> 6);
      heap[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 0xE0 | (u >> 12);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      if (u >= 0x200000) warnOnce('Invalid Unicode code point 0x' + u.toString(16) + ' encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).');
      heap[outIdx++] = 0xF0 | (u >> 18);
      heap[outIdx++] = 0x80 | ((u >> 12) & 63);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  heap[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) ++len;
    else if (u <= 0x7FF) len += 2;
    else if (u <= 0xFFFF) len += 3;
    else len += 4;
  }
  return len;
}



/**
 * @license
 * Copyright 2020 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// runtime_strings_extra.js: Strings related runtime functions that are available only in regular runtime.

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAPU8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
  assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  var maxIdx = idx + maxBytesToRead / 2;
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var i = 0;

    var str = '';
    while (1) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0 || i == maxBytesToRead / 2) return str;
      ++i;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)]=codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr, maxBytesToRead) {
  assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
  var i = 0;

  var str = '';
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0) break;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
  return str;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)]=codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated
    @param {boolean=} dontAddNull */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
  HEAP8.set(array, buffer);
}

/** @param {boolean=} dontAddNull */
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)]=0;
}



// Memory management

var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;
var ASMJS_PAGE_SIZE = 16777216;

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  Module['HEAP8'] = HEAP8 = new Int8Array(buf);
  Module['HEAP16'] = HEAP16 = new Int16Array(buf);
  Module['HEAP32'] = HEAP32 = new Int32Array(buf);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
}

var STATIC_BASE = 1024,
    STACK_BASE = 5320544,
    STACKTOP = STACK_BASE,
    STACK_MAX = 77664,
    DYNAMIC_BASE = 5320544,
    DYNAMICTOP_PTR = 77504;

assert(STACK_BASE % 16 === 0, 'stack must start aligned');
assert(DYNAMIC_BASE % 16 === 0, 'heap must start aligned');



var TOTAL_STACK = 5242880;
if (Module['TOTAL_STACK']) assert(TOTAL_STACK === Module['TOTAL_STACK'], 'the stack size can no longer be determined at runtime')

var INITIAL_INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 16777216;if (!Object.getOwnPropertyDescriptor(Module, 'INITIAL_MEMORY')) Object.defineProperty(Module, 'INITIAL_MEMORY', { configurable: true, get: function() { abort('Module.INITIAL_MEMORY has been replaced with plain INITIAL_INITIAL_MEMORY') } });

assert(INITIAL_INITIAL_MEMORY >= TOTAL_STACK, 'INITIAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_INITIAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
       'JS engine does not provide full typed array support');



/**
 * @license
 * Copyright 2019 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */




// In standalone mode, the wasm creates the memory, and the user can't provide it.
// In non-standalone/normal mode, we create the memory here.

/**
 * @license
 * Copyright 2019 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// Create the main memory. (Note: this isn't used in STANDALONE_WASM mode since the wasm
// memory is created in the wasm, not in JS.)

  if (Module['wasmMemory']) {
    wasmMemory = Module['wasmMemory'];
  } else
  {
    wasmMemory = new WebAssembly.Memory({
      'initial': INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
      ,
      'maximum': INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
    });
  }


if (wasmMemory) {
  buffer = wasmMemory.buffer;
}

// If the user provides an incorrect length, just use that length instead rather than providing the user to
// specifically provide the memory length with Module['INITIAL_MEMORY'].
INITIAL_INITIAL_MEMORY = buffer.byteLength;
assert(INITIAL_INITIAL_MEMORY % WASM_PAGE_SIZE === 0);
updateGlobalBufferAndViews(buffer);

HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;




/**
 * @license
 * Copyright 2019 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  assert((STACK_MAX & 3) == 0);
  // The stack grows downwards
  HEAPU32[(STACK_MAX >> 2)+1] = 0x2135467;
  HEAPU32[(STACK_MAX >> 2)+2] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  // We don't do this with ASan because ASan does its own checks for this.
  HEAP32[0] = 0x63736d65; /* 'emsc' */
}

function checkStackCookie() {
  var cookie1 = HEAPU32[(STACK_MAX >> 2)+1];
  var cookie2 = HEAPU32[(STACK_MAX >> 2)+2];
  if (cookie1 != 0x2135467 || cookie2 != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x' + cookie2.toString(16) + ' ' + cookie1.toString(16));
  }
  // Also test the global address 0 for integrity.
  // We don't do this with ASan because ASan does its own checks for this.
  if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
}

function abortStackOverflow(allocSize) {
  abort('Stack overflow! Attempted to allocate ' + allocSize + ' bytes on the stack, but stack has only ' + (STACK_MAX - stackSave() + allocSize) + ' bytes available!');
}




/**
 * @license
 * Copyright 2019 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// Endianness check (note: assumes compiler arch was little-endian)
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';
})();

function abortFnPtrError(ptr, sig) {
	abort("Invalid function pointer " + ptr + " called with signature '" + sig + "'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this). Build with ASSERTIONS=2 for more info.");
}



function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback(Module); // Pass the module as the first argument.
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Module['dynCall_v'](func);
      } else {
        Module['dynCall_vi'](func, callback.arg);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;


function preRun() {

  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  checkStackCookie();
  assert(!runtimeInitialized);
  runtimeInitialized = true;
  if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  FS.ignorePermissions = false;
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  checkStackCookie();
  runtimeExited = true;
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

/** @param {number|boolean=} ignore */
function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
/** @param {number|boolean=} ignore */
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}


/**
 * @license
 * Copyright 2019 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');

var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_round = Math.round;
var Math_min = Math.min;
var Math_max = Math.max;
var Math_clz32 = Math.clz32;
var Math_trunc = Math.trunc;



// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err('dependency: ' + dep);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


/** @param {string|number=} what */
function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  what += '';
  out(what);
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  var output = 'abort(' + what + ') at ' + stackTrace();
  what = output;

  // Throw a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  throw new WebAssembly.RuntimeError(what);
}


var memoryInitializer = null;


/**
 * @license
 * Copyright 2015 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */







/**
 * @license
 * Copyright 2017 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

function hasPrefix(str, prefix) {
  return String.prototype.startsWith ?
      str.startsWith(prefix) :
      str.indexOf(prefix) === 0;
}

// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  return hasPrefix(filename, dataURIPrefix);
}

var fileURIPrefix = "file://";

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return hasPrefix(filename, fileURIPrefix);
}



var wasmBinaryFile = 'index.wasm';
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
  try {
    if (wasmBinary) {
      return new Uint8Array(wasmBinary);
    }

    if (readBinary) {
      return readBinary(wasmBinaryFile);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // If we don't have the binary yet, and have the Fetch api, use that;
  // in some environments, like Electron's render process, Fetch api may be present, but have a different context than expected, let's only use it on the Web
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function'
      // Let's not use fetch to get objects over file:// as it's most likely Cordova which doesn't support fetch for file://
      && !isFileURI(wasmBinaryFile)
      ) {
    return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
      if (!response['ok']) {
        throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
      }
      return response['arrayBuffer']();
    }).catch(function () {
      return getBinary();
    });
  }
  // Otherwise, getBinary should be able to get it synchronously
  return new Promise(function(resolve, reject) {
    resolve(getBinary());
  });
}



// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;
    Module['asm'] = exports;
    removeRunDependency('wasm-instantiate');
  }
  // we can't run yet (except in a pthread, where we have a custom sync instantiator)
  addRunDependency('wasm-instantiate');


  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiatedSource(output) {
    // 'output' is a WebAssemblyInstantiatedSource object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(output['instance']);
  }


  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise().then(function(binary) {
      return WebAssembly.instantiate(binary, info);
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);
      abort(reason);
    });
  }

  // Prefer streaming instantiation if available.
  function instantiateAsync() {
    if (!wasmBinary &&
        typeof WebAssembly.instantiateStreaming === 'function' &&
        !isDataURI(wasmBinaryFile) &&
        // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
        !isFileURI(wasmBinaryFile) &&
        typeof fetch === 'function') {
      fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
        var result = WebAssembly.instantiateStreaming(response, info);
        return result.then(receiveInstantiatedSource, function(reason) {
            // We expect the most common failure cause to be a bad MIME type for the binary,
            // in which case falling back to ArrayBuffer instantiation should work.
            err('wasm streaming compile failed: ' + reason);
            err('falling back to ArrayBuffer instantiation');
            instantiateArrayBuffer(receiveInstantiatedSource);
          });
      });
    } else {
      return instantiateArrayBuffer(receiveInstantiatedSource);
    }
  }
  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      var exports = Module['instantiateWasm'](info, receiveInstance);
      return exports;
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

  instantiateAsync();
  return {}; // no exports yet; we'll fill them in later
}


// Globals used by JS i64 conversions
var tempDouble;
var tempI64;

// === Body ===

var ASM_CONSTS = {
  
};




// STATICTOP = STATIC_BASE + 76640;
/* global initializers */  __ATINIT__.push({ func: function() { ___wasm_call_ctors() } });




/* no memory initializer */
// {{PRE_LIBRARY}}


  function demangle(func) {
      warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
      return func;
    }

  function demangleAll(text) {
      var regex =
        /\b_Z[\w\d_]+/g;
      return text.replace(regex,
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }

  function jsStackTrace() {
      var err = new Error();
      if (!err.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error();
        } catch(e) {
          err = e;
        }
        if (!err.stack) {
          return '(no stack trace available)';
        }
      }
      return err.stack.toString();
    }

  function stackTrace() {
      var js = jsStackTrace();
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
      return demangleAll(js);
    }

  function ___handle_stack_overflow() {
      abort('stack overflow')
    }

  
  
  var PATH={splitPath:function(filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function(parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function(path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function(path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function(path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function(path) {
        return PATH.splitPath(path)[3];
      },join:function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function(l, r) {
        return PATH.normalize(l + '/' + r);
      }};
  
  
  function setErrNo(value) {
      HEAP32[((___errno_location())>>2)]=value;
      return value;
    }
  
  var PATH_FS={resolve:function() {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function(from, to) {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function(stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },flush:function(stream) {
          stream.tty.ops.flush(stream.tty);
        },read:function(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function(tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
              var bytesRead = 0;
  
              try {
                bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
              } catch(e) {
                // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                if (e.toString().indexOf('EOF') != -1) bytesRead = 0;
                else throw e;
              }
  
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
            } else
            if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  
  var MEMFS={ops_table:null,mount:function(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },getFileDataAsRegularArray:function(node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
          return arr; // Returns a copy of the original data.
        }
        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },getFileDataAsTypedArray:function(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
        return;
      },resizeFileStorage:function(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
          return;
        }
        if (!node.contents || node.contents.subarray) { // Resize a typed array if that is being used as the backing store.
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
          return;
        }
        // Backing with a JS array.
        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;
        else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
      },node_ops:{getattr:function(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function(parent, name) {
          throw FS.genericErrors[44];
        },mknod:function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function(parent, name) {
          delete parent.contents[name];
        },rmdir:function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
        },readdir:function(node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }},stream_ops:{read:function(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); // Use typed array write if available.
          else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },llseek:function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },allocate:function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function(stream, buffer, offset, length, position, prot, flags) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                contents.buffer === buffer.buffer ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            // malloc() can lead to growing the heap. If targeting the heap, we need to
            // re-acquire the heap buffer object in case growth had occurred.
            var fromHeap = (buffer.buffer == HEAP8.buffer);
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            (fromHeap ? HEAP8 : buffer).set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function(stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (mmapFlags & 2) {
            // MAP_PRIVATE calls need not to be synced back to underlying fs
            return 0;
          }
  
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  var ERRNO_MESSAGES={0:"Success",1:"Arg list too long",2:"Permission denied",3:"Address already in use",4:"Address not available",5:"Address family not supported by protocol family",6:"No more processes",7:"Socket already connected",8:"Bad file number",9:"Trying to read unreadable message",10:"Mount device busy",11:"Operation canceled",12:"No children",13:"Connection aborted",14:"Connection refused",15:"Connection reset by peer",16:"File locking deadlock error",17:"Destination address required",18:"Math arg out of domain of func",19:"Quota exceeded",20:"File exists",21:"Bad address",22:"File too large",23:"Host is unreachable",24:"Identifier removed",25:"Illegal byte sequence",26:"Connection already in progress",27:"Interrupted system call",28:"Invalid argument",29:"I/O error",30:"Socket is already connected",31:"Is a directory",32:"Too many symbolic links",33:"Too many open files",34:"Too many links",35:"Message too long",36:"Multihop attempted",37:"File or path name too long",38:"Network interface is not configured",39:"Connection reset by network",40:"Network is unreachable",41:"Too many open files in system",42:"No buffer space available",43:"No such device",44:"No such file or directory",45:"Exec format error",46:"No record locks available",47:"The link has been severed",48:"Not enough core",49:"No message of desired type",50:"Protocol not available",51:"No space left on device",52:"Function not implemented",53:"Socket is not connected",54:"Not a directory",55:"Directory not empty",56:"State not recoverable",57:"Socket operation on non-socket",59:"Not a typewriter",60:"No such device or address",61:"Value too large for defined data type",62:"Previous owner died",63:"Not super-user",64:"Broken pipe",65:"Protocol error",66:"Unknown protocol",67:"Protocol wrong type for socket",68:"Math result not representable",69:"Read only file system",70:"Illegal seek",71:"No such process",72:"Stale file handle",73:"Connection timed out",74:"Text file busy",75:"Cross-device link",100:"Device not a stream",101:"Bad font file fmt",102:"Invalid slot",103:"Invalid request code",104:"No anode",105:"Block device required",106:"Channel number out of range",107:"Level 3 halted",108:"Level 3 reset",109:"Link number out of range",110:"Protocol driver not attached",111:"No CSI structure available",112:"Level 2 halted",113:"Invalid exchange",114:"Invalid request descriptor",115:"Exchange full",116:"No data (for no delay io)",117:"Timer expired",118:"Out of streams resources",119:"Machine is not on the network",120:"Package not installed",121:"The object is remote",122:"Advertise error",123:"Srmount error",124:"Communication error on send",125:"Cross mount point (not really error)",126:"Given log. name not unique",127:"f.d. invalid for this operation",128:"Remote address changed",129:"Can   access a needed shared lib",130:"Accessing a corrupted shared lib",131:".lib section in a.out corrupted",132:"Attempting to link in too many libs",133:"Attempting to exec a shared library",135:"Streams pipe error",136:"Too many users",137:"Socket type not supported",138:"Not supported",139:"Protocol family not supported",140:"Can't send after socket shutdown",141:"Too many references",142:"Host is down",148:"No medium (in tape drive)",156:"Level 2 not synchronized"};
  
  var ERRNO_CODES={EPERM:63,ENOENT:44,ESRCH:71,EINTR:27,EIO:29,ENXIO:60,E2BIG:1,ENOEXEC:45,EBADF:8,ECHILD:12,EAGAIN:6,EWOULDBLOCK:6,ENOMEM:48,EACCES:2,EFAULT:21,ENOTBLK:105,EBUSY:10,EEXIST:20,EXDEV:75,ENODEV:43,ENOTDIR:54,EISDIR:31,EINVAL:28,ENFILE:41,EMFILE:33,ENOTTY:59,ETXTBSY:74,EFBIG:22,ENOSPC:51,ESPIPE:70,EROFS:69,EMLINK:34,EPIPE:64,EDOM:18,ERANGE:68,ENOMSG:49,EIDRM:24,ECHRNG:106,EL2NSYNC:156,EL3HLT:107,EL3RST:108,ELNRNG:109,EUNATCH:110,ENOCSI:111,EL2HLT:112,EDEADLK:16,ENOLCK:46,EBADE:113,EBADR:114,EXFULL:115,ENOANO:104,EBADRQC:103,EBADSLT:102,EDEADLOCK:16,EBFONT:101,ENOSTR:100,ENODATA:116,ETIME:117,ENOSR:118,ENONET:119,ENOPKG:120,EREMOTE:121,ENOLINK:47,EADV:122,ESRMNT:123,ECOMM:124,EPROTO:65,EMULTIHOP:36,EDOTDOT:125,EBADMSG:9,ENOTUNIQ:126,EBADFD:127,EREMCHG:128,ELIBACC:129,ELIBBAD:130,ELIBSCN:131,ELIBMAX:132,ELIBEXEC:133,ENOSYS:52,ENOTEMPTY:55,ENAMETOOLONG:37,ELOOP:32,EOPNOTSUPP:138,EPFNOSUPPORT:139,ECONNRESET:15,ENOBUFS:42,EAFNOSUPPORT:5,EPROTOTYPE:67,ENOTSOCK:57,ENOPROTOOPT:50,ESHUTDOWN:140,ECONNREFUSED:14,EADDRINUSE:3,ECONNABORTED:13,ENETUNREACH:40,ENETDOWN:38,ETIMEDOUT:73,EHOSTDOWN:142,EHOSTUNREACH:23,EINPROGRESS:26,EALREADY:7,EDESTADDRREQ:17,EMSGSIZE:35,EPROTONOSUPPORT:66,ESOCKTNOSUPPORT:137,EADDRNOTAVAIL:4,ENETRESET:39,EISCONN:30,ENOTCONN:53,ETOOMANYREFS:141,EUSERS:136,EDQUOT:19,ESTALE:72,ENOTSUP:138,ENOMEDIUM:148,EILSEQ:25,EOVERFLOW:61,ECANCELED:11,ENOTRECOVERABLE:56,EOWNERDEAD:62,ESTRPIPE:135};var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,handleFSError:function(e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return setErrNo(e.errno);
      },lookupPath:function(path, opts) {
        path = PATH_FS.resolve(FS.cwd(), path);
        opts = opts || {};
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function(parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function(parent, name, mode, rdev) {
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function(node) {
        FS.hashRemoveNode(node);
      },isRoot:function(node) {
        return node === node.parent;
      },isMountpoint:function(node) {
        return !!node.mounted;
      },isFile:function(mode) {
        return (mode & 61440) === 32768;
      },isDir:function(mode) {
        return (mode & 61440) === 16384;
      },isLink:function(mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function(mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function(mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function(mode) {
        return (mode & 61440) === 4096;
      },isSocket:function(mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function(str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return 2;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return 2;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },mayLookup:function(dir) {
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },mayCreate:function(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },mayOpen:function(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function(fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },getStream:function(fd) {
        return FS.streams[fd];
      },createStream:function(stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */ function(){};
          FS.FSStream.prototype = {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          };
        }
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function(fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function() {
          throw new FS.ErrnoError(70);
        }},major:function(dev) {
        return ((dev) >> 8);
      },minor:function(dev) {
        return ((dev) & 0xff);
      },makedev:function(ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function(dev) {
        return FS.devices[dev];
      },getMounts:function(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function(populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function(type, opts, mountpoint) {
        if (typeof type === 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:function(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },mkdev:function(path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(10);
        }
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          err("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          err("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          err("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          err("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },unlink:function(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          err("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          err("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:function(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },lstat:function(path) {
        return FS.stat(path, true);
      },chmod:function(path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function(path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function(fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },chown:function(path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function(fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function(fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },utime:function(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function(path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            err("FS.trackingDelegate error on read file: " + path);
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          err("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },isClosed:function(stream) {
        return stream.fd === null;
      },llseek:function(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:function(stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function(stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          err("FS.trackingDelegate['onWriteToFile']('"+stream.path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function(stream, buffer, offset, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },msync:function(stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:function(stream) {
        return 0;
      },ioctl:function(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function(path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function(path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data === 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },cwd:function() {
        return FS.currentPath;
      },chdir:function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function(stream, buffer, offset, length, pos) { return length; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device;
        if (typeof crypto === 'object' && typeof crypto['getRandomValues'] === 'function') {
          // for modern web browsers
          var randomBuffer = new Uint8Array(1);
          random_device = function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
        } else
        if (ENVIRONMENT_IS_NODE) {
          // for nodejs with or without crypto support included
          try {
            var crypto_module = require('crypto');
            // nodejs has crypto support
            random_device = function() { return crypto_module['randomBytes'](1)[0]; };
          } catch (e) {
            // nodejs doesn't have crypto support
          }
        } else
        {}
        if (!random_device) {
          // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
          random_device = function() { abort("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };"); };
        }
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:function() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: function() {
            var node = FS.createNode('/proc/self', 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: function() { return stream.path } }
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:function() {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        var stdout = FS.open('/dev/stdout', 'w');
        var stderr = FS.open('/dev/stderr', 'w');
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function() {
        if (FS.ErrnoError) return;
        FS.ErrnoError = /** @this{Object} */ function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = /** @this{Object} */ function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
  
          // Try to get a maximally helpful stack trace. On Node.js, getting Error.stack
          // now ensures it shows what we want.
          if (this.stack) {
            // Define the stack property for Node.js 4, which otherwise errors on the next line.
            Object.defineProperty(this, "stack", { value: (new Error).stack, writable: true });
            this.stack = demangleAll(this.stack);
          }
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function() {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },init:function(input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function() {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        var fflush = Module['_fflush'];
        if (fflush) fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function(canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function(parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function(relative, base) {
        return PATH_FS.resolve(base, relative);
      },standardizePath:function(path) {
        return PATH.normalize(path);
      },findObject:function(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          setErrNo(ret.error);
          return null;
        }
      },analyzePath:function(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function(parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function(parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function(parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function(parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function(parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) setErrNo(29);
        return success;
      },createLazyFile:function(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        /** @constructor */
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = this;
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: /** @this{Object} */ function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: /** @this{Object} */ function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: /** @this {FSNode} */ function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(29);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(29);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init(); // XXX perhaps this method should move onto Browser?
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency(dep);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function() {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function() {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function(paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          out('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function(paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};var SYSCALLS={mappings:{},DEFAULT_POLLMASK:5,umask:511,calculateAt:function(dirfd, path) {
        if (path[0] !== '/') {
          // relative path
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = FS.getStream(dirfd);
            if (!dirstream) throw new FS.ErrnoError(8);
            dir = dirstream.path;
          }
          path = PATH.join2(dir, path);
        }
        return path;
      },doStat:function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -54;
          }
          throw e;
        }
        HEAP32[((buf)>>2)]=stat.dev;
        HEAP32[(((buf)+(4))>>2)]=0;
        HEAP32[(((buf)+(8))>>2)]=stat.ino;
        HEAP32[(((buf)+(12))>>2)]=stat.mode;
        HEAP32[(((buf)+(16))>>2)]=stat.nlink;
        HEAP32[(((buf)+(20))>>2)]=stat.uid;
        HEAP32[(((buf)+(24))>>2)]=stat.gid;
        HEAP32[(((buf)+(28))>>2)]=stat.rdev;
        HEAP32[(((buf)+(32))>>2)]=0;
        (tempI64 = [stat.size>>>0,(tempDouble=stat.size,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(40))>>2)]=tempI64[0],HEAP32[(((buf)+(44))>>2)]=tempI64[1]);
        HEAP32[(((buf)+(48))>>2)]=4096;
        HEAP32[(((buf)+(52))>>2)]=stat.blocks;
        HEAP32[(((buf)+(56))>>2)]=(stat.atime.getTime() / 1000)|0;
        HEAP32[(((buf)+(60))>>2)]=0;
        HEAP32[(((buf)+(64))>>2)]=(stat.mtime.getTime() / 1000)|0;
        HEAP32[(((buf)+(68))>>2)]=0;
        HEAP32[(((buf)+(72))>>2)]=(stat.ctime.getTime() / 1000)|0;
        HEAP32[(((buf)+(76))>>2)]=0;
        (tempI64 = [stat.ino>>>0,(tempDouble=stat.ino,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(80))>>2)]=tempI64[0],HEAP32[(((buf)+(84))>>2)]=tempI64[1]);
        return 0;
      },doMsync:function(addr, stream, len, flags, offset) {
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },doMkdir:function(path, mode) {
        // remove a trailing slash, if one - /a/b/ has basename of '', but
        // we want to create b in the context of this function
        path = PATH.normalize(path);
        if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
        FS.mkdir(path, mode, 0);
        return 0;
      },doMknod:function(path, mode, dev) {
        // we don't want this in the JS API as it uses mknod to create all nodes.
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default: return -28;
        }
        FS.mknod(path, mode, dev);
        return 0;
      },doReadlink:function(path, buf, bufsize) {
        if (bufsize <= 0) return -28;
        var ret = FS.readlink(path);
  
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf+len];
        stringToUTF8(ret, buf, bufsize+1);
        // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
        // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
        HEAP8[buf+len] = endChar;
  
        return len;
      },doAccess:function(path, amode) {
        if (amode & ~7) {
          // need a valid mode
          return -28;
        }
        var node;
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
        if (!node) {
          return -44;
        }
        var perms = '';
        if (amode & 4) perms += 'r';
        if (amode & 2) perms += 'w';
        if (amode & 1) perms += 'x';
        if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
          return -2;
        }
        return 0;
      },doDup:function(path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },doReadv:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.read(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break; // nothing more to read
        }
        return ret;
      },doWritev:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.write(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
        }
        return ret;
      },varargs:undefined,get:function() {
        assert(SYSCALLS.varargs != undefined);
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },getStreamFromFD:function(fd) {
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
        return stream;
      },get64:function(low, high) {
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      }};function ___sys_access(path, amode) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doAccess(path, amode);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_chmod(path, mode) {try {
  
      path = SYSCALLS.getStr(path);
      FS.chmod(path, mode);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_fcntl64(fd, cmd, varargs) {SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = SYSCALLS.get();
          if (arg < 0) {
            return -28;
          }
          var newStream;
          newStream = FS.open(stream.path, stream.flags, 0, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        case 12:
        /* case 12: Currently in musl F_GETLK64 has same value as F_GETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */ {
          
          var arg = SYSCALLS.get();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)]=2;
          return 0;
        }
        case 13:
        case 14:
        /* case 13: Currently in musl F_SETLK64 has same value as F_SETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
        /* case 14: Currently in musl F_SETLKW64 has same value as F_SETLKW, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
          
          
          return 0; // Pretend that the locking is successful.
        case 16:
        case 8:
          return -28; // These are for sockets. We don't have them fully implemented yet.
        case 9:
          // musl trusts getown return values, due to a bug where they must be, as they overlap with errors. just return -1 here, so fnctl() returns that, and we set errno ourselves.
          setErrNo(28);
          return -1;
        default: {
          return -28;
        }
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_fstat64(fd, buf) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      return SYSCALLS.doStat(FS.stat, stream.path, buf);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_getcwd(buf, size) {try {
  
      if (size === 0) return -28;
      var cwd = FS.cwd();
      var cwdLengthInBytes = lengthBytesUTF8(cwd);
      if (size < cwdLengthInBytes + 1) return -68;
      stringToUTF8(cwd, buf, size);
      return buf;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_getdents64(fd, dirp, count) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd)
      if (!stream.getdents) {
        stream.getdents = FS.readdir(stream.path);
      }
  
      var struct_size = 280;
      var pos = 0;
      var off = FS.llseek(stream, 0, 1);
  
      var idx = Math.floor(off / struct_size);
  
      while (idx < stream.getdents.length && pos + struct_size <= count) {
        var id;
        var type;
        var name = stream.getdents[idx];
        if (name[0] === '.') {
          id = 1;
          type = 4; // DT_DIR
        } else {
          var child = FS.lookupNode(stream.node, name);
          id = child.id;
          type = FS.isChrdev(child.mode) ? 2 :  // DT_CHR, character device.
                 FS.isDir(child.mode) ? 4 :     // DT_DIR, directory.
                 FS.isLink(child.mode) ? 10 :   // DT_LNK, symbolic link.
                 8;                             // DT_REG, regular file.
        }
        (tempI64 = [id>>>0,(tempDouble=id,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((dirp + pos)>>2)]=tempI64[0],HEAP32[(((dirp + pos)+(4))>>2)]=tempI64[1]);
        (tempI64 = [(idx + 1) * struct_size>>>0,(tempDouble=(idx + 1) * struct_size,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((dirp + pos)+(8))>>2)]=tempI64[0],HEAP32[(((dirp + pos)+(12))>>2)]=tempI64[1]);
        HEAP16[(((dirp + pos)+(16))>>1)]=280;
        HEAP8[(((dirp + pos)+(18))>>0)]=type;
        stringToUTF8(name, dirp + pos + 19, 256);
        pos += struct_size;
        idx += 1;
      }
      FS.llseek(stream, idx * struct_size, 0);
      return pos;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_ioctl(fd, op, varargs) {SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509:
        case 21505: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = SYSCALLS.get();
          HEAP32[((argp)>>2)]=0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        default: abort('bad ioctl syscall ' + op);
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_lstat64(path, buf) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.lstat, path, buf);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_mkdir(path, mode) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doMkdir(path, mode);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_open(path, flags, varargs) {SYSCALLS.varargs = varargs;
  try {
  
      var pathname = SYSCALLS.getStr(path);
      var mode = SYSCALLS.get();
      var stream = FS.open(pathname, flags, mode);
      return stream.fd;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_readlink(path, buf, bufsize) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doReadlink(path, buf, bufsize);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_rmdir(path) {try {
  
      path = SYSCALLS.getStr(path);
      FS.rmdir(path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_stat64(path, buf) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.stat, path, buf);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_unlink(path) {try {
  
      path = SYSCALLS.getStr(path);
      FS.unlink(path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___sys_wait4(pid, wstart, options, rusage) {try {
  
      abort('cannot wait on child processes');
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  
  var _emscripten_get_now;if (ENVIRONMENT_IS_NODE) {
    _emscripten_get_now = function() {
      var t = process['hrtime']();
      return t[0] * 1e3 + t[1] / 1e6;
    };
  } else if (typeof dateNow !== 'undefined') {
    _emscripten_get_now = dateNow;
  } else _emscripten_get_now = function() { return performance.now(); }
  ;
  
  var _emscripten_get_now_is_monotonic=true;;function _clock_gettime(clk_id, tp) {
      // int clock_gettime(clockid_t clk_id, struct timespec *tp);
      var now;
      if (clk_id === 0) {
        now = Date.now();
      } else if ((clk_id === 1 || clk_id === 4) && _emscripten_get_now_is_monotonic) {
        now = _emscripten_get_now();
      } else {
        setErrNo(28);
        return -1;
      }
      HEAP32[((tp)>>2)]=(now/1000)|0; // seconds
      HEAP32[(((tp)+(4))>>2)]=((now % 1000)*1000*1000)|0; // nanoseconds
      return 0;
    }

  function _emscripten_get_sbrk_ptr() {
      return 77504;
    }

  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }

  
  function _emscripten_get_heap_size() {
      return HEAPU8.length;
    }
  
  function abortOnCannotGrowMemory(requestedSize) {
      abort('Cannot enlarge memory arrays to size ' + requestedSize + ' bytes (OOM). Either (1) compile with  -s INITIAL_MEMORY=X  with X higher than the current value ' + HEAP8.length + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
    }function _emscripten_resize_heap(requestedSize) {
      requestedSize = requestedSize >>> 0;
      abortOnCannotGrowMemory(requestedSize);
    }

  
  
  var ENV={};
  
  function __getExecutableName() {
      return thisProgram || './this.program';
    }function getEnvStrings() {
      if (!getEnvStrings.strings) {
        // Default values.
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          // Browser language detection #8751
          'LANG': ((typeof navigator === 'object' && navigator.languages && navigator.languages[0]) || 'C').replace('-', '_') + '.UTF-8',
          '_': __getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(x + '=' + env[x]);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    }function _environ_get(__environ, environ_buf) {
      var bufSize = 0;
      getEnvStrings().forEach(function(string, i) {
        var ptr = environ_buf + bufSize;
        HEAP32[(((__environ)+(i * 4))>>2)]=ptr;
        writeAsciiToMemory(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    }

  function _environ_sizes_get(penviron_count, penviron_buf_size) {
      var strings = getEnvStrings();
      HEAP32[((penviron_count)>>2)]=strings.length;
      var bufSize = 0;
      strings.forEach(function(string) {
        bufSize += string.length + 1;
      });
      HEAP32[((penviron_buf_size)>>2)]=bufSize;
      return 0;
    }

  function _exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      exit(status);
    }

  function _fd_close(fd) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_fdstat_get(fd, pbuf) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      // All character devices are terminals (other things a Linux system would
      // assume is a character device, like the mouse, we have special APIs for).
      var type = stream.tty ? 2 :
                 FS.isDir(stream.mode) ? 3 :
                 FS.isLink(stream.mode) ? 7 :
                 4;
      HEAP8[((pbuf)>>0)]=type;
      // TODO HEAP16[(((pbuf)+(2))>>1)]=?;
      // TODO (tempI64 = [?>>>0,(tempDouble=?,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((pbuf)+(8))>>2)]=tempI64[0],HEAP32[(((pbuf)+(12))>>2)]=tempI64[1]);
      // TODO (tempI64 = [?>>>0,(tempDouble=?,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((pbuf)+(16))>>2)]=tempI64[0],HEAP32[(((pbuf)+(20))>>2)]=tempI64[1]);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_read(fd, iov, iovcnt, pnum) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doReadv(stream, iov, iovcnt);
      HEAP32[((pnum)>>2)]=num
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {try {
  
      
      var stream = SYSCALLS.getStreamFromFD(fd);
      var HIGH_OFFSET = 0x100000000; // 2^32
      // use an unsigned operator on low and shift high by 32-bits
      var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
  
      var DOUBLE_LIMIT = 0x20000000000000; // 2^53
      // we also check for equality since DOUBLE_LIMIT + 1 == DOUBLE_LIMIT
      if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
        return -61;
      }
  
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble=stream.position,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((newOffset)>>2)]=tempI64[0],HEAP32[(((newOffset)+(4))>>2)]=tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_write(fd, iov, iovcnt, pnum) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doWritev(stream, iov, iovcnt);
      HEAP32[((pnum)>>2)]=num
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _gettimeofday(ptr) {
      var now = Date.now();
      HEAP32[((ptr)>>2)]=(now/1000)|0; // seconds
      HEAP32[(((ptr)+(4))>>2)]=((now % 1000)*1000)|0; // microseconds
      return 0;
    }

  function _setTempRet0($i) {
      setTempRet0(($i) | 0);
    }

  function _system(command) {
      if (ENVIRONMENT_IS_NODE) {
        if (!command) return 1; // shell is available
  
        var cmdstr = UTF8ToString(command);
        if (!cmdstr.length) return 0; // this is what glibc seems to do (shell works test?)
  
        var cp = require('child_process');
        var ret = cp.spawnSync(cmdstr, [], {shell:true, stdio:'inherit'});
  
        var _W_EXITCODE = function(ret, sig) {
          return ((ret) << 8 | (sig));
        }
  
        // this really only can happen if process is killed by signal
        if (ret.status === null) {
          // sadly node doesn't expose such function
          var signalToNumber = function(sig) {
            // implement only the most common ones, and fallback to SIGINT
            switch (sig) {
              case 'SIGHUP': return 1;
              case 'SIGINT': return 2;
              case 'SIGQUIT': return 3;
              case 'SIGFPE': return 8;
              case 'SIGKILL': return 9;
              case 'SIGALRM': return 14;
              case 'SIGTERM': return 15;
            }
            return 2; // SIGINT
          }
          return _W_EXITCODE(0, signalToNumber(ret.signal));
        }
  
        return _W_EXITCODE(ret.status, 0);
      }
      // int system(const char *command);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/system.html
      // Can't call external programs.
      if (!command) return 0; // no shell available
      setErrNo(6);
      return -1;
    }

var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
    if (!parent) {
      parent = this;  // root node sets parent to itself
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
  };
  var readMode = 292/*292*/ | 73/*73*/;
  var writeMode = 146/*146*/;
  Object.defineProperties(FSNode.prototype, {
   read: {
    get: /** @this{FSNode} */function() {
     return (this.mode & readMode) === readMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= readMode : this.mode &= ~readMode;
    }
   },
   write: {
    get: /** @this{FSNode} */function() {
     return (this.mode & writeMode) === writeMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= writeMode : this.mode &= ~writeMode;
    }
   },
   isFolder: {
    get: /** @this{FSNode} */function() {
     return FS.isDir(this.mode);
    }
   },
   isDevice: {
    get: /** @this{FSNode} */function() {
     return FS.isChrdev(this.mode);
    }
   }
  });
  FS.FSNode = FSNode;
  FS.staticInit();Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;Module["FS_unlink"] = FS.unlink;;
var ASSERTIONS = true;

/**
 * @license
 * Copyright 2017 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


var asmGlobalArg = {};
var asmLibraryArg = { "__handle_stack_overflow": ___handle_stack_overflow, "__sys_access": ___sys_access, "__sys_chmod": ___sys_chmod, "__sys_fcntl64": ___sys_fcntl64, "__sys_fstat64": ___sys_fstat64, "__sys_getcwd": ___sys_getcwd, "__sys_getdents64": ___sys_getdents64, "__sys_ioctl": ___sys_ioctl, "__sys_lstat64": ___sys_lstat64, "__sys_mkdir": ___sys_mkdir, "__sys_open": ___sys_open, "__sys_readlink": ___sys_readlink, "__sys_rmdir": ___sys_rmdir, "__sys_stat64": ___sys_stat64, "__sys_unlink": ___sys_unlink, "__sys_wait4": ___sys_wait4, "clock_gettime": _clock_gettime, "emscripten_get_sbrk_ptr": _emscripten_get_sbrk_ptr, "emscripten_memcpy_big": _emscripten_memcpy_big, "emscripten_resize_heap": _emscripten_resize_heap, "environ_get": _environ_get, "environ_sizes_get": _environ_sizes_get, "exit": _exit, "fd_close": _fd_close, "fd_fdstat_get": _fd_fdstat_get, "fd_read": _fd_read, "fd_seek": _fd_seek, "fd_write": _fd_write, "gettimeofday": _gettimeofday, "memory": wasmMemory, "setTempRet0": _setTempRet0, "system": _system, "table": wasmTable };
var asm = createWasm();
Module["asm"] = asm;
/** @type {function(...*):?} */
var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["__wasm_call_ctors"].apply(null, arguments)
};

/** @type {function(...*):?} */
var _malloc = Module["_malloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["malloc"].apply(null, arguments)
};

/** @type {function(...*):?} */
var _free = Module["_free"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["free"].apply(null, arguments)
};

/** @type {function(...*):?} */
var _fflush = Module["_fflush"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["fflush"].apply(null, arguments)
};

/** @type {function(...*):?} */
var ___errno_location = Module["___errno_location"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["__errno_location"].apply(null, arguments)
};

/** @type {function(...*):?} */
var _main = Module["_main"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["main"].apply(null, arguments)
};

/** @type {function(...*):?} */
var __get_tzname = Module["__get_tzname"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_get_tzname"].apply(null, arguments)
};

/** @type {function(...*):?} */
var __get_daylight = Module["__get_daylight"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_get_daylight"].apply(null, arguments)
};

/** @type {function(...*):?} */
var __get_timezone = Module["__get_timezone"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_get_timezone"].apply(null, arguments)
};

/** @type {function(...*):?} */
var _emscripten_main_thread_process_queued_calls = Module["_emscripten_main_thread_process_queued_calls"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["emscripten_main_thread_process_queued_calls"].apply(null, arguments)
};

/** @type {function(...*):?} */
var ___set_stack_limit = Module["___set_stack_limit"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["__set_stack_limit"].apply(null, arguments)
};

/** @type {function(...*):?} */
var stackSave = Module["stackSave"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["stackSave"].apply(null, arguments)
};

/** @type {function(...*):?} */
var stackAlloc = Module["stackAlloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["stackAlloc"].apply(null, arguments)
};

/** @type {function(...*):?} */
var stackRestore = Module["stackRestore"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["stackRestore"].apply(null, arguments)
};

/** @type {function(...*):?} */
var __growWasmMemory = Module["__growWasmMemory"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["__growWasmMemory"].apply(null, arguments)
};

/** @type {function(...*):?} */
var dynCall_iii = Module["dynCall_iii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iii"].apply(null, arguments)
};

/** @type {function(...*):?} */
var dynCall_ii = Module["dynCall_ii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_ii"].apply(null, arguments)
};

/** @type {function(...*):?} */
var dynCall_iiii = Module["dynCall_iiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiii"].apply(null, arguments)
};

/** @type {function(...*):?} */
var dynCall_jiji = Module["dynCall_jiji"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_jiji"].apply(null, arguments)
};

/** @type {function(...*):?} */
var dynCall_iidiiii = Module["dynCall_iidiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iidiiii"].apply(null, arguments)
};

/** @type {function(...*):?} */
var dynCall_vii = Module["dynCall_vii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_vii"].apply(null, arguments)
};



/**
 * @license
 * Copyright 2010 The Emscripten Authors
 * SPDX-License-Identifier: MIT
 */

// === Auto-generated postamble setup entry stuff ===

Module['asm'] = asm;

if (!Object.getOwnPropertyDescriptor(Module, "intArrayFromString")) Module["intArrayFromString"] = function() { abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "intArrayToString")) Module["intArrayToString"] = function() { abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ccall")) Module["ccall"] = function() { abort("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "cwrap")) Module["cwrap"] = function() { abort("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setValue")) Module["setValue"] = function() { abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getValue")) Module["getValue"] = function() { abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "allocate")) Module["allocate"] = function() { abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["getMemory"] = getMemory;
if (!Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString")) Module["UTF8ArrayToString"] = function() { abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF8ToString")) Module["UTF8ToString"] = function() { abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array")) Module["stringToUTF8Array"] = function() { abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8")) Module["stringToUTF8"] = function() { abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8")) Module["lengthBytesUTF8"] = function() { abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPreRun")) Module["addOnPreRun"] = function() { abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnInit")) Module["addOnInit"] = function() { abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPreMain")) Module["addOnPreMain"] = function() { abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnExit")) Module["addOnExit"] = function() { abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPostRun")) Module["addOnPostRun"] = function() { abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeStringToMemory")) Module["writeStringToMemory"] = function() { abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeArrayToMemory")) Module["writeArrayToMemory"] = function() { abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeAsciiToMemory")) Module["writeAsciiToMemory"] = function() { abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["addRunDependency"] = addRunDependency;
Module["removeRunDependency"] = removeRunDependency;
Module["FS_createFolder"] = FS.createFolder;
Module["FS_createPath"] = FS.createPath;
Module["FS_createDataFile"] = FS.createDataFile;
Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
Module["FS_createLazyFile"] = FS.createLazyFile;
Module["FS_createLink"] = FS.createLink;
Module["FS_createDevice"] = FS.createDevice;
Module["FS_unlink"] = FS.unlink;
if (!Object.getOwnPropertyDescriptor(Module, "dynamicAlloc")) Module["dynamicAlloc"] = function() { abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "loadDynamicLibrary")) Module["loadDynamicLibrary"] = function() { abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "loadWebAssemblyModule")) Module["loadWebAssemblyModule"] = function() { abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getLEB")) Module["getLEB"] = function() { abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFunctionTables")) Module["getFunctionTables"] = function() { abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "alignFunctionTables")) Module["alignFunctionTables"] = function() { abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerFunctions")) Module["registerFunctions"] = function() { abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addFunction")) Module["addFunction"] = function() { abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "removeFunction")) Module["removeFunction"] = function() { abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function() { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "prettyPrint")) Module["prettyPrint"] = function() { abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "makeBigInt")) Module["makeBigInt"] = function() { abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function() { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getCompilerSetting")) Module["getCompilerSetting"] = function() { abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "print")) Module["print"] = function() { abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "printErr")) Module["printErr"] = function() { abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getTempRet0")) Module["getTempRet0"] = function() { abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setTempRet0")) Module["setTempRet0"] = function() { abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["callMain"] = callMain;
if (!Object.getOwnPropertyDescriptor(Module, "abort")) Module["abort"] = function() { abort("'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToNewUTF8")) Module["stringToNewUTF8"] = function() { abort("'stringToNewUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "abortOnCannotGrowMemory")) Module["abortOnCannotGrowMemory"] = function() { abort("'abortOnCannotGrowMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscripten_realloc_buffer")) Module["emscripten_realloc_buffer"] = function() { abort("'emscripten_realloc_buffer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ENV")) Module["ENV"] = function() { abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setjmpId")) Module["setjmpId"] = function() { abort("'setjmpId' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_CODES")) Module["ERRNO_CODES"] = function() { abort("'ERRNO_CODES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_MESSAGES")) Module["ERRNO_MESSAGES"] = function() { abort("'ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setErrNo")) Module["setErrNo"] = function() { abort("'setErrNo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "DNS")) Module["DNS"] = function() { abort("'DNS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GAI_ERRNO_MESSAGES")) Module["GAI_ERRNO_MESSAGES"] = function() { abort("'GAI_ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Protocols")) Module["Protocols"] = function() { abort("'Protocols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Sockets")) Module["Sockets"] = function() { abort("'Sockets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UNWIND_CACHE")) Module["UNWIND_CACHE"] = function() { abort("'UNWIND_CACHE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgs")) Module["readAsmConstArgs"] = function() { abort("'readAsmConstArgs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jstoi_q")) Module["jstoi_q"] = function() { abort("'jstoi_q' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jstoi_s")) Module["jstoi_s"] = function() { abort("'jstoi_s' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "reallyNegative")) Module["reallyNegative"] = function() { abort("'reallyNegative' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "formatString")) Module["formatString"] = function() { abort("'formatString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PATH")) Module["PATH"] = function() { abort("'PATH' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PATH_FS")) Module["PATH_FS"] = function() { abort("'PATH_FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SYSCALLS")) Module["SYSCALLS"] = function() { abort("'SYSCALLS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "syscallMmap2")) Module["syscallMmap2"] = function() { abort("'syscallMmap2' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "syscallMunmap")) Module["syscallMunmap"] = function() { abort("'syscallMunmap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "JSEvents")) Module["JSEvents"] = function() { abort("'JSEvents' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "specialHTMLTargets")) Module["specialHTMLTargets"] = function() { abort("'specialHTMLTargets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "demangle")) Module["demangle"] = function() { abort("'demangle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "demangleAll")) Module["demangleAll"] = function() { abort("'demangleAll' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jsStackTrace")) Module["jsStackTrace"] = function() { abort("'jsStackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getEnvStrings")) Module["getEnvStrings"] = function() { abort("'getEnvStrings' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64")) Module["writeI53ToI64"] = function() { abort("'writeI53ToI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Clamped")) Module["writeI53ToI64Clamped"] = function() { abort("'writeI53ToI64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Signaling")) Module["writeI53ToI64Signaling"] = function() { abort("'writeI53ToI64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Clamped")) Module["writeI53ToU64Clamped"] = function() { abort("'writeI53ToU64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Signaling")) Module["writeI53ToU64Signaling"] = function() { abort("'writeI53ToU64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readI53FromI64")) Module["readI53FromI64"] = function() { abort("'readI53FromI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readI53FromU64")) Module["readI53FromU64"] = function() { abort("'readI53FromU64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "convertI32PairToI53")) Module["convertI32PairToI53"] = function() { abort("'convertI32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "convertU32PairToI53")) Module["convertU32PairToI53"] = function() { abort("'convertU32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Browser")) Module["Browser"] = function() { abort("'Browser' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "FS")) Module["FS"] = function() { abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "MEMFS")) Module["MEMFS"] = function() { abort("'MEMFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "TTY")) Module["TTY"] = function() { abort("'TTY' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PIPEFS")) Module["PIPEFS"] = function() { abort("'PIPEFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SOCKFS")) Module["SOCKFS"] = function() { abort("'SOCKFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GL")) Module["GL"] = function() { abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGet")) Module["emscriptenWebGLGet"] = function() { abort("'emscriptenWebGLGet' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetTexPixelData")) Module["emscriptenWebGLGetTexPixelData"] = function() { abort("'emscriptenWebGLGetTexPixelData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetUniform")) Module["emscriptenWebGLGetUniform"] = function() { abort("'emscriptenWebGLGetUniform' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetVertexAttrib")) Module["emscriptenWebGLGetVertexAttrib"] = function() { abort("'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "AL")) Module["AL"] = function() { abort("'AL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_unicode")) Module["SDL_unicode"] = function() { abort("'SDL_unicode' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_ttfContext")) Module["SDL_ttfContext"] = function() { abort("'SDL_ttfContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_audio")) Module["SDL_audio"] = function() { abort("'SDL_audio' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL")) Module["SDL"] = function() { abort("'SDL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_gfx")) Module["SDL_gfx"] = function() { abort("'SDL_gfx' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLUT")) Module["GLUT"] = function() { abort("'GLUT' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "EGL")) Module["EGL"] = function() { abort("'EGL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLFW_Window")) Module["GLFW_Window"] = function() { abort("'GLFW_Window' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLFW")) Module["GLFW"] = function() { abort("'GLFW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLEW")) Module["GLEW"] = function() { abort("'GLEW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "IDBStore")) Module["IDBStore"] = function() { abort("'IDBStore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "runAndAbortIfError")) Module["runAndAbortIfError"] = function() { abort("'runAndAbortIfError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "warnOnce")) Module["warnOnce"] = function() { abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackSave")) Module["stackSave"] = function() { abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackRestore")) Module["stackRestore"] = function() { abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackAlloc")) Module["stackAlloc"] = function() { abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "AsciiToString")) Module["AsciiToString"] = function() { abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToAscii")) Module["stringToAscii"] = function() { abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF16ToString")) Module["UTF16ToString"] = function() { abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF16")) Module["stringToUTF16"] = function() { abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16")) Module["lengthBytesUTF16"] = function() { abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF32ToString")) Module["UTF32ToString"] = function() { abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF32")) Module["stringToUTF32"] = function() { abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32")) Module["lengthBytesUTF32"] = function() { abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8")) Module["allocateUTF8"] = function() { abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8OnStack")) Module["allocateUTF8OnStack"] = function() { abort("'allocateUTF8OnStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["writeStackCookie"] = writeStackCookie;
Module["checkStackCookie"] = checkStackCookie;
Module["abortStackOverflow"] = abortStackOverflow;if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NORMAL")) Object.defineProperty(Module, "ALLOC_NORMAL", { configurable: true, get: function() { abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK")) Object.defineProperty(Module, "ALLOC_STACK", { configurable: true, get: function() { abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_DYNAMIC")) Object.defineProperty(Module, "ALLOC_DYNAMIC", { configurable: true, get: function() { abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NONE")) Object.defineProperty(Module, "ALLOC_NONE", { configurable: true, get: function() { abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });



var calledRun;

/**
 * @constructor
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}

var calledMain = false;


dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  var entryFunction = Module['_main'];


  args = args || [];

  var argc = args.length+1;
  var argv = stackAlloc((argc + 1) * 4);
  HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram);
  for (var i = 1; i < argc; i++) {
    HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
  }
  HEAP32[(argv >> 2) + argc] = 0;


  try {

    Module['___set_stack_limit'](STACK_MAX);

    var ret = entryFunction(argc, argv);


    // In PROXY_TO_PTHREAD builds, we should never exit the runtime below, as execution is asynchronously handed
    // off to a pthread.
    // if we're not running an evented main loop, it's time to exit
      exit(ret, /* implicit = */ true);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'unwind') {
      // running an evented main loop, don't immediately exit
      noExitRuntime = true;
      return;
    } else {
      var toLog = e;
      if (e && typeof e === 'object' && e.stack) {
        toLog = [e, e.stack];
      }
      err('exception thrown: ' + toLog);
      quit_(1, e);
    }
  } finally {
    calledMain = true;
  }
}




/** @type {function(Array=)} */
function run(args) {
  args = args || arguments_;

  if (runDependencies > 0) {
    return;
  }

  writeStackCookie();

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}
Module['run'] = run;

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var print = out;
  var printErr = err;
  var has = false;
  out = err = function(x) {
    has = true;
  }
  try { // it doesn't matter if it fails
    var flush = Module['_fflush'];
    if (flush) flush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach(function(name) {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty && tty.output && tty.output.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = print;
  err = printErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.');
  }
}

/** @param {boolean|number=} implicit */
function exit(status, implicit) {
  checkUnflushedContent();

  // if this is just main exit-ing implicitly, and the status is 0, then we
  // don't need to do anything here and can just leave. if the status is
  // non-zero, though, then we need to report it.
  // (we may have warned about this earlier, if a situation justifies doing so)
  if (implicit && noExitRuntime && status === 0) {
    return;
  }

  if (noExitRuntime) {
    // if exit() was called, we may warn the user if the runtime isn't actually being shut down
    if (!implicit) {
      var msg = 'program exited (with status: ' + status + '), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)';
      err(msg);
    }
  } else {

    ABORT = true;
    EXITSTATUS = status;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  quit_(status, new ExitStatus(status));
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = false;

if (Module['noInitialRun']) shouldRunNow = false;


  noExitRuntime = true;

run();





// {{MODULE_ADDITIONS}}



let editor = document.querySelector("#editor")
let output = document.querySelector("#output")

let voutput = []

let outv = ch => { if (ch !== null) voutput.push(ch) }
FS.init(() => null, outv, outv)

FS.writeFile("/v", "")
FS.symlink("/v", "/proc/self/exe")

let play = document.querySelector("#play")
let stop = document.querySelector("#stop")

let ids = []

let lib =
{
	console:
	{
		log: value => output.append(value + "\n"),
		clear: () => output.textContent = "",
	},
	set: (obj, key, value) => obj[key] = value,
	get: (obj, i) => obj[i],
	get2: (obj, i, j) => obj[i][j],
	setInterval: (f, ms) =>
	{
		play.disabled = true
		stop.disabled = false
		ids.push(setInterval(f, ms))
	},
}

let libKeys = Object.keys(lib)
let libValues = libKeys.map(key => lib[key])

stop.addEventListener("click", () =>
{
	for (let id of ids) clearInterval(id)
	ids = []
	play.disabled = false
	stop.disabled = true
})

let success

play.addEventListener("click", () =>
{
	output.textContent = ""
	voutput = []
	
	FS.writeFile("main.v", editor.textContent)
	ENV.TERM = "dumb"
	
	success = true
	
	Module.callMain(["-b", "js", "main.v"])
	
	if (success)
	{
		try
		{
			Function(...libKeys, FS.readFile("main.js", {encoding: "utf8"}))(...libValues)
		}
		catch (error)
		{
			output.append("\n")
			if (error instanceof Error) output.append(error.stack)
			else output.append(String(error))
		}
	}
})

quit_ = (status, error) =>
{
	success = false
	output.append(String.fromCodePoint(...voutput))
	throw error
}

