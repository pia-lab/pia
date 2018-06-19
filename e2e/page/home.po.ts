import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/home');
  }

  navbarProfile() {
    return element(by.css('li.pia-navigationBlock-profile a span'));
  }

  clickOnNewMenu() {
    return element(by.css('.menu-new button.pia-filtersBlock-filters-btn.btn')).click();
  }

  clickOnNewFolder() {
    return element(by.css('.menu-new button[name="menu-new-folder"]')).click();
  }

  clickOnLogout() {
    element(by.css('li.pia-navigationBlock-profile a')).click();
    return element(by.css('#user-block li.logout a')).click();
  }
}
