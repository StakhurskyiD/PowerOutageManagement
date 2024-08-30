import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address } from '../../../shared/models/address.model';
import { AddressService } from '../../../shared/services/address.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  @Input() address: Address = new Address();
  @Output() save = new EventEmitter<Address>();

  addressForm: FormGroup; // Reactive form group

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]], // Required, max length 100
      description: ['', [Validators.required, Validators.maxLength(250)]], // Required, max length 250
      groupId: ['', Validators.required], // Required
    });
  }

  ngOnInit() {
    if (this.address) {
      this.addressForm.patchValue(this.address); // Patch form with existing address values if available
    }
  }

  onSave() {
    if (this.addressForm.valid) {
      const address = this.addressForm.value;
      if (address.id) {
        // Update existing address
        this.addressService.updateAddress(address.id, address).subscribe(
          (updatedAddress) => this.save.emit(updatedAddress),
          (error) => console.error('Failed to update address:', error)
        );
      } else {
        // Create new address
        this.addressService.createAddress(address).subscribe(
          (newAddress) => this.save.emit(newAddress),
          (error) => console.error('Failed to create address:', error)
        );
      }
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
}