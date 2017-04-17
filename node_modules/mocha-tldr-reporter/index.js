var Base = require('mocha').reporters.Base;

function TldrReporter(runner) {
	Base.call(this, runner);
	
	runner.on('end', this.epilogue.bind(this));
}

TldrReporter.prototype.__proto__ = Base.prototype;

module.exports = TldrReporter;