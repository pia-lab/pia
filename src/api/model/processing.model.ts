
import { BaseModel } from '@api/model/base.model';
import { PiaModel, FolderModel } from '@api/models';

export class Processing extends BaseModel {
  public id: any;
  public status = 0; // 0: doing, 1: refused, 2: simple_validation, 3: signed_validation, 4: archived
  public name: string;
  public description: string;
  public author: string;
  public lifeCycle: string;
  public storage: string;
  public standards: string;
  public evaluator: string;
  public validator: string;
  public processors: any;
  public controllers: any;
  public nonEuTranfer: boolean;
  public onEuTransferDetails: string;
  public dataTypes: any;
  public folder: FolderModel;
  public pias: PiaModel[];
}
