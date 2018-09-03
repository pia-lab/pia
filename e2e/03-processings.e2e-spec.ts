import { browser } from 'protractor';
import { LoginPage } from './page/login.po';
import { Dashboard } from './page/dashboard.po';
import { Folders } from './page/folders.po';
import { ProcessingForm } from './page/processing-form.po';
import { ProcessingCreationModal } from './modal/processing-creation.po';
import { ProcessingDeleteConfirmationModal } from './modal/processing-delete-confirmation.po';
import { Header } from './element/header.po';
import { ProcessingCards } from './element/processing-cards.po';
import './set-env';


describe('Processing management from cards view', () => {

  const auth = {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD
  };
  const salt = Math.random().toString(36).substring(2, 8);
  const processingName = 'Test processing ' + salt;
  const processingAuthor = 'author ' + salt;
  const processingControllers = 'controllers ' + salt;

  const loginPage = new LoginPage();
  const dashboard = new Dashboard();
  const header = new Header();
  const folders = new Folders();
  const processingForm = new ProcessingForm();
  const processingCreationModal = new ProcessingCreationModal();
  const processingDeleteConfirmationModal = new ProcessingDeleteConfirmationModal();
  const processingCards = new ProcessingCards();

  beforeEach(() => {
    loginPage.navigateTo();
    loginPage.clearSessionAndStorage();
    loginPage.fillCredentionals(auth.username, auth.password);
    loginPage.submitCredentials();

    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return /dashboard/.test(url);
      });
    }, 10000);

    dashboard.clickOnDashboardItem('processings');

    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return /folders/.test(url);
      });
    }, 10000);

  });

  afterEach(() => {
    header.clickOnLogoutInProfileMenu();
  });

  it('when user creates a processing - a popup has to be filled and the created processing appears on the page', () => {

    folders.clickOnCreateProcessingInCreationMenu().then(() => {
      expect(processingCreationModal.el().isDisplayed()).toBeTruthy();

      processingCreationModal.fillProcessingName(processingName);
      processingCreationModal.fillProcessingAuthor(processingAuthor);
      processingCreationModal.fillProcessingControllers(processingControllers);

      processingCreationModal.submitForm().then(() => {
        browser.wait(function() {
          return browser.getCurrentUrl().then(function(url) {
            return /processing/.test(url);
          });
        }, 10000);

        processingForm.clickOnReturn();

        browser.wait(function() {
          return browser.getCurrentUrl().then(function(url) {
            return /folders/.test(url);
          });
        }, 10000);

        expect(processingCreationModal.el().isDisplayed()).toBeFalsy();
        expect(processingCards.byProcessingName(processingName).el().isPresent()).toBeTruthy();
      });

    });

  });

  it('when user deletes a processing - a popup asks for confirmation and the processing is deleted', () => {

    const card = processingCards.byProcessingName(processingName);

    card.clickOnDeleteInToolMenu().then(() => {
      expect(processingDeleteConfirmationModal.el().isDisplayed()).toBeTruthy();

      processingDeleteConfirmationModal.confirmDeletion().then(() => {
        expect(processingDeleteConfirmationModal.el().isDisplayed()).toBeFalsy();
        expect(processingCards.byProcessingName(processingName).el().isPresent()).toBeFalsy();
      })
    });

  });

});
