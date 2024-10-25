import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export interface DynamicFormField{
    name: string;
    label: string;
    type: 'text'| 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';
    value?:  any;
    options?: {label: string, value: any}[];
    validators?: ValidatorFn[];
    asyncValidators?: AsyncValidatorFn[];
    placeholder?: string;
    disabled?: boolean;
    hidden?: boolean;
} 