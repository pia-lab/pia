import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-processed-data-types',
  templateUrl: './processed-data-types.component.html',
  styleUrls: ['./processed-data-types.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProcessedDataTypesComponent),
      multi: true
    }
  ]
})

export class ProcessedDataTypesComponent implements ControlValueAccessor {
  _value: any = {};
  onChange: (value: any) => {};
  onTouched: () => {};

  public identification: boolean
  public personal: boolean
  public professional: boolean
  public financial: boolean
  public log: boolean
  public location: boolean
  public internet: boolean
  public other: boolean

  constructor() { }

  updateValue(category: string, field: string, value: any): void {
    switch (field) {
      case 'exists':
        if (this._value.hasOwnProperty(category)) {
          delete this._value[category];
        }

        break;

      default:
        if (!this._value.hasOwnProperty(category)) {
          this._value[category] = {};
        }

        this._value[category][field] = value;
    }

    this.writeValue(this._value);
  }

  /**
   * Write form control value
   * @param element
   */
  writeValue(value: any): void {
    if (this.onChange) {
      this.onChange(value);
    }
  }

  /**
   * Register onChange callback
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Register onTouched callback
   *
   * @param fn
  */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Set disabled state of form control
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void {

  }

}
