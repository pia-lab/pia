
import { BaseService } from '@api/service/base.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ProcessedDataType } from '@api/model/processed-data-type.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ProcessedDataTypeService extends BaseService<ProcessedDataType> {

  protected modelClass = ProcessedDataType;

  protected routing: any = {
    all: '/processed-data-type',
    one: '/processed-data-types/{id}'
  };

  constructor(http: HttpClient) {
    super(http);
  }

  public getAll(): Observable<ProcessedDataType[]> {
    return this.httpGetAll(this.routing.all);
  }

  public get(id: any): Observable<ProcessedDataType> {
    return this.httpGetOne(this.routing.one, { id: id });
  }

  public update(model: ProcessedDataType): Observable<ProcessedDataType> {
    return this.httpPut(this.routing.one, { id: model.id }, model);
  }

  public create(model: ProcessedDataType): Observable<ProcessedDataType> {
    return this.httpPost(this.routing.all, {}, model);
  }

  public deleteById(id: any): Observable<ProcessedDataType> {
    return this.httpDelete(this.routing.one, { id: id });
  }

  public delete(model: ProcessedDataType): Observable<ProcessedDataType> {
    return this.deleteById(model.id);
  }
}
