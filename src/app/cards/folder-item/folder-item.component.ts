import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.scss']
})
export class FolderItemComponent implements OnInit {
  @Input() folder
  @Input() previousFolder
  constructor() { }

  ngOnInit() {
  }

}
