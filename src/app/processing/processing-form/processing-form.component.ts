import { Component, Input, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { KnowledgeBaseService } from '../../entry/knowledge-base/knowledge-base.service';
import { ProcessingModel } from '@api/models';
import { ProcessingApi } from '@api/services';
import { PermissionsService } from '@security/permissions.service';


@Component({
  selector: 'app-processing-form',
  templateUrl: './processing-form.component.html',
  styleUrls: ['./processing-form.component.scss']
})

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
  }
}