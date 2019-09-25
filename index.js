'use strict';

class ExportParserPlugin {
  constructor() {}
  apply(parser) {
      parser.plugin('export', () => {
        parser.state.current.addVariable('__webpack_wrapper_plugin__', 'true', []);
      });
  }
}

class WrapperPlugin {
  constructor() {}
  apply(compiler) {
    compiler.plugin('compilation', function(compilation, params) {
      const {normalModuleFactory} = params;
      normalModuleFactory.plugin('parser', (parser) => {
        parser.apply(new ExportParserPlugin());
      });
    });
  }
}

module.exports = WrapperPlugin;
