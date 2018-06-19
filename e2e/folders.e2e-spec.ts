import { browser, by, element } from 'protractor';
import { LoginPage } from './page/login.po';
import { HomePage } from './page/home.po';
import './set-env';


describe('PIA Login page', () => {

  const auth = {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD
  };

  let loginPage: LoginPage;
  let homePage: HomePage;

  beforeEach(() => {
    loginPage = new LoginPage();
    homePage = new HomePage();

    loginPage.navigateTo();
    loginPage.clearSessionAndStorage();
    loginPage.fillCredentionals(auth.username, auth.password);
    loginPage.submitCredentials();

    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return /home/.test(url);
      });
    }, 10000);

  });

  it('when user create a folder, the folder appear on the page', () => {

    homePage.clickOnNewMenu().then(() => {
      homePage.clickOnNewFolder().then(() => {
        expect(element(by.css('#modal-list-new-folder')).isDisplayed()).toBeTruthy();


      });
    });

  });

});
