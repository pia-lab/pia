import { Component, OnInit } from '@angular/core';
import { PiaApi } from '@api/services';
import { ActivatedRoute } from '@angular/router';
import { PiaModel } from '@api/models';

@Component({
  selector: 'app-pias-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PiasListComponent implements OnInit {

  public pias: Array<PiaModel>

  constructor(
    private route: ActivatedRoute,
    private piaApi: PiaApi
  ) {
    this.route.params.subscribe( params => {
      this.piaApi.getAll({'processing' : params.id}).subscribe((pias: Array<PiaModel>) => {
        this.pias = pias;
      });
    });
  }

  ngOnInit() {}


}
