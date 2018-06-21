import { browser, by, element } from 'protractor';

export class FolderCreationModal {

  element() {
    return element(by.css('#modal-list-new-folder'));
  }

  fillFolderName(folderName: string) {
    return this.element().element(by.css('input#name')).sendKeys(folderName);
  }

  submitForm() {
      return this.element().element(by.css('button#pia-save-card-btn')).click();
  }

}
