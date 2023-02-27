import { Component, Input, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputFieldComponent,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() title: string = '';
  @Input() inputType: string = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 100;
  @Input() controller!: FormControl;

  invalid = true;
  value: string = '';
  onChange = (val: any) => {};
  onTouched = () => {};

  touched = false;

  onValueChange(evt: any) {
    this.markTouched();
    // No need to check as I will disable input field based on disabled value
    // if(!this.disabled){
    // }
    this.value = evt.target.value;
    console.log(this.isValid());
    this.onChange(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  isValid(): boolean {
    if (this.touched && this.controller.invalid) return true;
    return false;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
