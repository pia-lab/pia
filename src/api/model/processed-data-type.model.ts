
import { BaseModel } from '@api/model/base.model';
import { ProcessingModel } from '@api/models';

export class ProcessedDataType extends BaseModel {
  public id: any;
  public reference: string;
  public data: string;
  public retentionPeriod: string;
  public isSensitive: string;
  public processing: ProcessingModel;
}
