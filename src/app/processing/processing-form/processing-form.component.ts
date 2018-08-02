import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { ProcessingArchitectureService } from '../../services/processing-architecture.service';
import { ModalsService } from '../../modals/modals.service';
import { PaginationService } from 'app/processing/processing-form/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { SidStatusService } from '../../services/sid-status.service';
import { KnowledgeBaseService } from 'app/entry/knowledge-base/knowledge-base.service';
import { ProcessingModel } from '@api/models';
import { ProcessingApi } from '@api/services';

@Component({
  selector: 'app-processing-form',
  templateUrl: './processing-form.component.html',
  styleUrls: ['./processing-form.component.scss']
})

export class ProcessingFormComponent implements OnInit, OnChanges {
  @Input() sections: any;
  @Input() processing: ProcessingModel;
  @Input() section: any;
  @Input() item: any;

  constructor(private router: Router,
              private processingArchitectureService: ProcessingArchitectureService,
              private activatedRoute: ActivatedRoute,
              private modalsService: ModalsService,
              public processingApi: ProcessingApi,
              public sidStatusService: SidStatusService,
              public paginationService: PaginationService,
              private translateService: TranslateService,
              private knowledgeBaseService: KnowledgeBaseService) { }

  ngOnInit() {
    this.knowledgeBaseService.toHide = [];
    this.processing = new ProcessingModel();
    this.processing.id = 42;
  }

  ngOnChanges() {
    const sectionId = parseInt(this.activatedRoute.snapshot.params['sectionid'], 10);
    const itemId = parseInt(this.activatedRoute.snapshot.params['itemid'], 10);

    this.paginationService.setPagination(sectionId, itemId);
  }

  updateKnowledgeBase() {
    console.log('focusIn: knowledgebase update');
  }

  updateProcessing() {
    this.processingApi.update(this.processing);
  }


  /**
   * Go to next item.
   * @private
   * @param {number} statusstart - From status.
   * @param {number} statusend - To status.
   * @memberof EntryContentComponent
   */
  private goToNextSectionItem(statusstart: number, statusend: number) {
    const gotosectionitem = this.paginationService.getNextSectionItem(statusstart, statusend)

    this.router.navigate([
      'entry',
      this.processing.id,
      'section',
      gotosectionitem[0],
      'item',
      gotosectionitem[1]
    ]);
  }
}
