import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import VersionsTab from '../pageobjects/versions.tab.page';
import expectExactSame from '../helpers/expect_exact_same';

const config = require('config');


describe('Click on versions link test', function() {

	it('Should update 0.01ver flowchart', function() {

		LoginPage.login(config.app.admin.username, config.app.admin.password);

		// click away the promot video and browser size suggestion modal
		browser.pause(5000);
		Home.closeVideoBtn.waitForExist();
		Home.closeVideoBtn.click();
		browser.pause(2000);

		browser.url('processes/NRriBeYKnv5ErrraS-v1.01');
		browser.pause(2000);

		VersionsTab.versionsTabLnk.click();
		VersionsTab.version001Lnk.click();

		let version001FlowChart = browser.checkElement('.layers');
		expectExactSame(version001FlowChart);

	});

	it('Should update 1.0.0ver flowchart', function() {

		VersionsTab.version100Lnk.click();
		let version100FlowChart = browser.checkElement('.layers');
		expectExactSame(version100FlowChart);

	});

	it('Should update 1.0.1ver flowchart', function() {

		VersionsTab.version101Lnk.click();
		let version100FlowChart = browser.checkElement('.layers');
		expectExactSame(version100FlowChart);

	});

});
