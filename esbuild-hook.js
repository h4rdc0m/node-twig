const Module = require('module');
const { transformSync } = require('esbuild');
const sourceMapSupport = require('source-map-support');

const cache = {};

function esbuildHook(code, filepath) {
  const result= transformSync(code, {
    target: 'node16',
    sourcemap: 'both',
    loader: 'ts',
    format: 'cjs',
    sourcefile: filepath,
  });

  cache[filepath] = {
    url: filepath,
    code: result.code,
    map: result.map,
  };

  return result.code;
}

sourceMapSupport.install({
  environment: 'node',
  retrieveFile(pathOrUrl) {
    const file = cache[pathOrUrl];
    if (file) {
      return file.code;
    } else {
      return "";
    }
  }
});

const defaultLoader = Module._extensions['.js'];
Module._extensions['.ts'] = function (module, filename) {
  if (filename.includes('node_modules')) {
    return defaultLoader(module, filename);
  }

  const defaultCompile = module._compile;
  module._compile = function (code) {
    module._compile = defaultCompile;
    return module._compile(esbuildHook(code, filename), filename);
  };

  defaultLoader(module, filename);
};
