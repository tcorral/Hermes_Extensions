/*global window, document, TestCase, Hermes, assertInstanceOf*/
(function(win, doc, Hermes)
{
	'use strict';
	var oTestCase = TestCase;

	oTestCase("TracerTest", sinon.testCase({
		setUp: function()
		{
		},
		tearDown: function()
		{
		},
		'test should check that Hermes.tracer has untraceAll method': function()
		{
			assertFunction(Hermes.tracer.untraceAll);
		},
		'test should check that Hermes.tracer has resetTracing method': function()
		{
			assertFunction(Hermes.tracer.resetTracing);
		},
		'test should check that Hermes.tracer has traceAll method': function()
		{
			assertFunction(Hermes.tracer.traceAll);
		},
		'test should check that Hermes.tracer has addTracing method': function()
		{
			assertFunction(Hermes.tracer.addTracing);
		},
		'test should check that Hermes.tracer has trace method': function()
		{
			assertFunction(Hermes.tracer.trace);
		}
	}));
}(window, document, Hermes));