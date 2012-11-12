/*global window, document, Hermes, TestCase, assertEquals, assertFunction, assertTrue, assertFalse*/
(function(win, doc, Hermes)
{
	'use strict';
	var oTestCase = TestCase;

	oTestCase('ConsoleAppenderTest', sinon.testCase({
		setUp: function()
		{

		},
		tearDown: function()
		{

		},
		'test should check that oAppenders in Logger must have one appender': function()
		{
			assertEquals(1, getObjectLength(Hermes.logger.oAppenders));
		},
		'test should check that the appender added is [object ConsoleAppender]': function()
		{
			assertEquals('[object ConsoleAppender]', Hermes.logger.oAppenders['[object ConsoleAppender]'].sName);
		},
		'test should check that clear method exist': function()
		{
			assertFunction(Hermes.logger.oAppenders['[object ConsoleAppender]'].clear);
		},
		'test should check that log method exist': function()
		{
			assertFunction(Hermes.logger.oAppenders['[object ConsoleAppender]'].log);
		}
	}));

	oTestCase('ConsoleAppenderLogTest', sinon.testCase({
		setUp: function()
		{
			sinon.stub(console, "log");
			this.oConsoleAppender = Hermes.logger.oAppenders['[object ConsoleAppender]'];
			sinon.stub(this.oConsoleAppender.oLayout, "format");
		},
		tearDown: function()
		{
			this.oConsoleAppender.oLayout.format.restore();
			if(console.log.restore)
			{
				console.log.restore();
			}
			delete this.oConsoleAppender;
		},
		'test should check that log method must call console.log one time': function()
		{
			var bLog = false;

			bLog = Hermes.logger.oAppenders['[object ConsoleAppender]'].log();

			assertEquals(1, console.log.callCount);
			assertTrue(bLog);
		},
		'test should check that format method in layout is called one time': function()
		{
			var bLog = false;

			bLog = Hermes.logger.oAppenders['[object ConsoleAppender]'].log();

			assertEquals(1, this.oConsoleAppender.oLayout.format.callCount);
			assertTrue(bLog);
		},
		'test should check that log method is not called if console.log does not exist': function()
		{
			var bLog = true,
				log;
			console.log.restore();
			log = console.log;
			console.log = undefined;

			bLog = Hermes.logger.oAppenders['[object ConsoleAppender]'].log();

			assertFalse(bLog);
			console.log = log;
		},
		'test should check that format method is not called if console.log does not exist': function()
		{
			var bLog = true,
				log;
			console.log.restore();
			log = console.log;
			console.log = undefined;

			bLog = Hermes.logger.oAppenders['[object ConsoleAppender]'].log();

			assertFalse(bLog);
			console.log = log;
		}
	}));

	oTestCase('ConsoleAppenderClearTest', sinon.testCase({
		setUp: function()
		{
			if(typeof console.clear === 'undefined')
			{
				console.clear = function(){};
			}
			sinon.stub(console, "clear");
			this.oConsoleAppender = Hermes.logger.oAppenders['[object ConsoleAppender]'];
		},
		tearDown: function()
		{
			if(console.clear.restore)
			{
				console.clear.restore();
			}
			delete this.oConsoleAppender;
		},
		'test should check that clear method must call console.clear one time': function()
		{
			var bLog = false;

			bLog = Hermes.logger.oAppenders['[object ConsoleAppender]'].clear();

			assertEquals(1, console.clear.callCount);
			assertTrue(bLog);
		},
		'test should check that clear method is not called if console.clear does not exist': function()
		{
			var bLog = true,
				clear;
			console.clear.restore();
			clear = console.clear;
			console.clear = undefined;

			bLog = Hermes.logger.oAppenders['[object ConsoleAppender]'].clear();

			assertFalse(bLog);
			console.clear = clear;
		}
	}));

	oTestCase('ConsoleLayoutFormatTest', sinon.testCase({
		setUp: function()
		{
			this.oLayout = Hermes.logger.oAppenders['[object ConsoleAppender]'].oLayout;
			sinon.spy(this.oLayout, 'format');
			this.oMessage = new Hermes.message(Hermes.level.ALL, 'test', 'message', 'file path', 20);
		},
		tearDown: function()
		{
			this.oLayout.format.restore();
			delete this.oLayout;
			delete this.oMessage;
		},
		'test should check that format method returns an empty string if oMessage is not a Message': function()
		{
			var sMessage;

			sMessage = this.oLayout.format({});

			assertString(sMessage);
			assertEquals(0, sMessage.length);
		},
		'test should check that format method returns "Error level: level test, Time: 20/10/2012"': function()
		{
			var sMessage;

			sMessage = this.oLayout.format(this.oMessage);

			assertEquals("Error level: ALL, Time: , Category: test, Message: message, FilenameUrl: file path, LineNumber: 20.", sMessage);
		}
	}));
}(window, document, Hermes));