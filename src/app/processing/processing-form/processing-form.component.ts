<<<<<<< HEAD
import { Component, Input, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { KnowledgeBaseService } from '../../entry/knowledge-base/knowledge-base.service';
import { ProcessingModel } from '@api/models';
import { ProcessingApi } from '@api/services';
import { PermissionsService } from '@security/permissions.service';

=======
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import 'rxjs/add/operator/map'

import { ProcessingArchitectureService } from '../../services/processing-architecture.service';
import { ModalsService } from '../../modals/modals.service';
import { PaginationService } from 'app/processing/processing-form/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { SidStatusService } from '../../services/sid-status.service';
import { KnowledgeBaseService } from 'app/entry/knowledge-base/knowledge-base.service';
import { ProcessingService } from '../processing.service';
import { ProcessingModel } from '@api/models';
>>>>>>> 203078e00d0a7f822e493c843f084d11681c21fe

@Component({
  selector: 'app-processing-form',
  templateUrl: './processing-form.component.html',
  styleUrls: ['./processing-form.component.scss']
})

<<<<<<< HEAD
export class ProcessingFormComponent implements OnDestroy {
  @Input() sections: any;
  @Input() processing: ProcessingModel;
  @Input() currentSection: any;
  @ViewChild('processingForm') processingForm: NgForm;
  editor: any;
  elementId: String;

  constructor(
    private processingApi: ProcessingApi,
    private ref: ChangeDetectorRef,
    private permissionsService: PermissionsService,
    private knowledgeBaseService: KnowledgeBaseService
  ) { }

  ngOnDestroy() {
    this.closeEditor();
  }

  updateProcessing() {
    this.processingApi.update(this.processing);
  }

  updateKnowledgeBase(item: any) {

  }

  editField(element: any) {
    this.permissionsService.hasPermission('CanEditProcessing').then((hasPerm: boolean) => {
      if (hasPerm) {
        this.elementId = element.id;

        this.loadEditor(element);
        this.updateKnowledgeBase(element);
      }
    });
  }

  /**
   * Load wysiwyg editor.
   * @memberof ProcessingFormComponent
   */
  loadEditor(element: any) {
    tinymce.init({
      branding: false,
      menubar: false,
      statusbar: false,
      plugins: 'autoresize lists',
      forced_root_block: false,
      autoresize_bottom_margin: 30,
      auto_focus: element.id,
      autoresize_min_height: 40,
      content_style: 'body {background-color:#eee!important;}',
      selector: '#' + element.id,
      toolbar: 'undo redo bold italic alignleft aligncenter alignright bullist numlist outdent indent',
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;

        editor.on('focusout', () => {
          const content = editor.getContent();

          this.processingForm.form.controls[element.name].patchValue(content);

          this.closeEditor();
          this.updateProcessing();
          // Hack to trigger view update
          this.ref.detectChanges();
        });
      },
    });
  }

  /**
   * Close wysiwig editor.
   * @private
   * @memberof QuestionsComponent
   */
  private closeEditor() {
    tinymce.remove(this.editor);
    this.editor = null;
=======
export class ProcessingFormComponent implements OnInit, OnChanges {
  @Input() section: any;
  @Input() item: any;
  @Input() data: any;
  @Input() sections: any;
  processing: ProcessingModel = new ProcessingModel();

  constructor(private _router: Router,
              private _processingArchitectureService: ProcessingArchitectureService,
              private _activatedRoute: ActivatedRoute,
              private _modalsService: ModalsService,
              public _processingService: ProcessingService,
              public _sidStatusService: SidStatusService,
              public _paginationService: PaginationService,
              private _translateService: TranslateService,
              private _knowledgeBaseService: KnowledgeBaseService) { }

  ngOnInit() {
    this._knowledgeBaseService.toHide = [];
  }

  ngOnChanges() {
    const sectionId = parseInt(this._activatedRoute.snapshot.params['section_id'], 10);
    const itemId = parseInt(this._activatedRoute.snapshot.params['item_id'], 10);

    this._paginationService.setPagination(sectionId, itemId);
  }


  /**
   * Go to next item.
   * @private
   * @param {number} status_start - From status.
   * @param {number} status_end - To status.
   * @memberof EntryContentComponent
   */
  private goToNextSectionItem(status_start: number, status_end: number) {
    const goto_section_item = this._paginationService.getNextSectionItem(status_start, status_end)

    this._router.navigate([
      'entry',
      this._processingService.processing.id,
      'section',
      goto_section_item[0],
      'item',
      goto_section_item[1]
    ]);
>>>>>>> 203078e00d0a7f822e493c843f084d11681c21fe
  }
}
