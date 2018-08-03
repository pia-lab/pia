import { Component, OnInit } from '@angular/core';
import { PiaApi, ProcessingApi } from '@api/services';
import { ActivatedRoute } from '@angular/router';
import { PiaModel, ProcessingModel } from '@api/models';

@Component({
  selector: 'app-pias-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PiasListComponent implements OnInit {

  public processing: ProcessingModel = new ProcessingModel()
  public pias: Array<PiaModel> = []

  constructor(
    private route: ActivatedRoute,
    private piaApi: PiaApi,
    private processingApi: ProcessingApi
  ) {
    this.route.params.subscribe( params => {
      this.processingApi.get(params.id).subscribe(processing => {
        this.processing = processing;
      });
      this.piaApi.getAll({'processing' : params.id}).subscribe((pias: Array<PiaModel>) => {
        this.pias = pias;
      });
    });
  }

  ngOnInit() {}


}
