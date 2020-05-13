/*
FY 2020-0510
*/
window.jdls = window.jdls || {};

(function() {
	"use strict";

	var exports = window.jdls.usercode = {};
	var samples = exports.samples = {};

	exports.evaluate = function evaluate(code) {
		var context = {};
		Function(code).call(context);
		return context;
	};

	samples.instructions = { name: "Instructions", code:
		'\n' +
		'this.a = undefined;\n' +
		'this.b = null;\n' +
		'this.c = true;\n' +
		'this.d = "foo";\n' +
		'this.e = 3.14159;\n' +
		'this.f = function bar() {};\n' +
		'this.g = { h: "foo" };\n'
	};

	exports.DEFAULT_SAMPLE = samples.instructions;

}());