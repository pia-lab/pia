import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProcessingModel } from '@api/models';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {
  processing: ProcessingModel;
  sections: any;
  currentSection: any;
  field: { id: number, title: string, evaluation_mode: string, short_help: string, questions: any };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sections = this.route.snapshot.data.sections;
    this.processing = this.route.snapshot.data.processing;

    this.changeSection(1);
  }

  changeSection(sectionId) {
    this.currentSection = this.getSectionById(sectionId);
  }

  private getSectionById(sectionId) {
    return this.sections.filter((section) => section.id === sectionId)[0];
  }

}
