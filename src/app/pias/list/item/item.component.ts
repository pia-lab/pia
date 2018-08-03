import { Component, OnInit, Input } from '@angular/core';
import { PiaModel } from '@api/models';

@Component({
  selector: '[app-pias-list-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class PiasListItemComponent implements OnInit {

  @Input() pia: PiaModel

  constructor() { }

  ngOnInit() {
  }

}
