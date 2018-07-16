options.imports = {
    require: makeRequireFunction(dirname),
    __dirname: dirname,
    __filename: filename,
    [variable]: data,
    ...options.imports
  }