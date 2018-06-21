import { browser, by, element } from 'protractor';
import { LoginPage } from './page/login.po';
import { HomePage } from './page/home.po';
import { FolderCreationModal } from './modal/folder-creation.po';
import { FolderCard } from './element/folder-card.po';
import './set-env';


describe('PIA folder management', () => {

  const auth = {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD
  };

  let loginPage: LoginPage;
  let homePage: HomePage;
  let folderCreationModal: FolderCreationModal;
  let folderCard: FolderCard;

  beforeEach(() => {
    loginPage = new LoginPage();
    homePage = new HomePage();
    folderCreationModal = new FolderCreationModal();
    folderCard = new FolderCard();

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

  afterEach(() => {
    loginPage = new LoginPage();
    homePage.clickOnLogoutInProfileMenu();
  });

  it('when user create a folder, the folder appear on the page', () => {

    homePage.clickOnCreateFolderInCreationMenu().then(() => {
        expect(folderCreationModal.element().isDisplayed()).toBeTruthy();
        let folderName = 'Test Folder';
        folderCreationModal.fillFolderName(folderName);

        folderCreationModal.submitForm().then(() => {
          expect(folderCreationModal.element().isDisplayed()).toBeFalsy();
          expect(folderCard.byFolderName(folderName).isPresent()).toBeTruthy();
        });

    });

  });

});
