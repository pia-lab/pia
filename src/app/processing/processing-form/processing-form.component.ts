import { Component, Input } from '@angular/core';

import { ProcessingModel } from '@api/models';
import { ProcessingApi } from '@api/services';

@Component({
  selector: 'app-processing-form',
  templateUrl: './processing-form.component.html',
  styleUrls: ['./processing-form.component.scss']
})

export class ProcessingFormComponent {
  @Input() sections: any;
  @Input() processing: ProcessingModel;
  @Input() currentSection: any;

  constructor(
    public processingApi: ProcessingApi,
  ) { }

  updateProcessing() {
    console.log(this.processing);
    this.processingApi.update(this.processing);
  }

  getSectionById(sectionId) {
    return this.sections.filter((section) => section.id === sectionId)[0];
  }

  updateKnowledgeBase(item: any) {

  }
}
