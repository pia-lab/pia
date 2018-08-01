import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pia } from '../../entry/pia.model';
import { Router } from '@angular/router';

import { Attachment } from '../../entry/attachments/attachment.model';
import { ModalsService } from '../../modals/modals.service';
import { PiaService } from '../../entry/pia.service';

import {PiaModel, AttachmentModel} from '@api/models';
import {PiaApi, AttachmentApi} from '@api/services';
import {PermissionsService} from '@security/permissions.service';
import { PiaType } from '@api/model/pia.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss', './card-item_edit.component.scss',
    './card-item_doing.component.scss', './card-item_archived.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() processing: any;
  @Input() previousProcessing: any;
  processingForm: FormGroup;
  attachments: any;
  piaTypes: any;

  @ViewChild('piaName') private piaName: ElementRef;
  @ViewChild('piaAuthorName') private piaAuthorName: ElementRef;
  @ViewChild('piaEvaluatorName') private piaEvaluatorName: ElementRef;
  @ViewChild('piaValidatorName') private piaValidatorName: ElementRef;
  @ViewChild('piaType') private piaType: ElementRef;

  constructor(private router: Router,
              private _modalsService: ModalsService,
              public _piaService: PiaService,
              private piaApi: PiaApi,
              private attachmentApi: AttachmentApi,
              private permissionsService: PermissionsService
              ) { }

  ngOnInit() {

    this.processingForm = new FormGroup({
      id: new FormControl(this.processing.id),
      name: new FormControl({ value: this.processing.name, disabled: true }),
      author: new FormControl({ value: this.processing.author, disabled: true }),
      processors: new FormControl({ value: this.processing.processors, disabled: true }),
      controllers: new FormControl({ value: this.processing.controllers, disabled: true })
    });

    // add permission verification
    const hasPerm$ = this.permissionsService.hasPermission('CanCreatePIA');
    hasPerm$.then((bool: boolean) => {
      for (const field in this.processingForm.controls) {
          const fc = this.processingForm.get(field);
          bool ? fc.enable() : fc.disable();
      }
    } );
  }

  /**
   * Focuses pia name field.
   * @memberof CardItemComponent
   */
  piaNameFocusIn() {
    // this.processingForm.controls['name'].enable();
    this.piaName.nativeElement.focus();
  }

  /**
   * Disables pia name field and saves data.
   * @memberof CardItemComponent
   */
  piaNameFocusOut() {
    let userText = this.processingForm.controls['name'].value;
    if (userText && typeof userText === 'string') {
      userText = userText.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    if (userText !== '') {

      this.piaApi.get(this.processingForm.value.id).subscribe((thePia: PiaModel) => {
        thePia.name = this.processingForm.value.name;
        this.piaApi.update(thePia).subscribe();
      });
    }
  }

  /**
   * Focuses pia author name field.
   * @memberof CardItemComponent
   */
  piaAuthorNameFocusIn() {
    this.piaAuthorName.nativeElement.focus();
  }

  /**
   * Disables pia author name field and saves data.
   * @memberof CardItemComponent
   */
  piaAuthorNameFocusOut() {
    let userText = this.processingForm.controls['author_name'].value;
    if (userText && typeof userText === 'string') {
      userText = userText.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    if (userText !== '') {
      this.piaApi.get(this.processingForm.value.id).subscribe((thePia: PiaModel) => {
        thePia.author_name = this.processingForm.value.author_name;
        this.piaApi.update(thePia).subscribe();
      });
    }
  }

  /**
   * Focuses pia evaluator name field.
   * @memberof CardItemComponent
   */
  piaEvaluatorNameFocusIn() {
    this.piaEvaluatorName.nativeElement.focus();
  }

  /**
   * Disables pia evaluator name field and saves data.
   * @memberof CardItemComponent
   */
  piaEvaluatorNameFocusOut() {
    let userText = this.processingForm.controls['evaluator_name'].value;
    if (userText && typeof userText === 'string') {
      userText = userText.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    if (userText !== '') {
      this.piaApi.get(this.processingForm.value.id).subscribe((thePia: PiaModel) => {
        thePia.evaluator_name = this.processingForm.value.evaluator_name;
        this.piaApi.update(thePia).subscribe();
      });
    }
  }

  /**
   * Focuses pia validator name field.
   * @memberof CardItemComponent
   */
  piaValidatorNameFocusIn() {
    this.piaValidatorName.nativeElement.focus();
  }

  /**
   * Disables pia validator name field and saves data.
   * @memberof CardItemComponent
   */
  piaValidatorNameFocusOut() {
    let userText = this.processingForm.value.validator_name;
    if (userText && typeof userText === 'string') {
      userText = userText.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    if (userText !== '') {
      this.piaApi.get(this.processingForm.value.id).subscribe((thePia: PiaModel) => {
        thePia.validator_name = this.processingForm.value.validator_name;
        this.piaApi.update(thePia).subscribe();
      });
    }
  }

  /**
   * Disables pia validator name field and saves data.
   * @memberof CardItemComponent
   */
  piaTypeFocusOut() {
    this.piaApi.get(this.processingForm.value.id).subscribe((thePia: PiaModel) => {
      thePia.type = this.processingForm.value.type;

      this.piaApi.update(thePia).subscribe();
    });
  }

  /**
   * Deletes a PIA with a given id.
   * @param {string} id - The PIA id.
   * @memberof CardItemComponent
   */
  removePia(id: string) {
    localStorage.setItem('pia-id', id);
    this._modalsService.openModal('modal-remove-pia');
  }

  /**
   * Export a PIA in JSON format.
   * @param {number} id - The PIA id.
   * @memberof CardItemComponent
   */
  export(id: number) {
    this._piaService.export(id);
  }
}
