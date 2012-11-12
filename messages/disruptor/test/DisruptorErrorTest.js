/*global window, document, TestCase, Hermes, assertInstanceOf*/
(function(win, doc, Hermes)
{
	'use strict';
	var oTestCase = TestCase;

	oTestCase("HermesDisruptorErrorTest", sinon.testCase({
		setUp: function()
		{
			this.oMessage = new Hermes.disruptorError('Test', 'testFile.js');
		},
		tearDown: function()
		{
			delete this.oMessage;
		},
		"test should return Hermes.error instance as parent": function()
		{
			assertInstanceOf(Hermes.message, this.oMessage);
		},
		"test should return Hermes.disruptorError as instance": function()
		{
			assertInstanceOf(Hermes.disruptorError, this.oMessage);
		}
	}));
}(window, document, Hermes));