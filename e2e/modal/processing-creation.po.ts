import { browser, by, element } from 'protractor';

export class ProcessingCreationModal {

  el() {
    return element(by.css('div#modal-list-new-processing'));
  }

  fillProcessingName(processingName: string) {
    return this.el().element(by.css('input#name')).sendKeys(processingName);
  }

  fillProcessingAuthor(processingAuthor: string) {
    return this.el().element(by.css('input#author')).sendKeys(processingAuthor);
  }

  fillProcessingControllers(processingControllers: string) {
    return this.el().element(by.css('input#controllers')).sendKeys(processingControllers);
  }

  submitForm() {
      return this.el().element(by.css('button#processing-save-card-btn')).click();
  }

}
