import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormField } from '../../models/dynamic-form-field.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dynamic-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form-modal.component.html',
  styleUrls: ['./dynamic-form-modal.component.scss']
})
export class DynamicFormModalComponent implements OnInit {
  @Input() title: string = "Form";
  @Input() fields: DynamicFormField [] = [];

  @Output() submitForm = new EventEmitter<any>();
  @Output() cancelForm = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    const group: {[key: string]: any } = {};

    this.fields.forEach((field) => {
      group[field.name] = [
        {value: field.value || '', disabled: field.disabled || false},
        field.validators || [],
        field.asyncValidators || [], 
      ];
    });

    this.form = this.fb.group(group);
  }

  onSubmit(){
    if(this.form?.valid){
      this.submitForm.emit(this.form.value);
    } else {
      this.form?.markAllAsTouched();
    }
  }

  onCancel(){
    this.cancelForm.emit();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form?.controls[fieldName];

    if (control?.errors) {
      if (control.errors?.['required']) {
        return `${this.getFieldLabel(fieldName)} is required.`;
      }
      if (control.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} cannot exceed ${control.errors['maxlength'].requiredLength} characters.`;
      }
      // Add more error handling as needed
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const field = this.fields.find((f) => f.name === fieldName);
    return field ? field.label : fieldName;
  }
}
