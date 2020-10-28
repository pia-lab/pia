import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AttachmentsService } from './attachments.service';
import { PiaModel } from '@api/models';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit {

  @Input() pia: PiaModel;
  attachmentForm: FormGroup;
  displayAttachmentButton = false;

  constructor(private activatedRoute: ActivatedRoute,
              public _attachmentsService: AttachmentsService) { }

  ngOnInit() {
    this.attachmentForm = new FormGroup({
      attachment_file: new FormControl('', [])
    });
    this._attachmentsService.pia = this.pia;
    this._attachmentsService.listAttachments();
    this.displayAttachmentButton = (this.pia.status !== 2 && this.pia.status !== 3);
  }

  /**
   * Allows users to add attachments to a PIA.
   * @memberof AttachmentsComponent
   */
  addAttachment() {
    if (this.pia.is_example) {
      return false;
    } else {
      this._attachmentsService.pia_signed = 0;
       const attachment = <HTMLInputElement>document.querySelector('[formcontrolname="attachment_file"]');
      attachment.click();
    }
  }

  /**
   * Allows users to upload an attachment for a specific PIA.
   * @param {event} event - Any kind of event.
   * @memberof AttachmentsComponent
   */
  uploadAttachement(event: Event) {
    this._attachmentsService.upload((<HTMLInputElement>event.target).files[0]);
  }
}
