/*global window, document, Hermes, TestCase, assertEquals, assertFunction, assertTrue, assertFalse*/
(function(win, doc, Hermes)
{
	'use strict';
	var oTestCase = TestCase;

	oTestCase('FileAppenderTest', sinon.testCase({
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
			assertEquals('[object FileAppender]', Hermes.logger.oAppenders['[object FileAppender]'].sName);
		},
		'test should check that clear method exist': function()
		{
			assertFunction(Hermes.logger.oAppenders['[object FileAppender]'].clear);
		},
		'test should check that log method exist': function()
		{
			assertFunction(Hermes.logger.oAppenders['[object FileAppender]'].log);
		}
	}));

	oTestCase('FileAppenderLogTest', sinon.testCase({
		setUp: function()
		{
			this.oFileAppender = Hermes.logger.oAppenders['[object FileAppender]'];
			sinon.stub(this.oFileAppender, "openFile");
		},
		tearDown: function()
		{
			this.oFileAppender.openFile.restore();
			delete this.oFileAppender;
		},
		'test should check that log method must call this.oFileAppender.openFile one time': function()
		{
			this.oFileAppender.log();

			assertEquals(1, this.oFileAppender.openFile.callCount);
		}
	}));

	oTestCase('FileAppenderClearTest', sinon.testCase({
		setUp: function()
		{
			this.oFileAppender = Hermes.logger.oAppenders['[object FileAppender]'];
			sinon.stub(win, 'requestFileSystem');
		},
		tearDown: function()
		{
			win.requestFileSystem.restore();
			delete this.oFileAppender;
		},
		'test should check that clear method must call win.requestFileSystem one time': function()
		{
			this.oFileAppender.clear();

			assertEquals(1, win.requestFileSystem.callCount);
		}
	}));

	oTestCase('FileLayoutFormatTest', sinon.testCase({
		setUp: function()
		{
			this.oLayout = Hermes.logger.oAppenders['[object FileAppender]'].oLayout;
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

			assertEquals("Error level: ALL, Time: , Category: test, Message: message, FilenameUrl: file path, LineNumber: 20\n", sMessage);
		}
	}));
}(window, document, Hermes));