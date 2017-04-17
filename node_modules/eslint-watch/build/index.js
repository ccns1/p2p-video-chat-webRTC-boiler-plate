'use strict';

var _keypress = require('keypress');

var _keypress2 = _interopRequireDefault(_keypress);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _cli = require('./eslint/cli');

var _cli2 = _interopRequireDefault(_cli);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _watcher = require('./watcher');

var _watcher2 = _interopRequireDefault(_watcher);

var _argParser = require('./arg-parser');

var _argParser2 = _interopRequireDefault(_argParser);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _clearTerminal = require('./formatters/helpers/clear-terminal.js');

var _clearTerminal2 = _interopRequireDefault(_clearTerminal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logger2.default)('esw-cli'); /* eslint no-process-exit: 0*/


logger.debug('Loaded');
logger.debug(`Eslint-Watch: ${_package2.default.version}`);

var exitCode = void 0;
var args = process.argv;

function runLint(args, options) {
  logger.debug(args);
  var result = (0, _cli2.default)(args, options);
  logger.debug('lint completed. Exit Code: %o', result.exitCode);
  exitCode = result.exitCode;
  logger.log(result.message);
}

function keyListener(args, options) {
  var stdin = process.stdin;
  if (!stdin.setRawMode) {
    logger.debug('Process might be wrapped exiting keybinding');
    return;
  }
  (0, _keypress2.default)(stdin);
  stdin.on('keypress', function keyPressListener(ch, key) {
    logger.debug('%s was pressed', key.name);
    if (key.name === 'return') {
      logger.debug('relinting...');
      logger.debug(options);
      runLint(args, options);
    }
    if (key.ctrl && key.name === 'c') {
      process.exit();
    }
  });
  stdin.setRawMode(true);
  stdin.resume();
}

logger.debug('Arguments passed: %o', args);
var parsedOptions = _options2.default.parse(args);
_settings2.default.cliOptions = parsedOptions;

if (parsedOptions.eswVersion) {
  logger.log(_package2.default.version);
} else {
  logger.debug('Parsing args');
  var eslArgs = _argParser2.default.parse(args, parsedOptions);
  if (!parsedOptions.help) {
    logger.debug('Running initial lint');
    if (parsedOptions.clear) {
      (0, _clearTerminal2.default)();
    }
    runLint(eslArgs, parsedOptions);
    if (parsedOptions.watch) {
      logger.debug('-w seen');
      keyListener(eslArgs, parsedOptions);
      (0, _watcher2.default)(parsedOptions);
    }
  } else {
    logger.log(_options2.default.generateHelp());
  }
}

