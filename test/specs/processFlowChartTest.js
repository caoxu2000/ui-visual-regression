import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import expectExactSame from '../helpers/expect_exact_same';

const config = require('config');


describe('Process Flow Chart Comparison Test', function() {

	it('Should be the same as baseline diagram topPart', function() {

		let isExisting;
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		browser.waitUntil(function() {
			isExisting = Home.videoWrapper.isExisting()
			return isExisting;
		}, 5000, 'video popup takes more than 5 seconds to load the Riffyn Video overlay');

		browser.url('processes/NRriBeYKnv5ErrraS');
		browser.waitUntil(function() {
			let isTitleChanged = browser.getTitle() === '4-1-4';
			return isTitleChanged;
		}, 10000, 'title takes more than 10 seconds to change');

		let topPart = browser.checkElement('.layers');
		expectExactSame(topPart);
		
	});

	it('Should be the same as baseline diagram bottomPart', function() {
		browser.pause(600);
		Process.canvas.click();
		for (let i = 1; i <= 15; i++) {
			browser.keys(['PageDown']);
		}
		// take screenshot of the element for screen comparison
		let bottomPart = browser.checkElement('.layers');
		expectExactSame(bottomPart);
	});


});