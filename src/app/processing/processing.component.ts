import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KnowledgeBaseService } from 'app/entry/knowledge-base/knowledge-base.service';
import { ModalsService } from '../modals/modals.service';
import { ProcessingArchitectureService } from '../services/processing-architecture.service';
import { SidStatusService } from '../services/sid-status.service';
import { ProcessingModel } from '@api/models';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit, OnChanges {
  processing: ProcessingModel;
  sections: any;
  currentSection: number;
  field: { id: number, title: string, evaluation_mode: string, short_help: string, questions: any };

  constructor(private route: ActivatedRoute,
    private _modalsService: ModalsService,
    private _processingArchitectureService: ProcessingArchitectureService,
    private _sidStatusService: SidStatusService,
    private knowledgeBaseService: KnowledgeBaseService
  ) { }

  ngOnInit() {
    this.sections = this.route.snapshot.data.sections;
    this.processing = this.route.snapshot.data.processing;
    this.currentSection = this.route.snapshot.params['section_id'] || 1;

    this.changeSection(this.currentSection);
  }

  ngOnChanges() {
    this.currentSection = this.route.snapshot.params['section_id'] || 1;

    this.changeSection(this.currentSection);
  }

  changeSection(sectionNumber) {
    this.currentSection = sectionNumber;
  }

   /**
   * Updates the knowledge base section
   * @private
   * @param {number} sectionId - The section id.
   * @param {number} fieldId - The field id.
   * @memberof ProcessingComponent
   */
  private updateKnowledgeBase() {
    // Update on knowledge base (scroll / content / search field)
    const knowledgeBaseScroll = document.querySelector('.pia-knowledgeBaseBlock-list');
    const knowledgeBaseContent = <HTMLInputElement>document.querySelector('.pia-knowledgeBaseBlock-searchForm input');

    knowledgeBaseScroll.scrollTop = 0;
    knowledgeBaseContent.value = '';

    this.knowledgeBaseService.q = null;
    this.knowledgeBaseService.loadByItem(this.field);
    this.knowledgeBaseService.placeholder = null;
  }

}
