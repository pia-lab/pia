import { browser, by, element } from 'protractor';

export class ProcessingForm {

  navigateTo(processingId: any) {
    return browser.get('/#/processing/' + processingId);
  }

  clickOnReturn() {
    return  element(by.css('a.pia-icon-close-big')).click();
  }

}
