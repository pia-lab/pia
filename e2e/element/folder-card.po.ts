import { browser, by, element } from 'protractor';

export class FolderCard {

  container() {
    return element(by.css('.cardsContainer'));
  }

  byFolderName(folderName: string) {
    return element(by.cssContainingText('input.folder-title', folderName));
  }

}
