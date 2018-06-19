import { browser, by, element } from 'protractor';

export class NewFolderModal {

  modal(){
    return element(by.css('#modal-list-new-folder'));
  }
  input(){
    return element(by.css('#modal-list-new-folder input#name'));
  }
  submitBtn(){
    return element(by.css('#modal-list-new-folder button#pia-save-card-btn'));
  }

  createNewFolderNamed(folderName:string){
      this.newFolderModal_input().sendKeys(folderName);
      return this.newFolderModal_submitBtn().click();
  }


}
