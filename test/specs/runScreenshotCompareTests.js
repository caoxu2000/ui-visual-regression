import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import expectExactSame from '../helpers/expect_exact_same';

const config = require('config');


describe('Experiment Run Screenshot Comparison Test', function() {

	it('Should be the same as baseline for the first 5 runs', function() {

		let isExisting;
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		browser.waitUntil(function() {
			isExisting = Home.libraryTable.isExisting()
			return isExisting;
		}, 10000, 'login takes more than 10 seconds to load the library element');

		browser.url('experiments/tbag7H5YvaYLQXXvp');
		browser.waitUntil(function() {
			return browser.getTitle() === 'E3 | 3 - One step uploaded';
		}, 10000, 'title takes more than 10 seconds to change');
		Home.closeBrowserSize.waitForVisible();
		Home.closeBrowserSize.waitForEnabled();
		browser.pause(600);
		Home.closeBrowserSize.click();
		browser.waitUntil(function() {
			return Experiment.runTableRow(1, 2).isExisting();
		}, 10000, 'first run table row takes more than 10 seconds to load');

		// take screenshot of the element for screen comparison
		let report = browser.checkElement('.resource-details-table');
		expectExactSame(report);
	});

	it('Should be the same as baseline for the last 5 runs', function() {

		browser.waitUntil(function() {
			return Experiment.runTableRow(1, 2).isExisting();
		}, 10000, 'first run table row takes more than 10 seconds to load');
		for (let i = 1; i <= 251; i++) {
			browser.pause(300);
			Experiment.runTableRow(1, 2).click();
			browser.keys(['PageDown']);
		}

		// take screenshot of the element for screen comparison
		let report = browser.checkElement('.resource-details-table');
		expectExactSame(report);
	});


})