import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import expectExactSame from '../helpers/expect_exact_same';
import LoginPage from '../pageobjects/login.page';

const config = require('config');


describe('Experiment Run Screenshot Comparison Test', function() {

	it('Should be the same as baseline for all the columns', function() {

		let isExisting;
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		browser.waitUntil(function() {
			isExisting = Home.videoWrapper.isExisting()
			return isExisting;
		}, 5000, 'login takes more than 5 seconds to load the library element');

		browser.url('experiments/x2oCYYY9cewGZgWNR');
		browser.pause(8000);
		browser.waitUntil(function() {
			let isTitleChanged = browser.getTitle() === 'E1 | Exp 1';
			return isTitleChanged;
		}, 10000, 'title takes more than 10 seconds to change');

		Home.closeBrowserSize.waitForVisible();
		Home.closeBrowserSize.waitForEnabled();
		Home.closeBrowserSize.click();
		
		browser.click('[data-name="Measure Tim\'s Special"]');
		browser.waitUntil(function() {
			return Experiment.runTableRow(1, 2).isExisting();
		}, 10000, 'first run table row takes more than 10 seconds to load');
		Experiment.runTableRow(1, 2).waitForVisible();
		Experiment.runTableRow(1, 2).waitForEnabled();
		browser.pause(600);
		browser.click('.resource-details-table .table.body');
		for (let i = 1; i <= 25; i++) {
			browser.keys(['ArrowRight']);
		}

		// take screenshot of the element for screen comparison
		let report = browser.checkElement('.resource-details-table');
		expectExactSame(report);
	});


})