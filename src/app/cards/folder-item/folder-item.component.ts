import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FolderApi } from '@api/services';
import { FolderModel } from '@api/models';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.scss']
})
export class FolderItemComponent implements OnInit {
  @Input() folder
  @Input() previousFolder

  folderForm: FormGroup

  constructor(
    private folderApi: FolderApi
  ) { }

  ngOnInit() {
    this.folderForm = new FormGroup({
      name: new FormControl({ value: this.folder.name })
    })
  }

  /**
   * Disables folder name field and saves data.
   * @memberof FolderItemComponent
   */
  folderNameFocusOut() {
    let userText = this.folderForm.controls['name'].value;
    if (userText) {
      userText = userText.replace(/^\s+/, '').replace(/\s+$/, ''); // trim value
    }
    if (userText !== '') {

      this.folderApi.get(this.folder.id).subscribe((theFolder: FolderModel) => {

        theFolder.name = this.folderForm.value.name;
        this.folderApi.update(theFolder).subscribe();
      });
    }
  }

}