process.on('exit', function () {
  logger.debug(`Exiting: ${exitCode}`);
  process.exit(exitCode);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsb2dnZXIiLCJkZWJ1ZyIsInZlcnNpb24iLCJleGl0Q29kZSIsImFyZ3MiLCJwcm9jZXNzIiwiYXJndiIsInJ1bkxpbnQiLCJvcHRpb25zIiwicmVzdWx0IiwibG9nIiwibWVzc2FnZSIsImtleUxpc3RlbmVyIiwic3RkaW4iLCJzZXRSYXdNb2RlIiwib24iLCJrZXlQcmVzc0xpc3RlbmVyIiwiY2giLCJrZXkiLCJuYW1lIiwiY3RybCIsImV4aXQiLCJyZXN1bWUiLCJwYXJzZWRPcHRpb25zIiwicGFyc2UiLCJjbGlPcHRpb25zIiwiZXN3VmVyc2lvbiIsImVzbEFyZ3MiLCJoZWxwIiwiY2xlYXIiLCJ3YXRjaCIsImdlbmVyYXRlSGVscCJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFNBQVMsc0JBQU8sU0FBUCxDQUFmLEMsQ0FaQTs7O0FBY0FBLE9BQU9DLEtBQVAsQ0FBYSxRQUFiO0FBQ0FELE9BQU9DLEtBQVAsQ0FBYyxpQkFBZ0Isa0JBQUlDLE9BQVEsRUFBMUM7O0FBRUEsSUFBSUMsaUJBQUo7QUFDQSxJQUFNQyxPQUFPQyxRQUFRQyxJQUFyQjs7QUFFQSxTQUFTQyxPQUFULENBQWlCSCxJQUFqQixFQUF1QkksT0FBdkIsRUFBK0I7QUFDN0JSLFNBQU9DLEtBQVAsQ0FBYUcsSUFBYjtBQUNBLE1BQU1LLFNBQVMsbUJBQVVMLElBQVYsRUFBZ0JJLE9BQWhCLENBQWY7QUFDQVIsU0FBT0MsS0FBUCxDQUFhLCtCQUFiLEVBQThDUSxPQUFPTixRQUFyRDtBQUNBQSxhQUFXTSxPQUFPTixRQUFsQjtBQUNBSCxTQUFPVSxHQUFQLENBQVdELE9BQU9FLE9BQWxCO0FBQ0Q7O0FBRUQsU0FBU0MsV0FBVCxDQUFxQlIsSUFBckIsRUFBMkJJLE9BQTNCLEVBQW1DO0FBQ2pDLE1BQUlLLFFBQVFSLFFBQVFRLEtBQXBCO0FBQ0EsTUFBRyxDQUFDQSxNQUFNQyxVQUFWLEVBQXFCO0FBQ25CZCxXQUFPQyxLQUFQLENBQWEsNkNBQWI7QUFDQTtBQUNEO0FBQ0QsMEJBQVNZLEtBQVQ7QUFDQUEsUUFBTUUsRUFBTixDQUFTLFVBQVQsRUFBcUIsU0FBU0MsZ0JBQVQsQ0FBMEJDLEVBQTFCLEVBQThCQyxHQUE5QixFQUFrQztBQUNyRGxCLFdBQU9DLEtBQVAsQ0FBYSxnQkFBYixFQUErQmlCLElBQUlDLElBQW5DO0FBQ0EsUUFBR0QsSUFBSUMsSUFBSixLQUFhLFFBQWhCLEVBQXlCO0FBQ3ZCbkIsYUFBT0MsS0FBUCxDQUFhLGNBQWI7QUFDQUQsYUFBT0MsS0FBUCxDQUFhTyxPQUFiO0FBQ0FELGNBQVFILElBQVIsRUFBY0ksT0FBZDtBQUNEO0FBQ0QsUUFBR1UsSUFBSUUsSUFBSixJQUFZRixJQUFJQyxJQUFKLEtBQWEsR0FBNUIsRUFBaUM7QUFDL0JkLGNBQVFnQixJQUFSO0FBQ0Q7QUFDRixHQVZEO0FBV0FSLFFBQU1DLFVBQU4sQ0FBaUIsSUFBakI7QUFDQUQsUUFBTVMsTUFBTjtBQUNEOztBQUVEdEIsT0FBT0MsS0FBUCxDQUFhLHNCQUFiLEVBQXFDRyxJQUFyQztBQUNBLElBQU1tQixnQkFBZ0Isa0JBQVlDLEtBQVosQ0FBa0JwQixJQUFsQixDQUF0QjtBQUNBLG1CQUFTcUIsVUFBVCxHQUFzQkYsYUFBdEI7O0FBRUEsSUFBR0EsY0FBY0csVUFBakIsRUFBNEI7QUFDMUIxQixTQUFPVSxHQUFQLENBQVcsa0JBQUlSLE9BQWY7QUFDRCxDQUZELE1BRU87QUFDTEYsU0FBT0MsS0FBUCxDQUFhLGNBQWI7QUFDQSxNQUFNMEIsVUFBVSxvQkFBVUgsS0FBVixDQUFnQnBCLElBQWhCLEVBQXNCbUIsYUFBdEIsQ0FBaEI7QUFDQSxNQUFJLENBQUNBLGNBQWNLLElBQW5CLEVBQXlCO0FBQ3ZCNUIsV0FBT0MsS0FBUCxDQUFhLHNCQUFiO0FBQ0EsUUFBSXNCLGNBQWNNLEtBQWxCLEVBQXlCO0FBQ3ZCO0FBQ0Q7QUFDRHRCLFlBQVFvQixPQUFSLEVBQWlCSixhQUFqQjtBQUNBLFFBQUlBLGNBQWNPLEtBQWxCLEVBQXlCO0FBQ3ZCOUIsYUFBT0MsS0FBUCxDQUFhLFNBQWI7QUFDQVcsa0JBQVllLE9BQVosRUFBcUJKLGFBQXJCO0FBQ0EsNkJBQVFBLGFBQVI7QUFDRDtBQUNGLEdBWEQsTUFXTztBQUNMdkIsV0FBT1UsR0FBUCxDQUFXLGtCQUFZcUIsWUFBWixFQUFYO0FBQ0Q7QUFDRjs7QUFHRDFCLFFBQVFVLEVBQVIsQ0FBVyxNQUFYLEVBQW1CLFlBQU07QUFDdkJmLFNBQU9DLEtBQVAsQ0FBYyxZQUFXRSxRQUFTLEVBQWxDO0FBQ0FFLFVBQVFnQixJQUFSLENBQWFsQixRQUFiO0FBQ0QsQ0FIRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBuby1wcm9jZXNzLWV4aXQ6IDAqL1xuaW1wb3J0IGtleXByZXNzIGZyb20gJ2tleXByZXNzJztcblxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IGVzbGludENsaSBmcm9tICcuL2VzbGludC9jbGknO1xuaW1wb3J0IGhlbHBPcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgd2F0Y2hlciBmcm9tICcuL3dhdGNoZXInO1xuaW1wb3J0IGFyZ1BhcnNlciBmcm9tICcuL2FyZy1wYXJzZXInO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgcGtnIGZyb20gJy4uL3BhY2thZ2UnO1xuaW1wb3J0IGNsZWFyVGVybWluYWwgZnJvbSAnLi9mb3JtYXR0ZXJzL2hlbHBlcnMvY2xlYXItdGVybWluYWwuanMnO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIoJ2Vzdy1jbGknKTtcblxubG9nZ2VyLmRlYnVnKCdMb2FkZWQnKTtcbmxvZ2dlci5kZWJ1ZyhgRXNsaW50LVdhdGNoOiAke3BrZy52ZXJzaW9ufWApO1xuXG5sZXQgZXhpdENvZGU7XG5jb25zdCBhcmdzID0gcHJvY2Vzcy5hcmd2O1xuXG5mdW5jdGlvbiBydW5MaW50KGFyZ3MsIG9wdGlvbnMpe1xuICBsb2dnZXIuZGVidWcoYXJncyk7XG4gIGNvbnN0IHJlc3VsdCA9IGVzbGludENsaShhcmdzLCBvcHRpb25zKTtcbiAgbG9nZ2VyLmRlYnVnKCdsaW50IGNvbXBsZXRlZC4gRXhpdCBDb2RlOiAlbycsIHJlc3VsdC5leGl0Q29kZSk7XG4gIGV4aXRDb2RlID0gcmVzdWx0LmV4aXRDb2RlO1xuICBsb2dnZXIubG9nKHJlc3VsdC5tZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24ga2V5TGlzdGVuZXIoYXJncywgb3B0aW9ucyl7XG4gIGxldCBzdGRpbiA9IHByb2Nlc3Muc3RkaW47XG4gIGlmKCFzdGRpbi5zZXRSYXdNb2RlKXtcbiAgICBsb2dnZXIuZGVidWcoJ1Byb2Nlc3MgbWlnaHQgYmUgd3JhcHBlZCBleGl0aW5nIGtleWJpbmRpbmcnKTtcbiAgICByZXR1cm47XG4gIH1cbiAga2V5cHJlc3Moc3RkaW4pO1xuICBzdGRpbi5vbigna2V5cHJlc3MnLCBmdW5jdGlvbiBrZXlQcmVzc0xpc3RlbmVyKGNoLCBrZXkpe1xuICAgIGxvZ2dlci5kZWJ1ZygnJXMgd2FzIHByZXNzZWQnLCBrZXkubmFtZSk7XG4gICAgaWYoa2V5Lm5hbWUgPT09ICdyZXR1cm4nKXtcbiAgICAgIGxvZ2dlci5kZWJ1ZygncmVsaW50aW5nLi4uJyk7XG4gICAgICBsb2dnZXIuZGVidWcob3B0aW9ucyk7XG4gICAgICBydW5MaW50KGFyZ3MsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZihrZXkuY3RybCAmJiBrZXkubmFtZSA9PT0gJ2MnKSB7XG4gICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICB9XG4gIH0pO1xuICBzdGRpbi5zZXRSYXdNb2RlKHRydWUpO1xuICBzdGRpbi5yZXN1bWUoKTtcbn1cblxubG9nZ2VyLmRlYnVnKCdBcmd1bWVudHMgcGFzc2VkOiAlbycsIGFyZ3MpO1xuY29uc3QgcGFyc2VkT3B0aW9ucyA9IGhlbHBPcHRpb25zLnBhcnNlKGFyZ3MpO1xuc2V0dGluZ3MuY2xpT3B0aW9ucyA9IHBhcnNlZE9wdGlvbnM7XG5cbmlmKHBhcnNlZE9wdGlvbnMuZXN3VmVyc2lvbil7XG4gIGxvZ2dlci5sb2cocGtnLnZlcnNpb24pO1xufSBlbHNlIHtcbiAgbG9nZ2VyLmRlYnVnKCdQYXJzaW5nIGFyZ3MnKTtcbiAgY29uc3QgZXNsQXJncyA9IGFyZ1BhcnNlci5wYXJzZShhcmdzLCBwYXJzZWRPcHRpb25zKTtcbiAgaWYgKCFwYXJzZWRPcHRpb25zLmhlbHApIHtcbiAgICBsb2dnZXIuZGVidWcoJ1J1bm5pbmcgaW5pdGlhbCBsaW50Jyk7XG4gICAgaWYgKHBhcnNlZE9wdGlvbnMuY2xlYXIpIHtcbiAgICAgIGNsZWFyVGVybWluYWwoKTtcbiAgICB9XG4gICAgcnVuTGludChlc2xBcmdzLCBwYXJzZWRPcHRpb25zKTtcbiAgICBpZiAocGFyc2VkT3B0aW9ucy53YXRjaCkge1xuICAgICAgbG9nZ2VyLmRlYnVnKCctdyBzZWVuJyk7XG4gICAgICBrZXlMaXN0ZW5lcihlc2xBcmdzLCBwYXJzZWRPcHRpb25zKTtcbiAgICAgIHdhdGNoZXIocGFyc2VkT3B0aW9ucyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coaGVscE9wdGlvbnMuZ2VuZXJhdGVIZWxwKCkpO1xuICB9XG59XG5cblxucHJvY2Vzcy5vbignZXhpdCcsICgpID0+IHtcbiAgbG9nZ2VyLmRlYnVnKGBFeGl0aW5nOiAke2V4aXRDb2RlfWApO1xuICBwcm9jZXNzLmV4aXQoZXhpdENvZGUpO1xufSk7XG4iXX0=